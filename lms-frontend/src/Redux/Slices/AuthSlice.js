import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstanse from "../../Helpers/axiosInstanse";

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || '',
  data: localStorage.getItem('data') || ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const createAccount = createAsyncThunk('auth/signup', async (data) => {
  try {
    const res = axiosInstanse.post('user/register', data);
    toast.promise(res, {
      loading: 'wait! , Creating account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Account creation failed'
    })
    
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


export const login = createAsyncThunk('auth/login', async (data) => {
  try {
    const res = axiosInstanse.post('user/login', data);
    toast.promise(res, {
      loading: 'wait! , Authentication is in progress',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Login failed'
    })
    
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const { } = authSlice.actions;
export default authSlice.reducer;

