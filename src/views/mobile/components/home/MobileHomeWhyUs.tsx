import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';

const PILL_TAGS = [
  'Importación de Maquinaria y Repuestos',
  'Comercio Exterior',
  'Búsqueda y Negociación con Proveedores',
  'Logística y Aduanas',
  'Nacionalización de Mercancías',
];

export const MobileHomeWhyUs: React.FC = () => {
  return (
    <section className="relative bg-brand-light pt-14 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
      {/* =========================================================================
          1. REGLA TÉCNICA SUPERIOR (TICK MARKS DE ESCALA)
          ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-4 pointer-events-none opacity-35"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to right, rgba(6, 27, 75, 0.45) 0px, rgba(6, 27, 75, 0.45) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(to right, rgba(6, 27, 75, 0.22) 0px, rgba(6, 27, 75, 0.22) 1px, transparent 1px, transparent 8px)
          `,
          backgroundSize: '40px 14px, 8px 8px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'top left',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          2. FRANJA INFERIOR AZUL MARINO (FONDO COMPARTIDO DE LA MITAD INFERIOR)
          ========================================================================= */}
      <div
        className="absolute bottom-0 inset-x-0 h-[105px] sm:h-[130px] bg-brand-navy z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Patrón de líneas diagonales en el borde inferior */}
        <div
          className="absolute bottom-0 inset-x-0 h-3.5 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg, #FDB913 0px, #FDB913 1.5px, transparent 1.5px, transparent 10px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            FILA 1: ENCABEZADO BICOLOR + BOTÓN GIRATORIO AUTOMÁTICO EN LA MISMA FILA
            ========================================================================= */}
        <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-4 mb-5 sm:mb-8">
          <div className="flex-1 min-w-0">
            <Reveal direction="left">
              {/* Subtítulo superior con guion */}
              <div className="inline-flex items-center gap-2 mb-1 sm:mb-2">
                <span className="w-4 sm:w-6 h-[2px] bg-brand-yellow-hover rounded-full flex-shrink-0" />
                <span className="font-sans font-medium text-[10px] sm:text-xs text-brand-navy tracking-wide truncate">
                  Por Qué Elegirnos · Comercio Exterior
                </span>
              </div>

              {/* Título Principal acoplado para entrar acorde en la misma fila */}
              <h2 className="font-heading font-black text-[1.12rem] sm:text-2xl lg:text-3xl tracking-tight leading-[1.16]">
                <span className="block text-brand-navy">
                  Donde la Gestión Integral Impulsa
                </span>
                <span className="block text-brand-yellow-hover mt-0.5">
                  Sus Compras Internacionales
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Insignia Circular Doble Superpuesta con Giro Automático al Lado Derecho */}
          <div className="flex-shrink-0">
            <Reveal direction="zoom-in" delay={0.1}>
              <Link
                to="/contacto"
                aria-label="Contáctanos para cotizar tu importación"
                className="group inline-flex items-center focus:outline-none"
              >
                {/* Círculo izquierdo azul marino con trama diagonal */}
                <div
                  className="w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-full bg-brand-navy relative overflow-hidden shadow-2xs flex-shrink-0"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(-45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1.5px, transparent 1.5px, transparent 7px)',
                  }}
                />

                {/* Círculo derecho blanco superpuesto con texto circular giratorio y botón amarillo (+10px) */}
                <div className="-ml-[16px] sm:-ml-[20px] w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-full bg-white shadow-2xs border border-slate-100 flex items-center justify-center relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full p-0.5 animate-[spin_18s_linear_infinite]"
                  >
                    <defs>
                      <path
                        id="whyUsCircleText"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text className="fill-brand-navy font-heading font-black text-[9px] uppercase tracking-[0.15em]">
                      <textPath href="#whyUsCircleText" startOffset="0%">
                        • CONTÁCTANOS • COTIZAR AHORA
                      </textPath>
                    </text>
                  </svg>

                  {/* Círculo central con flecha */}
                  <span className="absolute w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-full bg-brand-yellow group-hover:bg-brand-yellow-hover text-brand-navy flex items-center justify-center shadow-2xs transition-colors">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* =========================================================================
            FILA 2: PÍLDORAS DE ESPECIALIDADES + PÁRRAFO DESCRIPTIVO
            ========================================================================= */}
        <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-7">
          {/* Píldoras (Pills) de servicios/fortalezas */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {PILL_TAGS.map((tag, idx) => (
              <Reveal key={tag} direction="scale" delay={idx * 0.04}>
                <span className="inline-flex items-center bg-white text-brand-navy font-heading font-semibold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xs border border-slate-200/80">
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>

          {/* Texto descriptivo */}
          <Reveal direction="up" delay={0.1}>
            <p className="text-brand-gray text-xs sm:text-sm leading-relaxed text-justify">
              Acompañamos a cada cliente desde la cotización y selección del proveedor hasta la
              nacionalización y entrega final, ofreciendo soluciones seguras, eficientes y
              adaptadas a cada necesidad en maquinaria pesada, repuestos y comercio exterior.
            </p>
          </Reveal>
        </div>

        {/* =========================================================================
            FILA 3: IMAGEN DEL EQUIPO CON CORTE DIAGONAL Y REPRODUCTOR
            ========================================================================= */}
        <Reveal direction="diagonal-left" delay={0.12}>
          <div className="relative">
            {/* Contenedor de Imagen con corte diagonal en esquina superior izquierda */}
            <div className="relative h-[200px] sm:h-[280px] w-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-elevated group bg-brand-navy-surface">
              <img
                src="/images/why-choose-us-team.jpg"
                alt="Equipo de especialistas en comercio exterior, logística portuaria y maquinaria pesada de Valle Logistics"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Sutil degradado para resaltar el botón central */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/35 via-transparent to-transparent pointer-events-none" />

              {/* Chaflán / Corte diagonal superior izquierdo */}
              <div
                className="absolute -top-8 -left-8 w-16 h-16 sm:-top-12 sm:-left-12 sm:w-24 sm:h-24 bg-brand-light rotate-45 pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* Botón central tipo Play / Conocer Más */}
              <Link
                to="/nosotros"
                aria-label="Conocer más sobre Valle Logistics"
                className="absolute inset-0 flex items-center justify-center z-10 group/btn focus:outline-none"
              >
                <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-navy/40 backdrop-blur-md border-2 border-white/80 flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-brand-navy flex items-center justify-center shadow-sm">
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-brand-navy ml-0.5" />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            FILA 4: CONTADORES - 3 CAMPOS INDEPENDIENTES SUPERPUESTOS SOBRE FONDO AZUL
            ========================================================================= */}
        <div className="mt-3.5 sm:mt-5 relative z-10">
          <Reveal direction="up" delay={0.16}>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Campo 1: Operaciones y Envíos */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-navy p-2 sm:p-3 text-center shadow-yellow border border-amber-300/60 relative overflow-hidden flex flex-col items-center justify-center min-h-[82px] sm:min-h-[96px]">
                <div
                  className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-white/25 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="font-heading font-black text-lg sm:text-2xl text-brand-navy tracking-tight leading-none relative z-10">
                  <Counter value={COMPANY_DATA.stats.successfulShipments} suffix="+" />
                </div>
                <p className="text-[9px] sm:text-xs font-bold text-brand-navy/90 mt-1 leading-tight relative z-10">
                  Operaciones y Envíos
                </p>
              </div>

              {/* Campo 2: Años de Experiencia */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-navy p-2 sm:p-3 text-center shadow-yellow border border-amber-300/60 relative overflow-hidden flex flex-col items-center justify-center min-h-[82px] sm:min-h-[96px]">
                <div
                  className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-white/25 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="font-heading font-black text-lg sm:text-2xl text-brand-navy tracking-tight leading-none relative z-10">
                  <Counter value={COMPANY_DATA.yearsOfExperience} suffix="+" />
                </div>
                <p className="text-[9px] sm:text-xs font-bold text-brand-navy/90 mt-1 leading-tight relative z-10">
                  Años de Experiencia
                </p>
              </div>

              {/* Campo 3: Clientes Satisfechos */}
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-navy p-2 sm:p-3 text-center shadow-yellow border border-amber-300/60 relative overflow-hidden flex flex-col items-center justify-center min-h-[82px] sm:min-h-[96px]">
                <div
                  className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-white/25 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="font-heading font-black text-lg sm:text-2xl text-brand-navy tracking-tight leading-none relative z-10">
                  <Counter value={COMPANY_DATA.stats.satisfiedClients} suffix="+" />
                </div>
                <p className="text-[9px] sm:text-xs font-bold text-brand-navy/90 mt-1 leading-tight relative z-10">
                  Clientes Satisfechos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MobileHomeWhyUs;
