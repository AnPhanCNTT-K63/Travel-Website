import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../../../UserContext";
import { useLocation } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

import { createTourAndPackages } from "../../../../../api/Services/TourAndPackageServices";
import CreatePackage from "./CreatePackage";

const CreateTourPackage = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const user_id = user.userId;
  const [tour, setTour] = useState(
    location.state?.tour || {
      Name: "",
      Region: "",
      Country: "",
      City: "",
      Image: "",
      Opening: "",
      Ending: "",
    }
  );

  const [tourPackages, setTourPackage] = useState([
    {
      name: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      activities: [""],
      VAT: "",
      isChangeSchedule: false,
      isRefund: false,
    },
  ]);

  const getPackage = React.useCallback((data) => {
    setTourPackage(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { tour, tourPackages, user_id };
    console.log("Submitting:", data);
    // const message = await createTourAndPackages(data);
    // console.log(message);
  };

  console.log(tour);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create TourPackages
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Tours Section */}
        <CreatePackage getPackage={getPackage} />

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTourPackage;
