import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Product } from '../App';
import { Modal } from '../Modal/Modal';
import { useAppSelector } from '../../redux/hooks';

interface TableProps {
  onClose: Function;
  onOpen: Function;
  showModal: boolean;
}

export const ProductsTable = ({ showModal, onOpen, onClose }: TableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<undefined | Product>();
  const items = useAppSelector((state) => state.products.items);

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: 'flex',
        minHeight: 364,
        justifyContent: 'center',
        marginBottom: '40px',
        '& *': { fontFamily: 'roboto', fontSize: '20px', color: '#101010' },
      }}
    >
      <Table
        sx={{ maxWidth: 450, height: 'fit-content' }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow
            sx={{ backgroundColor: '#1976D2', '& th': { color: '#fff' } }}
          >
            <TableCell>Id</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: item.color,
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectedProduct(item);
                onOpen();
              }}
            >
              <TableCell component='th' scope='row'>
                {item.id}
              </TableCell>
              <TableCell align='right'>{item.name}</TableCell>
              <TableCell align='right'>{item.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showModal && <Modal onClose={onClose} item={selectedProduct} />}
    </TableContainer>
  );
};

// <table style={{ margin: 'auto' }}>
//   <thead>
//     <tr>
//       <td>Id</td>
//       <td>Name</td>
//       <td>Year</td>
//     </tr>
//   </thead>
//   <tbody>
//     {items.map((item: Product) => {
//       return (
//         <tr
//           key={item.id}
//           style={{ backgroundColor: item.color }}
//           onClick={() => {
//             setSelectedProduct(item);
//             onOpen();
//           }}
//         >
//           <td>{item.id}</td>
//           <td>{item.name}</td>
//           <td>{item.year}</td>
//         </tr>
//       );
//     })}
//   </tbody>
//   {showModal && <Modal onClose={onClose} item={selectedProduct} />}
// </table>
