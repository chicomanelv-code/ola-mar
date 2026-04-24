# OlaMar — Ropa Deportiva de Lujo

E-commerce SPA para **OlaMar**, una marca de ropa deportiva de lujo con sede en Cuenca, Ecuador. Interfaz editorial minimalista con interacciones premium, carrito lateral y checkout por WhatsApp.

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 + CSS personalizado |
| Tipografía | Playfair Display + DM Sans (Google Fonts) |
| Estado | React Context + useReducer |
| Deployment | Netlify |

## Funcionalidades

- **Navbar sticky** con grid de 3 columnas, logo centrado, contador de carrito dinámico
- **Hero editorial** a pantalla completa con imagen dividida y botón outline-to-fill
- **Categorías tendencia** — fila de 5 columnas con imágenes circulares
- **Grillas de productos** — 4 columnas (desktop), aspecto 4:5, con selector de talla y botón "Añadir" que aparece al hacer hover
- **Carrito lateral** (side-drawer) desde la derecha con controles de cantidad y total automático
- **Checkout por WhatsApp** — genera mensaje formateado con resumen del pedido y abre `wa.me/593987336646`
- **Botón flotante de WhatsApp** en esquina inferior izquierda
- **Cursor magnético personalizado** con `mix-blend-mode: difference`
- **Animaciones scroll-reveal** con IntersectionObserver
- **Marquee de marca** animado con CSS

## Cómo ejecutarlo localmente

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (con emulación Netlify)
netlify dev

# O solo Vite dev server
npm run dev

# Build de producción
npm run build
```

El servidor de desarrollo corre en `http://localhost:8888` (Netlify CLI) o `http://localhost:3000` (Vite directo).

## Variables de Entorno

No se requieren variables de entorno para la funcionalidad principal (carrito + WhatsApp checkout).
