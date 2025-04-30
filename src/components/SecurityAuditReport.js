import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { securityAudit } from "../utils/securityAudit";

const SecurityAuditReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const auditReport = securityAudit.generateReport();
        setReport(auditReport);
      } catch (err) {
        setError("Error al cargar el reporte de auditoría");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!report) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No hay reportes de auditoría disponibles
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reporte de Auditoría de Seguridad
      </Typography>

      {/* Resumen */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resumen
        </Typography>
        <Box display="flex" gap={2}>
          <Chip
            label={`Total: ${report.summary.totalChecks}`}
            color="primary"
          />
          <Chip
            label={`Aprobados: ${report.summary.passedChecks}`}
            color="success"
          />
          <Chip
            label={`Fallidos: ${report.summary.failedChecks}`}
            color="error"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última auditoría:{" "}
          {new Date(report.summary.timestamp).toLocaleString()}
        </Typography>
      </Paper>

      {/* Detalles */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de los Checks
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Check</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(report.details).map(([check, result]) => (
                <TableRow key={check}>
                  <TableCell>{check}</TableCell>
                  <TableCell>
                    <Chip
                      label={result.passed ? "Aprobado" : "Fallido"}
                      color={result.passed ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <pre style={{ margin: 0 }}>
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Recomendaciones */}
      {report.recommendations.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recomendaciones
          </Typography>
          {report.recommendations.map((rec, index) => (
            <Alert key={index} severity="warning" sx={{ mb: 1 }}>
              <Typography variant="subtitle2">{rec.message}</Typography>
              <Typography variant="body2">Severidad: {rec.severity}</Typography>
              <pre style={{ margin: "8px 0 0 0" }}>
                {JSON.stringify(rec.details, null, 2)}
              </pre>
            </Alert>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default SecurityAuditReport;
