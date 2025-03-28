/**
 * Componente principal de la aplicación
 *
 * Este componente es el punto de entrada de la aplicación y maneja:
 * - Configuración del tema y modo oscuro/claro
 * - Enrutamiento principal
 * - Estructura básica de la aplicación (header, main, footer)
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Cart from "./components/Cart";
import getTheme from "./theme";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  // Estado para manejar el modo del tema (claro/oscuro)
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  // Persistir el modo del tema en localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Función para alternar entre modo claro y oscuro
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Obtener el tema según el modo actual
  const theme = getTheme(mode);

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: "USD",
          }}
        >
          <CssBaseline />
          <Router>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar toggleTheme={toggleTheme} mode={mode} />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categorias" element={<Categories />} />
                  <Route path="/sobre-nosotros" element={<About />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Cart />
          </Router>
        </PayPalScriptProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
