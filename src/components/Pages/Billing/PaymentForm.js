import React, { useState } from "react";
import styles from '../../../styles/PaymentForm.module.css';
import { Box, Typography, Paper, Grid } from '@mui/material';

const PaymentForm = ({ onSubmit }) => {
    const [paymentData, setPaymentData] = useState({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
            alert("Please fill in all fields");
            return;
        }
        onSubmit(paymentData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.paymentForm} >
            <h2 className={styles.title}>Payment Information</h2>
            <div className={styles.inputGroup}>
                <label htmlFor="cardName" className={styles.label}>Cardholder Name</label>
                <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="cardNumber" className={styles.label}>Card Number</label>
                <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="expiryDate" className={styles.label}>Expiry Date</label>
                <input
                    type="month"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="cvv" className={styles.label}>CVV</label>
                <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <button type="submit" className={styles.button}>Submit Payment</button>
        </form>
    );
};

export default PaymentForm;
