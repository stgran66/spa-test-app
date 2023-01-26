import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './productsSlice';
import { searchParamsReducer } from './searchParamsSlice';
import { modalReducer } from './modalSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    searchParams: searchParamsReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
