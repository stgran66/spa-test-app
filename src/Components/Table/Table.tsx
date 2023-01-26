import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { openModal } from '../../redux/modalSlice';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.products.items);
  const showModal = useAppSelector((state) => state.modal.isOpen);

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
                dispatch(openModal(item));
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
      {showModal && <Modal />}
    </TableContainer>
  );
};
