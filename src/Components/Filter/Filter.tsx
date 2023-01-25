import IconButton from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface FilterProps {
  filter: string;

  handleSubmit: Function;
}

export const Filter = ({ filter, handleSubmit }: FilterProps) => {
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
