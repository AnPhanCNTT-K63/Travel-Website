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
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import SearchAppBar from "./SearchBar";
import { signout } from "../../api/services";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const token = localStorage.getItem("token");

  const handleOnclick = async () => {
    try {
      const data = await signout();
      console.log(data);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", height: "70px" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Link to="/Home">
            <Image
              src="/logo_vvba.jpg"
              style={{ width: "50px", height: "50px" }}
              roundedCircle
            />
          </Link>

          {!isMobile && (
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                component="div"
                sx={{ marginLeft: "20px", marginTop: "10px" }}
              >
                <h4
                  style={{
                    fontWeight: "600",
                    color: "orange",
                    fontFamily: "Brush Script MT",
                  }}
                >
                  VVBA Travel Company
                </h4>
              </Typography>
              <SearchAppBar />
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton color="black">
            <PhoneIcon />
          </IconButton>
          {!isMobile && (
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
          )}
        </Box>
        <IconButton color="black">
          <RoomIcon />
        </IconButton>
        <IconButton color="black">
          <ShoppingCartIcon />
        </IconButton>
        {!token && (
          <div className="signin_signup">
            <Button
              variant="contained"
              color="primary"
              sx={{
                ml: "auto",
                borderRadius: "50px",
                backgroundColor: "whitesmoke",
              }}
            >
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "500",
                  fontFamily: "Verdana",
                }}
              >
                Sign in
              </Link>
            </Button>
            <Button
              variant="contained"
              color="orange"
              sx={{
                ml: "auto",
                borderRadius: "50px",
                backgroundColor: "orange",
              }}
            >
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "500",
                  fontFamily: "Verdana",
                }}
              >
                Sign up
              </Link>
            </Button>
          </div>
        )}

        {token && (
          <Button
            onClick={handleOnclick}
            variant="contained"
            color="orange"
            sx={{
              ml: "auto",
              borderRadius: "50px",
              backgroundColor: "orange",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "500",
                fontFamily: "Verdana",
              }}
            >
              Sign Out
            </Link>
          </Button>
        )}

        <h4>/</h4>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
