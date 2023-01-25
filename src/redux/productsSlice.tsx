import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from './operations';

export interface ProductsState {
  items:
    | [
        {
          id: number;
          year: number;
          color: string;
          name: string;
          pantone_value: string;
        }
      ]
    | [];
  isLoading: boolean;
  error: null | string;
  page: number;
  total: number;
}

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  page: 1,
  total: 0,
} as ProductsState;

const handlePending = (state: ProductsState) => {
  state.isLoading = true;
  state.items = [];
  state.error = null;
};

const handleRejected = (state: ProductsState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.items = [];
  state.error = action.payload;
};

const handleFulfilled = (state: ProductsState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = null;
  state.page = action.payload.page;
  state.total = action.payload.total;
  if (action.payload.data.length) {
    state.items = action.payload.data;
  } else {
    state.items = [action.payload.data];
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changePage(state, action) {
      state.page += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, handlePending)
      .addCase(fetchAllProducts.fulfilled, handleFulfilled)
      .addCase(fetchAllProducts.rejected, handleRejected)
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, handleFulfilled)
      .addCase(fetchProductById.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;

export const { changePage } = productsSlice.actions;
