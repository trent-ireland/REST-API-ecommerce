import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userInfo = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    }
  }
});

export default userSlice.reducer;
