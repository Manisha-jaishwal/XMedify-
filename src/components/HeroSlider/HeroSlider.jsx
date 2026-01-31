import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import heroImage from "../../assets/home.webp";

export default function HeroSlider() {
  return (
    <Swiper>
      <SwiperSlide>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          pt={2}
        >
          <Box>
            <Typography variant="h3" component="h1">
              Skip the travel! Find Online
            </Typography>

            <Typography variant="h1" component="h1" mb={1}>
              Medical{" "}
              <Box component="span" sx={{ color: "#2AA7FF" }}>
                Centers
              </Box>
            </Typography>

            <Typography color="#5C6169" fontSize={{ md: 20 }} mb={3}>
              Instantly connect with a 24×7 specialist or book a video
              consultation with a doctor of your choice.
            </Typography>

            <Link to="/search">
              <Button variant="contained" size="large" disableElevation>
                Find Centers
              </Button>
            </Link>
          </Box>

          <Box
            component="img"
            src={heroImage}
            width={{ xs: 1, md: "50%" }}
            alt="Medical consultation"
          />
        </Stack>
      </SwiperSlide>
    </Swiper>
  );
}
