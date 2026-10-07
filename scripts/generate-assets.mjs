import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generador de SVG para productos y maquinaria
function makeProductSvg(title, category, sku, iconType = 'cog') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4F6FA" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#0A3D91" />
      <stop offset="50%" stop-color="#061B4B" />
      <stop offset="100%" stop-color="#030E29" />
    </linearGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#CBD5E1" stroke-width="0.75" stroke-dasharray="2,2"/>
    </pattern>
  </defs>
  <rect width="600" height="450" fill="url(#bgGrad)"/>
  <rect width="600" height="450" fill="url(#grid)" opacity="0.6"/>

  <!-- Sombra base del producto -->
  <ellipse cx="300" cy="360" rx="190" ry="24" fill="#061B4B" opacity="0.12"/>
  <ellipse cx="300" cy="358" rx="140" ry="16" fill="#061B4B" opacity="0.18"/>

  <!-- Geometría técnica del repuesto -->
  <g transform="translate(300, 205)">
    <!-- Disco/Carcasa exterior -->
    <circle r="125" fill="#FFFFFF" stroke="#0A3D91" stroke-width="4"/>
    <circle r="115" fill="url(#metalGrad)"/>
    <circle r="85" fill="#FFFFFF" stroke="#FDB913" stroke-width="4"/>
    <circle r="72" fill="#061B4B"/>

    <!-- Dientes de engranaje o álabes -->
    <path d="M-15 -145 L15 -145 L10 -115 L-10 -115 Z" fill="#FDB913"/>
    <path d="M-15 145 L15 145 L10 115 L-10 115 Z" fill="#FDB913"/>
    <path d="M-145 -15 L-145 15 L-115 10 L-115 -10 Z" fill="#FDB913"/>
    <path d="M145 -15 L145 15 L115 10 L115 -10 Z" fill="#FDB913"/>

    <path d="M-105 -105 L-85 -125 L-70 -100 L-90 -80 Z" fill="#0A3D91"/>
    <path d="M105 105 L85 125 L70 100 L90 80 Z" fill="#0A3D91"/>
    <path d="M-105 105 L-85 125 L-70 100 L-90 80 Z" fill="#0A3D91"/>
    <path d="M105 -105 L85 -125 L70 -100 L90 -80 Z" fill="#0A3D91"/>

    <!-- Núcleo con detalle amarillo -->
    <circle r="36" fill="#FDB913"/>
    <circle r="18" fill="#061B4B"/>
    <circle r="6" fill="#FFFFFF"/>
  </g>

  <!-- Tag esquina superior -->
  <g transform="translate(24, 28)">
    <rect width="130" height="26" rx="6" fill="#0A3D91"/>
    <text x="65" y="17" fill="#FFFFFF" font-family="'Barlow', sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">${category.toUpperCase()}</text>
  </g>

  <!-- SKU badge esquina inferior izquierda -->
  <g transform="translate(24, 400)">
    <rect width="170" height="26" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="85" y="17" fill="#061B4B" font-family="'Inter', monospace" font-size="11" font-weight="600" text-anchor="middle">SKU: ${sku}</text>
  </g>

  <!-- Insignia Certificado Calidad -->
  <g transform="translate(515, 45)">
    <circle r="26" fill="#FDB913" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.15))"/>
    <text x="0" y="-3" fill="#061B4B" font-family="'Barlow Condensed', sans-serif" font-size="10" font-weight="800" text-anchor="middle">CALIDAD</text>
    <text x="0" y="9" fill="#061B4B" font-family="'Barlow Condensed', sans-serif" font-size="10" font-weight="800" text-anchor="middle">OEM 100%</text>
  </g>
