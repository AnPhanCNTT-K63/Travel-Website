import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../UserContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import { Edit, Save, Person } from "@mui/icons-material";
import { getContactInfo } from "../../../api/services";

export default function ContactInfo({ setContactInformation }) {
  const user = useContext(UserContext);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    const getContact = async () => {
      const res = await getContactInfo(user.userId);
      setContactInfo(res);
    };
    getContact();
  }, [user.userId]);

  useEffect(() => {
    if (contactInfo.Name) {
      setContactInformation(contactInfo);
    }
  }, [contactInfo, setContactInformation]);

  const handleSaveContact = () => {
    setIsEditingContact(false);
  };

  const [isEditingContact, setIsEditingContact] = useState(false);
  return (
    <Card sx={{ mb: 4, boxShadow: 4, border: "1px solid #bbdefb" }}>
      <CardHeader
        title="Contact Information (your information or someone we can contact to confirm)"
        avatar={<Person sx={{ color: "#1e88e5" }} />}
        action={
          isEditingContact && (
            <Tooltip title="Save Changes">
              <IconButton onClick={handleSaveContact} sx={{ color: "#2e7d32" }}>
                <Save />
              </IconButton>
            </Tooltip>
          )
        }
        sx={{ background: "#e3f2fd" }}
      />
      <Divider sx={{ backgroundColor: "#90caf9" }} />
      <CardContent>
        {isEditingContact ? (
          <Box>
            <TextField
              label="Full Name"
              value={contactInfo.Name}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, Name: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Phone Number"
              value={contactInfo.Phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, Phone: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Email Address"
              value={contactInfo.Email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, Email: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              variant="outlined"
              size="small"
            />
          </Box>
        ) : (
          <Box>
            <Typography variant="h6">Name: {contactInfo.Name}</Typography>
            <Typography variant="h6">Phone: {contactInfo.Phone}</Typography>
            <Typography variant="h6">Email: {contactInfo.Email}</Typography>
            <Button
              variant="outlined"
              onClick={() => setIsEditingContact(true)}
              sx={{
                mt: 2,
                color: "#0d47a1",
                borderColor: "#0d47a1",
                "&:hover": {
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                },
              }}
              startIcon={<Edit />}
            >
              Edit Info
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
