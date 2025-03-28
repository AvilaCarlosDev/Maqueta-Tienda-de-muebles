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
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import { useCartStore } from "../store/cartStore";
import Cart from "./Cart";
import Logo from "./Logo";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo component={Link} to="/" sx={{ textDecoration: "none" }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                  onClick={handleMenuToggle}
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
            {isMobile && (
              <IconButton color="inherit" onClick={handleMenuToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={isMobile ? "left" : "right"}
        open={isMenuOpen}
        onClose={handleMenuToggle}
        PaperProps={{
          sx: { width: isMobile ? "80%" : 300 },
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
              <ListItemButton onClick={handleMenuToggle}>
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
            <ListItem>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Categorías
              </Typography>
            </ListItem>
            {categories.map((category) => (
              <ListItem key={category.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/categorias#${category.name.toLowerCase()}`}
                  onClick={handleMenuToggle}
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

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
