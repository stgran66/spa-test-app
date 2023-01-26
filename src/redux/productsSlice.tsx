import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProducts } from './operations';

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

  state.total = action.payload.total;
  if (action.payload.data.length) {
    state.items = action.payload.data;
  } else {
    state.items = [action.payload.data];

    state.total = 1;
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, handlePending)
      .addCase(fetchAllProducts.fulfilled, handleFulfilled)
      .addCase(fetchAllProducts.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;
