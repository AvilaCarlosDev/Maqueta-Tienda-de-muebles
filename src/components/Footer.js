import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import PayPalIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { SiZelle } from "react-icons/si";

const Footer = () => {
  const paymentMethods = [
    {
      name: "PayPal",
      icon: <PayPalIcon sx={{ fontSize: 40, color: "#0070BA" }} />,
      description: "Pago seguro con PayPal",
    },
    {
      name: "Zelle",
      icon: <SiZelle size={40} color="#6DCDB8" />,
      description: "Transferencia instantánea con Zelle",
    },
    {
      name: "Transferencia Bancaria",
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      description: "Transferencia bancaria directa",
    },
    {
      name: "Criptomonedas",
      icon: <CurrencyBitcoinIcon sx={{ fontSize: 40, color: "#F7931A" }} />,
      description: "Pago con Bitcoin y otras criptomonedas",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Muebles Punto Fijo
            </Typography>
            <Typography variant="body2">
              Tu tienda de confianza para muebles de alta calidad. Transformamos
              espacios con estilo y funcionalidad.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Métodos de Pago Aceptados
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {paymentMethods.map((method) => (
                <Tooltip key={method.name} title={method.description}>
                  <IconButton
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    {method.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4, opacity: 0.8 }}>
          © {new Date().getFullYear()} Muebles Punto Fijo. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
