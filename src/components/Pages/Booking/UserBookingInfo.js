import React, { useState, useContext } from "react";
import UserContext from "../../../UserContext";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import Ticket from "./Ticket";
import TotalPriceSection from "./TotalPriceSection";
import ContactInfo from "./ContactInfo";
import TravelerInfo from "./TravelerInfo";
import { sendBookingInfo } from "../../../api/services";

export default function UserBookingPage() {
  const location = useLocation();
  const user = useContext(UserContext);
  const { tourPackageId } = useParams();

  const [contactInfo, setContactInfo] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });

  const setContactInformation = (info) => setContactInfo(info);
  const setPeopleInformation = (info) => setPeopleInfo(info);

  const [ticket, setTicket] = useState(
    location.state?.ticket || {
      name: "",
      description: "",
      date: "",
      travelerNum: "",
      isChangeSchedule: "",
      isRefund: "",
      price: "",
      totalPrice: "",
    }
  );

  const [peopleInfo, setPeopleInfo] = useState(() =>
    Array.from({ length: ticket.travelerNum }).map(() => ({
      name: "",
      phone: "",
    }))
  );

  const Booking = {
    TourPackageId: tourPackageId,
    BookingDate: ticket.date,
    Status: "pending",
    NumOfPeople: ticket.travelerNum,
  };

  const Contact = {
    Name: contactInfo.Name,
    Phone: contactInfo.Phone,
    Email: contactInfo.Email,
  };

  const Traveler = peopleInfo.map((person) => ({
    Name: person.name,
    Phone: person.phone,
  }));

  const data = {
    User_Id: user.userId,
    Booking: Booking,
    Contact: Contact,
    Traveler: Traveler,
  };

  const handleOnclick = async () => {
    try {
      const res = await sendBookingInfo(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        p: 20,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#0d47a1",
          mb: 4,
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        Booking Details
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section: User Info */}
        <Grid item xs={12} md={8}>
          <ContactInfo setContactInformation={setContactInformation} />

          {/* Traveler Info */}
          <TravelerInfo
            ticket={ticket}
            setPeopleInformation={setPeopleInformation}
          />
        </Grid>

        {/* Right Section: Ticket Info */}
        <Grid item xs={12} md={4}>
          <Ticket ticket={ticket} />
        </Grid>
      </Grid>

      {/* Price Section */}
      <TotalPriceSection ticket={ticket} handleOnclick={handleOnclick} />
    </Box>
  );
}
