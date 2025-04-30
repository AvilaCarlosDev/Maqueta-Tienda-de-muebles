import React from "react";
import { Container, Box, Typography } from "@mui/material";
import SecurityAuditReport from "../components/SecurityAuditReport";

const SecurityAuditPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Auditoría de Seguridad
        </Typography>
        <Typography variant="body1" paragraph>
          Esta página muestra el estado actual de la seguridad de la aplicación,
          incluyendo los resultados de las últimas auditorías y recomendaciones
          para mejorar la seguridad.
        </Typography>
        <SecurityAuditReport />
      </Box>
    </Container>
  );
};

export default SecurityAuditPage;
