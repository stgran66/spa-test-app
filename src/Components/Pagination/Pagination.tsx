import IconButton from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changePage } from '../../redux/productsSlice';
import { PER_PAGE } from '../../redux/operations';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const page: number = useAppSelector((state) => state.products.page);
  const total = useAppSelector((state) => state.products.total);

  return (
    <div>
      <IconButton
        type={'button'}
        onClick={() => {
          dispatch(changePage(-1));
        }}
        disabled={page === 1}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        type={'button'}
        onClick={() => {
          dispatch(changePage(1));
        }}
        disabled={page === Math.ceil(total / PER_PAGE)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};
