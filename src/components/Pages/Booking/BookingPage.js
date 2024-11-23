import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getBookingInfo } from "../../../api/services";
import PackageInfo from "./PackageInfo";
import BookingDetail from "./BookingDetail";

const BookingPage = () => {
  const { tourPackageId } = useParams();
  const [tourPackage, setTourPackage] = useState({});
  const [tourDates, setTourDates] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [date, setDate] = useState("");
  const [travelerNum, setTravelerNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const setTravelDay = (Date) => setDate(Date);
  const setTravlerNumber = (ravelerNum) => setTravelerNum(ravelerNum);
  const setTotal = (total) => setTotalPrice(total);

  const handleClickBook = () => {
    navigate(`/traveler/info/${tourPackageId}`, {
      state: { ticket, tourPackageId },
    });
  };

  useEffect(() => {
    const fetchingBooking = async () => {
      try {
        const res = await getBookingInfo(tourPackageId);
        setTourPackage(res.tourPackage || {});
        setTourDates(res.formatDate || []);
        setTotalQuantity(res.totalQuantity || 0);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    fetchingBooking();
  }, [tourPackageId]);

  const ticket = {
    name: tourPackage.Name,
    description: tourPackage.Description,
    date: date,
    travelerNum: travelerNum,
    isChangeSchedule: tourPackage.IsChangeSchedule,
    isRefund: tourPackage.IsRefund,
    price: tourPackage.Price,
    totalPrice: totalPrice,
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 4 }}
      >
        Booking Page
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Section 1: Tour Information */}
        <Grid item xs={10} md={3}>
          <PackageInfo tourPackage={tourPackage} />
        </Grid>

        {/* Section 2: Booking Details */}
        <Grid item xs={10} md={6}>
          <BookingDetail
            tourDates={tourDates} // Pass the tourDates state here
            tourPackage={tourPackage}
            totalQuantity={totalQuantity}
            setTravelDay={setTravelDay}
            handleClickBook={handleClickBook}
            setTravlerNumber={setTravlerNumber}
            setTotal={setTotal}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingPage;
