import { MenuItem, Select, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchHospital() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((res) => setStates(res.data));
  }, []);

  useEffect(() => {
    if (!state) return;
    setCity("");
    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setCities(res.data));
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state && city) {
      navigate(`/search?state=${state}&city=${city}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      
      <div id="state">
        <Select value={state} onChange={(e) => setState(e.target.value)} displayEmpty>
          <MenuItem value="" disabled>State</MenuItem>
          {states.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </div>


      <div id="city">
        <Select value={city} onChange={(e) => setCity(e.target.value)} displayEmpty>
          <MenuItem value="" disabled>City</MenuItem>
          {cities.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </div>

      
      <Button type="submit" id="searchBtn">
        Search
      </Button>
    </Box>
  );
}
