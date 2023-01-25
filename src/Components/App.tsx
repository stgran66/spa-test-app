import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Filter } from './Filter/Filter';
import { ProductsTable } from './Table/Table';
import { Pagination } from './Pagination/Pagination';
import { getData } from '../services/api';

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

  const [products, setProducts] = useState<null | Array<Product>>(null);
  const [page, setPage] = useState<number>(queryPage ? queryPage : 1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<string>(queryFilter!);
  const [error, setError] = useState<string | null>(null);

  const PER_PAGE: number = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(filter, page, PER_PAGE);
        setError(null);

        setTotal(response.total);
        if (!response.data.length) {
          setProducts([response.data]);
          return;
        }
        setProducts(response.data);
      } catch (err: any) {
        setProducts(null);
        setError(err.message);
      }
    };
    fetchData();
  }, [page, total, PER_PAGE, filter]);

  const increasePage = () => {
    setPage(page + 1);
  };

  const decreasePage = () => {
    setPage(page - 1);
  };

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
                items={products}
                filter={filter}
                onClose={closeModal}
                onOpen={openModal}
                showModal={showModal}
              />
            )}
            {products && (
              <Pagination
                pages={Math.ceil(total / PER_PAGE)}
                page={page}
                onDecrease={decreasePage}
                onIncrease={increasePage}
              />
            )}
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
