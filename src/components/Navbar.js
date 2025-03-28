/**
 * Componente Navbar - Barra de Navegación Principal
 *
 * Este componente proporciona la navegación principal de la aplicación.
 * Incluye el logo, enlaces de navegación, carrito de compras y un menú responsive.
 * En dispositivos móviles, los elementos de navegación se ocultan en un drawer lateral.
 */

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import { useCartStore } from "../store/cartStore";
import Cart from "./Cart";
import Logo from "./Logo";

/**
 * Lista de categorías disponibles en la tienda
 * Cada categoría tiene un nombre y un icono emoji
 */
const categories = [
  { name: "Muebles", icon: "🪑" },
  { name: "Mesas", icon: "🪑" },
  { name: "Sillas", icon: "🪑" },
  { name: "Cuadros", icon: "🖼️" },
  { name: "Espejos", icon: "🪞" },
  { name: "Alfombras", icon: "🟦" },
  { name: "Almohadas", icon: "🛏️" },
];

const Navbar = () => {
  // Hooks para manejar el tema y la responsividad
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Estado del carrito y menú
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Calcular el total de items en el carrito
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  /**
   * Alterna la visibilidad del menú lateral
   */
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Maneja la navegación a una categoría
   * @param {string} category - Nombre de la categoría
   */
  const handleCategoryClick = (category) => {
    navigate(`/categorias#${category.toLowerCase()}`);
    setIsCategoriesOpen(false);
  };

  return (
    <>
      {/* Barra de navegación principal */}
      <AppBar position="static">
        <Toolbar>
          {/* Logo de la tienda */}
          <Logo component={Link} to="/" sx={{ textDecoration: "none" }} />

          {/* Espacio flexible para empujar los elementos a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Contenedor de elementos de navegación */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Botones de navegación (solo visibles en desktop) */}
            {!isMobile && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  startIcon={<HomeIcon />}
                >
                  Inicio
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setIsCategoriesOpen(true)}
                  startIcon={<MenuIcon />}
                >
                  Categorías
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/sobre-nosotros"
                  startIcon={<InfoIcon />}
                >
                  Sobre Nosotros
                </Button>
              </>
            )}

            {/* Icono del carrito con contador */}
            <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon />
              {itemCount > 0 && (
                <Typography
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "secondary.main",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  {itemCount}
                </Typography>
              )}
            </IconButton>

            {/* Botón de menú (solo visible en móvil) */}
            {isMobile && (
              <IconButton color="inherit" onClick={handleMenuToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para categorías */}
      <Drawer
        anchor="right"
        open={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        PaperProps={{
          sx: { width: { xs: "80%", sm: 300 } },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Categorías
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItem key={category.name} disablePadding>
                <ListItemButton
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <ListItemIcon>
                    <Typography>{category.icon}</Typography>
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Drawer para menú móvil */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleMenuToggle}
        PaperProps={{
          sx: { width: "80%" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Menú
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                onClick={handleMenuToggle}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setIsCategoriesOpen(true);
                  handleMenuToggle();
                }}
              >
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary="Categorías" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/sobre-nosotros"
                onClick={handleMenuToggle}
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Sobre Nosotros" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Componente del carrito */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
