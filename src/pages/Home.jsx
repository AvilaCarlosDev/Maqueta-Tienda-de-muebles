// Copyright (c) 2024 AvilaCarlosDev
// Licensed under the GPL-3.0 License
// Firma: AvilaCarlosDev

// ...resto del código...
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";

const featuredProducts = [
  {
    id: 1,
    name: "Sofá Moderno",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Sofá moderno de 3 plazas con diseño minimalista",
  },
  {
    id: 2,
    name: "Mesa de Centro",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Mesa de centro de madera maciza con acabado elegante",
  },
  {
    id: 3,
    name: "Silla de Oficina",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Silla ergonómica con soporte lumbar ajustable",
  },
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <Container>
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: "bold",
              }}
            >
              Muebles Punto Fijo
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mb: 4, fontSize: { xs: "1.2rem", md: "1.5rem" } }}
            >
              Transforma tu espacio con nuestros muebles de alta calidad
            </Typography>
            <Button
              component={Link}
              to="/categorias"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2 }}
            >
              Ver Catálogo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          Productos Destacados
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleOpenDetails(product)}
                    >
                      Ver Detalles
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          py: 8,
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
                alt="Nuestra Tienda"
                sx={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ color: "text.primary" }}
              >
                ¿Por qué elegirnos?
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      bgcolor: "background.paper",
                      color: "text.primary",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "primary.main" }}
                    >
                      Calidad Superior
                    </Typography>
                    <Typography sx={{ color: "text.primary" }}>
                      Todos nuestros muebles están fabricados con los mejores
                      materiales y acabados de alta calidad.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      bgcolor: "background.paper",
                      color: "text.primary",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "primary.main" }}
                    >
                      Garantía
                    </Typography>
                    <Typography sx={{ color: "text.primary" }}>
                      Ofrecemos garantía en todos nuestros productos para tu
                      tranquilidad.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      bgcolor: "background.paper",
                      color: "text.primary",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "primary.main" }}
                    >
                      Envío Seguro
                    </Typography>
                    <Typography sx={{ color: "text.primary" }}>
                      Realizamos envíos seguros a todo el país con seguimiento
                      en tiempo real.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          open={isDetailsOpen}
          onClose={handleCloseDetails}
        />
      )}
    </Box>
  );
};

export default Home;
