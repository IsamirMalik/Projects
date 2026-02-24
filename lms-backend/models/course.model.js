import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [3, "Title must be at least 3 characters long"],
    maxLength: [50, "Title must be at most 50 characters long"],
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [10, "Description must be at least 10 characters long"],
    maxLength: [500, "Description must be at most 500 characters long"],
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    lowercase: true,
    trim: true,
  },
  createdBy: {
    type: String,
    required: [true, "Creator is required"],
    lowercase: true,
    trim: true,
  },
  thumbnail: {
    public_id: String,
    secure_url: String
  },
  lectures: [
    {
      title: String,
      description: String,
      lecture: {
        public_id: String,
        secure_url: String
      }
    }
  ]
});

const Course = model("Course", courseSchema);

export default Course;
