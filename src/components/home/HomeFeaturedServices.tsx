import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface FeaturedServiceCard {
  id: string;
  titleLine1: string;
  titleLine2: string;
  descLine1: string;
  descLine2: string;
  icon: React.ReactNode;
}

const SERVICE_CARDS: FeaturedServiceCard[] = [
  {
    id: 'compras-internacionales',
    titleLine1: 'Importación y Compras',
    titleLine2: 'Internacionales',
    descLine1: 'Maquinaria, repuestos y',
    descLine2: 'equipos de diversos sectores',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-14 h-14 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
         aria-hidden="true"
      >
        <circle cx="32" cy="32" r="22" fill="currentColor" fillOpacity="0.1" />
        <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2.2" />
        <ellipse cx="32" cy="32" rx="6.5" ry="14" stroke="currentColor" strokeWidth="2" />
        <path d="M18.5 28H45.5M18.5 36H45.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Orbiting cargo nodes */}
        <path
          d="M22 13C25 10.5 28.4 9 32 9C35.6 9 39 10.5 42 13"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M42 51C39 53.5 35.6 55 32 55C28.4 55 25 53.5 22 51"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="14" cy="22" r="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="22" r="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="44" r="3.5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
        <circle cx="48" cy="44" r="3.5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'busqueda-negociacion-proveedores',
    titleLine1: 'Búsqueda y Gestión',
    titleLine2: 'de Proveedores',
    descLine1: 'Negociación directa y',
    descLine2: 'segura en el exterior',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-14 h-14 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="14"
          width="40"
          height="22"
          rx="4"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <rect x="17" y="19" width="30" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <path d="M20 31H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Flow lines down */}
        <path
          d="M24 36V41C24 44.5 21 47 17 49"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M32 36V50" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path
          d="M40 36V41C40 44.5 43 47 47 49"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M15 46L16.5 50L20.5 49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 47L32 51L35 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49 46L47.5 50L43.5 49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'aduanas-y-nacionalizacion',
    titleLine1: 'Logística, Aduanas',
    titleLine2: 'y Nacionalización',
    descLine1: 'Transporte multimodal y',
    descLine2: 'desaduanaje sin demoras',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-14 h-14 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <path
          d="M32 11L48 17V30C48 41.2 41.1 50.4 32 54C22.9 50.4 16 41.2 16 30V17L32 11Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M32 16.5L43 20.8V29.8C43 38.1 38.2 45 32 48.2C25.8 45 21 38.1 21 29.8V20.8L32 16.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="3 2"
        />
        <path
          d="M26.5 32L30.5 36L38.5 27.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="43" r="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
        <circle cx="49" cy="43" r="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'comercializacion-maquinaria-repuestos',
    titleLine1: 'Venta de Maquinaria',
    titleLine2: 'y Repuestos',
    descLine1: 'Equipos pesados y piezas',
    descLine2: 'de alto rendimiento',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-14 h-14 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="20" fill="currentColor" fillOpacity="0.08" />
        <path
          d="M14 24H42C45.8 24 48.5 21.2 48.5 17.5C48.5 14.2 46 11.5 42.5 11.5C39.2 11.5 37 13.8 37 16.8"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M12 32H48C51.5 32 54 34.5 54 38C54 41.5 51.5 44 48 44C44.8 44 42.5 41.8 42.5 39"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M16 40H33C36.3 40 39 42.7 39 46C39 49.3 36.3 52 33 52C29.8 52 27.5 49.6 27.5 46.8"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <circle cx="22" cy="17" r="3.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="19" cy="48" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

const BANNER_CHECKLIST = [
  'Importación de Maquinaria y Repuestos',
  'Transporte Marítimo, Aéreo y Terrestre',
  'Asesoría en Comercio Exterior',
  'Gestión de Aduanas y Nacionalización',
  'Búsqueda y Negociación con Proveedores',
  'Comercialización de Repuestos Pesados',
];

export const HomeFeaturedServices: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-brand-light relative overflow-hidden">
      {/* Sutil iluminación ambiental manteniendo la paleta corporativa */}
      <div
        className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-0 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado Superior Izquierdo */}
        <Reveal direction="left" distance={38}>
          <div className="mb-10 sm:mb-12 relative">
            {/* Subtítulo superior con estrella decorativa '+' y guion '—' */}
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="text-brand-yellow-hover font-extrabold text-base leading-none select-none -ml-1 sm:-ml-5 mr-1"
                aria-hidden="true"
              >
                +
              </span>
              <span className="w-5 h-[2.5px] bg-brand-yellow-hover rounded-full" />
              <span className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-[0.16em] text-brand-yellow-hover">
                Nuestros Servicios
              </span>
            </div>

            {/* Título Principal en 2 líneas y 2 tonos */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-brand-navy">
              Soluciones en Importaciones
              <span className="block mt-1">
                y <span className="text-brand-yellow-hover">Comercio Exterior</span>
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Fila Intermedia: 4 Tarjetas Blancas Redondeadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_CARDS.map((card, index) => (
            <Reveal key={card.id} direction="flip-up" delay={index * 0.09} className="h-full">
              <Link
                to={`/servicios#${card.id}`}
                className="group bg-white rounded-2xl px-6 py-8 sm:py-9 text-center shadow-[0_8px_30px_rgb(6,27,75,0.045)] hover:shadow-card border border-slate-100/90 hover:border-brand-yellow/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center h-full"
              >
                {/* Ícono Superior */}
                <div className="mb-5 flex items-center justify-center">
                  {card.icon}
                </div>

                {/* Título en 2 líneas */}
                <h3 className="font-heading font-extrabold text-lg sm:text-[19px] text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                  <span className="block">{card.titleLine1}</span>
                  <span className="block">{card.titleLine2}</span>
                </h3>

                {/* Descripción corta en 2 líneas */}
                <p className="text-brand-gray text-xs sm:text-sm mt-3 leading-relaxed">
                  <span className="block">{card.descLine1}</span>
                  <span className="block">{card.descLine2}</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Fila Inferior: Banner Horizontal con Checklist + Imagen en Arco Curvo */}
        <Reveal direction="scale" delay={0.12}>
          <div className="mt-5 bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_35px_rgb(6,27,75,0.055)] border border-slate-100/90 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Columna Izquierda: Texto y 6 puntos clave en 2 columnas */}
              <div className="lg:col-span-7 p-7 sm:p-10 lg:py-11 lg:pl-12 lg:pr-8 flex flex-col justify-center">
                <Reveal direction="left" delay={0.15}>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-brand-navy leading-[1.18] tracking-tight">
                    <span className="block">Acompañamiento Integral</span>
                    <span className="block mt-0.5">Servicio Seguro y Eficiente</span>
                  </h3>

                  <p className="text-brand-gray text-sm sm:text-base mt-3.5 max-w-lg leading-relaxed text-justify">
                    Nuestro equipo experto asegura una gestión impecable desde la cotización y selección del proveedor hasta la entrega final.
                  </p>
                </Reveal>

                {/* Checklist de 6 ítems en 2 columnas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 mt-7">
                  {BANNER_CHECKLIST.map((item, idx) => (
                    <Reveal key={item} direction="up" delay={0.2 + idx * 0.05} distance={18}>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-brand-yellow-hover text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="text-xs sm:text-[13.5px] font-semibold text-brand-navy leading-snug">
                          {item}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Columna Derecha: Fotografía con Arco Curvo Amarillo/Ámbar */}
              <Reveal direction="right" delay={0.2} className="lg:col-span-5">
                <div className="relative h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[360px] overflow-hidden bg-brand-light">
                  <img
                    src="/images/service-specialist-banner.jpg"
                    alt="Especialista de Valle Logistics verificando maquinaria pesada importada"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Arco curvo separador izquierdo (idéntico al diseño de referencia con nuestra paleta) */}
                  <svg
                    viewBox="0 0 115 400"
                    preserveAspectRatio="none"
                    className="hidden lg:block absolute inset-y-0 left-0 h-full w-[95px] xl:w-[115px] pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="servicesArcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FDB913" />
                        <stop offset="50%" stopColor="#E5A40B" />
                        <stop offset="100%" stopColor="#FDB913" />
                      </linearGradient>
                    </defs>
                    {/* Máscara blanca izquierda que une con el fondo de la tarjeta */}
                    <path
                      d="M 0 0 L 72 0 Q -48 200 72 400 L 0 400 Z"
                      fill="#FFFFFF"
                    />
                    {/* Franja curva en amarillo/ámbar corporativo */}
                    <path
                      d="M 72 0 L 96 0 Q -24 200 96 400 L 72 400 Q -48 200 72 0 Z"
                      fill="url(#servicesArcGrad)"
                    />
                    {/* Separación blanca entre el arco amarillo y la foto */}
                    <path
                      d="M 96 0 L 105 0 Q -15 200 105 400 L 96 400 Q -24 200 96 0 Z"
                      fill="#FFFFFF"
                    />
                  </svg>

                  {/* Separador superior curvo para vista móvil/tablet */}
                  <svg
                    viewBox="0 0 400 60"
                    preserveAspectRatio="none"
                    className="block lg:hidden absolute inset-x-0 top-0 w-full h-10 pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    <path d="M 0 0 L 400 0 L 400 35 Q 200 -10 0 35 Z" fill="#FFFFFF" />
                    <path d="M 0 35 Q 200 -10 400 35 L 400 48 Q 200 3 0 48 Z" fill="#E5A40B" />
                    <path d="M 0 48 Q 200 3 400 48 L 400 54 Q 200 9 0 54 Z" fill="#FFFFFF" />
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
