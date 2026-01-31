import { Stack, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";

export default function SearchBar({ list, filterList }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const searchValue = query.trim().toLowerCase();
    if (!searchValue) return list;

    return list.filter(({ "Hospital Name": name }) =>
      name.toLowerCase().includes(searchValue)
    );
  }, [query, list]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    filterList(results);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Search By Hospital"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ maxLength: 100 }}
        />

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
      </Stack>
    </form>
  );
}
