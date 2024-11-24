import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../UserContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookingRecap from "./BookingRecap";
import styles from "../../../styles/PaymentPage.module.css";
import ChooseCardSection from "./ChooseCardSection";
import { getPaymentCard } from "../../../api/services";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [card, setCard] = useState([]);
  const { tourPackageId } = useParams();
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

  const data = location.state.dataTransfer;

  const dataTransfer = {
    data,
    selectedPayment,
  };

  const getSelectedPayment = (selected) => {
    setSelectedPayment(selected);
  };

  const handleClickToQR = () => {
    navigate(`/QR/${tourPackageId}`, { state: { dataTransfer } });
  };

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getPaymentCard(user.userId);
        setCard(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCard();
  }, [user.userId]);

  const predefinedPayments = [
    {
      method: "Visa",
      label: "Visa Debit Card",
      image: "/visa.png",
      lastDigits: "",
    },
    {
      method: "Mastercard",
      label: "Mastercard Office",
      image: "/mastercard.png",
      lastDigits: "",
    },
    {
      method: "Momo",
      label: "Momo Wallet",
      image: "/momo.png",
      lastDigits: "",
    },
    {
      method: "cash",
      label: "Cash Payment",
      image: "/cash.png",
      lastDigits: "",
    },
  ];

  const paymentOptions = predefinedPayments.map((payment, index) => {
    const cardData = card[index]; // Match card data to the predefined payment array
    return {
      ...payment, // Keep existing fields (label, image)
      lastDigits: cardData?.Last4Digits || "No Data", // Update lastDigits or fallback
    };
  });

  return (
    <MDBContainer
      fluid
      className={`p-5 ${styles.pageBackground}`}
      style={{
        minHeight: "100vh",
      }}
    >
      <MDBCard
        className={`${styles.cardWithShadow} rounded-5`}
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            {/* Payment Section */}
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <div className="py-4 d-flex flex-row align-items-center">
                <h5 className={styles.eligibility}>
                  <MDBIcon
                    fas
                    icon="check-circle"
                    className="pe-2 text-success"
                  />
                  <b>ELIGIBLE</b>
                </h5>
                <span className="ps-2 text-muted">| Pay</span>
              </div>
              <h4 className={`${styles.paymentAmount} text-success fw-bold`}>
                ${paymentInfo.total}
              </h4>

              {/* Choose Card Section */}
              <ChooseCardSection
                paymentOptions={paymentOptions}
                styles={styles}
                getSelectedPayment={getSelectedPayment}
              />

              <Button
                onClick={handleClickToQR}
                block
                size="lg"
                className="mt-4 fw-bold"
                style={{
                  backgroundColor: "#2575fc",
                  color: "white",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#1e63db";
                  e.currentTarget.style.boxShadow =
                    "0 6px 10px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#2575fc";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                Proceed to Payment
              </Button>
            </MDBCol>

            {/* Order Recap Section */}
            <BookingRecap paymentInfo={paymentInfo} />
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
