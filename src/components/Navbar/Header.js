import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomIcon from "@mui/icons-material/Room";
import Image from "react-bootstrap/Image";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Image
            src="/logo.jpg"
            style={{ width: "100px", height: "100px" }}
            roundedCircle
          />
          <Typography variant="h6" component="div" sx={{ marginLeft: "20px" }}>
            <h4 style={{ fontWeight: "900" }}>VVBA Travel Company</h4>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton color="inherit">
            <PhoneIcon />
          </IconButton>
          <Typography
            variant="body1"
            component="a"
            href="tel:+84912345678"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "900",
            }}
          >
            0343-811-543
          </Typography>
        </Box>
        <IconButton color="inherit">
          <RoomIcon />
        </IconButton>
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <Button variant="contained" color="primary" sx={{ ml: "auto" }}>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "900",
            }}
          >
            Sign in
          </Link>
        </Button>
        <h4>/</h4>
        <Button variant="contained" color="primary" sx={{ ml: "auto" }}>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "900",
            }}
          >
            Sign up
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
