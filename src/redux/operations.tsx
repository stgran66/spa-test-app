import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://reqres.in/api/products';
export const PER_PAGE = 5;

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (
    queryParams: { page: string; id: string; per_page: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.get('/', {
        params: { ...queryParams },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
