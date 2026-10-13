import React, { useState, useEffect } from 'react';
import {
  Truck,
  CreditCard,
  ShieldCheck,
  MessagesSquare,
  UserCheck,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

export interface ProductsBannerProps {
  onSelectCategory?: (categoryName: string) => void;
}

interface HeroSlide {
  id: string;
  subtitleTop: string;
  titleBold: string;
  offerText: string;
  ctaText: string;
  image: string;
  imageAlt: string;
  category: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'actros',
    subtitleTop: 'LÍNEA PESADA',
    titleBold: 'CABEZALES ACTROS',
    offerText: 'Repuestos y Accesorios para Flotas Mercedes-Benz',
    ctaText: 'VER CATÁLOGO',
    image: '/images/products-promo-rim.jpg',
    imageAlt: 'Aros y repuestos para cabezales Mercedes-Benz Actros',
    category: 'Repuestos y accesorios para Actros - Mercedes Benz',
  },
  {
    id: 'pistons',
    subtitleTop: 'ALTA CALIDAD',
    titleBold: 'PISTONES & MOTORES',
    offerText: 'Importación Directa OEM y Alternativos Certificados',
    ctaText: 'COTIZAR AHORA',
    image: '/images/products-hero-pistons.jpg',
    imageAlt: 'Conjunto de pistones y cigüeñal de alto rendimiento para maquinaria pesada',
    category: 'Repuestos para Maquinaria',
  },
  {
    id: 'otr',
    subtitleTop: 'MÁXIMA TRACCIÓN',
    titleBold: 'NEUMÁTICOS OTR',
    offerText: 'Llantas Radiales para Minería, Tráiler y Construcción',
    ctaText: 'CONSULTAR LÍNEA',
    image: '/images/promo-otr-tyres-transparent.png',
    imageAlt: 'Neumáticos radiales y llantas OTR para maquinaria pesada',
    category: 'Llantas',
  },
];

