import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('api/fetchProducts', async () => {
  const response = await fetch('/api/products'); // Updated to match the new API endpoint
  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }
  const data = await response.json();
  return data;
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
