# Plan de Migración a Vite

## Objetivo
Migrar de Create React App (react-scripts) a Vite para:
- ✅ Eliminar 24 vulnerabilidades de seguridad
- ✅ Mejorar tiempos de build (10-100x más rápido)
- ✅ Mejor experiencia de desarrollo (HMR instantáneo)
- ✅ Configuración más simple y moderna

## Estado Actual
- **Framework:** React 19.2.0
- **Build Tool:** react-scripts@5.0.1 (Create React App)
- **Bundle Size:** ~2.5MB (con dependencias)
- **Build Time:** ~2-3 minutos

## Pasos de Migración

### Fase 1: Preparación (Día 1-2)

#### 1.1 Instalar dependencias de Vite
```bash
npm install -D vite @vitejs/plugin-react
npm install -D @svgr/webpack  # Para importar SVGs como componentes
```

#### 1.2 Crear `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

#### 1.3 Actualizar `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx"
  }
}
```

### Fase 2: Ajustes de Código (Día 3-4)

#### 2.1 Actualizar `index.html`
Mover `public/index.html` a la raíz y actualizar:
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Muebles Punto Fijo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

#### 2.2 Actualizar imports de assets
- Cambiar `import logo from './logo.png'` (ya funciona igual en Vite)
- Variables de entorno: Cambiar `REACT_APP_` por `VITE_`

#### 2.3 Actualizar variables de entorno
```bash
# .env → .env.local
REACT_APP_PAYPAL_CLIENT_ID=xxx → VITE_PAYPAL_CLIENT_ID=xxx
```

### Fase 3: Testing (Día 5-6)

#### 3.1 Verificar builds
```bash
npm run build
npm run preview
```

#### 3.2 Testear funcionalidades críticas
- [ ] Carrito de compras
- [ ] Integración con PayPal
- [ ] Navegación entre páginas
- [ ] Theme oscuro/claro
- [ ] Responsive design

### Fase 4: Deploy (Día 7)

#### 4.1 Actualizar configuración de Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 4.2 Deploy de prueba
- Deploy a staging
- Verificar en producción

## Beneficios Esperados

| Métrica | Antes (CRA) | Después (Vite) | Mejora |
|---------|-------------|----------------|--------|
| Dev startup | ~30s | ~1s | 30x |
| HMR update | ~3s | ~50ms | 60x |
| Build time | ~120s | ~15s | 8x |
| Bundle size | ~2.5MB | ~1.8MB | 28% |
| Vulnerabilidades | 24 | 0 | 100% |

## Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Break changes en imports | Bajo | Medio | Testing exhaustivo |
| Plugins incompatibles | Medio | Bajo | Buscar alternativas Vite |
| Config de build incorrecta | Bajo | Alto | Seguir docs oficiales |

## Recursos
- [Vite Migration Guide](https://vitejs.dev/guide/migration-from-cra.html)
- [Vite + React Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Comparison: CRA vs Vite](https://vitejs.dev/guide/why.html)

---
*Estado: 📋 En planificación*
*Última actualización: 2026-04-28*
