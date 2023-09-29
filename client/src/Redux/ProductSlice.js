import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Updated fetch URL to use the full path
export const fetchProducts = createAsyncThunk('api/fetchProducts', async () => {
  const response = await fetch('http://localhost:3000/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }
  const data = await response.json();
  return data;
});

const ProductSlice = createSlice({
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

export default ProductSlice.reducer;

