import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCartStore } from "../store/cartStore";

// Expresiones regulares para validación
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
const ZIP_REGEX = /^\d{4,10}$/;

// Tipos de archivo permitidos y tamaño máximo (5MB)
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const CheckoutForm = ({ open, onClose }) => {
  const { getTotal, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
  });
  const [errors, setErrors] = useState({});
  const [comprobante, setComprobante] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Email inválido";
      case "telefono":
        return PHONE_REGEX.test(value) ? "" : "Teléfono inválido";
      case "codigoPostal":
        return ZIP_REGEX.test(value) ? "" : "Código postal inválido";
      default:
        return value.trim() ? "" : "Este campo es requerido";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        comprobante: "Tipo de archivo no permitido. Use JPG, PNG o GIF.",
      }));
      return;
    }

    // Validar tamaño de archivo
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        comprobante: "El archivo es demasiado grande. Máximo 5MB.",
      }));
      return;
    }

    setComprobante(file);
    setErrors((prev) => ({ ...prev, comprobante: "" }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm() || !comprobante) {
      return;
    }

    // Sanitizar datos antes de enviar
    const sanitizedData = {
      ...formData,
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      direccion: formData.direccion.trim(),
      ciudad: formData.ciudad.trim(),
      codigoPostal: formData.codigoPostal.trim(),
    };

    // Aquí implementarías la lógica para enviar los datos al servidor
    console.log("Datos del pedido:", { ...sanitizedData, comprobante });
    clearCart();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Completar Pedido</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Información Personal
              </Typography>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                error={!!errors.nombre}
                helperText={errors.nombre}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                error={!!errors.telefono}
                helperText={errors.telefono}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Dirección de Entrega
              </Typography>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                error={!!errors.direccion}
                helperText={errors.direccion}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                error={!!errors.ciudad}
                helperText={errors.ciudad}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Código Postal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleInputChange}
                error={!!errors.codigoPostal}
                helperText={errors.codigoPostal}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Comprobante de Pago
              </Typography>
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: 1,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                component="label"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  required
                />
                <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Typography>
                  {comprobante
                    ? comprobante.name
                    : "Haz clic para subir el comprobante de pago"}
                </Typography>
                {errors.comprobante && (
                  <Typography color="error" variant="caption">
                    {errors.comprobante}
                  </Typography>
                )}
              </Box>
              {previewUrl && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Total a Pagar: ${getTotal().toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!comprobante || Object.keys(errors).length > 0}
          >
            Confirmar Pedido
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CheckoutForm;
