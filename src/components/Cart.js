/**
 * Componente Cart - Carrito de Compras
 *
 * Este componente muestra un drawer lateral que contiene los items del carrito.
 * Permite ver, modificar cantidades y eliminar productos del carrito.
 * También muestra el total y botones para continuar comprando o proceder al pago.
 */

import React, { useState } from "react";
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    receipt: null,
  });

  // Calcular el total del carrito
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      receipt: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar los datos al servidor
    console.log("Datos del cliente:", formData);
    clearCart();
    setIsCheckoutOpen(false);
    onClose();
    alert("¡Pedido realizado con éxito! Te contactaremos pronto.");
  };

  return (
    <>
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
                  onClick={() => setIsCheckoutOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Proceder al Pago
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      <Dialog
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Datos de Envío y Pago</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nombre Completo"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Dirección de Envío"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Método de Pago"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="pago_movil">Pago Móvil</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Comprobante de Pago
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ width: "100%" }}
                />
                {formData.receipt && (
                  <Typography variant="body2" color="success.main">
                    Archivo seleccionado: {formData.receipt.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCheckoutOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Confirmar Pedido
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Cart;
