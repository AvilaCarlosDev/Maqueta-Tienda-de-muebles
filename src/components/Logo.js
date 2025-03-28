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
import { Box, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";

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
      <SvgIcon
        viewBox="0 0 400 200"
        sx={{
          width: 180,
          height: 90,
          "& .turquoise": {
            fill: "#40E0D0",
          },
          "& .pink": {
            fill: "#FF69B4",
          },
        }}
      >
        <g transform="translate(20, 20)">
          {/* MPF */}
          <text
            x="50"
            y="60"
            className="turquoise"
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            MPF
          </text>
          {/* MUEBLES */}
          <text
            x="50"
            y="95"
            className="turquoise"
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            MUEBLES
          </text>
          {/* PUNTO FIJO */}
          <text
            x="50"
            y="125"
            className="pink"
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            PUNTO FIJO
          </text>
          {/* Línea decorativa */}
          <line
            x1="50"
            y1="135"
            x2="250"
            y2="135"
            stroke="#FF69B4"
            strokeWidth="3"
          />
        </g>
      </SvgIcon>
    </Box>
  );
};

export default Logo;
