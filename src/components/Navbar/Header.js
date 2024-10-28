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
import SearchAppBar from "./SearchBar";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "white", height:"70px"}}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Link to="/Home">
            <Image 
              src="/logo_vvba.jpg"
              style={{ width: "50px", height: "50px" }}
              roundedCircle
            />
          </Link>
          <Typography variant="h6" component="div" sx={{ marginLeft: "20px", marginTop:"10px" }}>
            <h4 style={{ fontWeight: "600", color:"orange", fontFamily:"Brush Script MT" }}>VVBA Travel Company</h4>
          </Typography>
          
          <SearchAppBar />
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton color="black">
            <PhoneIcon />
          </IconButton>
          <Typography
            variant="body1"
            component="a"
            href="tel:+84912345678"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "500",
            }}
          >
            0343-811-543
          </Typography>
        </Box>
        <IconButton color="black">
          <RoomIcon />
        </IconButton>
        <IconButton color="black">
          <ShoppingCartIcon />
        </IconButton>
        <Button variant="contained" color="primary" sx={{ ml: "auto", borderRadius: '50px',backgroundColor:"whitesmoke"}}>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "500",
              fontFamily:"Verdana" ,

            }}
          >
            Sign in
          </Link>
        </Button>
        <h4>/</h4>
        <Button variant="contained" color="orange" sx={{ ml: "auto", borderRadius: '50px',backgroundColor: 'orange'}}>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "500",
              fontFamily:"Verdana" ,

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
