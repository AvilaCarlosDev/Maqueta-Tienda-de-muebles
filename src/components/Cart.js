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

const Cart = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity } = useCartStore();

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

  const handleCheckout = () => {
    // Aquí implementaremos la lógica de pago
    console.log("Proceder al pago");
  };

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
        sx: { width: { xs: "100%", sm: 400 } },
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
              {items.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
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
