import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";

export default function BookingModal({
  open,
  setOpen,
  bookingDetails,
  showSuccessMessage,
}) {
  const [userEmail, setUserEmail] = useState("");

  const saveBooking = () => {
    const stored = localStorage.getItem("bookings") || "[]";
    const previous = JSON.parse(stored);

    localStorage.setItem(
      "bookings",
      JSON.stringify([
        ...previous,
        { ...bookingDetails, bookingEmail: userEmail },
      ])
    );
  };

  const pushAnalyticsEvent = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "first_visit",
      eventDate: new Date().toISOString(),
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    pushAnalyticsEvent();
    saveBooking();

    showSuccessMessage(true);
    setUserEmail("");
    setOpen(false);
  };

  const readableDate = (value) => {
    if (!value) return null;
    return format(new Date(value), "E, d LLL");
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: "95%",
          maxWidth: 600,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          boxShadow: 24,
          borderRadius: 2,
          outline: 0,
          p: { xs: 3, md: 4 },
        }}
      >
        <Typography variant="h3" component="h3">
          Confirm booking
        </Typography>

        <Typography fontSize={14} mb={3}>
          Please enter your email to confirm booking for{" "}
          <Box component="span" fontWeight={600}>
            {bookingDetails.bookingTime} on{" "}
            {readableDate(bookingDetails.bookingDate)}
          </Box>
        </Typography>

        <Box component="form" onSubmit={submitHandler}>
          <Stack spacing={2} alignItems="flex-start">
            <TextField
              type="email"
              label="Enter your email"
              fullWidth
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disableElevation
              >
                Confirm
              </Button>

              <Button
                variant="outlined"
                size="large"
                disableElevation
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
