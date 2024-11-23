import React, { useState } from "react";
import {
  TextField,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Person } from "@mui/icons-material";

export default function TravelerInfo({ ticket, setPeopleInformation }) {
  const [peopleInfo, setPeopleInfo] = useState(() =>
    Array.from({ length: ticket.travelerNum }).map(() => ({
      name: "",
      phone: "",
    }))
  );

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPeopleInfo = [...peopleInfo];
    updatedPeopleInfo[index][name] = value;
    setPeopleInfo(updatedPeopleInfo);
  };

  setPeopleInformation(peopleInfo);

  return (
    <Card sx={{ mb: 4, boxShadow: 4, border: "1px solid #bbdefb" }}>
      <CardHeader
        title="Traveler Information (optional)"
        avatar={<Person sx={{ color: "#1e88e5" }} />}
        sx={{ background: "#e3f2fd" }}
      />
      <Divider sx={{ backgroundColor: "#90caf9" }} />
      <CardContent>
        <Grid container spacing={2}>
          {Array.from({ length: ticket.travelerNum }).map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  p: 2,
                  boxShadow: 3,
                  border: "1px solid #e3f2fd",
                  backgroundColor: "#ffffff",
                }}
              >
                <CardHeader
                  title={`Person ${index + 1}`}
                  sx={{ background: "#f3f4f6" }}
                />
                <CardContent>
                  <TextField
                    label="Full Name"
                    value={peopleInfo[index]?.name || ""}
                    name="name"
                    onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                    sx={{ mb: 2 }}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Phone Number"
                    value={peopleInfo[index]?.phone || ""}
                    name="phone"
                    onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                    sx={{ mb: 2 }}
                    variant="outlined"
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
