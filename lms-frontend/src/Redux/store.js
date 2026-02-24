import { configureStore } from "@reduxjs/toolkit";

import courseReducer from './slices/courseSlice.js';
import lectureReducer from './slices/lectureSlice.js';
import razorpayReducer from './slices/razorPaySlice.js';
import statSliceReducer from './slices/StatSlice.js';
import authReducer from './slices/authSlice.js';


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