</svg>`;
}

// Generador de SVG para Servicios / Hero
function makeServiceSvg(title, subtitle, accentColor = '#0A3D91', type = 'ship') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0A225C"/>
      <stop offset="65%" stop-color="#061B4B"/>
      <stop offset="100%" stop-color="#030E29"/>
    </linearGradient>
    <linearGradient id="goldAngle" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDB913"/>
      <stop offset="100%" stop-color="#FED564"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#skyGrad)"/>

  <!-- Líneas diagonales dinámicas tipo VL -->
  <polygon points="550,0 620,0 480,500 410,500" fill="#0A3D91" opacity="0.35"/>
  <polygon points="640,0 700,0 560,500 500,500" fill="url(#goldAngle)" opacity="0.25"/>
  <polygon points="720,0 800,0 680,500 600,500" fill="#0A3D91" opacity="0.4"/>

  <!-- Líneas de horizonte y océano/terreno -->
  <rect y="360" width="800" height="140" fill="#041235"/>
  <line x1="0" y1="360" x2="800" y2="360" stroke="#FDB913" stroke-width="2" opacity="0.6"/>

  <!-- Gráficos estilizados según tipo -->
  ${
    type === 'ship'
      ? `
    <!-- Silueta Barco Portacontenedores -->
    <path d="M120 370 L240 370 L650 370 L680 340 L160 340 Z" fill="#0A3D91"/>
    <path d="M160 340 L650 340 L620 310 L200 310 Z" fill="#072E6F"/>
    <!-- Contenedores apilados -->
    <rect x="220" y="270" width="70" height="36" fill="#FDB913" rx="2"/>
    <rect x="295" y="270" width="70" height="36" fill="#0A3D91" stroke="#3B82F6" rx="2"/>
    <rect x="370" y="270" width="70" height="36" fill="#E2E8F0" rx="2"/>
    <rect x="445" y="270" width="70" height="36" fill="#FDB913" rx="2"/>
    <rect x="260" y="230" width="70" height="36" fill="#0A3D91" rx="2"/>
    <rect x="335" y="230" width="70" height="36" fill="#FDB913" rx="2"/>
    <rect x="410" y="230" width="70" height="36" fill="#E2E8F0" rx="2"/>
    <!-- Puente de mando -->
    <polygon points="530,310 530,210 590,210 610,310" fill="#E2E8F0"/>
    <rect x="540" y="230" width="40" height="12" fill="#061B4B"/>
    `
      : type === 'plane'
      ? `
    <!-- Silueta Avión de Carga -->
    <g transform="translate(420, 180) scale(1.1)">
      <ellipse cx="0" cy="0" rx="160" ry="32" fill="#F4F6FA"/>
      <path d="M-40 0 L-130 -110 L-70 -110 L20 0 Z" fill="#0A3D91"/>
      <path d="M-50 0 L-140 100 L-80 100 L10 0 Z" fill="#072E6F"/>
      <path d="M110 -15 L160 0 L110 15 Z" fill="#FDB913"/>
      <polygon points="-160,0 -190,-45 -140,-45 -125,0" fill="#0A3D91"/>
    </g>
    `
      : type === 'truck'
      ? `
    <!-- Camión de Carga Pesada -->
    <g transform="translate(180, 220)">
      <rect x="0" y="40" width="280" height="90" fill="#F4F6FA" rx="4"/>
      <rect x="5" y="45" width="270" height="80" fill="#0A3D91" rx="3"/>
      <path d="M285 60 L350 60 L380 95 L380 130 L285 130 Z" fill="#FDB913"/>
      <polygon points="310,70 345,70 365,95 310,95" fill="#061B4B"/>
      <!-- Ruedas -->
      <circle cx="50" cy="135" r="22" fill="#0A0A0A" stroke="#CBD5E1" stroke-width="4"/>
      <circle cx="100" cy="135" r="22" fill="#0A0A0A" stroke="#CBD5E1" stroke-width="4"/>
      <circle cx="230" cy="135" r="22" fill="#0A0A0A" stroke="#CBD5E1" stroke-width="4"/>
      <circle cx="340" cy="135" r="22" fill="#0A0A0A" stroke="#CBD5E1" stroke-width="4"/>
    </g>
    `
      : `
    <!-- Almacén y Maquinaria -->
    <g transform="translate(150, 160)">
      <polygon points="50,180 50,70 200,20 350,70 350,180" fill="#0A3D91"/>
      <polygon points="200,20 350,70 500,20 350,-20" fill="#072E6F"/>
      <polygon points="350,70 350,180 500,140 500,20" fill="#061B4B"/>
      <!-- Puerta de carga -->
      <rect x="130" y="110" width="90" height="70" fill="#FDB913"/>
      <line x1="130" y1="125" x2="220" y2="125" stroke="#061B4B" stroke-width="2"/>
      <line x1="130" y1="140" x2="220" y2="140" stroke="#061B4B" stroke-width="2"/>
      <line x1="130" y1="155" x2="220" y2="155" stroke="#061B4B" stroke-width="2"/>
    </g>
    `
  }

  <!-- Título flotante -->
  <g transform="translate(60, 90)">
    <rect x="-10" y="-30" width="340" height="75" rx="8" fill="#061B4B" opacity="0.85" stroke="#FDB913" stroke-width="2"/>
    <text x="15" y="0" fill="#FDB913" font-family="'Barlow Condensed', sans-serif" font-size="14" font-weight="800" letter-spacing="2">VALLE LOGISTICS &amp; IMPORT</text>
    <text x="15" y="28" fill="#FFFFFF" font-family="'Barlow Condensed', sans-serif" font-size="24" font-weight="800">${title.toUpperCase()}</text>
  </g>
</svg>`;
}

