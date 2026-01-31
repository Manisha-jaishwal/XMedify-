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
  const [selection, setSelection] = useState({ state: "", city: "" });

  const navigate = useNavigate();

  useEffect(() => {
    async function loadStates() {
      try {
        const res = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        setStateList(res.data);
      } catch (err) {
        console.error("Failed to load states", err);
      }
    }

    loadStates();
  }, []);


  useEffect(() => {
    if (!selection.state) return;

    async function loadCities() {
      setCityList([]);
      setSelection((prev) => ({ ...prev, city: "" }));

      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/cities/${selection.state}`
        );
        setCityList(res.data);
      } catch (err) {
        console.error("Failed to load cities", err);
      }
    }

    loadCities();
  }, [selection.state]);

  const updateSelection = (event) => {
    const { name, value } = event.target;
    setSelection((prev) => ({ ...prev, [name]: value }));
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const { state, city } = selection;

    if (state && city) {
      navigate(`/search?state=${state}&city=${city}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitSearch}
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Select
        name="state"
        value={selection.state}
        onChange={updateSelection}
        displayEmpty
        required
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem value="" disabled>
          State
        </MenuItem>
        {stateList.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        name="city"
        value={selection.city}
        onChange={updateSelection}
        displayEmpty
        required
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem value="" disabled>
          City
        </MenuItem>
        {cityList.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        sx={{ px: 8, py: "15px", flexShrink: 0 }}
        disableElevation
      >
        Search
      </Button>
    </Box>
  );
}
