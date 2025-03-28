import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCartStore } from "../store/cartStore";
import ProductDetails from "../components/ProductDetails";

const categories = [
  {
    id: "muebles",
    name: "Muebles",
    products: [
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
        name: "Armario Ropero",
        price: 799.99,
        image:
          "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Armario ropero con espejo y múltiples compartimentos",
      },
      {
        id: 3,
        name: "Cama King Size",
        price: 899.99,
        image:
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Cama king size con cabecero tapizado",
      },
    ],
  },
  {
    id: "mesas",
    name: "Mesas",
    products: [
      {
        id: 4,
        name: "Mesa de Centro",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Mesa de centro de madera maciza con acabado elegante",
      },
      {
        id: 5,
        name: "Mesa de Comedor",
        price: 499.99,
        image:
          "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Mesa de comedor extensible para 6-8 personas",
      },
      {
        id: 6,
        name: "Mesa de Trabajo",
        price: 399.99,
        image:
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Mesa de trabajo con cajones y estantes",
      },
    ],
  },
  {
    id: "sillas",
    name: "Sillas",
    products: [
      {
        id: 7,
        name: "Silla de Oficina",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        description: "Silla ergonómica con soporte lumbar ajustable",
      },
      {
        id: 8,
        name: "Silla de Comedor",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Silla de comedor con tapizado elegante",
      },
      {
        id: 9,
        name: "Silla Acapulco",
        price: 249.99,
        image:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        description: "Silla acapulco con diseño retro",
      },
    ],
  },
  {
    id: "cuadros",
    name: "Cuadros",
    products: [
      {
        id: 10,
        name: "Cuadro Abstracto",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Cuadro abstracto con colores modernos",
      },
      {
        id: 11,
        name: "Cuadro Paisaje",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Cuadro de paisaje natural",
      },
      {
        id: 12,
        name: "Cuadro Minimalista",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Cuadro minimalista en blanco y negro",
      },
    ],
  },
  {
    id: "espejos",
    name: "Espejos",
    products: [
      {
        id: 13,
        name: "Espejo de Pared",
        price: 159.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Espejo de pared con marco dorado",
      },
      {
        id: 14,
        name: "Espejo de Piso",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Espejo de piso con diseño moderno",
      },
      {
        id: 15,
        name: "Espejo Decorativo",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Espejo decorativo con marco de madera",
      },
    ],
  },
  {
    id: "alfombras",
    name: "Alfombras",
    products: [
      {
        id: 16,
        name: "Alfombra Persa",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Alfombra persa con diseño tradicional",
      },
      {
        id: 17,
        name: "Alfombra Moderna",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Alfombra moderna con patrón geométrico",
      },
      {
        id: 18,
        name: "Alfombra Minimalista",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Alfombra minimalista en tonos neutros",
      },
    ],
  },
  {
    id: "almohadas",
    name: "Almohadas",
    products: [
      {
        id: 19,
        name: "Almohada Decorativa",
        price: 39.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Almohada decorativa con estampado floral",
      },
      {
        id: 20,
        name: "Almohada de Soportes",
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Almohada ergonómica para soporte lumbar",
      },
      {
        id: 21,
        name: "Almohada de Diseño",
        price: 59.99,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Almohada con diseño moderno y textura única",
      },
    ],
  },
];

const Categories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const categoryIndex = categories.findIndex((cat) => cat.id === hash);
      if (categoryIndex !== -1) {
        setSelectedCategory(categoryIndex);
      }
    }
  }, []);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nuestros Productos
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-scrollButtons": {
              display: isMobile ? "block" : "none",
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={category.name}
              sx={{
                minWidth: isMobile ? "auto" : 160,
                px: isMobile ? 2 : 3,
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        {categories[selectedCategory].products.map((product) => (
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
                height={isMobile ? "200" : "300"}
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => addItem(product)}
                  >
                    Agregar al Carrito
                  </Button>
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

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          open={isDetailsOpen}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  );
};

export default Categories;
