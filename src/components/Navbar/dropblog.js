import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function DropdownListBlog({ show }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <FormControl
                fullWidth
                sx={{
                    display: show === "Blog" ? "block" : "none", // Hiển thị dựa vào prop `show`
                    position: "absolute",
                    backgroundColor: "240,240,240,0.8",
                    color: "black",
                    zIndex: 100,
                }}
            >
                <MenuItem value={10}>sdsds</MenuItem>
                <MenuItem value={20}>Giá trị 2</MenuItem>
                <MenuItem value={30}>Giá trị 3</MenuItem>
            </FormControl>
        </div>
    );
}

export default DropdownListBlog;
