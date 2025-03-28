/**
 * Componente Cart - Carrito de Compras
 *
 * Este componente muestra un drawer lateral que contiene los items del carrito.
 * Permite ver, modificar cantidades y eliminar productos del carrito.
 * También muestra el total y botones para continuar comprando o proceder al pago.
 */

import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartStore } from "../store/cartStore";

/**
 * Props:
 * @param {boolean} isOpen - Controla la visibilidad del drawer
 * @param {function} onClose - Función para cerrar el drawer
 */
const Cart = ({ isOpen, onClose }) => {
  // Obtener el estado y funciones del carrito desde el store
  const { items, removeItem, updateQuantity } = useCartStore();

  /**
   * Maneja el proceso de checkout
   * TODO: Implementar la lógica de pago con PayPal
   */
  const handleCheckout = () => {
    console.log("Proceder al pago");
  };

  // Calcular el total del carrito
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 } }, // Responsive width
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Carrito de Compras</Typography>
          <IconButton onClick={onClose}>×</IconButton>
        </Box>

        {items.length === 0 ? (
          <Typography>Tu carrito está vacío</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="text.secondary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                sx={{ mt: 2 }}
              >
                Proceder al Pago
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
