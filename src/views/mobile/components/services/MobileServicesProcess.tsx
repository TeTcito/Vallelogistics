import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, Award, HardHat, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';

interface ProcessStepCard {
  step: number;
  titleLine1: string;
  titleLine2: string;
  accent: 'blue' | 'yellow';
  items: string[];
  icon: React.ReactNode;
}

const IMPORT_WORKFLOW_CARDS: ProcessStepCard[] = [
  {
    step: 1,
    titleLine1: 'Asesoría y',
    titleLine2: 'Planificación',
    accent: 'blue',
    items: [
      'Análisis de necesidades',
      'Búsqueda de proveedores',
      'Cotización y comparativa',
      'Asesoría en normativas y costos',
    ],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 text-white" aria-hidden="true">
        <rect x="5" y="7" width="26" height="17" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M3 27H33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 15L15 18L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: 2,
    titleLine1: 'Compra',
    titleLine2: 'en Origen',
    accent: 'yellow',
    items: [
      'Contacto con proveedores confiables',
      'Verificación de calidad',
      'Gestión de pagos internacionales',
      'Coordinación de producción y despacho',
    ],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 text-brand-navy" aria-hidden="true">
        <path
          d="M11 19L16 24L26 14M6 15L12 9L18 13L24 9L30 15"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="6" y="8" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    step: 3,
    titleLine1: 'Transporte',
    titleLine2: 'Internacional',
    accent: 'blue',
    items: [
      'Coordinación de embarque marítimo, aéreo o terrestre',
      'Gestión de documentos de transporte (BL, AWB)',
      'Seguimiento en tiempo real',
      'Seguro de carga (opcional)',
    ],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 text-white" aria-hidden="true">
        <path d="M6 23L9 28H27L30 23L18 19L6 23Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 21V13H25V21" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M15 9H21V13H15V9Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    step: 4,
    titleLine1: 'Arribo y',
    titleLine2: 'Aduana',
    accent: 'yellow',
    items: [
      'Tramitación aduanera',
      'Clasificación arancelaria (HS Code)',
      'Cálculo y pago de tributos (IVA, FODINFA, aranceles)',
      'Asesoría, gestión documental y doble despacho si aplica',
    ],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 text-brand-navy" aria-hidden="true">
        <path
          d="M18 5L29 9.5V17.5C29 24.8 24.3 30.2 18 32C11.7 30.2 7 24.8 7 17.5V9.5L18 5Z"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path d="M13.5 18.5L16.8 21.8L23 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: 5,
    titleLine1: 'Transporte',
    titleLine2: 'Nacional',
    accent: 'blue',
    items: [
      'Coordinación de transporte interno a cualquier ciudad del Ecuador',
      'Almacenamiento temporal si es necesario',
      'Entrega en sitio (obra, bodega u oficina)',
    ],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 text-white" aria-hidden="true">
        <rect x="4" y="11" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <path d="M22 15H28L32 19.5V23H22V15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="10" cy="25" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="27" cy="25" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    step: 6,
    titleLine1: 'Entrega',
    titleLine2: 'Final',
    accent: 'yellow',
    items: [
      'Recepción del producto',
      'Verificación de cantidad y estado',
      'Entrega al cliente final',
      'Soporte postventa',
    ],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 text-brand-navy" aria-hidden="true">
        <path d="M8 13L18 8L28 13V24L18 29L8 24V13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 13L18 18L28 13M18 18V29" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const KEY_HIGHLIGHTS = [
  'Contacto directo con proveedores confiables y verificación de calidad en origen.',
  'Clasificación arancelaria (HS Code), cálculo de tributos (IVA, FODINFA, aranceles) y gestión documental.',
  'Transporte internacional y nacional con entrega en obra, bodega u oficina y soporte postventa.',
];

export const MobileServicesProcess: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    if (children[index]) {
      const child = children[index];
      const scrollLeft = child.offsetLeft - container.offsetLeft;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const scrollPos = container.scrollLeft;

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const distance = Math.abs(scrollPos - (child.offsetLeft - container.offsetLeft));
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section
      id="proceso-logistico"
      className="pt-8 pb-14 sm:py-16 bg-white relative overflow-hidden border-b border-slate-200/80"
    >
      {/* Círculo decorativo sutil en la esquina superior derecha */}
      <div
        className="hidden lg:block absolute -top-28 -right-28 w-[380px] h-[380px] rounded-full bg-brand-light pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            DIVISOR CENTRADO CON TÍTULO DE DIVISIÓN ESTILIZADO
            ========================================================================= */}
        <div className="mb-6 sm:mb-8">
          <Reveal direction="zoom-in" delay={0.05} amount={0.05}>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="h-[1.5px] flex-1 max-w-[65px] sm:max-w-xs bg-gradient-to-r from-transparent via-brand-yellow to-brand-navy/30" />
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-navy text-white border border-brand-yellow/50 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-heading font-black uppercase tracking-wider text-brand-yellow">
                  FLUJO DE TRABAJO LOGÍSTICO
                </span>
              </div>
              <div className="h-[1.5px] flex-1 max-w-[65px] sm:max-w-xs bg-gradient-to-l from-transparent via-brand-yellow to-brand-navy/30" />
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            CARRUSEL HORIZONTAL DE TARJETAS DE PROCESO (2.5 TARJETAS VISIBLES)
            ========================================================================= */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2.5 overflow-x-auto pb-1 pt-1 px-4 -mx-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {IMPORT_WORKFLOW_CARDS.map((card) => {
              const isBlue = card.accent === 'blue';
              return (
                <div
                  key={card.step}
                  className={`w-[calc((100vw-48px)/2.4)] min-w-[130px] max-w-[155px] sm:w-[185px] shrink-0 snap-start bg-white rounded-xl pt-3.5 pb-3 px-2 text-center shadow-[0_6px_20px_rgba(6,27,75,0.05)] border border-slate-100 flex flex-col items-center justify-between border-t-[3px] ${
                    isBlue ? 'border-t-brand-blue' : 'border-t-brand-yellow-hover'
                  }`}
                >
                  {/* Círculo central con ícono + insignia numérica del paso */}
                  <div className="relative mb-2.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xs [&>svg]:w-5 [&>svg]:h-5 ${
                        isBlue
                          ? 'bg-brand-blue text-white'
                          : 'bg-brand-yellow text-brand-navy'
                      }`}
                    >
                      {card.icon}
                    </div>
                    <span
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full font-heading font-black text-[9px] flex items-center justify-center border border-white shadow-2xs ${
                        isBlue
                          ? 'bg-brand-yellow text-brand-navy'
                          : 'bg-brand-navy text-white'
                      }`}
                    >
                      {card.step}
                    </span>
                  </div>

                  {/* Título en 2 líneas */}
                  <h3 className="font-heading font-extrabold text-[11px] xs:text-[11.5px] sm:text-xs text-brand-navy leading-tight">
                    <span className="block">{card.titleLine1}</span>
                    <span className="block">{card.titleLine2}</span>
                  </h3>

                  {/* Lista de actividades del paso */}
                  <ul className="space-y-1 text-left w-full border-t border-slate-100 pt-2 mt-2 flex-1">
                    {card.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1 text-[9px] xs:text-[9.5px] text-brand-gray leading-tight"
                      >
                        <Check
                          className={`w-2.5 h-2.5 shrink-0 mt-0.5 stroke-[2.5] ${
                            isBlue ? 'text-brand-blue' : 'text-brand-yellow-hover'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Flechas de navegación del Carrusel a 10px debajo de las tarjetas */}
          <div className="mt-[6px] flex items-center justify-end gap-1.5 px-1">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Paso anterior"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 text-brand-navy flex items-center justify-center shadow-2xs hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(IMPORT_WORKFLOW_CARDS.length - 1, activeIndex + 1))}
              disabled={activeIndex === IMPORT_WORKFLOW_CARDS.length - 1}
              aria-label="Siguiente paso"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 text-brand-navy flex items-center justify-center shadow-2xs hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            PARTE INFERIOR: COMPOSICIÓN FOTOGRÁFICA SUPERPUESTA + BLOQUE INFORMATIVO
            ========================================================================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Columna Izquierda: Foto Principal + Foto Secundaria Superpuesta + Puntos + Insignia de Experiencia */}
          <div className="lg:col-span-6">
            <div className="relative max-w-lg mx-auto lg:mx-0 pr-8 sm:pr-14 pb-6">
              {/* Fotografía Principal Vertical */}
              <Reveal direction="left" distance={40}>
                <div className="relative rounded-2xl overflow-hidden shadow-card w-[82%] sm:w-[78%] h-[360px] sm:h-[430px] bg-brand-navy-surface">
                  <img
                    src="/images/process-specialist-main.jpg"
                    alt="Especialista de Valle Logistics supervisando operaciones de importación"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </Reveal>

              {/* Fotografía Secundaria Enmarcada Superpuesta a la Derecha */}
              <Reveal
                direction="diagonal-right"
                delay={0.16}
                className="absolute top-12 sm:top-14 right-0 w-[46%] sm:w-[44%] h-[195px] sm:h-[230px] z-20"
              >
                <div className="w-full h-full rounded-xl overflow-hidden border-[5px] border-white shadow-elevated bg-brand-navy">
                  <img
                    src="/images/services-showcase-top.jpg"
                    alt="Inspección técnica y verificación de calidad en origen"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </Reveal>

              {/* Patrón de puntos decorativos debajo de la foto secundaria */}
              <div
                className="grid grid-cols-3 gap-2.5 absolute bottom-6 right-8 sm:right-12 z-10 opacity-35 pointer-events-none"
                aria-hidden="true"
              >
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-navy" />
                ))}
              </div>

              {/* Tarjeta Flotante Inferior Izquierda (Años de Experiencia / Respaldo) */}
              <Reveal
                direction="zoom-in"
                delay={0.28}
                className="absolute bottom-2 -left-2 sm:-left-5 z-30"
              >
                <div className="bg-brand-yellow text-brand-navy rounded-xl px-5 py-4 shadow-yellow border-2 border-white flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg border-2 border-brand-navy/25 bg-white/40 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div className="leading-tight">
                    <span className="font-heading font-black text-2xl block text-brand-navy">
                      {COMPANY_DATA.yearsOfExperience}+
                    </span>
                    <span className="font-heading font-bold text-xs text-brand-navy/90 block">
                      Años de
                    </span>
                    <span className="font-heading font-bold text-xs text-brand-navy/90 block">
                      experiencia
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Columna Derecha: Subtítulo, Titular, Párrafo, 3 Checks y Pie con Avatar + Botón */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="max-w-xl">
              <Reveal direction="right" distance={38}>
                {/* Etiqueta superior con ícono */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <HardHat className="w-4 h-4 text-brand-yellow-hover stroke-[2.5]" />
                  <span className="font-heading font-extrabold text-xs uppercase tracking-[0.18em] text-brand-yellow-hover">
                    Excelencia en Nuestros Servicios
                  </span>
                </div>

                {/* Título en 2 líneas */}
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[38px] text-brand-navy leading-[1.16] tracking-tight">
                  Brindamos la mejor solución en Importación y Logística.
                </h3>

                {/* Párrafo descriptivo */}
                <p className="text-brand-gray text-sm sm:text-[15px] leading-relaxed mt-4 text-justify">
                  Acompañamos a cada cliente desde el análisis de necesidades, compra en origen y
                  gestión de pagos internacionales hasta el arribo, nacionalización aduanera y
                  entrega final en cualquier ciudad del país.
                </p>
              </Reveal>

              {/* 3 Ítems con check circular */}
              <ul className="space-y-3.5 mt-6">
                {KEY_HIGHLIGHTS.map((highlight, idx) => (
                  <Reveal key={idx} direction="up" delay={0.14 + idx * 0.08} distance={20}>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-yellow-hover text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-brand-navy leading-snug">
                        {highlight}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>

              {/* Fila Inferior: Perfil a la izquierda + Botón Rectangular a la derecha */}
              <Reveal direction="scale" delay={0.34}>
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/images/process-specialist-main.jpg"
                      alt="Dirección Operativa Valle Logistics"
                      className="w-12 h-12 rounded-full object-cover object-top border-2 border-brand-yellow shadow-sm"
                    />
                    <div>
                      <span className="block font-heading font-extrabold text-sm sm:text-base text-brand-navy leading-tight">
                        Valle Logistics &amp; Import
                      </span>
                      <span className="block text-xs text-brand-gray mt-0.5">
                        Especialistas en Comercio Exterior
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs uppercase tracking-widest shadow-yellow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Cotizar Ahora
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileServicesProcess;
