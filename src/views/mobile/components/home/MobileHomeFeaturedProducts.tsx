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
import { useProducts } from '@/hooks/useProducts';
import { COMPANY_DATA, getProductWhatsAppLink } from '@/data/company';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const MobileHomeFeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filtrado de productos destacados
  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products.slice(0, 8);
    }
    return products.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    ).slice(0, 8);
  }, [products, selectedCategory]);

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    const el = document.getElementById('repuestos-destacados');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-slate-200 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            DIVISOR CENTRADO CON TÍTULO DE DIVISIÓN ESTILIZADO
            ========================================================================= */}
        <div className="mb-4 sm:mb-6">
          <Reveal direction="zoom-in" delay={0.05} amount={0.05}>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="h-[1.5px] flex-1 max-w-[65px] sm:max-w-xs bg-gradient-to-r from-transparent via-brand-yellow to-brand-navy/30" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy text-white border border-brand-yellow/50 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-heading font-black uppercase tracking-wider text-brand-yellow">
                  DIVISIÓN COMERCIAL &amp; SUMINISTRO INDUSTRIAL
                </span>
              </div>
              <div className="h-[1.5px] flex-1 max-w-[65px] sm:max-w-xs bg-gradient-to-l from-transparent via-brand-yellow to-brand-navy/30" />
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            BLOQUES PROMOCIONALES EN 2 FILAS:
            - Fila 1: Bloque Largo (Actros) + Bloque Pequeño (Llantas OTR)
            - Fila 2: Bloque Pequeño (Maquinaria/Baterías) + Bloque Largo (Uñas Tractor)
            ========================================================================= */}
        <div className="grid grid-cols-12 gap-2 sm:gap-2.5 mb-6 sm:mb-10">
          {/* =========================================================================
              FILA 1 - BLOQUE 1 (LARGO - col-span-7): REPUESTOS ACTROS MERCEDES-BENZ
              - Imagen desplazada 15px a la izquierda
              ========================================================================= */}
          <Reveal direction="left" delay={0.08} amount={0.05} className="col-span-7 flex flex-col">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-brand-yellow p-2 sm:p-2.5 flex flex-col justify-between h-[112px] sm:h-[126px] shadow-xs hover:shadow-card border border-amber-300/60 group">
              {/* Rayas diagonales decorativas estilo industrial */}
              <div
                className="absolute top-0 left-0 w-20 h-14 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #061B4B, #061B4B 4px, transparent 4px, transparent 10px)',
                }}
              />

              {/* Imagen desplazada 15px a la izquierda */}
              <div className="absolute right-[5px] sm:right-[7px] -bottom-2.5 w-[112px] sm:w-[124px] h-[112px] sm:h-[124px] pointer-events-none z-0">
                <img
                  src="/images/promo-wheel-rim-transparent.png"
                  alt="Rueda y repuestos para cabezales Mercedes-Benz Actros"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300"
                />
              </div>

              {/* Textos ampliados simétricamente */}
              <div className="relative z-10 max-w-[120px] sm:max-w-[145px] space-y-0.5">
                <h3 className="font-heading font-black text-[12.5px] sm:text-[13.5px] uppercase tracking-tight text-brand-navy leading-tight">
                  REPUESTOS<br />ACTROS
                </h3>
                <p className="text-[9.5px] sm:text-[10px] font-bold text-brand-navy/80 leading-none">
                  Mercedes-Benz
                </p>
              </div>

              {/* Botón compacto con texto ampliado */}
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectCategory('Repuestos y accesorios para Actros - Mercedes Benz')
                  }
                  className="inline-flex items-center gap-1 bg-white hover:bg-brand-navy text-brand-navy hover:text-white font-heading font-black text-[9px] sm:text-[9.5px] uppercase px-2 py-0.5 rounded shadow-xs hover:shadow-sm transition-all duration-300"
                >
                  <span>VER LÍNEA</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* =========================================================================
              FILA 1 - BLOQUE 2 (PEQUEÑO - col-span-5): LLANTAS OTR & TRÁILER
              - Imagen desplazada 10px a la derecha
              ========================================================================= */}
          <Reveal direction="right" delay={0.12} amount={0.05} className="col-span-5 flex flex-col">
            <div
              onClick={() => handleSelectCategory('Llantas')}
              className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A1124] p-2 sm:p-2.5 flex flex-col justify-between h-[112px] sm:h-[126px] shadow-xs hover:shadow-card border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 cursor-pointer group"
            >
              {/* Imagen desplazada 10px a la derecha */}
              <div className="absolute right-[1px] sm:right-[3px] -bottom-1 w-[92px] sm:w-[100px] h-[92px] sm:h-[100px] pointer-events-none z-0">
                <img
                  src="/images/promo-otr-tyres-transparent.png"
                  alt="Llantas radiales y OTR minería"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Textos ampliados simétricamente con sombra para contraste */}
              <div className="relative z-10 max-w-[85px] sm:max-w-[105px] space-y-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                <h4 className="font-heading font-black text-[12px] sm:text-[13px] uppercase tracking-tight text-white leading-tight">
                  LLANTAS<br />OTR
                </h4>
                <p className="text-[9.5px] sm:text-[10px] text-slate-300 leading-none">
                  Tráiler y minería
                </p>
              </div>

              {/* Botón enlace con texto ampliado */}
              <div className="relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[9.5px] font-heading font-black text-brand-yellow uppercase group-hover:underline">
                  <span>CONSULTAR</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* =========================================================================
              FILA 2 - BLOQUE 1 (PEQUEÑO - col-span-5): MAQUINARIA & PARTES HD
              - Imagen desplazada 15px a la izquierda y aumentada en +20px (92px)
              ========================================================================= */}
          <Reveal direction="left" delay={0.16} amount={0.05} className="col-span-5 flex flex-col">
            <div
              onClick={() => {
                window.open(
                  `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                    'Hola Valle Logistics, requiero información y asesoría para importación de maquinaria y componentes de potencia.'
                  )}`,
                  '_blank'
                );
              }}
              className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A1124] p-2 sm:p-2.5 flex flex-col justify-between h-[112px] sm:h-[126px] shadow-xs hover:shadow-card border border-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
            >
              {/* Imagen desplazada 15px a la izquierda y aumentada en +20px */}
              <div className="absolute right-[11px] sm:right-[13px] -bottom-1 w-[92px] sm:w-[100px] h-[92px] sm:h-[100px] pointer-events-none z-0">
                <img
                  src="/images/promo-battery-transparent.png"
                  alt="Baterías industriales y partes HD"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Textos ampliados simétricamente con sombra para contraste */}
              <div className="relative z-10 max-w-[85px] sm:max-w-[105px] space-y-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                <h4 className="font-heading font-black text-[12px] sm:text-[13px] uppercase tracking-tight text-white leading-tight">
                  MAQUINARIA<br />&amp; PARTES
                </h4>
                <p className="text-[9.5px] sm:text-[10px] text-slate-300 leading-none">
                  Aduanas y compra
                </p>
              </div>

              {/* Botón enlace con texto ampliado */}
              <div className="relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[9.5px] font-heading font-black text-white group-hover:text-brand-yellow uppercase transition-colors">
                  <span>COTIZAR</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* =========================================================================
              FILA 2 - BLOQUE 2 (LARGO - col-span-7): UÑAS DE TRACTOR & MAQUINARIA
              - Textos ampliados y mejor distribuidos para cubrir el espacio central
              ========================================================================= */}
          <Reveal direction="right" delay={0.20} amount={0.05} className="col-span-7 flex flex-col">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-brand-blue p-2 sm:p-2.5 flex flex-col justify-between h-[112px] sm:h-[126px] shadow-xs hover:shadow-card border border-blue-400/30 group">
              {/* Patrón de gradiente de iluminación en fondo */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 100% 100%, #ffffff 0, transparent 65%)',
                }}
              />

              {/* Imagen de la uña de excavadora */}
              <div className="absolute right-0.5 sm:right-1.5 top-1/2 -translate-y-1/2 w-[90px] sm:w-[105px] h-[105px] sm:h-[120px] pointer-events-none z-0">
                <img
                  src="/images/products-promo-unas-transparent.png"
                  alt="Uñas de excavadora y repuestos para maquinaria pesada"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </div>

              {/* Textos ampliados y con excelente distribución para llenar el espacio central */}
              <div className="relative z-10 max-w-[130px] sm:max-w-[155px] space-y-1">
                <h3 className="font-heading font-black text-[11.5px] sm:text-[13px] uppercase tracking-tight text-white leading-[1.12]">
                  <span className="block">UÑAS DE EXCAVADORA</span>
                  <span className="block text-brand-yellow font-black text-[10.5px] sm:text-[11.5px]">&amp; MAQUINARIA</span>
                </h3>
                <p className="text-[8.5px] sm:text-[9.5px] font-medium text-blue-100 leading-snug">
                  Dientes CAT, puntas forjadas &amp; repuestos
                </p>
              </div>

              {/* Botón compacto con texto ampliado */}
              <div className="relative z-10 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleSelectCategory('Repuestos para Maquinaria')}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-brand-navy text-brand-blue hover:text-white font-heading font-black text-[9px] sm:text-[9.5px] uppercase px-2.5 py-1 rounded shadow-xs hover:shadow-sm transition-all duration-300"
                >
                  <span>VER REPUESTOS</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            PARTE 2: CATÁLOGO DE REPUESTOS DESTACADOS ("Latest Products")
            - TÍTULO EN LÍNEA DE DIVISIÓN CENTRADA CON DISEÑO ELEGANTE
            ========================================================================= */}
        <div id="repuestos-destacados" className="scroll-mt-24 mb-5 sm:mb-6">
          <Reveal direction="zoom-in" delay={0.05} amount={0.05}>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="h-[1.5px] flex-1 max-w-[65px] sm:max-w-xs bg-gradient-to-r from-transparent via-brand-yellow to-brand-navy/30" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy text-white border border-brand-yellow/50 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-heading font-black uppercase tracking-wider text-brand-yellow">
                  CATÁLOGO DE REPUESTOS DESTACADOS
                </span>
              </div>
              <div className="h-[1.5px] flex-1 max-w-[65px] sm:max-w-xs bg-gradient-to-l from-transparent via-brand-yellow to-brand-navy/30" />
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            BLOQUES DE FILTRO RESUMIDOS EN UNA SOLA FILA (UNO AL LADO DEL OTRO)
            ========================================================================= */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-6">
          {/* 0. Todos */}
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedCategory === 'all'
                ? 'bg-brand-navy text-white border-brand-navy shadow-sm ring-1 ring-brand-yellow/50'
                : 'bg-slate-50 hover:bg-slate-100 text-brand-dark border-slate-200'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedCategory === 'all'
                  ? 'bg-brand-yellow text-brand-navy'
                  : 'bg-white text-brand-blue shadow-2xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-black text-[9.5px] sm:text-[10.5px] uppercase truncate w-full">
              Todos
            </span>
          </button>

          {/* 1. Actros */}
          <button
            type="button"
            onClick={() =>
              setSelectedCategory('Repuestos y accesorios para Actros - Mercedes Benz')
            }
            className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedCategory === 'Repuestos y accesorios para Actros - Mercedes Benz'
                ? 'bg-brand-navy text-white border-brand-navy shadow-sm ring-1 ring-brand-yellow/50'
                : 'bg-slate-50 hover:bg-slate-100 text-brand-dark border-slate-200'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedCategory === 'Repuestos y accesorios para Actros - Mercedes Benz'
                  ? 'bg-brand-yellow text-brand-navy'
                  : 'bg-white text-brand-blue shadow-2xs'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-black text-[9.5px] sm:text-[10.5px] uppercase truncate w-full">
              Actros
            </span>
          </button>

          {/* 2. Maquinaria */}
          <button
            type="button"
            onClick={() => setSelectedCategory('Repuestos para Maquinaria')}
            className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedCategory === 'Repuestos para Maquinaria'
                ? 'bg-brand-navy text-white border-brand-navy shadow-sm ring-1 ring-brand-yellow/50'
                : 'bg-slate-50 hover:bg-slate-100 text-brand-dark border-slate-200'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedCategory === 'Repuestos para Maquinaria'
                  ? 'bg-brand-yellow text-brand-navy'
                  : 'bg-white text-brand-blue shadow-2xs'
              }`}
            >
              <Tractor className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-black text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] uppercase truncate w-full">
              Uñas &amp; Maquinaria
            </span>
          </button>

          {/* 3. Llantas */}
          <button
            type="button"
            onClick={() => setSelectedCategory('Llantas')}
            className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedCategory === 'Llantas'
                ? 'bg-brand-navy text-white border-brand-navy shadow-sm ring-1 ring-brand-yellow/50'
                : 'bg-slate-50 hover:bg-slate-100 text-brand-dark border-slate-200'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedCategory === 'Llantas'
                  ? 'bg-brand-yellow text-brand-navy'
                  : 'bg-white text-brand-blue shadow-2xs'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-black text-[9.5px] sm:text-[10.5px] uppercase truncate w-full">
              Llantas
            </span>
          </button>
        </div>

        {/* Banner Informativo si se selecciona la categoría Llantas */}
        {selectedCategory === 'Llantas' && (
          <Reveal direction="scale">
            <div className="mb-6 bg-gradient-to-r from-brand-navy to-brand-navy-dark text-white rounded-xl p-4 border border-brand-yellow/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/20 text-brand-yellow flex items-center justify-center flex-shrink-0 border border-brand-yellow/40">
                  <Disc className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 bg-brand-yellow text-brand-navy px-1.5 py-0.5 rounded text-[9px] font-heading font-black uppercase tracking-wider mb-1">
                    Línea Proyectada para Uso a Futuro
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-white uppercase">
                    Catálogo de Llantas Radiales y OTR en Preparación
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                    Esta línea de neumáticos se habilitará para comercialización directa a futuro. Puede realizar consultas previas o pedidos especiales.
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
                className="w-full justify-center text-[10px] py-1.5"
                icon={<WhatsAppIcon className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                Consultar Línea Futura
              </Button>
            </div>
          </Reveal>
        )}

        {/* Grilla de Productos: 2 por fila en móvil */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.45,
                    delay: (pIdx % 4) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-brand-blue/40 shadow-xs hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Imagen con badge y vista rápida */}
                    <div className="relative h-32 sm:h-36 bg-slate-50 overflow-hidden border-b border-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Tag badge */}
                      {product.tag && (
                        <div className="absolute top-1.5 left-1.5">
                          <Badge variant={tagVariant} size="sm">
                            {product.tag}
                          </Badge>
                        </div>
                      )}

                      {/* Vista rápida */}
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm text-brand-dark flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors shadow-2xs"
                        title="Ficha técnica rápida"
                        aria-label={`Ver detalle rápido de ${product.name}`}
                      >
                        <Eye className="w-3 h-3" />
                      </button>

                      {/* Rating 5 estrellas */}
                      <div className="absolute bottom-1.5 left-1.5 bg-brand-navy/85 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] text-white flex items-center gap-0.5 font-bold">
                        <Star className="w-2.5 h-2.5 text-brand-yellow fill-brand-yellow" />
                        <span>{product.rating || '5.0'}</span>
                      </div>
                    </div>

                    {/* Cuerpo de la tarjeta */}
                    <div className="p-2 sm:p-2.5">
                      <div className="flex items-center justify-between text-[9px] text-brand-gray mb-1">
                        <span className="font-heading uppercase font-semibold text-brand-blue truncate max-w-[55%]">
                          {product.brand || 'Valle Logistics'}
                        </span>
                        <span className="font-mono text-[8.5px] bg-slate-100 px-1 py-0.2 rounded truncate">
                          {product.sku}
                        </span>
                      </div>

                      <h4
                        onClick={() => setQuickViewProduct(product)}
                        className="font-heading font-black text-[11px] sm:text-xs uppercase text-brand-dark hover:text-brand-blue transition-colors cursor-pointer line-clamp-2 leading-tight min-h-[28px]"
                        title={product.name}
                      >
                        {product.name}
                      </h4>

                      {/* Descripción del producto guardada en la administración */}
                      {product.description ? (
                        <p className="mt-1 text-[9px] text-brand-gray line-clamp-2 leading-tight">
                          {product.description}
                        </p>
                      ) : product.compatibility && product.compatibility.length > 0 ? (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {product.compatibility.slice(0, 1).map((comp, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[8px] bg-brand-light text-brand-gray px-1.5 py-0.5 rounded font-medium truncate max-w-full"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Pie: Precio y Botón WhatsApp */}
                  <div className="p-2 sm:p-2.5 pt-0 border-t border-slate-100 mt-1">
                    <div className="flex items-baseline justify-between my-1.5">
                      <span className="text-[9px] text-brand-gray">Est.:</span>
                      {product.price ? (
                        <span className="font-heading font-black text-xs text-brand-dark">
                          ${product.price.toLocaleString('es-ES')} <span className="text-[8.5px] font-normal text-slate-500">USD</span>
                        </span>
                      ) : (
                        <span className="font-heading font-bold text-[8.5px] uppercase bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                          Cotizar
                        </span>
                      )}
                    </div>

                    <Button
                      href={getProductWhatsAppLink(product.name, product.sku)}
                      isExternal
                      variant={isUpcoming ? 'secondary' : 'primary'}
                      size="sm"
                      className="w-full text-[9px] sm:text-[10px] py-1 justify-center gap-1"
                      icon={<WhatsAppIcon className="w-3 h-3" />}
                      iconPosition="left"
                    >
                      {isUpcoming ? 'A Futuro' : 'Cotizar'}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA: Ir al catálogo completo y cotizar con asesor (lado a lado) */}
        <Reveal direction="up" delay={0.15}>
          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-2.5">
            <Button
              to="/productos"
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full justify-center text-[10.5px] sm:text-xs px-2 text-center tracking-tight sm:tracking-normal"
            >
              Ver Catálogo
            </Button>
            <Button
              href={`https://wa.me/${COMPANY_DATA.whatsappQuotesNumber}?text=${encodeURIComponent(
                'Hola Valle Logistics, busco un repuesto para mi equipo y quisiera consultar disponibilidad directa.'
              )}`}
              isExternal
              variant="primary"
              size="sm"
              icon={<WhatsAppIcon className="w-3.5 h-3.5" />}
              iconPosition="left"
              className="w-full justify-center text-[10.5px] sm:text-xs px-2 text-center tracking-tight sm:tracking-normal"
            >
              Cotizar Asesor
            </Button>
          </div>
        </Reveal>
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
                    {quickViewProduct.brand || 'Valle Logistics'}
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

export default MobileHomeFeaturedProducts;
