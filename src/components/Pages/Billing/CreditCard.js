import React from "react";
import { Container } from "react-grid-system";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../../../styles/CreditCard.module.css";

const CreditCard = () => {
  const [state, setState] = React.useState({
    number: "42652354521235465",
    name: "jonh quýt",
    expiry: "15/5",
    cvc: "***",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <Container>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
    </Container>
  );
};

export default CreditCard;
