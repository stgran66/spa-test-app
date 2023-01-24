import { Product } from '../../App';

interface TableProps {
  items: Array<Product>;
  filter: string;
}

export const Table = ({ items, filter }: TableProps) => {
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
            <tr key={item.id} style={{ backgroundColor: item.color }}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.year}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
