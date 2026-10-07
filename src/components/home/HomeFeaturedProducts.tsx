import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Truck,
  Tractor,
  Disc,
  Star,
  Eye,
  Layers,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/products';
import { COMPANY_DATA, getProductWhatsAppLink } from '@/data/company';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const HomeFeaturedProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filtrado de productos destacados
  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return PRODUCTS_DATA.slice(0, 8);
    }
    return PRODUCTS_DATA.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    ).slice(0, 8);
  }, [selectedCategory]);

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    const el = document.getElementById('repuestos-destacados');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white pt-20 sm:pt-28 lg:pt-32 pb-16 border-b border-slate-200 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            DIVISOR ELEGANTE Y TÍTULO PROFESIONAL EN EL CENTRO
            ========================================================================= */}
        <div className="mb-12 sm:mb-16">
          <Reveal direction="zoom-in">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="h-[2px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-brand-yellow to-brand-navy/30" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy text-white border border-brand-yellow/50 shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-heading font-black uppercase tracking-widest text-brand-yellow">
                  DIVISIÓN COMERCIAL &amp; SUMINISTRO INDUSTRIAL
                </span>
              </div>
              <div className="h-[2px] flex-1 max-w-xs bg-gradient-to-l from-transparent via-brand-yellow to-brand-navy/30" />
            </div>
          </Reveal>

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Reveal direction="up" delay={0.08}>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-brand-dark leading-tight">
                Importación y Comercialización de Repuestos &amp; Maquinaria Pesada
              </h2>
            </Reveal>
            <Reveal direction="blur" delay={0.16}>
              <p className="text-xs sm:text-sm text-brand-gray max-w-2xl mx-auto leading-relaxed text-justify [text-align-last:center]">
                Coordinamos la compra internacional directa, asesoría técnica en comercio exterior y nacionalización aduanera para flotas de transporte pesado, maquinaria minera y faenas operativas.
              </p>
            </Reveal>
          </div>
        </div>

        {/* =========================================================================
            PARTE 1: CUADRÍCULA DE 3 COLUMNAS / 4 TARJETAS (ESPACIADO EXACTO 7PX)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[7px] mb-14 sm:mb-16">
          {/* =========================================================================
              COLUMNA 1 (AMARILLO): REPUESTOS ACTROS - MERCEDES BENZ
              ========================================================================= */}
          <Reveal direction="left" delay={0.05} distance={40}>
            <div className="relative rounded-2xl overflow-hidden bg-brand-yellow p-6 sm:p-7 flex flex-col justify-between h-[250px] sm:h-[270px] lg:h-[280px] shadow-sm hover:shadow-card border border-amber-300/60 group">
              {/* Rayas diagonales decorativas estilo industrial en esquina superior izquierda */}
              <div
                className="absolute top-0 left-0 w-32 h-24 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #061B4B, #061B4B 5px, transparent 5px, transparent 12px)',
                }}
              />

              {/* Imagen de la llanta/rin cromado en el lado derecho */}
              <div className="absolute right-[-10px] bottom-[-10px] w-44 sm:w-48 lg:w-52 h-44 sm:h-48 lg:h-52 pointer-events-none z-0">
                <img
                  src="/images/promo-wheel-rim-transparent.png"
                  alt="Rueda y repuestos para cabezales Mercedes-Benz Actros"
                  className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 group-hover:rotate-6 transition-transform duration-500"
                />
              </div>

              {/* Textos concisos */}
              <div className="relative z-10 max-w-[200px] sm:max-w-[220px] space-y-1.5">
                <span className="inline-block text-[10px] font-heading font-black uppercase tracking-wider text-red-600 bg-red-600/10 px-2 py-0.5 rounded">
                  LÍNEA ACTROS
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter text-brand-navy leading-none">
                  REPUESTOS<br />ACTROS
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-brand-navy/85 pt-0.5 leading-snug">
                  Mercedes-Benz &amp; flotas
                </p>
              </div>

              {/* Botón blanco compacto */}
              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectCategory('Repuestos y accesorios para Actros - Mercedes Benz')
                  }
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-brand-navy text-brand-navy hover:text-white font-heading font-black text-xs uppercase px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span>VER REPUESTOS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* =========================================================================
              COLUMNA 2 (AZUL): UÑAS DE TRACTOR & MAQUINARIA
              ========================================================================= */}
          <Reveal direction="scale" delay={0.14}>
            <div className="relative rounded-2xl overflow-hidden bg-brand-blue p-6 sm:p-7 flex flex-col justify-between h-[250px] sm:h-[270px] lg:h-[280px] shadow-sm hover:shadow-card border border-blue-400/30 group">
              {/* Patrón de gradiente de iluminación en fondo */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 100% 100%, #ffffff 0, transparent 65%)',
                }}
              />

              {/* Imagen del amortiguador/cilindro hidráulico */}
              <div className="absolute right-[-10px] top-[-10px] w-36 sm:w-42 lg:w-46 h-60 sm:h-68 lg:h-72 pointer-events-none z-0">
                <img
                  src="/images/promo-shock-strut-transparent.png"
                  alt="Cilindro hidráulico y herramientas de corte para maquinaria pesada"
                  className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500"
                />
              </div>

              {/* Textos concisos */}
              <div className="relative z-10 max-w-[190px] sm:max-w-[210px] space-y-1.5">
                <span className="inline-block text-[10px] font-heading font-black uppercase tracking-wider text-brand-yellow bg-white/10 px-2 py-0.5 rounded">
                  HERRAMIENTAS GET
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter text-white leading-none">
                  UÑAS DE<br />TRACTOR
                </h3>
                <p className="text-xs sm:text-sm font-medium text-blue-100 pt-0.5 leading-snug">
                  Dientes CAT &amp; hidráulica
                </p>
              </div>

              {/* Botón blanco compacto */}
              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={() => handleSelectCategory('Repuestos para Maquinaria')}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-brand-navy text-brand-blue hover:text-white font-heading font-black text-xs uppercase px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span>VER REPUESTOS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* =========================================================================
              COLUMNA 3 (DERECHA - 2 TARJETAS APILADAS SIN ETIQUETAS)
              ========================================================================= */}
          <div className="flex flex-col gap-[7px] justify-between h-[250px] sm:h-[270px] lg:h-[280px]">
            {/* TARJETA SUPERIOR: LLANTAS RADIALES & OTR (SIN ETIQUETA, IMAGEN TRANSPARENTE) */}
            <Reveal direction="right" delay={0.18} distance={38} className="flex-1 flex">
              <div
                onClick={() => handleSelectCategory('Llantas')}
                className="w-full relative rounded-2xl overflow-hidden bg-[#0A1124] p-4 sm:p-5 flex flex-col justify-between flex-1 shadow-sm hover:shadow-card border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 cursor-pointer group"
              >
                {/* Imagen sin fondo de llanta de alta calidad */}
                <div className="absolute right-[-6px] bottom-[-6px] w-28 sm:w-32 h-28 sm:h-32 pointer-events-none z-0">
                  <img
                    src="/images/promo-otr-tyres-transparent.png"
                    alt="Llantas radiales y OTR minería sin fondo"
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 max-w-[170px] sm:max-w-[190px] space-y-1">
                  <h4 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white leading-tight">
                    LLANTAS OTR &amp;<br />TRÁILER
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Neumáticos de alta resistencia
                  </p>
                </div>

                <div className="relative z-10 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-heading font-black text-brand-yellow uppercase group-hover:underline">
                    <span>CONSULTAR</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Reveal>

            {/* TARJETA INFERIOR: IMPORTACIÓN DE MAQUINARIA & BATERÍAS (SIN ETIQUETA, IMAGEN TRANSPARENTE) */}
            <Reveal direction="diagonal-right" delay={0.26} distance={38} className="flex-1 flex">
              <div
                onClick={() => {
                  window.open(
                    `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                      'Hola Valle Logistics, requiero información y asesoría para importación de maquinaria y componentes de potencia.'
                    )}`,
                    '_blank'
                  );
                }}
                className="w-full relative rounded-2xl overflow-hidden bg-[#0A1124] p-4 sm:p-5 flex flex-col justify-between flex-1 shadow-sm hover:shadow-card border border-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
              >
                {/* Imagen sin fondo de batería industrial de alta potencia */}
                <div className="absolute right-[-6px] bottom-[-6px] w-28 sm:w-32 h-28 sm:h-32 pointer-events-none z-0">
                  <img
                    src="/images/promo-battery-transparent.png"
                    alt="Baterías industriales y componentes de potencia sin fondo"
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 max-w-[170px] sm:max-w-[190px] space-y-1">
                  <h4 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white leading-tight">
                    MAQUINARIA &amp;<br />PARTES HD
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Compra internacional y aduanas
                  </p>
                </div>

                <div className="relative z-10 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-heading font-black text-white group-hover:text-brand-yellow uppercase transition-colors">
                    <span>COTIZAR</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* =========================================================================
            PARTE 2: CATÁLOGO DE REPUESTOS DESTACADOS ("Latest Products")
            ========================================================================= */}
        <div id="repuestos-destacados" className="scroll-mt-28">
          {/* Encabezado centrado estilo catálogo e-commerce */}
          <Reveal direction="blur">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-block text-xs font-heading font-extrabold uppercase tracking-widest text-brand-blue mb-2">
                Líneas Destacadas de Importación
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                Repuestos Destacados
              </h2>
              <div className="w-16 h-1 bg-brand-yellow mx-auto mt-3 mb-4 rounded-full" />
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-xl mx-auto text-justify [text-align-last:center]">
                Selección de repuestos de alta rotación para tráiler y maquinaria pesada, con cotización directa
                y despacho internacional garantizado.
              </p>
            </div>
          </Reveal>

          {/* Selector de las 3 Categorías Oficiales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {/* 0. Todos */}
            <Reveal direction="flip-up" delay={0.05}>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                  selectedCategory === 'all'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-yellow/50'
                    : 'bg-brand-light text-brand-dark border-slate-200 hover:border-brand-blue hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-brand-yellow text-brand-navy font-bold'
                      : 'bg-white text-brand-blue shadow-sm'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-heading uppercase font-semibold text-brand-gray block">
                    Catálogo General
                  </span>
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase truncate block">
                    Todos los Repuestos ({PRODUCTS_DATA.length})
                  </span>
                </div>
              </button>
            </Reveal>

            {/* 1. Repuestos y accesorios para Actros - Mercedes Benz */}
            <Reveal direction="flip-up" delay={0.12}>
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory('Repuestos y accesorios para Actros - Mercedes Benz')
                }
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                  selectedCategory === 'Repuestos y accesorios para Actros - Mercedes Benz'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-yellow/50'
                    : 'bg-brand-light text-brand-dark border-slate-200 hover:border-brand-blue hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === 'Repuestos y accesorios para Actros - Mercedes Benz'
                      ? 'bg-brand-yellow text-brand-navy font-bold'
                      : 'bg-white text-brand-blue shadow-sm'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-heading uppercase font-semibold text-brand-yellow block">
                    1. Tráiler y Cabezales
                  </span>
                  <span
                    className="font-heading font-bold text-xs sm:text-sm uppercase truncate block"
                    title="Repuestos y accesorios para Actros - Mercedes Benz"
                  >
                    Actros - Mercedes Benz
                  </span>
                </div>
              </button>
            </Reveal>

            {/* 2. Repuestos para Maquinaria */}
            <Reveal direction="flip-up" delay={0.19}>
              <button
                type="button"
                onClick={() => setSelectedCategory('Repuestos para Maquinaria')}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                  selectedCategory === 'Repuestos para Maquinaria'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-yellow/50'
                    : 'bg-brand-light text-brand-dark border-slate-200 hover:border-brand-blue hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === 'Repuestos para Maquinaria'
                      ? 'bg-brand-yellow text-brand-navy font-bold'
                      : 'bg-white text-brand-blue shadow-sm'
                  }`}
                >
                  <Tractor className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-heading uppercase font-semibold text-brand-yellow block">
                    2. Maquinaria Pesada &amp; Uñas
                  </span>
                  <span
                    className="font-heading font-bold text-xs sm:text-sm uppercase truncate block"
                    title="Repuestos para Maquinaria"
                  >
                    Repuestos Maquinaria
                  </span>
                </div>
              </button>
            </Reveal>

            {/* 3. Llantas (a futuro) */}
            <Reveal direction="flip-up" delay={0.26}>
              <button
                type="button"
                onClick={() => setSelectedCategory('Llantas')}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3.5 relative overflow-hidden ${
                  selectedCategory === 'Llantas'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-yellow/50'
                    : 'bg-brand-light text-brand-dark border-slate-200 hover:border-brand-blue hover:shadow-sm'
                }`}
              >
                <div className="absolute top-2 right-2">
                  <span className="text-[9px] font-heading font-black uppercase px-1.5 py-0.5 rounded bg-brand-yellow text-brand-navy shadow-sm">
                    A Futuro
                  </span>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedCategory === 'Llantas'
                      ? 'bg-brand-yellow text-brand-navy font-bold'
                      : 'bg-white text-brand-blue shadow-sm'
                  }`}
                >
                  <Disc className="w-5 h-5" />
                </div>
                <div className="min-w-0 pr-10">
                  <span className="text-[11px] font-heading uppercase font-semibold text-brand-yellow block">
                    3. Neumáticos OTR
                  </span>
                  <span
                    className="font-heading font-bold text-xs sm:text-sm uppercase truncate block"
                    title="Llantas"
                  >
                    Llantas
                  </span>
                </div>
              </button>
            </Reveal>
          </div>

          {/* Banner Informativo si se selecciona la categoría Llantas */}
          {selectedCategory === 'Llantas' && (
            <Reveal direction="scale">
              <div className="mb-8 bg-gradient-to-r from-brand-navy to-brand-navy-dark text-white rounded-2xl p-5 sm:p-6 border border-brand-yellow/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/20 text-brand-yellow flex items-center justify-center flex-shrink-0 border border-brand-yellow/40">
                    <Disc className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-navy px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase tracking-wider mb-1.5">
                      Línea Proyectada para Uso a Futuro
                    </div>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-white uppercase">
                      Catálogo de Llantas Radiales y OTR en Preparación
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mt-1 text-justify">
                      Esta línea de neumáticos radiales y OTR de servicio pesado se habilitará para comercialización
                      directa a futuro. Puede realizar consultas previas o coordinar pedidos especiales con nuestros asesores.
                    </p>
                  </div>
                </div>
                <Button
                  href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                    'Hola Valle Logistics, deseo consultar información anticipada sobre la línea de Llantas para maquinaria y tráiler.'
                  )}`}
                  isExternal
                  variant="primary"
                  size="sm"
                  className="flex-shrink-0"
                  icon={<WhatsAppIcon className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Consultar Línea Futura
                </Button>
              </div>
            </Reveal>
          )}

          {/* Grilla de Productos estilo e-commerce (4 columnas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {displayedProducts.map((product, pIdx) => {
                const isUpcoming =
                  product.stockStatus === 'Próximamente' || product.tag === 'Próximamente';
                const tagVariant =
                  product.tag === 'Más vendido'
                    ? 'yellow'
                    : product.tag === 'Oferta'
                    ? 'red'
                    : product.tag === 'Próximamente'
                    ? 'yellow'
                    : 'blue';

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 48, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.14, margin: '-35px 0px -35px 0px' }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{
                      duration: 0.62,
                      delay: (pIdx % 4) * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-brand-blue/40 shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Imagen con badge y vista rápida */}
                      <div className="relative h-48 bg-slate-50 overflow-hidden border-b border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Tag badge */}
                        {product.tag && (
                          <div className="absolute top-2.5 left-2.5">
                            <Badge variant={tagVariant} size="sm">
                              {product.tag}
                            </Badge>
                          </div>
                        )}

                        {/* Vista rápida */}
                        <button
                          type="button"
                          onClick={() => setQuickViewProduct(product)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-brand-dark flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors shadow-sm"
                          title="Ficha técnica rápida"
                          aria-label={`Ver detalle rápido de ${product.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Rating 5 estrellas */}
                        <div className="absolute bottom-2 left-2.5 bg-brand-navy/85 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-white flex items-center gap-1 font-bold">
                          <Star className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
                          <span>{product.rating || '5.0'}</span>
                        </div>
                      </div>

                      {/* Cuerpo de la tarjeta */}
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[11px] text-brand-gray mb-1">
                          <span className="font-heading uppercase font-semibold text-brand-blue">
                            {product.brand}
                          </span>
                          <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                            {product.sku}
                          </span>
                        </div>

                        <h4
                          onClick={() => setQuickViewProduct(product)}
                          className="font-heading font-extrabold text-sm uppercase text-brand-dark hover:text-brand-blue transition-colors cursor-pointer line-clamp-2 leading-snug min-h-[40px]"
                          title={product.name}
                        >
                          {product.name}
                        </h4>

                        {/* Compatibilidad resumida */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {product.compatibility.slice(0, 2).map((comp, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] bg-brand-light text-brand-gray px-2 py-0.5 rounded font-medium"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pie: Precio y Botón WhatsApp */}
                    <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                      <div className="flex items-baseline justify-between my-2.5">
                        <span className="text-[11px] text-brand-gray">Precio est.:</span>
                        {product.price ? (
                          <span className="font-heading font-extrabold text-base text-brand-dark">
                            ${product.price.toLocaleString('es-ES')} USD
                          </span>
                        ) : (
                          <span className="font-heading font-bold text-[10px] uppercase bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                            Bajo cotización
                          </span>
                        )}
                      </div>

                      <Button
                        href={getProductWhatsAppLink(product.name, product.sku)}
                        isExternal
                        variant={isUpcoming ? 'secondary' : 'primary'}
                        size="sm"
                        className="w-full text-xs"
                        icon={<WhatsAppIcon className="w-3.5 h-3.5" />}
                        iconPosition="left"
                      >
                        {isUpcoming ? 'Consultar a Futuro' : 'Cotizar WhatsApp'}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* CTA: Ir al catálogo completo */}
          <Reveal direction="up" delay={0.15}>
            <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/productos"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explorar Catálogo Completo ({PRODUCTS_DATA.length} Repuestos)
              </Button>
              <Button
                href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                  'Hola Valle Logistics, busco un repuesto para mi equipo y quisiera consultar disponibilidad directa.'
                )}`}
                isExternal
                variant="primary"
                size="md"
                icon={<WhatsAppIcon className="w-4 h-4" />}
                iconPosition="left"
              >
                Cotizar con un Asesor
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* MODAL DE VISTA RÁPIDA */}
      <Modal
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        title={quickViewProduct?.name || 'Ficha Técnica de Repuesto'}
        maxWidth="2xl"
      >
        {quickViewProduct && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-heading uppercase font-bold text-brand-blue">
                    {quickViewProduct.brand}
                  </span>
                  {quickViewProduct.tag && (
                    <Badge variant="yellow" size="sm">
                      {quickViewProduct.tag}
                    </Badge>
                  )}
                </div>

                <div className="font-mono text-xs bg-slate-100 p-2 rounded text-slate-700">
                  <strong>SKU:</strong> {quickViewProduct.sku}
                </div>

                <div className="text-xs text-brand-gray">
                  <strong>Categoría:</strong> {quickViewProduct.category} ({quickViewProduct.subcategory})
                </div>

                <div className="text-xs text-brand-gray">
                  <strong>Disponibilidad:</strong>{' '}
                  <span
                    className={
                      quickViewProduct.stockStatus === 'Próximamente'
                        ? 'text-amber-600 font-bold'
                        : 'text-green-700 font-bold'
                    }
                  >
                    {quickViewProduct.stockStatus || 'Disponible'}
                  </span>
                </div>

                <div className="pt-2">
                  {quickViewProduct.price ? (
                    <div className="font-heading font-extrabold text-2xl text-brand-navy">
                      ${quickViewProduct.price.toLocaleString('es-ES')} USD
                    </div>
                  ) : (
                    <div className="font-heading font-bold text-sm uppercase text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                      Precio bajo cotización según volumen
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm uppercase text-brand-dark mb-1">
                Descripción Técnica:
              </h4>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed text-justify">
                {quickViewProduct.description ||
                  'Pieza fabricada con tolerancias estrictas para servicio continuo y trabajo pesado en faenas mineras e industriales.'}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm uppercase text-brand-dark mb-2">
                Modelos Compatibles:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.compatibility.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs bg-brand-light border border-slate-200 px-2.5 py-1 rounded-md text-brand-dark font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button
                href={getProductWhatsAppLink(quickViewProduct.name, quickViewProduct.sku)}
                isExternal
                variant="primary"
                size="md"
                className="flex-1"
                icon={<WhatsAppIcon className="w-4 h-4" />}
                iconPosition="left"
              >
                {quickViewProduct.stockStatus === 'Próximamente'
                  ? 'Consultar Disponibilidad Futura'
                  : 'Solicitar Cotización por WhatsApp'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setQuickViewProduct(null)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
