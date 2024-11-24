import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../UserContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import Ticket from "./Ticket";
import TotalPriceSection from "./TotalPriceSection";
import ContactInfo from "./ContactInfo";
import TravelerInfo from "./TravelerInfo";
import { getVAT, getVoucher, sendBookingInfo } from "../../../api/services";
import ChooseVoucherSection from "./ChooseVoucherSection";
import styles from "../../../styles/PaymentPage.module.css";

// Custom hook for fetching data
const useFetchData = (fetchFunction, dependency) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [dependency]);

  return { data, error };
};

export default function UserBookingPage() {
  const location = useLocation();
  const user = useContext(UserContext);
  const { tourPackageId } = useParams();
  const navigate = useNavigate();

  // States
  const [voucher, setVoucher] = useState(0);
  const [VAT, setVAT] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [ticket, setTicket] = useState(() => ({
    name: "",
    description: "",
    date: "",
    travelerNum: 0,
    isChangeSchedule: false,
    isRefund: false,
    price: 0,
    totalPrice: 0,
    image: "",
    ...(location.state?.ticket || {}),
  }));
  const [vouchers, setVouchers] = useState([]);

  // Fetching data using custom hook
  const { data: fetchedVouchers } = useFetchData(
    () => getVoucher(tourPackageId),
    tourPackageId
  );
  const { data: fetchedVAT } = useFetchData(
    () => getVAT(tourPackageId),
    tourPackageId
  );

  useEffect(() => {
    if (fetchedVouchers) setVouchers(fetchedVouchers);
    if (fetchedVAT) setVAT(fetchedVAT);
  }, [fetchedVouchers, fetchedVAT]);

  useEffect(() => {
    setPeopleInfo(
      Array.from({ length: ticket.travelerNum }).map(() => ({
        name: "",
        phone: "",
      }))
    );
  }, [ticket.travelerNum]);

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

  const totalTemp = ticket.totalPrice;
  const VATCost = (totalTemp * VAT) / 100;
  const total = totalTemp - voucher + VATCost;

  const dataTransfer = {
    Booking,
    total,
  };

  const handleOnclick = async () => {
    if (!contactInfo.Name || !contactInfo.Phone || !contactInfo.Email) {
      alert("Please fill in all contact information.");
      return;
    }
    if (peopleInfo.some((person) => !person.name || !person.phone)) {
      alert("Please fill in all traveler details.");
      return;
    }

    // try {
    //   const res = await sendBookingInfo(data);
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }

    navigate(`/payment/${tourPackageId}`, { state: { dataTransfer } });
  };

  return (
    <Box sx={{ p: 20, minHeight: "100vh" }}>
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
          <ContactInfo setContactInformation={setContactInfo} />

          {/* Traveler Info */}
          <TravelerInfo ticket={ticket} setPeopleInformation={setPeopleInfo} />
        </Grid>

        {/* Right Section: Ticket Info */}
        <Grid item xs={12} md={4}>
          <Ticket ticket={ticket} tourPackageId={tourPackageId} />
          <ChooseVoucherSection
            vouchers={vouchers}
            styles={styles}
            getSelectedVoucer={setVoucher}
          />
        </Grid>
      </Grid>

      {/* Price Section */}
      <TotalPriceSection
        ticket={ticket}
        total={total}
        discount={voucher}
        VAT={VAT}
        handleOnclick={handleOnclick}
        VATCost={VATCost}
      />
    </Box>
  );
}
