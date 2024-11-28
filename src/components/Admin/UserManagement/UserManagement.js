import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getUsers, restoreAccount } from "../../../api/services";
import { Visibility, Block, AccountCircle } from "@mui/icons-material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: "20px",
    "& thead th": {
      backgroundColor: "#e0e0e0",
      fontWeight: "bold",
      fontSize: "16px",
    },
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
    "& tbody tr:hover": {
      backgroundColor: "#f1f8ff",
    },
  },
  button: {
    margin: "0 5px",
  },
  onlineStatus: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  offlineStatus: {
    color: "#f44336",
    fontWeight: "bold",
  },
  sectionHeader: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: "10px 15px",
    fontWeight: "bold",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  sectionHeaderUser: {
    backgroundColor: "#f57c00",
    color: "#ffffff",
    padding: "10px 15px",
    fontWeight: "bold",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  avatar: {
    marginRight: "10px",
  },
  actionsCell: {
    display: "flex",
    alignItems: "center",
  },
});

const UserManagementPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    const intervalId = setInterval(fetchUsers, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleViewUser = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleBanUser = (userId) => {
    console.log(`Banned user ID: ${userId}`);
  };

  const restoreUserAccount = async (userId) => {
    const confirmRestore = await Swal.fire({
      title: "Are you sure?",
      text: "This will restore the user account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    });

    if (confirmRestore.isConfirmed) {
      try {
        const res = await restoreAccount(userId);
        if (res.message === "User restored successfully") {
          Swal.fire(
            "Restored!",
            "The user account has been restored.",
            "success"
          );
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.Id === userId ? { ...user, IsDeleted: false } : user
            )
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to restore user account.", "error");
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const renderUsers = (users) =>
    users.map((user) => (
      <TableRow key={user.Id}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            {user.Username}
          </Box>
        </TableCell>
        <TableCell>{user.Email}</TableCell>
        <TableCell>
          {user.IsOnline ? (
            <span className={classes.onlineStatus}>Online</span>
          ) : (
            <span className={classes.offlineStatus}>Offline</span>
          )}
        </TableCell>
        <TableCell className={classes.actionsCell}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleViewUser(user.Id)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleBanUser(user.Id)}
          >
            <Block />
          </IconButton>
        </TableCell>
        <TableCell>
          {user.IsDeleted && (
            <Typography color="red">
              Soft Deleted{" "}
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => restoreUserAccount(user.Id)}
              >
                Restore
              </Button>
            </Typography>
          )}
        </TableCell>
      </TableRow>
    ));

  return (
    <Box marginRight={"-110px"}>
      <Typography variant="h4" gutterBottom align="center">
        User Management
      </Typography>
      <TableContainer component={Paper} elevation={5}>
        <Box className={classes.sectionHeader}>Admins</Box>
        <Table className={classes.table} aria-label="admin user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Online Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsers(users.filter((user) => user.Role === "admin"))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer
        component={Paper}
        elevation={5}
        sx={{ marginTop: "20px" }}
      >
        <Box className={classes.sectionHeaderUser}>Users</Box>
        <Table className={classes.table} aria-label="regular user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Online Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsers(users.filter((user) => user.Role === "user"))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagementPage;
