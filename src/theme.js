/**
 * Configuración del tema de la aplicación
 *
 * Este archivo define los estilos globales de la aplicación, incluyendo:
 * - Paleta de colores para modo claro y oscuro
 * - Tipografía
 * - Estilos de componentes
 */

import { createTheme } from "@mui/material/styles";

// Colores principales de la aplicación
const PINK = "#FF69B4";
const BLUE = "#1976d2"; // Color azul para el header

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: BLUE,
        contrastText: mode === "dark" ? "#fff" : "#000",
      },
      secondary: {
        main: PINK,
        contrastText: "#fff",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#fff",
        paper: mode === "dark" ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#000",
        secondary: mode === "dark" ? "#b3b3b3" : "#666",
      },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: BLUE,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "dark"
                ? "0 4px 6px rgba(0,0,0,0.4)"
                : "0 4px 6px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  });

export default getTheme;
