import React from "react";
import { Box, Typography } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";

const Logo = ({ variant = "h6", color = "inherit" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <ChairIcon sx={{ fontSize: 40, color: color }} />
      <Typography
        variant={variant}
        sx={{
          fontWeight: "bold",
          color: color,
          letterSpacing: "0.5px",
        }}
      >
        Muebles Punto Fijo
      </Typography>
    </Box>
  );
};

export default Logo;
