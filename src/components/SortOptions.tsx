import React from 'react';
import { Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';

interface SortOptionsProps {
  onSortChange: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value);
  };

  return (
    <div>
      <InputLabel htmlFor="sort">Сортировка</InputLabel>
      <Select
        label="Sort by"
        defaultValue="none"
        onChange={handleChange}
        id="sort"
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="year">Year</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>
    </div>
  );
}

export default SortOptions;
