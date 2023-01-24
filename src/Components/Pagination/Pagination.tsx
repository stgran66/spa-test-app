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
  console.log(pages);
  return (
    <div>
      <button
        type={'button'}
        onClick={() => onDecrease()}
        disabled={page === 1}
      >
        Prev
      </button>
      <button
        type={'button'}
        onClick={() => onIncrease()}
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  );
};
