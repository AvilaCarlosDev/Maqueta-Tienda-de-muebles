import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {
    primary: { main: "#253127" },
    secondary: { main: "#b86f45" },
    background: { default: "#f5efe6", paper: "#fffaf3" },
    text: { primary: "#201813", secondary: "#6f6258" },
  },
  typography: {
    fontFamily: "Inter, Montserrat, system-ui, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 999,
          fontWeight: 900,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
