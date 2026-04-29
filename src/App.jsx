/**
 * Componente principal de la aplicación
 *
 * Este componente es el punto de entrada de la aplicación y maneja:
 * - Configuración del tema y modo oscuro/claro
 * - Enrutamiento principal
 * - Estructura básica de la aplicación (header, main, footer)
 * - Configuración segura de PayPal
 *
 * Copyright (c) 2024 AvilaCarlosDev
 * Licensed under the MIT License
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
import { Box, Typography } from "@mui/material";

// Validar que las variables de entorno estén configuradas
const validateEnvVariables = () => {
  // Para demo: usar Client ID de sandbox de PayPal si no hay variable de entorno
  // Client ID de prueba: https://developer.paypal.com/docs/business/quickstart/
  if (!process.env.VITE_PAYPAL_CLIENT_ID) {
    console.warn("Usando Client ID de sandbox para demo");
    return true; // No fallar, solo advertir
  }
  return true;
};

function App() {
  // Estado para manejar el modo del tema (claro/oscuro)
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  // Estado para manejar errores de configuración
  const [configError, setConfigError] = useState(null);

  // Persistir el modo del tema en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("themeMode", mode);
    } catch (error) {
      console.error("Error al guardar el tema en localStorage:", error);
    }
  }, [mode]);

  // Validar configuración al montar el componente
  useEffect(() => {
    if (!validateEnvVariables()) {
      setConfigError("Error de configuración: Variables de entorno faltantes");
    }
  }, []);

  // Función para alternar entre modo claro y oscuro
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Obtener el tema según el modo actual
  const theme = getTheme(mode);

  // Configuración de PayPal con validaciones adicionales
  // Client ID de sandbox para demo (no procesa pagos reales)
  const paypalClientId = process.env.VITE_PAYPAL_CLIENT_ID || "test";
  
  const paypalOptions = {
    "client-id": paypalClientId,
    currency: "USD",
    intent: "capture",
    "disable-funding": "credit,card",
    "enable-funding": "venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  if (configError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Typography variant="h6" color="error">
          {configError}
        </Typography>
      </Box>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <PayPalScriptProvider options={paypalOptions}>
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
                  <Route path="/security-audit" />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </PayPalScriptProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
