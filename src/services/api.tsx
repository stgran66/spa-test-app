import axios from 'axios';

export const getData = async (page: number, per_page: number) => {
  const response = await axios.get('https://reqres.in/api/products', {
    params: { page, per_page },
  });
  return response.data;
};
