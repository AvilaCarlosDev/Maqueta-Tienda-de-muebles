/**
 * Contexto de Idioma
 *
 * Proporciona la funcionalidad de cambio de idioma a toda la aplicación.
 * Soporta español (es) e inglés (en) como idiomas disponibles.
 */

import React, { createContext, useState, useContext, useEffect } from "react";

// Traducciones disponibles para toda la aplicación
export const translations = {
  es: {
    // Navegación
    home: "Inicio",
    categories: "Categorías",
    aboutUs: "Sobre Nosotros",
    cart: "Carrito",
    contact: "Contáctanos",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    switchToEnglish: "Cambiar a inglés",

    // Categorías
    furniture: "Muebles",
    tables: "Mesas",
    chairs: "Sillas",
    paintings: "Cuadros",
    mirrors: "Espejos",
    carpets: "Alfombras",
    pillows: "Almohadas",
    selectCategory: "Seleccionar categoría",
    allCategories: "Todas las categorías",

    // Carrito
    addToCart: "Agregar al Carrito",
    viewDetails: "Ver Detalles",
    checkout: "Pagar",
    emptyCart: "Carrito Vacío",
    total: "Total",
    removeFromCart: "Eliminar del Carrito",
    clearCart: "Vaciar Carrito",
    continueShopping: "Continuar Comprando",
    cartSummary: "Resumen del Carrito",
    shippingInfo: "Información de Envío",
    paymentMethod: "Método de Pago",

    // Producto
    price: "Precio",
    description: "Descripción",
    quantity: "Cantidad",
    available: "Disponible",
    outOfStock: "Agotado",
    dimensions: "Dimensiones",
    material: "Material",
    color: "Color",
    brand: "Marca",

    // Footer
    schedule: "Horario",
    quickLinks: "Enlaces Rápidos",
    rights: "Todos los derechos reservados",
    businessHours: "Horario de Atención",
    weekdays: "Lunes a Viernes",
    saturdays: "Sábados",
    followUs: "Síguenos",
    newsletter: "Boletín de Noticias",
    subscribeText: "Suscríbete para recibir noticias y ofertas",

    // Sobre Nosotros
    aboutUsTitle: "Sobre Nosotros",
    ourMission: "Nuestra Misión",
    ourVision: "Nuestra Visión",
    ourValues: "Nuestros Valores",
    ourHistory: "Nuestra Historia",
    ourTeam: "Nuestro Equipo",

    // Contacto
    phoneNumber: "Teléfono",
    email: "Correo Electrónico",
    whatsapp: "WhatsApp",
    address: "Dirección",
    contactForm: "Formulario de Contacto",
    sendMessage: "Enviar Mensaje",
    name: "Nombre",
    subject: "Asunto",
    message: "Mensaje",

    // Mensajes
    welcome: "Bienvenido a MPF Muebles",
    featuredProducts: "Productos Destacados",
    newArrivals: "Nuevos Productos",
    specialOffers: "Ofertas Especiales",
    subscribe: "Suscribirse",
    thankYou: "¡Gracias por tu compra!",
    errorMessage: "Ha ocurrido un error",
    loading: "Cargando...",
  },
  en: {
    // Navigation
    home: "Home",
    categories: "Categories",
    aboutUs: "About Us",
    cart: "Cart",
    contact: "Contact Us",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    switchToSpanish: "Switch to Spanish",

    // Categories
    furniture: "Furniture",
    tables: "Tables",
    chairs: "Chairs",
    paintings: "Paintings",
    mirrors: "Mirrors",
    carpets: "Carpets",
    pillows: "Pillows",
    selectCategory: "Select category",
    allCategories: "All categories",

    // Cart
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    checkout: "Checkout",
    emptyCart: "Empty Cart",
    total: "Total",
    removeFromCart: "Remove from Cart",
    clearCart: "Clear Cart",
    continueShopping: "Continue Shopping",
    cartSummary: "Cart Summary",
    shippingInfo: "Shipping Information",
    paymentMethod: "Payment Method",

    // Product
    price: "Price",
    description: "Description",
    quantity: "Quantity",
    available: "Available",
    outOfStock: "Out of Stock",
    dimensions: "Dimensions",
    material: "Material",
    color: "Color",
    brand: "Brand",

    // Footer
    schedule: "Schedule",
    quickLinks: "Quick Links",
    rights: "All rights reserved",
    businessHours: "Business Hours",
    weekdays: "Monday to Friday",
    saturdays: "Saturdays",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    subscribeText: "Subscribe to receive news and offers",

    // About Us
    aboutUsTitle: "About Us",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    ourValues: "Our Values",
    ourHistory: "Our History",
    ourTeam: "Our Team",

    // Contact
    phoneNumber: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    address: "Address",
    contactForm: "Contact Form",
    sendMessage: "Send Message",
    name: "Name",
    subject: "Subject",
    message: "Message",

    // Messages
    welcome: "Welcome to MPF Furniture",
    featuredProducts: "Featured Products",
    newArrivals: "New Arrivals",
    specialOffers: "Special Offers",
    subscribe: "Subscribe",
    thankYou: "Thank you for your purchase!",
    errorMessage: "An error has occurred",
    loading: "Loading...",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Intentar obtener el idioma guardado en localStorage, si no existe usar 'es'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "es";
  });

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    // Actualizar el atributo lang del HTML para accesibilidad
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key) => {
    // Si la traducción no existe, devolver la clave
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
