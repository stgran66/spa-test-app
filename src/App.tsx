import { useEffect, useState } from 'react';
import { Filter } from './Components/Filter/Filter';
import { Table } from './Components/Table/Table';
import { Pagination } from './Components/Pagination/Pagination';
import { getData } from './services/api';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

function App() {
  const [products, setProducts] = useState<null | Array<Product>>(null);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(page, perPage);

      setTotal(response.total);
      setProducts(response.data);
    };
    fetchData();
  }, [page, total]);

  const increasePage = () => {
    setPage(page + 1);
  };

  const decreasePage = () => {
    setPage(page - 1);
  };

  return (
    <div className='App' style={{ textAlign: 'center' }}>
      <Filter />
      {products && <Table items={products} />}
      {products && (
        <Pagination
          pages={Math.ceil(total / perPage)}
          page={page}
          onDecrease={decreasePage}
          onIncrease={increasePage}
        />
      )}
    </div>
  );
}

export default App;
