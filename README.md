# Muebles Punto Fijo - Tienda Online

Una tienda online de muebles moderna y funcional construida con React y Material-UI.

## Características

- Diseño moderno y responsivo
- Catálogo de productos con tarjetas
- Carrito de compras funcional
- Integración con PayPal para pagos
- Páginas informativas (Inicio, Categorías, Sobre Nosotros)

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/muebles-punto-fijo.git
cd muebles-punto-fijo
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y agrega:

```
REACT_APP_PAYPAL_CLIENT_ID=tu_client_id_de_paypal
```

4. Inicia el servidor de desarrollo:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
src/
  ├── components/     # Componentes reutilizables
  ├── pages/         # Páginas principales
  ├── store/         # Estado global (Zustand)
  ├── App.js         # Componente principal
  └── index.js       # Punto de entrada
```

## Tecnologías Utilizadas

- React
- Material-UI
- React Router
- Zustand (Gestión de estado)
- PayPal React SDK

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