// Generador de logos de marcas aliadas
function makeBrandSvg(name, index) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="100%" height="100%">
  <g transform="translate(10, 15)">
    <rect x="5" y="10" width="32" height="32" rx="6" fill="#0A3D91"/>
    <polygon points="12,18 30,18 21,34" fill="#FDB913"/>
    <text x="48" y="32" fill="#061B4B" font-family="'Barlow Condensed', sans-serif" font-size="20" font-weight="800" letter-spacing="0.5">${name.toUpperCase()}</text>
  </g>
</svg>`;
}

// Generar Team Avatar
function makeTeamSvg(name, role) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
  <defs>
    <linearGradient id="teamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A3D91"/>
      <stop offset="100%" stop-color="#061B4B"/>
    </linearGradient>
  </defs>
  <rect width="400" height="480" fill="url(#teamGrad)"/>
  <circle cx="200" cy="180" r="85" fill="#E2E8F0"/>
  <path d="M80 430 C80 300 320 300 320 430 Z" fill="#FDB913"/>
  <circle cx="200" cy="175" r="65" fill="#CBD5E1"/>
  <rect x="180" y="280" width="40" height="50" fill="#0A3D91"/>
  <!-- Etiqueta inferior -->
  <rect y="400" width="400" height="80" fill="#061B4B"/>
  <text x="200" y="435" fill="#FFFFFF" font-family="'Barlow', sans-serif" font-size="18" font-weight="700" text-anchor="middle">${name}</text>
  <text x="200" y="460" fill="#FDB913" font-family="'Inter', sans-serif" font-size="13" text-anchor="middle">${role}</text>
</svg>`;
}

// 1. Generar imágenes de servicios y banners
const serviceSvgs = [
  { file: 'hero-cargo-ship.jpg', title: 'Transporte Marítimo Internacional', sub: 'Rutas Globales', type: 'ship' },
  { file: 'hero-truck.jpg', title: 'Flota Terrestre Monitoreada', sub: 'Conexión Nacional', type: 'truck' },
  { file: 'hero-plane.jpg', title: 'Carga Aérea Prioritaria', sub: 'Envíos Urgentes', type: 'plane' },
  { file: 'hero-containers.jpg', title: 'Terminal de Contenedores', sub: 'Almacenaje Seguro', type: 'warehouse' },
  { file: 'about-operation.jpg', title: 'Operaciones Logísticas de Excelencia', sub: '15 Años de Experiencia', type: 'warehouse' },
  { file: 'about-warehouse.jpg', title: 'Centros de Distribución & Depósito', sub: 'Control Tecnológico', type: 'warehouse' },
  { file: 'service-maritime.jpg', title: 'FCL & LCL Carga Marítima', sub: 'Puertos Mundiales', type: 'ship' },
  { file: 'service-air.jpg', title: 'Vuelos Directos y Courier', sub: 'Máxima Velocidad', type: 'plane' },
  { file: 'service-land.jpg', title: 'Transporte Terrestre Especializado', sub: 'Cama Baja y Furgón', type: 'truck' },
  { file: 'service-customs.jpg', title: 'Agenciamiento Aduanero y Trámites', sub: 'Nacionalización Ágil', type: 'warehouse' },
  { file: 'service-warehousing.jpg', title: 'Almacenaje y Despacho', sub: 'Seguridad Integral', type: 'warehouse' },
  { file: 'service-machinery-parts.jpg', title: 'Repuestos Originales & Alternativos', sub: 'Para Maquinaria Pesada', type: 'warehouse' },
  { file: 'service-consulting.jpg', title: 'Asesoría en Comercio Exterior', sub: 'Optimización de Costos', type: 'warehouse' },
  { file: 'promo-banner-1.jpg', title: 'Repuestos Originales y Alternativos', sub: 'Entrega Inmediata', type: 'warehouse' },
  { file: 'promo-banner-2.jpg', title: 'Maquinaria Pesada y Componentes', sub: 'Garantía Comprobada', type: 'truck' },
];

serviceSvgs.forEach((s) => {
  fs.writeFileSync(path.join(outDir, s.file), makeServiceSvg(s.title, s.sub, '#0A3D91', s.type));
});

// 2. Generar categorías
const categories = [
  { id: 'cat-motor.jpg', name: 'Motor', sku: 'MOT-CAT' },
  { id: 'cat-hydraulic.jpg', name: 'Sistema Hidráulico', sku: 'HYD-CAT' },
  { id: 'cat-undercarriage.jpg', name: 'Tren de Rodaje', sku: 'TRK-CAT' },
  { id: 'cat-transmission.jpg', name: 'Transmisión', sku: 'TRN-CAT' },
  { id: 'cat-brakes.jpg', name: 'Frenos', sku: 'BRK-CAT' },
  { id: 'cat-electric.jpg', name: 'Sistema Eléctrico', sku: 'ELC-CAT' },
  { id: 'cat-filters.jpg', name: 'Filtros y Lubricantes', sku: 'FLT-CAT' },
  { id: 'cat-bucket.jpg', name: 'Cuchillas y Dientes', sku: 'GET-CAT' },
];

