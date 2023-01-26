import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '@mui/material/Backdrop';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { closeModal } from '../../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.modal.selectedProduct);

  useEffect(() => {
    const closeOnEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        dispatch(closeModal());
      }
    };
    document.body.addEventListener('keydown', closeOnEsc);
    return () => {
      document.body.removeEventListener('keydown', closeOnEsc);
    };
  }, [dispatch]);

  return ReactDOM.createPortal(
    <Backdrop
      sx={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      open={true}
      onClick={() => dispatch(closeModal())}
    >
      <Table
        sx={{ maxWidth: 450, height: 'fit-content' }}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <TableHead>
          <TableRow
            sx={{ backgroundColor: '#1976D2', '& th': { color: '#fff' } }}
          >
            {Object.keys(item!).map((key) => (
              <TableCell key={key} align='left'>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ backgroundColor: item!.color }}>
            {Object.values(item!).map((value) => (
              <TableCell key={value} align='left'>
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Backdrop>,
    document.getElementById('root')!
  );
};
