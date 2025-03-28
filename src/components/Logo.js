/**
 * Componente Logo - Logo de la Tienda
 *
 * Este componente muestra el logo de la tienda con un icono y texto.
 * Es reutilizable y puede variar su tamaño y color según las props recibidas.
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";

/**
 * Props:
 * @param {string} variant - Variante del logo ('small' | 'medium' | 'large')
 * @param {string} color - Color del logo (cualquier color válido de MUI)
 * @param {object} sx - Estilos adicionales para el componente
 */
const Logo = ({ variant = "medium", color = "primary", sx = {} }) => {
  // Definir tamaños según la variante
  const sizes = {
    small: { icon: 24, text: "h6" },
    medium: { icon: 32, text: "h5" },
    large: { icon: 48, text: "h4" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        ...sx,
      }}
    >
      <ChairIcon
        sx={{
          fontSize: sizes[variant].icon,
          color: `${color}.main`,
        }}
      />
      <Typography
        variant={sizes[variant].text}
        sx={{
          color: `${color}.main`,
          fontWeight: "bold",
        }}
      >
        Muebles Punto Fijo
      </Typography>
    </Box>
  );
};

export default Logo;
