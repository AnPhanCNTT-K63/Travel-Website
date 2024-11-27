import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const FilterBox = () => {
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom="20px"
    >
      <Typography variant="h6" marginRight="10px">
        Filter Requests:
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Request Status</InputLabel>
        <Select
          value={filter}
          onChange={handleChange}
          label="Request Status"
          displayEmpty
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="processed">Request Processed</MenuItem>
          <MenuItem value="pending">Pending Request</MenuItem>
          <MenuItem value="accepted">Request Accepted</MenuItem>
          <MenuItem value="notAccepted">Request Not Accepted</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBox;
