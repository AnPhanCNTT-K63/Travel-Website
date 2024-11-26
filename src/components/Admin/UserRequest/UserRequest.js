import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material"; // Adding icons for better UX
import styles from "../../../styles/UserRequest.module.css";

const UserRequest = () => {
  // Updated mock data with required columns
  const mockPaymentRequests = [
    {
      userId: "U001",
      userName: "John Doe",
      bookingDate: "2024-11-25",
      bookingId: "B123",
      tourPackageId: "T001",
      tourPackageName: "Disneyland - Full Experience",
      totalPrice: 250.0,
      paymentMethod: "Credit Card",
    },
    {
      userId: "U002",
      userName: "Jane Smith",
      bookingDate: "2024-11-20",
      bookingId: "B124",
      tourPackageId: "T002",
      tourPackageName: "Universal Studios - VIP Tour",
      totalPrice: 350.0,
      paymentMethod: "PayPal",
    },
    {
      userId: "U003",
      userName: "Alice Johnson",
      bookingDate: "2024-11-15",
      bookingId: "B125",
      tourPackageId: "T003",
      tourPackageName: "Eiffel Tower - Guided Tour",
      totalPrice: 150.0,
      paymentMethod: "Bank Transfer",
    },
  ];

  const [paymentRequests, setPaymentRequests] = useState(mockPaymentRequests);

  // Handle Accept Action
  const handleAccept = (id) => {
    setPaymentRequests(
      paymentRequests.map((request) =>
        request.bookingId === id ? { ...request, status: "Accepted" } : request
      )
    );
    alert("Payment accepted!");
  };

  // Handle Decline Action
  const handleDecline = (id) => {
    setPaymentRequests(
      paymentRequests.map((request) =>
        request.bookingId === id ? { ...request, status: "Declined" } : request
      )
    );
    alert("Payment declined!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage User Payment Requests</h1>
      {paymentRequests.length === 0 ? (
        <p className={styles.noRequests}>No payment requests available.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Booking ID</TableCell>
                <TableCell>Tour Package Id</TableCell>
                <TableCell>Tour Package Name</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.userId}</TableCell>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.bookingDate}</TableCell>
                  <TableCell>{request.bookingId}</TableCell>
                  <TableCell>{request.tourPackageId}</TableCell>
                  <TableCell>{request.tourPackageName}</TableCell>
                  <TableCell>${request.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{request.paymentMethod}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-between">
                      <Button
                        variant="contained"
                        color="success"
                        className={styles.acceptButton}
                        onClick={() => handleAccept(request.bookingId)}
                        startIcon={<CheckCircle />}
                        style={{ marginRight: "10px" }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        className={styles.declineButton}
                        onClick={() => handleDecline(request.bookingId)}
                        startIcon={<Cancel />}
                      >
                        Decline
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserRequest;
