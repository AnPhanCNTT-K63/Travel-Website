import React from "react";
import { Box, Typography, Button } from "@mui/material";

const PaymentError = ({ onRetry }) => {
    return (
        <Box textAlign="center" sx={{ padding: 4 }}>
            <Typography variant="h4" color="error.main" gutterBottom>
                Payment Failed
            </Typography>
            <Typography variant="body1" gutterBottom>
                Something went wrong. Please try again.
            </Typography>
            <Button variant="contained" color="secondary" onClick={onRetry}>
                Retry Payment
            </Button>
        </Box>
    );
};

export default PaymentError;
