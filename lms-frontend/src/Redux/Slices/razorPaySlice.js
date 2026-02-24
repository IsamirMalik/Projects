import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";



const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: []
};

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payment/razorpay-key");
    return response.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

export const purchaseCourseBundle = createAsyncThunk("/purchasecourse", async () => {
  try {
    const response = await axiosInstance.post("/payment/subscribe");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const verifyUserPayment = createAsyncThunk(
  "/payment/verify",
  async (data, thunkAPI) => {
    try {
      const payload = {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      };
      const response = await axiosInstance.post("/payment/verify", payload);
      // return only response data for simpler handling in reducers
      return response.data;
    } catch (error) {
      const errData = error?.response?.data || { message: error?.message };
      // show toast but also reject with value so reducers can access payload
      toast.error(errData?.message ?? "Verification failed");
      return thunkAPI.rejectWithValue(errData);
    }
  }
);

export const getPaymentRecord = createAsyncThunk("/payment/record", async () => {
  try {
    const response = axiosInstance.get("/payment?count=100");
    toast.promise(response, {
      loading: "Getting the payment record",
      success: (data) => {
        return data?.data?.message
      },
      error: "Failed to get the payment record"
    })
    console.log((await response).data);
    return (await response).data;
  } catch (error) {
    toast.error("Operation failed");
  }
});

export const cancelCourseBundle = createAsyncThunk("/payment/cancel", async () => {
  try {
    const response = axiosInstance.post("/payment/unsubscribe");
    toast.promise(response, {
      loading: "unsubscribing the bundle",
      success: (data) => {
        return data?.data?.message
      },
      error: "Failed to unsubscribe"
    })
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


const razorPaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscriptionId;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        state.isPaymentVerified = action?.payload?.success;
        toast.success(action?.payload?.message);
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.monthlySalesData = action?.payload?.monthlySalesData;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      })
  }
})

export default razorPaySlice.reducer;