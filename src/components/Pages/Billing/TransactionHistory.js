import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';


const OrderSummary = ({ order }) => {
    // Tính toán tổng số tiền, thuế, tổng giá trị đơn hàng
    const subtotal = order.products.reduce(
        (acc, product) => acc + product.unitPrice * product.quantity,
        0
    );
    const taxes = subtotal * 0.05; // Giả sử thuế là 5%
    const total = subtotal + taxes;

    return (
        <Box sx={{ width: '80%', padding: 2 }}>
            <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Transaction History
                </Typography>

                {/* Lặp qua danh sách sản phẩm để hiển thị thông tin */}
                <Grid container spacing={2}>
                    {order.products.map((product, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={3}>
                                <Typography variant="body1" color="textSecondary">
                                </Typography>
                                <img src={product.image} alt="product" style={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1" color="textSecondary">
                                    Tour Name:
                                </Typography>
                                <Typography variant="body1">{product.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1" color="textSecondary">
                                    Tour Fee:
                                </Typography>
                                <Typography variant="body1">
                                    ${product.unitPrice.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1" color="textSecondary">
                                    Purchase Date:
                                </Typography>
                                <Typography variant="body1">{product.PurchaseDate}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1" color="textSecondary">
                                    Total Fee:
                                </Typography>
                                <Typography variant="body1">
                                    ${(product.unitPrice * product.quantity).toFixed(2)}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>

                {/* Hiển thị tổng cộng */}
                <Box sx={{ marginTop: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                Subtotal:
                            </Typography>
                            <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                Taxes (5%):
                            </Typography>
                            <Typography variant="body1">${taxes.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                Total:
                            </Typography>
                            <Typography variant="h6">${total.toFixed(2)}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>

    );
};

export default OrderSummary;
