import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Sobre Muebles Punto Fijo
      </Typography>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom>
          Nuestra Historia
        </Typography>
        <Typography paragraph>
          Muebles Punto Fijo nació en 2010 con la visión de ofrecer muebles de
          alta calidad a precios accesibles. Desde entonces, nos hemos dedicado
          a proporcionar soluciones de mobiliario que combinan estilo,
          funcionalidad y durabilidad.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ my: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nuestra Misión
            </Typography>
            <Typography>
              Brindar a nuestros clientes muebles de excelente calidad que
              transformen sus espacios en lugares acogedores y funcionales,
              manteniendo precios competitivos y un servicio al cliente
              excepcional.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nuestra Visión
            </Typography>
            <Typography>
              Ser la tienda de muebles líder en la región, reconocida por
              nuestra calidad, innovación y compromiso con la satisfacción del
              cliente.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom>
          Nuestros Valores
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Calidad
              </Typography>
              <Typography>
                Compromiso con la excelencia en cada producto que ofrecemos.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Honestidad
              </Typography>
              <Typography>
                Transparencia en nuestros precios y servicios.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Innovación
              </Typography>
              <Typography>
                Búsqueda constante de nuevas tendencias y diseños.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Servicio
              </Typography>
              <Typography>
                Atención personalizada y soporte post-venta.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h5" gutterBottom>
          Contáctanos
        </Typography>
        <Typography paragraph>
          Estamos ubicados en el centro de la ciudad, en la calle principal
          #123. Nuestro horario de atención es de lunes a sábado de 9:00 AM a
          7:00 PM.
        </Typography>
        <Typography>
          Teléfono: (123) 456-7890
          <br />
          Email: info@mueblespuntofijo.com
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
