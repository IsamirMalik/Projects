import AppError from "../utils/error.util.js";
import Course from "../models/course.model.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async (req, res, next) => {

  try {
    const courses = await Course.find({});
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }

};

const getLecturesByCourseId = async (req, res, next) => {

  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    res.status(200).json({
      success: true,
      message: "Lectures fetched successfully",
      course
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const createCourse = async (req, res, next) => {

  const { title, description, category, createdBy, thumbnail } = req.body;

  console.log(title)
  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  };

  const course = await Course.create({
    title,
    description,
    category,
    createdBy
  });

  console.log(course);

  if (!course) {
    return next(new AppError("Course creation failed , try again", 500));
  };

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: "lms" });
    course.thumbnail = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };

    console.log(result);

    fs.rm(`uploads/${req.file.filename}`);

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course
    });
  }
};


const updateCourse = async (req, res, next) => {

  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course
    })
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Course id is required", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course not found", 404));
    }
    await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);

    await Course.findByIdAndDelete(id);


    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    })

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const addLecturesByCourseId = async (req, res, next) => {

  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description || !id) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course not found", 404));
    };

    const lectureData = {
      title,
      description,
      lecture: {}
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          chunk_size: 60000000, // 60 MB
          resource_type: "video"
        });

        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError(error.message, 500));
      }
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture added successfully",
      course
    })
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteLecture = async (req, res, next) => {

  try {
    const { courseId, lectureId } = req.query;
    console.log(courseId, lectureId);
    if (!lectureId) {
      return next(new AppError("Lecture id is required", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      console.log('course not found')
      return next(new AppError("Course not found", 404));
    }

    const lecture = course.lectures.find(lecture => lecture._id == lectureId);

    if (!lecture) {
      return next(new AppError("Lecture not found", 404));
    }

    if (lecture.lecture.public_id) {
      await cloudinary.v2.uploader.destroy(lecture.lecture.public_id);
    }

    course.lectures = course.lectures.filter(lecture => lecture._id != lectureId);
    course.numberOfLectures = course.lectures.length;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully"
    })
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};


export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLecturesByCourseId,
  deleteLecture
}