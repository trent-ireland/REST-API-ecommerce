import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './ProductSlice';
import authReducer from './AuthSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    products:apiReducer, 
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
