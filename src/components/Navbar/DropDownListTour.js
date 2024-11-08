import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function DropdownListTour({ show }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div
            className="dropdown-menu"
            style={{ display: show === "Tour" ? "block" : "none" }}
        >
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                <li>
                    <a href="#">Culturals Tours</a>
                </li>
                <li>
                    <a href="#">Cruises</a>
                </li>
                <li>
                    <a href="#">Water activities</a>
                </li>
                <li>
                    <a href="#">Outdoor & sports activities</a>
                </li>
            </ul>
        </div>
    );
}

export default DropdownListTour;
