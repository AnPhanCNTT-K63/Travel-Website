import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../../UserContext";
import TimerContext from "../../../../TimerContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookingRecap from "./BookingRecap";
import styles from "../../../../styles/PaymentPage.module.css";
import ChooseCardSection from "./ChooseCardSection";
import { getPaymentCard } from "../../../../api/services";
import Swal from "sweetalert2";
import CountdownSection from "./CountdownSection";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourPackageId } = useParams();
  const user = useContext(UserContext);
  const { setTimerExpired, getTimer, updateTimer } = useContext(TimerContext);

  const [card, setCard] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(
    location.state?.dataTransfer || {
      NumOfPeople: "",
      totalTemp: "",
      VATCost: "",
      total: "",
      totalDiscount: "",
      pricePerson: "",
    }
  );

  // Retrieve the timer for this booking
  const { timeRemaining, timerExpired } = getTimer(tourPackageId);

  // Timer logic: update timer every second
  useEffect(() => {
    if (timeRemaining > 0 && !timerExpired) {
      const timer = setInterval(() => {
        updateTimer(tourPackageId, timeRemaining - 1, false);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !timerExpired) {
      setTimerExpired(tourPackageId);
    }
  }, [
    timeRemaining,
    timerExpired,
    tourPackageId,
    updateTimer,
    setTimerExpired,
  ]);

  // Fetch payment card options
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getPaymentCard(user.userId);
        setCard(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCard();
  }, [user.userId]);

  const handleProceedToPayment = () => {
    if (timerExpired) {
      Swal.fire({
        title: "Payment Time Expired",
        text: "Your session has expired. Please restart the payment process.",
        icon: "error",
        confirmButtonText: "Restart Payment",
      }).then(() => {
        window.location.reload();
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Please review your payment details before proceeding.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2575fc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/QR/${tourPackageId}`, { state: { selectedPayment } });
      }
    });
  };

  const handleCancel = () => {
    navigate(`/user/booking/${user.userId}`);
  };

  return (
    <MDBContainer
      fluid
      className={`p-5 ${styles.pageBackground}`}
      style={{ minHeight: "100vh" }}
    >
      <MDBCard
        className={`${styles.cardWithShadow} rounded-5`}
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            <CountdownSection timeRemaining={timeRemaining} />
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <h4 className={`${styles.paymentAmount} text-success fw-bold`}>
                ${paymentInfo.total}
              </h4>
              <ChooseCardSection
                paymentOptions={card}
                styles={styles}
                getSelectedPayment={setSelectedPayment}
              />
              <Button
                onClick={handleProceedToPayment}
                className="mt-4 fw-bold"
                style={{
                  backgroundColor: "#2575fc",
                  color: "white",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Proceed to Payment
              </Button>
              <Button
                onClick={handleCancel}
                className="mt-4 fw-bold"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Cancel Payment
              </Button>
            </MDBCol>
            <BookingRecap paymentInfo={paymentInfo} />
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
