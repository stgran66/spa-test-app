import { useState } from 'react';
import { Product } from '../../App';
import { Modal } from '../Modal/Modal';

interface TableProps {
  items: Array<Product>;
  filter: string;
  onClose: Function;
  onOpen: Function;
  showModal: boolean;
}

export const Table = ({
  items,
  filter,
  showModal,
  onOpen,
  onClose,
}: TableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<undefined | Product>();

  const filteredItems = items.filter((item) =>
    item.id.toFixed().includes(filter)
  );

  return (
    <table style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Year</td>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item: Product) => {
          return (
            <tr
              key={item.id}
              style={{ backgroundColor: item.color }}
              onClick={() => {
                setSelectedProduct(item);
                onOpen();
              }}
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.year}</td>
            </tr>
          );
        })}
      </tbody>
      {showModal && <Modal onClose={onClose} item={selectedProduct} />}
    </table>
  );
};
