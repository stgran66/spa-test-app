import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../components/App';

export interface ModalState {
  isOpen: boolean;
  selectedProduct: undefined | Product;
}
const ModalInitialState = {
  isOpen: false,
  selectedProduct: undefined,
} as ModalState;

const modalSlice = createSlice({
  name: 'modal',
  initialState: ModalInitialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.selectedProduct = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedProduct = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
