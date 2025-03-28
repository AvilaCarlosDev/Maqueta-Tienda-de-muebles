import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import { useCartStore } from "../store/cartStore";

const ProductDetails = ({ product, open, onClose }) => {
  const { addItem } = useCartStore();

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5">{product.name}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <CardMedia
            component="img"
            height="300"
            image={product.image}
            alt={product.name}
            sx={{ borderRadius: 1 }}
          />
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
        </Box>
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
