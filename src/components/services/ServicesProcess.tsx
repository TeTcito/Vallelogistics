import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Award, HardHat } from 'lucide-react';
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

export const ServicesProcess: React.FC = () => {
  return (
    <section
      id="proceso-logistico"
      className="py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200/80"
    >
      {/* Círculo decorativo sutil en la esquina superior derecha (idéntico al ejemplo de referencia) */}
      <div
        className="hidden lg:block absolute -top-28 -right-28 w-[380px] h-[380px] rounded-full bg-brand-light pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            PARTE SUPERIOR: ENCABEZADO CENTRADO + FILA DE TARJETAS DEL PROCESO
            ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
          <Reveal direction="down">
            {/* Etiqueta superior con ícono */}
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <HardHat className="w-4 h-4 text-brand-yellow-hover stroke-[2.5]" />
              <span className="font-heading font-extrabold text-xs uppercase tracking-[0.18em] text-brand-yellow-hover">
                Flujo de Trabajo Paso a Paso
              </span>
            </div>
          </Reveal>

          <Reveal direction="blur" delay={0.1}>
            {/* Título Principal en 2 líneas */}
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-[38px] text-brand-navy leading-[1.18] tracking-tight">
              <span className="block">Nuestro Proceso Logístico de Importación</span>
              <span className="block text-brand-blue mt-1.5 text-lg sm:text-2xl lg:text-[26px] font-bold">
                Desde el origen hasta tu destino, nos encargamos de todo
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Grilla de Tarjetas Blancas con Línea Superior y Círculo Central (Diseño idéntico a la referencia) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 xl:gap-5">
          {IMPORT_WORKFLOW_CARDS.map((card, index) => {
            const isBlue = card.accent === 'blue';
            return (
              <Reveal key={card.step} direction="flip-up" delay={index * 0.08} className="h-full">
                <div
                  className={`bg-white rounded-b-xl pt-7 pb-6 px-4 text-center shadow-[0_10px_35px_rgba(6,27,75,0.06)] hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col items-center h-full border border-slate-100 border-t-[3.5px] ${
                    isBlue ? 'border-t-brand-blue' : 'border-t-brand-yellow-hover'
                  }`}
                >
                  {/* Círculo central con ícono + insignia numérica del paso */}
                  <div className="relative mb-5">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${
                        isBlue
                          ? 'bg-brand-blue text-white'
                          : 'bg-brand-yellow text-brand-navy'
                      }`}
                    >
                      {card.icon}
                    </div>
                    <span
                      className={`absolute -top-1 -right-1.5 w-6 h-6 rounded-full font-heading font-black text-xs flex items-center justify-center border-2 border-white shadow-xs ${
                        isBlue
                          ? 'bg-brand-yellow text-brand-navy'
                          : 'bg-brand-navy text-white'
                      }`}
                    >
                      {card.step}
                    </span>
                  </div>

                  {/* Título en 2 líneas */}
                  <h3 className="font-heading font-extrabold text-base text-brand-navy leading-snug">
                    <span className="block">{card.titleLine1}</span>
                    <span className="block">{card.titleLine2}</span>
                  </h3>

                  {/* Lista de actividades del paso (del flujo de importación de la empresa) */}
                  <ul className="space-y-2 text-left w-full border-t border-slate-100 pt-3.5 mt-3.5">
                    {card.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 text-[11.5px] text-brand-gray leading-snug"
                      >
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 stroke-[2.5] ${
                            isBlue ? 'text-brand-blue' : 'text-brand-yellow-hover'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* =========================================================================
            PARTE INFERIOR: COMPOSICIÓN FOTOGRÁFICA SUPERPUESTA + BLOQUE INFORMATIVO
            ========================================================================= */}
        <div className="mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
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
