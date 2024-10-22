import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";

const Navbar = () => {
  return (
    <>
      <Header />
      <AppBar
        sx={{
          backgroundColor: "transparent",
        }}
        position="static"
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
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
                    borderRadius: 1,
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#1e90ff",
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
                        fontWeight: "900",
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
