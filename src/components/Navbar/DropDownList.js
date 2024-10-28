import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function DropdownList() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label">Chọn một giá trị</InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedValue}
        onChange={handleChange}
        label="Chọn một giá trị"
      >
        <MenuItem value={10}>Giá trị 1</MenuItem>
        <MenuItem value={20}>Giá trị 2</MenuItem>
        <MenuItem value={30}>Giá trị 3</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownList;
