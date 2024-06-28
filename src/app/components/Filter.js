import React from 'react';
import { StyledFormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '../styles/useStyles';

const Filter = ({ label, options, onChange, selectedValues }) => {
  return (
    <StyledFormControl variant="outlined" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        multiple
        value={selectedValues || []}
        onChange={(e) => onChange(label, e.target.value)}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((value, index) => (
          <MenuItem key={index} value={value}>
            <Checkbox checked={selectedValues?.indexOf(value) > -1} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default Filter;
