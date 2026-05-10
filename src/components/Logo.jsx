/**
 * Logo generado en código para la marca demo Renova Muebles Studio.
 * No usa imagen externa: permite adaptar la identidad visual desde cero.
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = ({ sx = {} }) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.4,
        textDecoration: "none",
        color: "inherit",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "18px 18px 10px 18px",
          bgcolor: "#c46a3a",
          color: "#fff7ed",
          display: "grid",
          placeItems: "center",
          fontWeight: 950,
          fontSize: 18,
          letterSpacing: "-.04em",
          boxShadow: "0 12px 28px rgba(196,106,58,.25)",
        }}
      >
        R
      </Box>
      <Box sx={{ lineHeight: 1 }}>
        <Typography sx={{ fontWeight: 950, fontSize: { xs: 17, sm: 19 }, letterSpacing: "-.04em", color: "#fff" }}>
          Renova
        </Typography>
        <Typography sx={{ mt: .35, fontSize: 10, fontWeight: 900, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>
          Muebles Studio
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
