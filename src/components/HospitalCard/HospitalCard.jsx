import hospitalImg from "../../assets/hospitalicon.png";
import likeIcon from "../../assets/thumbsup.png";

import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { format } from "date-fns";
import Calendar from "../Calendar/Calendar";

export default function HospitalCard({
  details,
  availableSlots,
  handleBooking,
  booking = false,
}) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const rating =
    details["Hospital overall rating"] === "Not Available"
      ? 0
      : details["Hospital overall rating"];

  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: 2, p: { xs: 2, md: 4 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 4 }}
        flexWrap="wrap"
      >

        <Box
          component="img"
          src={hospitalImg}
          width={{ xs: 64, md: 130 }}
          sx={{ flexShrink: 0 }}
        />

        <Box flex={1}>
          <Typography
            component="h3"
            fontWeight={600}
            color="primary.main"
            fontSize={{ xs: 18, md: 20 }}
            mb={1}
            lineHeight={1}
            textTransform="capitalize"
          >
            {details["Hospital Name"].toLowerCase()}
          </Typography>

          <Typography
            fontSize={14}
            fontWeight={700}
            color="#414146"
            textTransform="capitalize"
          >
            {details["City"].toLowerCase()}, {details["State"]}
          </Typography>

          <Typography fontSize={14} mb={1}>
            {details["Hospital Type"]}
          </Typography>

          <Stack direction="row" spacing="4px" flexWrap="wrap" mb={2}>
            <Typography fontWeight={800} color="primary.green">
              FREE
            </Typography>
            <Typography sx={{ textDecoration: "line-through", color: "#787887" }}>
              ₹500
            </Typography>
            <Typography>Consultation fee at clinic</Typography>
          </Stack>

          <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing="4px"
            bgcolor="primary.green"
            px={1}
            py="4px"
            borderRadius={1}
            width="fit-content"
          >
            <Box
              component="img"
              src={likeIcon}
              width={{ xs: 16, md: 20 }}
              height={{ xs: 16, md: 20 }}
            />
            <Typography
              fontWeight={700}
              fontSize={{ xs: 14, md: 16 }}
              color="#fff"
              sx={{ opacity: 0.5 }}
            >
              {rating}
            </Typography>
          </Stack>
        </Box>

        <Stack
          minWidth="23%"
          justifyContent={booking ? "flex-start" : "flex-end"}
        >
          {!booking ? (
            <>
              <Typography
                textAlign="center"
                color="primary.green"
                fontSize={14}
                fontWeight={500}
                mb={1}
              >
                Available Today
              </Typography>

              <Button
                variant="contained"
                disableElevation
                onClick={() => setCalendarVisible((v) => !v)}
              >
                {calendarVisible
                  ? "Hide Booking Calendar"
                  : "Book FREE Center Visit"}
              </Button>
            </>
          ) : (
            <Stack direction="row" spacing={1} mt={{ xs: 2, md: 0 }}>
              <Chip
                label={details.bookingTime}
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 1, fontSize: 14 }}
              />
              <Chip
                label={format(
                  new Date(details.bookingDate),
                  "dd MMMM yyyy"
                )}
                variant="outlined"
                color="success"
                sx={{ borderRadius: 1, fontSize: 14 }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>

      {calendarVisible && (
        <Calendar
          details={details}
          availableSlots={availableSlots}
          handleBooking={handleBooking}
        />
      )}
    </Box>
  );
}
