import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js";
const initialState = {
  courseList: []
}

export const getAllCourses = createAsyncThunk("/course/getAllCourses", async (data) => {
  try {
    const response = axiosInstance.get("/course", data);
    toast.promise(response, {
      loading: 'Wait! fetching all courses',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to load courses'
    });
    console.log((await response).data.courses)
    return (await response).data.courses;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
})

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/course/${id}`);
    toast.promise(response, {
      loading: 'Deleting Course',
      success: 'Course deleted successfully',
      error: 'Failed to delete the course'
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
})

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);

    console.log(formData)
    const response = axiosInstance.post("/course", formData);
    console.log(response)
    toast.promise(response, {
      loading: 'Wait! Creating new course',
      success: 'Course created successfully',
      error: 'Failed to create course'
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
})



const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      // console.log(action.payload)
      if (action?.payload) {
        state.courseList = [...action.payload];
      }
    })
  }
});

export default courseSlice.reducer;