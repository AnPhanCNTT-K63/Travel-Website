import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getUsers } from "../../../api/services";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: "20px", // Adds some space between tables
  },
  button: {
    margin: "5px",
  },
  onlineStatus: {
    color: "green",
  },
  offlineStatus: {
    color: "red",
  },
});

const UserManagementPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

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
  }, []);

  const handleBanUser = async (userId) => {
    // try {
    //   await axios.post(`/User/BanUser/${userId}`);
    //   alert("User banned successfully!");
    //   // Refresh user list
    //   const response = await axios.get("/User/ManageUsers");
    //   setUsers(response.data.users);
    // } catch (error) {
    //   console.error("Error banning user:", error);
    //   alert("Error banning user.");
    // }
  };

  const handleViewUser = (userId) => {
    window.location.href = `/profile`;
  };

  // Separate users into Admins and Regular Users
  const adminUsers = users.filter((user) => user.Role === "admin");
  const regularUsers = users.filter((user) => user.Role === "user");

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Regular Users
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="regular user management table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regularUsers.map((user) => (
              <TableRow key={user.Id}>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>
                  {user.IsOnline ? (
                    <span className={classes.onlineStatus}>Online</span>
                  ) : (
                    <span className={classes.offlineStatus}>Offline</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleViewUser(user.Id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => handleBanUser(user.Id)}
                  >
                    Ban
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom>
        Manage Admin Users
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="admin user management table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminUsers.map((user) => (
              <TableRow key={user.Id}>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>
                  {user.IsOnline ? (
                    <span className={classes.onlineStatus}>Online</span>
                  ) : (
                    <span className={classes.offlineStatus}>Offline</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleViewUser(user.Id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => handleBanUser(user.Id)}
                  >
                    Ban
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserManagementPage;
