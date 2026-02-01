import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [params] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [state, setState] = useState(params.get("state"));
  const [city, setCity] = useState(params.get("city"));

  useEffect(() => {
    setState(params.get("state"));
    setCity(params.get("city"));
  }, [params]);


  useEffect(() => {
    if (!state || !city) return;

    axios
      .get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
      .then((res) => setHospitals(res.data));
  }, [state, city]);

  return null; 
}
