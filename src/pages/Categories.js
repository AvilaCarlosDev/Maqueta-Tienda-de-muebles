/**
 * Página de Categorías
 *
 * Este componente muestra los productos organizados por categorías.
 * Permite filtrar productos por categoría y ver detalles de cada producto.
 * Incluye un sistema de pestañas para navegación entre categorías.
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCartStore } from "../store/cartStore";
import ProductDetails from "../components/ProductDetails";
import { useLocation } from "react-router-dom";

/**
 * Datos de productos organizados por categoría
 * Cada categoría contiene un array de productos con sus propiedades
 */
const productsByCategory = {
  muebles: [
    {
      id: 1,
      name: "Sofá Moderno 3 Plazas",
      description: "Sofá elegante con diseño contemporáneo y máxima comodidad",
      price: 599.99,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
      category: "muebles",
    },
    {
      id: 2,
      name: "Sofá Seccional L",
      description: "Sofá seccional en forma de L con chaise lounge",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&auto=format&fit=crop&q=60",
      category: "muebles",
    },
    {
      id: 3,
      name: "Sofá Chesterfield",
      description: "Sofá clásico con diseño victoriano y detalles en cuero",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&auto=format&fit=crop&q=60",
      category: "muebles",
    },
  ],
  mesas: [
    {
      id: 4,
      name: "Mesa de Centro Moderna",
      description: "Mesa de centro con diseño minimalista y acabado en mármol",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60",
      category: "mesas",
    },
    {
      id: 5,
      name: "Mesa de Comedor",
      description: "Mesa de comedor extensible para 6-8 personas",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60",
      category: "mesas",
    },
    {
      id: 6,
      name: "Mesa de Café",
      description: "Mesa de café con diseño industrial",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60",
      category: "mesas",
    },
  ],
  sillas: [
    {
      id: 7,
      name: "Silla de Oficina Ergonómica",
      description: "Silla ergonómica con soporte lumbar y reposacabezas",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60",
      category: "sillas",
    },
    {
      id: 8,
      name: "Silla de Comedor",
      description: "Silla de comedor con diseño escandinavo",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60",
      category: "sillas",
    },
    {
      id: 9,
      name: "Silla Acapulco",
      description: "Silla de exterior con diseño retro",
      price: 179.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60",
      category: "sillas",
    },
  ],
  cuadros: [
    {
      id: 10,
      name: "Cuadro Abstracto Moderno",
      description: "Cuadro decorativo con arte abstracto contemporáneo",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60",
      category: "cuadros",
    },
    {
      id: 11,
      name: "Cuadro Paisaje",
      description: "Cuadro con paisaje natural en estilo impresionista",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60",
      category: "cuadros",
    },
  ],
  espejos: [
    {
      id: 12,
      name: "Espejo de Pared Moderno",
      description: "Espejo decorativo con marco dorado",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60",
      category: "espejos",
    },
    {
      id: 13,
      name: "Espejo de Piso",
      description: "Espejo de cuerpo completo con marco elegante",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60",
      category: "espejos",
    },
  ],
  alfombras: [
    {
      id: 14,
      name: "Alfombra Persa",
      description: "Alfombra persa tradicional con diseño oriental",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=60",
      category: "alfombras",
    },
    {
      id: 15,
      name: "Alfombra Moderna",
      description: "Alfombra contemporánea con diseño geométrico",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=60",
      category: "alfombras",
    },
  ],
  almohadas: [
    {
      id: 16,
      name: "Almohada Decorativa",
      description: "Almohada decorativa con estampado floral",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=60",
      category: "almohadas",
    },
    {
      id: 17,
      name: "Cojín de Sillón",
      description: "Cojín ergonómico para sillas y sillones",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=60",
      category: "almohadas",
    },
  ],
};

/**
 * Componente principal de Categorías
 */
const Categories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("muebles");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem } = useCartStore();

  /**
   * Efecto para manejar la navegación por hash
   * Permite acceder directamente a una categoría específica
   */
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setSelectedCategory(hash);
    }
  }, [location.hash]);

  /**
   * Maneja el cambio de categoría
   * @param {Object} event - Evento del cambio de pestaña
   * @param {string} newValue - Nueva categoría seleccionada
   */
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    window.location.hash = newValue;
  };

  /**
   * Maneja la selección de un producto para ver sus detalles
   * @param {Object} product - Producto seleccionado
   */
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  /**
   * Cierra el diálogo de detalles del producto
   */
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  /**
   * Maneja la adición de un producto al carrito
   * @param {Object} product - Producto a agregar al carrito
   */
  const handleAddToCart = (product) => {
    addItem(product);
    handleCloseDetails();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Título de la página - solo se muestra cuando se accede directamente */}
      {!location.hash && (
        <Typography variant="h4" component="h1" gutterBottom>
          Categorías
        </Typography>
      )}

      {/* Pestañas de categorías */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
        >
          {Object.keys(productsByCategory).map((category) => (
            <Tab
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={category}
            />
          ))}
        </Tabs>
      </Box>

      {/* Grid de productos */}
      <Grid container spacing={4}>
        {productsByCategory[selectedCategory].map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              {/* Imagen del producto */}
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              {/* Información del producto */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              {/* Botones de acción */}
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleProductClick(product)}
                  fullWidth
                >
                  Ver más detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de detalles del producto */}
      <ProductDetails
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={handleCloseDetails}
        onAddToCart={handleAddToCart}
      />
    </Container>
  );
};

export default Categories;
