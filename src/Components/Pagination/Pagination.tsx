import IconButton from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationProps {
  onDecrease: Function;
  onIncrease: Function;
  page: number;
  pages: number;
}

export const Pagination = ({
  onDecrease,
  onIncrease,
  page,
  pages,
}: PaginationProps) => {
  return (
    <div>
      <IconButton
        type={'button'}
        onClick={() => onDecrease()}
        disabled={page === 1}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        type={'button'}
        onClick={() => onIncrease()}
        disabled={page === pages}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};
