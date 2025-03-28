/**
 * Página Sobre Nosotros
 *
 * Muestra información sobre la empresa, incluyendo:
 * - Misión y visión
 * - Historia
 * - Valores
 */

import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: 8,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 6, color: "text.primary" }}
        >
          Sobre Nosotros
        </Typography>

        <Grid container spacing={4}>
          {/* Misión y Visión */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                bgcolor: "background.paper",
                color: "text.primary",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Nuestra Misión
              </Typography>
              <Typography paragraph>
                Nuestra misión es proporcionar muebles de alta calidad que
                transformen los espacios de nuestros clientes en hogares
                acogedores y funcionales, manteniendo siempre los más altos
                estándares de calidad y servicio al cliente.
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: "bold", mt: 4 }}
              >
                Nuestra Visión
              </Typography>
              <Typography paragraph>
                Ser la empresa líder en mobiliario en Punto Fijo, reconocida por
                nuestra excelencia en diseño, calidad y servicio, contribuyendo
                a mejorar la calidad de vida de nuestros clientes.
              </Typography>
            </Paper>
          </Grid>

          {/* Historia y Valores */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                bgcolor: "background.paper",
                color: "text.primary",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Nuestra Historia
              </Typography>
              <Typography paragraph>
                Desde nuestra fundación, nos hemos dedicado a ofrecer los
                mejores muebles y servicios a nuestros clientes. Con años de
                experiencia en el mercado, hemos crecido manteniendo siempre
                nuestro compromiso con la calidad y la satisfacción del cliente.
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: "bold", mt: 4 }}
              >
                Nuestros Valores
              </Typography>
              <Box component="ul" sx={{ pl: 2, color: "text.primary" }}>
                <li>Calidad en cada detalle</li>
                <li>Compromiso con el cliente</li>
                <li>Innovación constante</li>
                <li>Responsabilidad social</li>
                <li>Trabajo en equipo</li>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
