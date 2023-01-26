import IconButton from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PER_PAGE } from '../../redux/operations';
import { updatePage } from '../../redux/searchParamsSlice';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.searchParams.page);
  const total = useAppSelector((state) => state.products.total);

  return (
    <div>
      <IconButton
        type={'button'}
        onClick={() => {
          dispatch(updatePage(-1));
        }}
        disabled={Number(page) === 1}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        type={'button'}
        onClick={() => {
          dispatch(updatePage(1));
        }}
        disabled={Number(page) === Math.ceil(total / PER_PAGE)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};
