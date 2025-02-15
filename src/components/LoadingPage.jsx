import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
