import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0
}

export const getStatsData = createAsyncThunk('stats/get', async () => {
  try {
    const response = axiosInstance.get("/admin/stats/users");
    toast.promise(response, {
      loading: "Fetching stats",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to fetch stats"
    });
    console.log((await response).data.data);
    return (await response).data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action.payload.totalUsers;
      state.subscribedCount = action.payload.totalActiveSubscriptions;
      state.totalRevenue = action.payload.totalRevenue;
    });
  },
});

export default statSlice.reducer;