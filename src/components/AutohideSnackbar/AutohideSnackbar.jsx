import { Alert, Snackbar } from "@mui/material";

export default function AutoHideSnackbar({ open, setOpen, message }) {
  const closeHandler = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={closeHandler}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        icon={false}
        onClose={closeHandler}
        sx={{ bgcolor: "primary.green", color: "#fff" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
