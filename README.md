# Valle Logistics and Import - Sitio Web Corporativo

Sitio web corporativo moderno, elegante y de alto rendimiento para **Valle Logistics and Import** ("*Conectamos oportunidades, movemos tu futuro*"). Especialistas en logística internacional, agenciamiento aduanero, flete marítimo, aéreo, terrestre y comercialización de repuestos de alta precisión para maquinaria pesada.

---

## 🚀 Tecnologías Principales (Stack)

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) en modo estricto (`strict: true`, cero `any`)
- **Enrutamiento:** [React Router DOM v6](https://reactrouter.com/) con `React.lazy`, `Suspense` y restablecimiento de scroll
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) (transición fluida entre páginas, scroll reveal, contadores numéricos y reordenamiento de catálogo)
- **Estilos:** [Tailwind CSS v3](https://tailwindcss.com/) con paleta corporativa y cortes diagonales inspirados en el monograma **VL**
- **Íconos:** [Lucide React](https://lucide.dev/)
- **Formularios & Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **SEO & Metadatos:** [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

## 🎨 Identidad Visual & Paleta de Colores

La paleta y formas geométricas fueron extraídas directamente de la identidad del logo **VL**:

- **Azul Principal:** `#0A3D91` (`brand.blue`)
- **Azul Marino Oscuro (Fondos hero, stats, footer):** `#061B4B` (`brand.navy`)
- **Amarillo de Acento (CTAs, insignias, detalles):** `#FDB913` (`brand.yellow`)
- **Negro Titulares:** `#0A0A0A` (`brand.dark`)
- **Blanco:** `#FFFFFF`
- **Gris Claro de Fondo Alternado:** `#F4F6FA` (`brand.light`)
- **Tipografías (Google Fonts):**
  - Titulares: *Barlow Condensed* y *Barlow*
  - Textos de cuerpo: *Inter* y *Montserrat*

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/                  # Logo corporativo (logo.png)
├── animations/              # Variantes de animación centralizadas (variants.ts)
├── components/
│   ├── layout/              # TopBar, Header sticky, Footer, MainLayout, WhatsAppButton, ScrollToTop
│   ├── ui/                  # Button, SectionTitle, Reveal, Counter, Badge, Accordion, Modal, PageBanner, SEO
│   ├── home/                # Secciones del Home (Hero, Partners, WhyUs, Stats, FeaturedServices)
│   ├── services/            # Secciones de Servicios (Grid, Process, Benefits, QuoteCTA)
│   ├── products/            # Secciones de Productos (Banner, CategoriesGrid, Catalog, Promos, HowToOrder)
│   ├── about/               # Secciones de Nosotros (History, MissionVision, Team, Alliances)
│   └── contact/             # Secciones de Contacto (FormSection, MapSection, QuickChannels, FAQSection)
├── data/
│   ├── company.ts           # Información corporativa centralizada con placeholders explícitos
│   ├── services.ts          # Portafolio de 7 servicios y 5 pasos de importación
│   ├── products.ts          # 20 repuestos técnicos con SKU, compatibilidad, marcas y precios
│   ├── about.ts             # Equipo directivo, alianzas, certificaciones, misión y visión
│   └── faq.ts               # Preguntas frecuentes con respuestas técnicas y aduaneras
├── pages/                   # Las 5 páginas principales (Home, Services, Products, About, Contact)
├── types/                   # Interfaces TypeScript estrictas
├── App.tsx                  # Envoltura con HelmetProvider y RouterProvider
├── index.css                # Directivas Tailwind, cortes diagonales y scrollbar personalizado
├── main.tsx                 # Bootstrap de la aplicación React
└── router.tsx               # Definición de rutas con carga perezosa
```

---

## 📄 Estructura de Páginas (Máximo 5 Secciones Cada Una)

1. **Inicio (`/`):**
   - Hero dinámico con fondo azul marino, cortes diagonales amarillos, titular, botones y composición de imágenes superpuestas.
   - Franja de marcas aliadas y líneas navieras con efecto hover de escala de grises a color.
   - "¿Por qué elegirnos?" con checklist de 6 puntos en 2 columnas, botón, teléfono e imágenes con insignia de 15 años de experiencia.
   - Banda de estadísticas con 4 contadores animados al entrar al viewport.
   - Servicios destacados con 3 tarjetas interactivas, íconos circulares flotantes y controles de carrusel.

2. **Servicios (`/servicios`):**
   - Banner interno con título, breadcrumb y fondos diagonales.
   - Grilla completa de 7 servicios logísticos y de importación.
   - Línea de tiempo animada del proceso de importación en 5 pasos (Cotización → Compra → Transporte → Aduana → Entrega).
   - Beneficios y diferenciales con íconos.
   - Bloque CTA de cotización rápida con formulario interactivo y WhatsApp.

3. **Productos (`/productos`):**
   - Banner principal oscuro con repuesto destacado, botón y franja de 4 beneficios técnicos.
   - Categorías destacadas con subcategorías y enlace de filtrado directo.
   - Catálogo interactivo completo (sidebar de filtros por buscador, acordeón de categorías, marcas, bloque más vendidos, grilla de 3-4 columnas, tabs de novedades/ofertas, tarjetas con compatibilidad y botón "Cotizar por WhatsApp", y modal de vista rápida).
   - 2 banners promocionales lado a lado (repuestos originales y maquinaria pesada).
   - Sección "Cómo pedir tu repuesto" en 3 sencillos pasos + llamado a la acción.

4. **Nosotros (`/nosotros`):**
   - Banner interno.
   - Historia de la empresa con imagen e insignia de años de experiencia.
   - Misión, Visión y Valores en 3 tarjetas estructuradas.
   - Cifras y equipo humano con perfiles profesionales.
   - Alianzas, certificaciones (OEA, ISO 9001, BASC, IATA) + bloque CTA.

5. **Contacto (`/contacto`):**
   - Banner interno.
   - Formulario de contacto con validación Zod, feedback animado y datos de contacto al lado.
   - Mapa interactivo de ubicación estratégica cerca al puerto del Callao con enlace a Google Maps.
   - Canales rápidos de comunicación (WhatsApp, teléfono, correo, horarios).
   - Preguntas frecuentes en acordeón animado y accesible.

---

## 🛠️ Instalación y Ejecución

Para iniciar el proyecto en desarrollo:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# 3. Compilar para producción (validación de tipos TypeScript y empaquetado Vite)
npm run build

# 4. Previsualizar la compilación de producción
npm run preview
```
