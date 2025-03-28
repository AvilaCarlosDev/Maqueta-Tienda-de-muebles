import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCartStore } from "../store/cartStore";

const ProductDetails = ({ product, open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  const specifications = [
    { label: "Material", value: "Madera de pino maciza" },
    { label: "Dimensiones", value: "200cm x 80cm x 45cm" },
    { label: "Color", value: "Natural con acabado mate" },
    { label: "Garantía", value: "2 años" },
    { label: "Tiempo de entrega", value: "5-7 días hábiles" },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{product.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Imágenes */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <img
                src={images[selectedImage]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border:
                      selectedImage === index ? "2px solid #1976d2" : "none",
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </Box>
          </Grid>

          {/* Información */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Especificaciones
            </Typography>
            <Grid container spacing={2}>
              {specifications.map((spec, index) => (
                <Grid item xs={12} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                      {spec.label}
                    </Typography>
                    <Typography variant="body1">{spec.value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addItem(product);
            onClose();
          }}
        >
          Agregar al Carrito
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetails;
