import { Product } from '../../App';

interface TableProps {
  items: Array<Product>;
}

export const Table = ({ items }: TableProps) => {
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
        {items.map((item: Product) => {
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
