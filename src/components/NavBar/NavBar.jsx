import {
  Box,
  Container,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import brandLogo from "../../assets/logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header>

      <Box bgcolor="primary.main" p={1}>
        <Typography fontSize={14} textAlign="center" color="#fff">
          The health and well-being of our patients and their health care team
          will always be our priority, so we follow the best practices for
          cleanliness.
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          py={2}
        >

          <Link to="/">
            <img src={brandLogo} alt="Logo" height={27} />
          </Link>


          <Stack
            direction={isSmallScreen ? "column" : "row"}
            spacing={4}
            alignItems={isSmallScreen ? "flex-start" : "center"}
            className={[
              styles.navlinks,
              drawerOpen && styles.active,
            ].join(" ")}
            pt={{ xs: 12, md: 1 }}
            pb={{ xs: 4, md: 1 }}
            px={{ xs: 4, md: 0 }}
          >
            <Link>Find Doctors</Link>
            <Link to="/search">Hospitals</Link>
            <Link>Medicines</Link>
            <Link>Surgeries</Link>
            <Link>Software for Provider</Link>
            <Link>Facilities</Link>

            <Link to="/my-bookings">
              <Button variant="contained" disableElevation>
                My Bookings
              </Button>
            </Link>

            {isSmallScreen && (
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 32,
                  color: "#fff",
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Stack>

          {isSmallScreen && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Container>
    </header>
  );
}
