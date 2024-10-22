import * as React from "react";
import Button from "@mui/material/Button";

export default function TipSection() {
  return (
    <div
      style={{ position: "relative", textAlign: "center", marginTop: "50px" }}
    >
      <img
        src="/travelTrip.jpg"
        style={{ objectFit: "cover", height: "500px", width: "100%" }}
      />
      <h2
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          margin: 0,
        }}
      >
        TRAVEL TIPS
        <h2>
          Northern Ireland’s is now contingent. Britain is getting a divorce
          Northern Ireland is being offered a trial separation for Britain there
          is a one
        </h2>
        <Button
          variant="contained"
          style={{ fontSize: "20px", padding: "10px 20px", marginTop: "20px" }}
        >
          GET Inspired
        </Button>
      </h2>
    </div>
  );
}
