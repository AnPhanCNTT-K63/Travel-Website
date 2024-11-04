import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";
import DropdownListHome from "./DropDownListHome";
import DropdownListTour from "./DropDownListTour";
import DropdownListBlog from "./dropblog";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  const handleMouseEnter = (item) => {
    setShowDropdown(item);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  return (
    <>
      <Header />
      <AppBar
        sx={{
          backgroundColor: "transparent",
          border: "0.8px",
        }}
        position="static"
      >
        <Toolbar>
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
                    borderRadius: "50px",
                    position: "relative",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "LightGray",
                    },
                  }}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
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
                    {showDropdown === "Home" && <DropdownListHome show={item} />}
                    {showDropdown === "Tour" && <DropdownListTour show={item} />}
                    {showDropdown === "Blog" && <DropdownListBlog show={item} />}
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
