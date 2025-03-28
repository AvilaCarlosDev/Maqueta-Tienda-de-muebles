/**
 * Componente Footer
 *
 * Pie de página responsivo que muestra:
 * - Información de contacto (teléfono, email, WhatsApp)
 * - Horario de atención
 * - Enlaces rápidos
 * - Derechos de autor
 */

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Información de contacto con sus respectivos iconos y enlaces
  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ mr: 1 }} />,
      text: "+58 424-555-5555",
      link: "tel:+584245555555",
    },
    {
      icon: <EmailIcon sx={{ mr: 1 }} />,
      text: "info@mpf.com",
      link: "mailto:info@mpf.com",
    },
    {
      icon: <WhatsAppIcon sx={{ mr: 1 }} />,
      text: "WhatsApp",
      link: "https://wa.me/584245555555",
    },
  ];

  return (
    <Box
      component="footer"
      id="contacto"
      sx={{
        bgcolor: "background.paper",
        py: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          {/* Columna de Contacto */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contáctanos
            </Typography>
            {contactInfo.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                {info.icon}
                <Link
                  href={info.link}
                  color="inherit"
                  underline="hover"
                  target={info.text === "WhatsApp" ? "_blank" : "_self"}
                  rel={info.text === "WhatsApp" ? "noopener noreferrer" : ""}
                >
                  {info.text}
                </Link>
              </Box>
            ))}
          </Grid>

          {/* Columna de Horario */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Horario
            </Typography>
            <Typography variant="body2" paragraph>
              Lunes a Viernes: 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body2">Sábados: 9:00 AM - 2:00 PM</Typography>
          </Grid>

          {/* Columna de Enlaces Rápidos */}
          {!isMobile && (
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Enlaces Rápidos
              </Typography>
              <Link href="/" color="inherit" display="block" mb={1}>
                Inicio
              </Link>
              <Link href="/categorias" color="inherit" display="block" mb={1}>
                Categorías
              </Link>
              <Link href="/sobre-nosotros" color="inherit" display="block">
                Sobre Nosotros
              </Link>
            </Grid>
          )}
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          © {new Date().getFullYear()} MPF Muebles. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
