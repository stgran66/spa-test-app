import IconButton from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../redux/hooks';
import { updateSearchFilter } from '../../redux/searchParamsSlice';

export const Filter = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const form = evt.target as typeof evt.target & {
      filter: { value: string };
    };

    dispatch(updateSearchFilter(form.filter.value));
  };

  return (
    <div>
      <p style={{ fontFamily: 'roboto', fontSize: '20px' }}>Search by Id</p>

      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete='off'
        onSubmit={(evt) => handleSubmit(evt)}
      >
        <TextField size='small' label='Type id' type={'number'} name='filter' />
        <IconButton size='large' aria-label='search' type='submit'>
          <SearchIcon />
        </IconButton>
      </Box>
    </div>
  );
};
