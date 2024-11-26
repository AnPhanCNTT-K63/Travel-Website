import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Grid } from "@mui/material";

const ShippingAddress = ({ onSubmit }) => {
    const [address, setAddress] = useState({
        fullName: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra các trường dữ liệu
        const missingFields = Object.entries(address).filter(([key, value]) => !value);
        if (missingFields.length > 0) {
            alert(`Please fill in all fields: ${missingFields.map(([key]) => key).join(", ")}`);
            return;
        }

        // Gửi dữ liệu ra ngoài (callback từ props)
        onSubmit(address);
    };

    return (
        <Box sx={{ minWidth: '50%', padding: 2, maxWidth: '50%' }}>
            <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    ____
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={address.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Street Address"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                name="postalCode"
                                value={address.postalCode}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={address.country}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit Address
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default ShippingAddress;
