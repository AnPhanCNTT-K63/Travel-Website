import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function DropdownListTour({ show }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl
            fullWidth
            sx={{
                display: show === "Tour" ? "block" : "none", // Hiển thị dựa vào prop `show`
                position: "absolute",
                backgroundColor: "240,240,240,0.8",
                color: "black",
                zIndex: 100,
            }}
        >
            <MenuItem value={10}>drop down của tour</MenuItem>
            <MenuItem value={20}>Giá trị 2</MenuItem>
            <MenuItem value={30}>Giá trị 3</MenuItem>
            <MenuItem value={20}>Giá trị 2</MenuItem>
            <MenuItem value={30}>Giá trị 3</MenuItem>
            <MenuItem value={20}>Giá trị 2</MenuItem>
            <MenuItem value={30}>Giá trị 3</MenuItem>
        </FormControl>
    );
}

export default DropdownListTour;
