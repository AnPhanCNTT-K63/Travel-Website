import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-grid-system";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../../../styles/CreditCard.module.css";
import UserContext from "../../../UserContext";
import { getPaymentCardByUserId } from "../../../api/Services/PaymentServices";

const CreditCard = () => {
  const user = useContext(UserContext);
  const [state, setState] = React.useState({
    Last4Digits: "",
    Name: "",
    ExpirationDate: "",
    cvc: "***",
    focus: "",
  });

  function formatDate(dateString) {
    // Extract the timestamp from the input string
    const timestamp = parseInt(
      dateString.replace("/Date(", "").replace(")/", "")
    );

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Format the date as dd/yy
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year

    return `${day}/${year}`;
  }

  useEffect(() => {
    const fetchCard = async () => {
      if (!user?.userId) return;
      const res = await getPaymentCardByUserId(user.userId);
      setState(res);
    };
    fetchCard();
  });

  return (
    <Container>
      <Cards
        number={"4***********" + state.Last4Digits}
        expiry={formatDate(state.ExpirationDate)}
        cvc={"***"}
        name={state.FirstName + " " + state.LastName}
        focused={state.focus}
      />
    </Container>
  );
};

export default CreditCard;
