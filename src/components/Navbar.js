/**
 * Componente Navbar - Barra de navegación principal
 *
 * Este componente maneja:
 * - Navegación principal de la aplicación
 * - Menú de categorías
 * - Carrito de compras
 * - Cambio de tema (claro/oscuro)
 * - Menú móvil responsive
 */

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactsIcon from "@mui/icons-material/Contacts";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
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

const menuItems = [
  { text: "Inicio", path: "/", icon: <HomeIcon /> },
  { text: "Categorías", path: "/categorias", icon: <MenuIcon /> },
  { text: "Sobre Nosotros", path: "/sobre-nosotros", icon: <InfoIcon /> },
];

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryClick = (category) => {
    navigate(`/categorias#${category.toLowerCase()}`);
    setIsCategoriesOpen(false);
  };

  const handleContactClick = () => {
    const footer = document.getElementById("contacto");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Menú de navegación principal (escritorio) */}
            {!isMobile && (
              <>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  color="inherit"
                  onClick={handleContactClick}
                  startIcon={<ContactsIcon />}
                >
                  Contáctanos
                </Button>
              </>
            )}

            {/* Botón del carrito */}
            <Button
              color="inherit"
              onClick={() => setIsCartOpen(true)}
              startIcon={<ShoppingCartIcon />}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Carrito
              {itemCount > 0 && (
                <Badge badgeContent={itemCount} color="error" />
              )}
            </Button>

            {/* Control de tema */}
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              title={
                theme.palette.mode === "dark" ? "Modo claro" : "Modo oscuro"
              }
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>

            {/* Botón de menú móvil */}
            {isMobile && (
              <IconButton color="inherit" onClick={() => setIsMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer de menú móvil */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          sx: { width: "80%" },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleContactClick}>
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Contáctanos" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Drawer de categorías */}
      <Drawer
        anchor="right"
        open={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        PaperProps={{
          sx: { width: { xs: "80%", sm: 300 } },
        }}
      >
        <List>
          {categories.map((category) => (
            <ListItem key={category.name} disablePadding>
              <ListItemButton
                onClick={() => handleCategoryClick(category.name)}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Componente del carrito */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
