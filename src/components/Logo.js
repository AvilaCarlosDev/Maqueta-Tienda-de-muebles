/**
 * Componente Logo - Logo de la Tienda
 *
 * Este componente muestra el logo de la tienda con texto escalable.
 * El logo consta de tres partes:
 * - MPF: Texto principal
 * - MUEBLES: Subtítulo superior
 * - PUNTO FIJO: Subtítulo inferior
 */

import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Ruta de la imagen

const Logo = ({ sx = {} }) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        ...sx,
      }}
    >
      <img
        src={logo}
        alt="Logo de Muebles Punto Fijo"
        style={{
          width: "100px", // Tamaño reducido
          height: "auto",
        }}
      />
    </Box>
  );
};

export default Logo;
