import { configureStore } from "@reduxjs/toolkit";

import courseReducer from './temp/courseSlice.js';
import lectureReducer from './temp/lectureSlice.js';
import razorpayReducer from './temp/razorPaySlice.js';
import statSliceReducer from './temp/StatSlice.js';
import authReducer from './temp/authSlice.js';


const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    razorpay: razorpayReducer,
    lecture: lectureReducer,
    stat: statSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;