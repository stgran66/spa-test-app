import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Filter } from './Filter/Filter';
import { ProductsTable } from './Table/Table';
import { Pagination } from './Pagination/Pagination';
import { fetchAllProducts } from '../redux/operations';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams({ filter: '' });
  const queryFilter = searchParams.get('filter');
  const queryPage = Number(searchParams.get('page'));

  const [showModal, setShowModal] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>(queryFilter!);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const error = useAppSelector((state) => state.products.error);
  const products = useAppSelector((state) => state.products.items);
  const page = useAppSelector((state) => state.products.page);
  const total = useAppSelector((state) => state.products.total);

  const PER_PAGE: number = 5;

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const form = evt.target as typeof evt.target & {
      filter: { value: string };
    };
    setFilter(form.filter.value);
  };

  const openModal = () => {
    setShowModal(true);
    document.querySelector('body')!.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.querySelector('body')!.style.overflow = 'visible';
  };

  useEffect(() => {
    setSearchParams({ filter: filter, page: String(page) });
  }, [filter, page, setSearchParams]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='App' style={{ textAlign: 'center' }}>
            <Filter filter={filter} handleSubmit={handleSubmit} />
            {products && (
              <ProductsTable
                onClose={closeModal}
                onOpen={openModal}
                showModal={showModal}
              />
            )}
            {products && <Pagination />}
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
