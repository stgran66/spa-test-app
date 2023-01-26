import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import { Filter } from './Filter/Filter';
import { ProductsTable } from './Table/Table';
import { Pagination } from './Pagination/Pagination';
import { fetchAllProducts } from '../redux/operations';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateSearchParams } from '../redux/searchParamsSlice';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const error = useAppSelector((state) => state.products.error);
  const products = useAppSelector((state) => state.products.items);
  const page = useAppSelector((state) => state.searchParams.page);
  const per_page = useAppSelector((state) => state.searchParams.per_page);
  const filter = useAppSelector((state) => state.searchParams.filter);

  useEffect(() => {
    dispatch(
      fetchAllProducts({ page: String(page), id: filter, per_page: per_page })
    );
  }, [dispatch, page, filter, per_page]);

  useEffect(() => {
    const newSearchParams: { [key: string]: string } = {};

    Object.entries(searchParams).forEach(([key, value]) => {
      newSearchParams[key] = value;
    });

    dispatch(updateSearchParams(newSearchParams as { [key: string]: string }));
  }, [searchParams, dispatch]);

  useEffect(() => {
    setSearchParams({ filter: filter, page: page, per_page });
  }, [page, filter, per_page, setSearchParams]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='App' style={{ textAlign: 'center' }}>
            <Filter />
            {isLoading && (
              <Skeleton
                variant='rectangular'
                width={450}
                height={365}
                sx={{ margin: 'auto' }}
              />
            )}
            {products.length >= 1 && <ProductsTable />}
            {products.length >= 1 && <Pagination />}
            {error && (
              <Alert
                severity='error'
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
          </div>
        }
      />
      <Route
        path='*'
        element={
          <div style={{ textAlign: 'center' }}>
            <h1>404 Not found</h1>
            <h2>Please check if url is correct</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
