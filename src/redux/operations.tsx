import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://reqres.in/api/products';
export const PER_PAGE = 5;

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get('/', {
        params: { per_page: PER_PAGE, page },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get('/', {
        params: {
          id,
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
