import { createSlice } from '@reduxjs/toolkit';

export interface SearchParamsState {
  filter: string;
  page: string;
  per_page: string;
}

const urlSearchParams = Object.fromEntries(
  new URLSearchParams(window.location.search)
);

const searchParamsInitialState = {
  filter: urlSearchParams.filter ? urlSearchParams.filter : '',
  page: urlSearchParams.page ? urlSearchParams.page : '1',
  per_page: urlSearchParams.per_page ? urlSearchParams.per_page : '5',
} as SearchParamsState;

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState: searchParamsInitialState,
  reducers: {
    updateSearchParams: (state, action) => {
      state = action.payload;
    },
    updateSearchFilter: (state, action) => {
      state.filter = action.payload;
      state.page = '1';
    },
    updatePage: (state, action) => {
      state.page = String(Number(state.page) + Number(action.payload));
    },
  },
});

export const { updateSearchParams, updateSearchFilter, updatePage } =
  searchParamsSlice.actions;
export const searchParamsReducer = searchParamsSlice.reducer;