export const MobileProductsBanner: React.FC<ProductsBannerProps> = ({ onSelectCategory }) => {
  // Iniciamos en el slide central (índice 1: Pistones & Motores) como en el diseño de referencia
  const [activeSlide, setActiveSlide] = useState<number>(1);

  // Reproducción infinita automática del carrusel principal
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  const handleCategoryAction = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 64;
      const offset = headerHeight + 20;
      const elementTop = catalogEl.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, elementTop - offset),
        behavior: 'smooth',
      });
    }
  };

  const benefits = [
    {
      icon: Truck,
      shortTitle: 'Envíos País',
    },
    {
      icon: CreditCard,
      shortTitle: 'Gestión Segura',
    },
    {
      icon: ShieldCheck,
      shortTitle: 'Garantía OEM',
    },
    {
      icon: MessagesSquare,
      shortTitle: 'Soporte 24/7',
    },
    {
      icon: UserCheck,
      shortTitle: 'Asesoría Directa',
    },
  ];

  return (
    <section className="bg-brand-light pt-6 sm:pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* BLOQUE SUPERIOR: BANNER PRINCIPAL (IZQUIERDA - COL 7) + 2 TARJETAS APILADAS (DERECHA - COL 5) */}
        <div className="grid grid-cols-12 gap-2 sm:gap-3.5 items-stretch">
          {/* BLOQUE 1: TARJETA PRINCIPAL IZQUIERDA (FONDO BLANCO / PRINCIPAL) */}
          <div className="col-span-7 flex flex-col h-full">
            <Reveal direction="left" className="h-full flex flex-col">
              <div className="w-full bg-white border border-slate-200/90 rounded-sm p-2.5 xs:p-3 sm:p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[235px] xs:min-h-[250px] sm:min-h-[330px] shadow-subtle">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    {/* Texto superior */}
                    <div className="text-left">
                      <span className="block font-heading font-light text-[9px] xs:text-[10px] sm:text-xs text-brand-gray tracking-wide uppercase">
                        {currentSlide.subtitleTop}
                      </span>
                      <h1 className="font-heading font-black text-[12px] xs:text-[13.5px] sm:text-xl uppercase text-brand-navy leading-tight mt-0.5 tracking-tight">
                        {currentSlide.titleBold}
                      </h1>
                      <p className="text-[8.5px] xs:text-[9.5px] sm:text-xs text-brand-gray font-normal mt-1 leading-snug line-clamp-2">
                        {currentSlide.offerText}
                      </p>
                    </div>

                    {/* Imagen central */}
                    <div className="my-1 sm:my-2 flex items-center justify-center relative min-h-[85px] xs:min-h-[100px] sm:min-h-[140px]">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.imageAlt}
                        className="w-full max-h-[85px] xs:max-h-[100px] sm:max-h-[140px] object-contain mix-blend-multiply select-none"
                      />
                    </div>

                    {/* Botón de acción */}
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleCategoryAction(currentSlide.category)}
                        className="group inline-flex items-stretch bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-[8.5px] xs:text-[9.5px] sm:text-xs uppercase tracking-wider rounded-[3px] shadow-2xs hover:shadow-xs transition-all overflow-hidden"
                      >
                        <span className="px-2 xs:px-2.5 sm:px-4 py-1 sm:py-2 flex items-center">
                          {currentSlide.ctaText}
                        </span>
                        <span className="px-1.5 xs:px-2 sm:px-2.5 py-1 sm:py-2 bg-black/[0.06] border-l border-brand-navy/15 flex items-center justify-center">
                          <ChevronsRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Indicadores y botones de dirección del carrusel */}
                <div className="flex items-center justify-between pt-1.5 sm:pt-2.5 relative z-20 px-0.5">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Diapositiva anterior"
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 hover:bg-brand-yellow text-brand-navy flex items-center justify-center shadow-2xs hover:shadow-xs transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Mostrar ${slide.titleBold}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeSlide === idx
                            ? 'w-5 bg-brand-yellow'
                            : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Siguiente diapositiva"
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 hover:bg-brand-yellow text-brand-navy flex items-center justify-center shadow-2xs hover:shadow-xs transition-all active:scale-95"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* COLUMNA DERECHA: 2 TARJETAS APILADAS UNA ENCIMA DE LA OTRA */}
          <div className="col-span-5 flex flex-col gap-2 sm:gap-3.5 h-full">
            {/* BLOQUE 2 (SUPERIOR DERECHO): FONDO ÁMBAR CÁLIDO + IMAGEN MOVIDA 15PX A LA IZQUIERDA */}
            <Reveal direction="right" delay={0.08} className="flex-1 flex flex-col">
              <div
                onClick={() =>
                  handleCategoryAction('Repuestos y accesorios para Actros - Mercedes Benz')
                }
                className="w-full bg-gradient-to-br from-[#FFFDF2] to-[#FEF3C7] border border-amber-300/80 rounded-sm p-2 xs:p-2.5 sm:p-4 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[113px] xs:min-h-[121px] sm:min-h-[155px] shadow-subtle group cursor-pointer hover:border-amber-400 transition-colors"
              >
                <div className="relative z-10 max-w-[64%]">
                  <h2 className="font-heading uppercase leading-tight tracking-tight">
                    <span className="block font-extrabold text-[9.5px] xs:text-[10.5px] sm:text-sm text-brand-yellow">
                      TRÁILER &amp;
                    </span>
                    <span className="block font-black text-[9.5px] xs:text-[10.5px] sm:text-sm text-brand-navy">
                      CABEZALES HD
                    </span>
                  </h2>
                  <p className="text-[7.5px] xs:text-[8px] sm:text-[10px] text-brand-gray mt-0.5 truncate">
                    Línea Actros
                  </p>

                  <span className="inline-block mt-2 sm:mt-3 text-[8px] xs:text-[8.5px] sm:text-xs font-heading font-bold text-brand-navy underline underline-offset-2 decoration-brand-navy/60 group-hover:text-brand-blue transition-colors">
                    Ver Repuestos
                  </span>
                </div>

                <img
                  src="/images/products-promo-rim.jpg"
                  alt="Aros y repuestos para tráiler Mercedes-Benz Actros"
                  className="absolute right-[5px] bottom-[-6px] sm:right-[1px] sm:bottom-[-10px] w-20 xs:w-24 sm:w-36 h-20 xs:h-24 sm:h-36 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
            </Reveal>

            {/* BLOQUE 3 (INFERIOR DERECHO): FONDO AZUL ACERO SUAVE + IMAGEN MOVIDA 15PX A LA IZQUIERDA */}
            <Reveal direction="diagonal-right" delay={0.14} className="flex-1 flex flex-col">
              <div
                onClick={() => handleCategoryAction('Repuestos para Maquinaria')}
                className="w-full bg-gradient-to-br from-[#F0F6FF] to-[#DBEAFE] border border-blue-200/80 rounded-sm p-2 xs:p-2.5 sm:p-4 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[113px] xs:min-h-[121px] sm:min-h-[155px] shadow-subtle group cursor-pointer hover:border-blue-300 transition-colors"
              >
                <div className="relative z-10 max-w-[64%]">
                  <h2 className="font-heading uppercase leading-tight tracking-tight">
                    <span className="block font-black text-[9.5px] xs:text-[10.5px] sm:text-sm text-brand-navy">
                      MAQUINARIA
                    </span>
                    <span className="block font-black text-[9.5px] xs:text-[10.5px] sm:text-sm">
                      <span className="text-brand-yellow">UÑAS &amp;</span>{' '}
                      <span className="text-brand-navy">HIDRÁULICA</span>
                    </span>
                  </h2>
                  <p className="text-[7.5px] xs:text-[8px] sm:text-[10px] text-brand-gray mt-0.5 truncate">
                    Tractores
                  </p>

                  <span className="inline-block mt-2 sm:mt-3 text-[8px] xs:text-[8.5px] sm:text-xs font-heading font-bold text-brand-navy underline underline-offset-2 decoration-brand-navy/60 group-hover:text-brand-blue transition-colors">
                    Ver Repuestos
                  </span>
                </div>

                <img
                  src="/images/products-promo-shocks.jpg"
                  alt="Amortiguadores, hidráulica y repuestos para maquinaria pesada"
                  className="absolute right-[7px] bottom-[-6px] sm:right-[5px] sm:bottom-[-10px] w-20 xs:w-24 sm:w-36 h-20 xs:h-24 sm:h-36 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* FRANJA INFERIOR DE 5 BENEFICIOS: UNO AL LADO DEL OTRO */}
        <Reveal direction="up" delay={0.15} className="mt-2.5 sm:mt-4">
          <div className="bg-white border border-slate-200/90 rounded-sm py-2.5 px-2 sm:p-4 shadow-subtle">
            <div className="grid grid-cols-5 gap-1 items-start text-center">
              {benefits.map((b, idx) => {
                const IconComp = b.icon;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center text-center group">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 flex items-center justify-center text-brand-navy shadow-2xs group-hover:scale-105 transition-transform">
                      <IconComp className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-brand-navy stroke-[2.2]" />
                    </div>
                    <span className="font-heading font-black text-[7.5px] xs:text-[8px] sm:text-[10px] uppercase text-brand-navy tracking-tight text-center leading-tight mt-1 line-clamp-2">
                      {b.shortTitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MobileProductsBanner;
