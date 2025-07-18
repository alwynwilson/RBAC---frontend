import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import staffReducer from './slices/staffSlice'; 
import studentReducer from './slices/studentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    student: studentReducer,
  },
});

export default store;