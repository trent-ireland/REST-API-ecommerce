import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userInfo = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    }
  }
});

export default authSlice.reducer;
