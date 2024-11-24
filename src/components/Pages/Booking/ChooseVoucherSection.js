import React, { useState, useEffect } from "react";
import { MDBIcon, MDBInput } from "mdb-react-ui-kit";

export default function ChooseVoucherSection({
  vouchers,
  styles,
  getSelectedVoucer,
}) {
  const [voucherCode, setVoucherCode] = useState(""); // Current voucher code
  const [selectedVoucher, setSelectedVoucher] = useState(null); // Selected voucher object
  const [selectedDiscount, setSelectedDiscount] = useState(0); // Selected discount

  // Notify parent of the selected discount when it changes
  useEffect(() => {
    getSelectedVoucer(selectedDiscount);
  }, [selectedDiscount, getSelectedVoucer]);

  // Handle selection of a voucher
  const handleVoucherClick = (voucher) => {
    setVoucherCode(voucher.Code);
    setSelectedVoucher(voucher.Code);
    setSelectedDiscount(voucher.Discount);
  };

  // Styling variables for better reuse
  const voucherStyles = {
    container: {
      cursor: "pointer",
      padding: "12px",
      borderRadius: "12px",
      transition: "background-color 0.3s, box-shadow 0.3s",
    },
    selected: {
      backgroundColor: "#d1e7ff",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    default: {
      backgroundColor: "#f1f4f6",
    },
  };

  return (
    <>
      <h5 className={`${styles.sectionTitle} pt-5 text-primary`}>
        Choose a Voucher
      </h5>
      <div className="pt-3">
        {vouchers.map((voucher) => (
          <div
            key={voucher.Code}
            role="button"
            aria-pressed={selectedVoucher === voucher.Code}
            className="d-flex align-items-center mb-3 shadow-sm"
            onClick={() => handleVoucherClick(voucher)}
            style={{
              ...voucherStyles.container,
              ...(selectedVoucher === voucher.Code
                ? voucherStyles.selected
                : voucherStyles.default),
            }}
          >
            <MDBIcon
              fas
              icon="ticket-alt"
              size="lg"
              className="text-warning pe-2"
            />
            <p className="mb-0">
              {voucher.Title} - Code: <b>{voucher.Code}</b>
            </p>
            <div className="ms-auto text-success fw-bold">
              -${voucher.Discount}
            </div>
          </div>
        ))}
        <MDBInput
          label="Enter Voucher Code"
          placeholder="Enter your voucher code here"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="mt-3"
          style={{
            borderRadius: "10px",
            border: "1px solid #ced4da",
            padding: "10px",
          }}
        />
      </div>
    </>
  );
}