categories.forEach((c) => {
  fs.writeFileSync(path.join(outDir, c.id), makeProductSvg(c.name, c.name, c.sku));
});

// 3. Generar productos individuales
const products = [
  { file: 'product-turbo.jpg', name: 'Turbocompresor Garrett Stage 3 HD', cat: 'Motor', sku: 'TUR-CAT-3406E' },
  { file: 'product-injection-pump.jpg', name: 'Bomba de Inyección Common Rail', cat: 'Motor', sku: 'BOS-CR-0445' },
  { file: 'product-pistons.jpg', name: 'Kit de Pistones y Camisas', cat: 'Motor', sku: 'PST-KOM-SAA6D' },
  { file: 'product-hydraulic-pump.jpg', name: 'Bomba Principal Hidráulica', cat: 'Hidráulica', sku: 'HYD-K3V112DT' },
  { file: 'product-hydraulic-cylinder.jpg', name: 'Cilindro Hidráulico Brazo Boom', cat: 'Hidráulica', sku: 'CYL-VOL-EC210' },
  { file: 'product-seals-kit.jpg', name: 'Kit Sellos Hidráulicos Viton', cat: 'Hidráulica', sku: 'SL-KIT-CAT330' },
  { file: 'product-track-chain.jpg', name: 'Cadena de Oruga Sellada SALT', cat: 'Tren Rodaje', sku: 'TRK-BER-D6T' },
  { file: 'product-roller.jpg', name: 'Rodillo Inferior Doble Pestaña', cat: 'Tren Rodaje', sku: 'ROL-INF-PC400' },
  { file: 'product-idler.jpg', name: 'Rueda Guía Tensor Idler Wheel', cat: 'Tren Rodaje', sku: 'IDL-WHL-CAT320' },
  { file: 'product-torque-converter.jpg', name: 'Convertidor de Par Hidrodinámico', cat: 'Transmisión', sku: 'CNV-DANA-C270' },
  { file: 'product-clutch-disc.jpg', name: 'Discos Fricción Bronce Sinterizado', cat: 'Transmisión', sku: 'DSC-FRC-980G' },
  { file: 'product-brake-disc.jpg', name: 'Disco de Freno Húmedo Heavy Duty', cat: 'Frenos', sku: 'BRK-DSC-ZF200' },
  { file: 'product-brake-valve.jpg', name: 'Válvula Moduladora de Frenado', cat: 'Frenos', sku: 'VLV-WAB-4721' },
  { file: 'product-alternator.jpg', name: 'Alternador Industrial 24V 120A', cat: 'Eléctrico', sku: 'ALT-DR-28SI' },
  { file: 'product-starter.jpg', name: 'Motor de Arranque Reductor 24V', cat: 'Eléctrico', sku: 'STR-24V-9KW' },
  { file: 'product-sensors.jpg', name: 'Kit de Sensores Presión y Temp.', cat: 'Eléctrico', sku: 'SNS-KIT-C13' },
  { file: 'product-filter.jpg', name: 'Juego Filtros Donaldson Endurance', cat: 'Filtros', sku: 'FLT-DON-DBA' },
  { file: 'product-fuel-separator.jpg', name: 'Filtro Separador de Agua Combustible', cat: 'Filtros', sku: 'RAC-1000FH' },
  { file: 'product-bucket-teeth.jpg', name: 'Puntas Dientes Cucharón J350', cat: 'GET Cuchillas', sku: 'GET-J350-1U' },
  { file: 'product-blade.jpg', name: 'Cuchilla de Cucharón Acero HB500', cat: 'GET Cuchillas', sku: 'BLD-HB500' },
];

products.forEach((p) => {
  fs.writeFileSync(path.join(outDir, p.file), makeProductSvg(p.name, p.cat, p.sku));
});

// 4. Marcas aliadas
for (let i = 1; i <= 6; i++) {
  const brandNames = ['LogistiCore', 'FreightEx', 'Cargoway', 'TransWorld', 'ShipMaster', 'InterPort'];
  fs.writeFileSync(path.join(outDir, `brand-${i}.svg`), makeBrandSvg(brandNames[i - 1], i));
}

// 5. Team
const team = [
  { name: 'Ing. Carlos Mendoza', role: 'Director General' },
  { name: 'Lic. Mariana Paredes', role: 'Gerente Aduanera' },
  { name: 'Ing. Roberto Alarcón', role: 'Jefe de Repuestos' },
  { name: 'Valeria Quispe', role: 'Líder Customer Care' },
];
team.forEach((t, i) => {
  fs.writeFileSync(path.join(outDir, `team-${i + 1}.jpg`), makeTeamSvg(t.name, t.role));
});

console.log('Todos los assets y placeholders generados exitosamente en public/images/');
