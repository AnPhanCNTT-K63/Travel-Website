import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";
import DropdownList from "./DropDownList";

const Navbar = () => {
  return (
    <>
      <Header />
      <AppBar
        sx={{
          backgroundColor: "transparent",
          border: "0.8px"
        }}
        position="static"
      >
        <Toolbar>
          <Box>
            <DropdownList />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
            }}
          >
            {["Home", "Tour", "Blog", "Gallery", "About Us", "Sponsor"].map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    mx: 2,
                    px: 2,
                    py: 1,

                    borderRadius: '50px',
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "LightGray",
                      fontFamily:'Verdana',
                      borderRadius: '50px',
                      alignItems: "center",

                    },
                  }}
                >
                  <Typography variant="h6">
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        transition: "color 0.3s",
                        fontWeight: "500",
                      }}
                    >
                      {item}
                    </Link>
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
