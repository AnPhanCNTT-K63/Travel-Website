import React, { useState } from "react";
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

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourPackageId } = useParams();
  const [paymentInfo, setPaymentInfo] = useState(
    location.state?.dataTransfer || {
      Total: "",
    }
  );
  // const [voucherCode, setVoucherCode] = useState(""); // State to manage voucher code
  // const [selectedPayment, setSelectedPayment] = useState(null); // State to manage selected payment method
  // const [selectedVoucher, setSelectedVoucher] = useState(null); // State to manage selected voucher

  // const handleVoucherClick = (voucher) => {
  //   setVoucherCode(voucher.code); // Set the voucher code in the state
  //   setSelectedVoucher(voucher.code); // Set the selected voucher
  // };

  const handleClickToQR = () => {
    navigate(`/QR/${tourPackageId}`);
  };

  const paymentOptions = [
    {
      method: "visa",
      label: "Visa Debit Card",
      image: "/visa.png",
      lastDigits: "3456",
    },
    {
      method: "mastercard",
      label: "Mastercard Office",
      image: "/mastercard.png",
      lastDigits: "1038",
    },
    {
      method: "momo",
      label: "Momo Wallet",
      image: "/momo.png",
      lastDigits: "user@email.com",
    },
    {
      method: "cash",
      label: "Cash Payment",
      image: "/cash.png",
      lastDigits: "",
    },
  ];

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
            <BookingRecap />
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
