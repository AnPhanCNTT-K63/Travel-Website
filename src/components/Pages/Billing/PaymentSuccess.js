import React from "react";
import { Box, Typography, Button } from "@mui/material";

const PaymentSuccess = () => {
    return (
        <Box textAlign="center" sx={{ padding: 4 }}>
            <Typography variant="h4" color="success.main" gutterBottom>
                Payment Successful!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Thank you for your purchase. Your order is being processed.
            </Typography>
            <Button variant="contained" color="primary" href="/">
                Go to Homepage
            </Button>
        </Box>
    );
};

export default PaymentSuccess;
