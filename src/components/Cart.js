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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartStore } from "../store/cartStore";
import { PayPalButtons } from "@paypal/react-paypal-js";

/**
 * Props:
 * @param {boolean} isOpen - Controla la visibilidad del drawer
 * @param {function} onClose - Función para cerrar el drawer
 */
const Cart = ({ isOpen, onClose }) => {
  // Obtener el estado y funciones del carrito desde el store
  const { items, removeItem, updateQuantity } = useCartStore();

  /**
   * Maneja el cambio de cantidad de un item en el carrito
   * @param {number} itemId - ID del item a modificar
   * @param {number} change - Cantidad a sumar/restar
   */
  const handleQuantityChange = (itemId, change) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      } else {
        removeItem(itemId);
      }
    }
  };

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
        <Typography variant="h6" gutterBottom>
          Carrito de Compras
        </Typography>
        {items.length === 0 ? (
          <Typography>Tu carrito está vacío</Typography>
        ) : (
          <>
            <List>
              {/* Renderizar cada item del carrito */}
              {items.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  {/* Imagen del producto */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  {/* Información del producto */}
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  {/* Controles de cantidad y eliminación */}
                  <CardActions>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            {/* Total y botones de acción */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" fullWidth onClick={onClose}>
                Seguir Comprando
              </Button>
              <Button variant="contained" fullWidth onClick={handleCheckout}>
                Pagar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
