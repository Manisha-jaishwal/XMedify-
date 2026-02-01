import {
  MenuItem,
  Select,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchHospital() {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selection, setSelection] = useState({
    state: "",
    city: "",
  });

  const navigate = useNavigate();

  // Load states
  useEffect(() => {
    const loadStates = async () => {
      try {
        const res = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        setStateList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadStates();
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (!selection.state) return;

    const loadCities = async () => {
      setCityList([]);
      setSelection((prev) => ({ ...prev, city: "" }));

      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/cities/${selection.state}`
        );
        setCityList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCities();
  }, [selection.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selection.state && selection.city) {
      navigate(
        `/search?state=${selection.state}&city=${selection.city}`
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* STATE */}
      <Box id="state" sx={{ width: "100%" }}>
        <Select
          fullWidth
          name="state"
          value={selection.state}
          onChange={handleChange}
          displayEmpty
          required
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        >
          <MenuItem value="" disabled>
            State
          </MenuItem>
          {stateList.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* CITY */}
      <Box id="city" sx={{ width: "100%" }}>
        <Select
          fullWidth
          name="city"
          value={selection.city}
          onChange={handleChange}
          displayEmpty
          required
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        >
          <MenuItem value="" disabled>
            City
          </MenuItem>
          {cityList.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* SEARCH BUTTON */}
      <Button
        id="searchBtn"
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        disableElevation
        sx={{ px: 6 }}
      >
        Search
      </Button>
    </Box>
  );
}
