import { styled } from '@mui/system';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiInputLabel-outlined': {
    color: '#FFFFFF', // White color for label
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B3BF90', // Light green color for border
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF', // White color for border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF', // White color for border when focused
    },
    '& .MuiSelect-select': {
      color: '#FFFFFF', // White color for text
    },
  },
  '& .MuiMenu-paper': {
    backgroundColor: '#364D3C', // Dark green background for dropdown
  },
  '& .MuiMenuItem-root': {
    color: '#FFFFFF', // White color for dropdown items
  },
}));

export { StyledFormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText };
