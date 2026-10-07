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

export const HomeWhyUs: React.FC = () => {
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
        className="absolute bottom-0 inset-x-0 h-[160px] sm:h-[195px] lg:h-[215px] bg-brand-navy z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Patrón de líneas diagonales en el borde inferior */}
        <div
          className="absolute bottom-0 inset-x-0 h-4 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg, #FDB913 0px, #FDB913 1.5px, transparent 1.5px, transparent 10px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            FILA 1: ENCABEZADO BICOLOR + INSIGNIA CIRCULAR DOBLE (GET IN TOUCH)
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 sm:mb-10">
          <Reveal direction="left">
            <div>
              {/* Subtítulo superior con guion */}
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="w-6 h-[2px] bg-brand-yellow-hover rounded-full" />
                <span className="font-sans font-medium text-xs sm:text-sm text-brand-navy tracking-wide">
                  Por Qué Elegirnos · Excelencia en Comercio Exterior
                </span>
              </div>

              {/* Título Principal en 2 líneas (Azul Marino + Amarillo Dorado de Marca) */}
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.14]">
                <span className="block text-brand-navy">
                  Donde la Gestión Integral Impulsa
                </span>
                <span className="block text-brand-yellow-hover mt-0.5">
                  Sus Compras Internacionales
                </span>
              </h2>
            </div>
          </Reveal>

          {/* Insignia Circular Doble Superpuesta (CTA a Contacto) */}
          <Reveal direction="zoom-in" delay={0.12}>
            <Link
              to="/contacto"
              aria-label="Contáctanos para cotizar tu importación"
              className="group inline-flex items-center self-start sm:self-center focus:outline-none"
            >
              {/* Círculo izquierdo azul marino con trama diagonal */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-navy relative overflow-hidden shadow-md flex-shrink-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1.5px, transparent 1.5px, transparent 7px)',
                }}
              />

              {/* Círculo derecho blanco superpuesto con texto circular y botón amarillo */}
              <div className="-ml-9 sm:-ml-11 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-card border border-slate-100 flex items-center justify-center relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full p-1.5 animate-[spin_18s_linear_infinite]"
                >
                  <defs>
                    <path
                      id="whyUsCircleText"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text className="fill-brand-navy font-heading font-extrabold text-[8.3px] uppercase tracking-[0.16em]">
                    <textPath href="#whyUsCircleText" startOffset="0%">
                      • CONTÁCTANOS • COTIZAR AHORA
                    </textPath>
                  </text>
                </svg>

                {/* Círculo central con flecha */}
                <span className="absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-yellow group-hover:bg-brand-yellow-hover text-brand-navy flex items-center justify-center shadow-sm transition-colors">
                  <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* =========================================================================
            FILA 2: PÍLDORAS DE ESPECIALIDADES + DIVISOR + PÁRRAFO DESCRIPTIVO
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-10 sm:mb-12">
          {/* Píldoras (Pills) de servicios/fortalezas */}
          <div className="lg:col-span-6 flex flex-wrap gap-2.5 sm:gap-3">
            {PILL_TAGS.map((tag, idx) => (
              <Reveal key={tag} direction="scale" delay={idx * 0.06}>
                <span className="inline-flex items-center bg-white text-brand-navy font-heading font-semibold text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_2px_8px_rgba(6,27,75,0.05)] border border-slate-200/80 hover:border-brand-yellow hover:shadow-md transition-all duration-200">
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>

          {/* Línea divisoria vertical + Texto descriptivo */}
          <Reveal direction="right" delay={0.14} className="lg:col-span-6">
            <div className="flex items-center gap-6 lg:gap-8">
              <div
                className="hidden lg:block w-[2px] h-16 bg-gradient-to-b from-transparent via-brand-yellow-hover to-transparent flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-brand-gray text-sm sm:text-[15px] leading-relaxed text-justify">
                Acompañamos a cada cliente desde la cotización y selección del proveedor hasta la
                nacionalización y entrega final, ofreciendo soluciones seguras, eficientes y
                adaptadas a cada necesidad en maquinaria pesada, repuestos y comercio exterior.
              </p>
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            FILA 3: IMAGEN CON CORTE DIAGONAL Y ESTRELLAS + TARJETA VERTICAL DE CIFRAS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* Columna Izquierda (8 cols): Fotografía con chaflán superior izquierdo */}
          <div className="lg:col-span-8 relative">
            <Reveal direction="diagonal-left" delay={0.12}>
              <div className="relative">
                {/* Estrellas de 4 puntas decorativas en esquina inferior izquierda */}
                <div
                  className="hidden sm:block absolute -left-7 lg:-left-9 bottom-7 z-20 pointer-events-none text-brand-yellow drop-shadow-sm"
                  aria-hidden="true"
                >
                  <svg
                    width="68"
                    height="68"
                    viewBox="0 0 68 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Estrella superior izquierda mediana */}
                    <path
                      d="M16 4C16 11.5 20.5 16 28 16C20.5 16 16 20.5 16 28C16 20.5 11.5 16 4 16C11.5 16 16 11.5 16 4Z"
                      fill="currentColor"
                    />
                    {/* Estrella principal derecha grande */}
                    <path
                      d="M44 18C44 29 51 36 62 36C51 36 44 43 44 54C44 43 37 36 26 36C37 36 44 29 44 18Z"
                      fill="currentColor"
                    />
                    {/* Estrella inferior izquierda pequeña */}
                    <path
                      d="M18 42C18 46.5 20.5 49 25 49C20.5 49 18 51.5 18 56C18 51.5 15.5 49 11 49C15.5 49 18 46.5 18 42Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Contenedor de Imagen con corte diagonal en esquina superior izquierda */}
                <div className="relative h-[260px] sm:h-[330px] lg:h-[360px] w-full rounded-[24px] overflow-hidden shadow-elevated group bg-brand-navy-surface">
                  <img
                    src="/images/why-choose-us-team.jpg"
                    alt="Equipo de especialistas en comercio exterior, logística portuaria y maquinaria pesada de Valle Logistics"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Sutil degradado para resaltar el botón central */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/35 via-transparent to-transparent pointer-events-none" />

                  {/* Chaflán / Corte diagonal superior izquierdo idéntico a la referencia */}
                  <div
                    className="absolute -top-10 -left-10 w-20 h-20 sm:-top-12 sm:-left-12 sm:w-24 sm:h-24 bg-brand-light rotate-45 pointer-events-none z-10"
                    aria-hidden="true"
                  />

                  {/* Botón central tipo Play / Conocer Más */}
                  <Link
                    to="/nosotros"
                    aria-label="Conocer más sobre Valle Logistics"
                    className="absolute inset-0 flex items-center justify-center z-10 group/btn focus:outline-none"
                  >
                    <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-navy/40 backdrop-blur-md border-2 border-white/80 flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-brand-navy flex items-center justify-center shadow-sm">
                        <Play className="w-3.5 h-3.5 fill-brand-navy ml-0.5" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Columna Derecha (4 cols): Tarjeta Vertical de Estadísticas en Amarillo de Marca */}
          <div className="lg:col-span-4">
            <Reveal direction="diagonal-right" delay={0.22} className="h-full">
              <div className="h-full min-h-[260px] sm:min-h-[330px] lg:min-h-[360px] rounded-[24px] bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-navy p-7 sm:p-8 flex flex-col justify-between shadow-yellow border border-amber-300/60 relative overflow-hidden">
                {/* Sutil brillo decorativo en esquina */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Cifra 1 */}
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
                    <Counter value={COMPANY_DATA.stats.successfulShipments} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-navy/85 mt-1">
                    Operaciones y Envíos Exitosos
                  </p>
                </div>

                <div className="h-[1px] w-full bg-brand-navy/10" />

                {/* Cifra 2 */}
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
                    <Counter value={COMPANY_DATA.yearsOfExperience} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-navy/85 mt-1">
                    Años de Experiencia
                  </p>
                </div>

                <div className="h-[1px] w-full bg-brand-navy/10" />

                {/* Cifra 3 */}
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-none">
                    <Counter value={COMPANY_DATA.stats.satisfiedClients} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-navy/85 mt-1">
                    Clientes Satisfechos
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
