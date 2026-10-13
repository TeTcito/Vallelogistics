import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface FeaturedServiceCard {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const SERVICE_CARDS: FeaturedServiceCard[] = [
  {
    id: 'compras-internacionales',
    title: 'Importación',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-8 h-8 sm:w-9 sm:h-9 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="22" fill="currentColor" fillOpacity="0.1" />
        <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2.2" />
        <ellipse cx="32" cy="32" rx="6.5" ry="14" stroke="currentColor" strokeWidth="2" />
        <path d="M18.5 28H45.5M18.5 36H45.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    title: 'Proveedores',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-8 h-8 sm:w-9 sm:h-9 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
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
    title: 'Aduanas',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-8 h-8 sm:w-9 sm:h-9 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
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
    title: 'Maquinaria',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-8 h-8 sm:w-9 sm:h-9 text-brand-yellow-hover transition-transform duration-300 group-hover:scale-110"
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

export const MobileHomeFeaturedServices: React.FC = () => {
  return (
    <section className="pt-8 sm:pt-12 pb-0 bg-brand-light relative overflow-hidden">
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
        {/* Encabezado Superior */}
        <Reveal direction="left">
          <div className="mb-4 sm:mb-6">
            {/* Subtítulo superior */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 sm:w-5 h-[2px] bg-brand-yellow-hover rounded-full" />
              <span className="font-heading font-extrabold text-[10.5px] sm:text-xs uppercase tracking-wider text-brand-yellow-hover">
                Nuestros Servicios
              </span>
            </div>

            {/* Título Principal acoplado al ancho de la pantalla móvil */}
            <h2 className="font-heading font-black text-[1.25rem] sm:text-2xl lg:text-3xl leading-[1.2] tracking-tight text-brand-navy">
              Soluciones en Importaciones y{' '}
              <span className="text-brand-yellow-hover">Comercio Exterior</span>
            </h2>
          </div>
        </Reveal>

        {/* Fila Única: 4 Bloques de Servicios lado a lado en una sola fila */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 mb-6 sm:mb-8">
          {SERVICE_CARDS.map((card, index) => (
            <Reveal key={card.id} direction="up" delay={index * 0.05} className="h-full">
              <Link
                to={`/servicios#${card.id}`}
                className="group bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs hover:shadow-card border border-slate-100 hover:border-brand-yellow/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[96px] sm:min-h-[108px]"
              >
                {/* Ícono Superior Ampliado */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-amber-50 group-hover:bg-brand-yellow/20 flex items-center justify-center mb-1.5 transition-colors flex-shrink-0">
                  {card.icon}
                </div>

                {/* Solo Título Resumido (sin mensajes inferiores) */}
                <h3 className="font-heading font-black text-[9.5px] sm:text-[11px] uppercase text-brand-navy group-hover:text-brand-blue transition-colors leading-tight text-center">
                  {card.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Fila Inferior: Banner Horizontal con Checklist + Imagen en Arco Curvo (Full-bleed a los bordes de la pantalla y terminando al ras de la siguiente sección) */}
        <div className="-mx-4 sm:-mx-6 lg:mx-0">
          <Reveal direction="scale" delay={0.12}>
            <div className="bg-white sm:rounded-3xl shadow-[0_10px_35px_rgb(6,27,75,0.055)] border-t sm:border border-slate-100/90 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Columna Izquierda: Texto y 6 puntos clave en 2 columnas */}
                <div className="lg:col-span-7 px-5 py-6 sm:p-8 lg:py-11 lg:pl-12 lg:pr-8 flex flex-col justify-center">
                  <Reveal direction="left" delay={0.15}>
                    <h3 className="font-heading font-black text-lg sm:text-2xl lg:text-[34px] text-brand-navy leading-[1.18] tracking-tight">
                      <span className="block">Acompañamiento Integral</span>
                      <span className="block mt-0.5 text-brand-blue">Servicio Seguro y Eficiente</span>
                    </h3>

                    <p className="text-brand-gray text-xs sm:text-sm mt-2 max-w-lg leading-relaxed text-justify">
                      Nuestro equipo experto asegura una gestión impecable desde la cotización y selección del proveedor hasta la entrega final.
                    </p>
                  </Reveal>

                  {/* Checklist de 6 ítems en 2 columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mt-5">
                    {BANNER_CHECKLIST.map((item, idx) => (
                      <Reveal key={item} direction="up" delay={0.15 + idx * 0.03} distance={14}>
                        <div className="flex items-center gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-brand-yellow-hover text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold text-brand-navy leading-snug">
                            {item}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>

                {/* Columna Derecha: Fotografía con Arco Curvo de lado a lado y terminando al ras de la siguiente sección */}
                <div className="lg:col-span-5 relative">
                  <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[360px] overflow-hidden bg-brand-light">
                    <img
                      src="/images/service-specialist-banner.jpg"
                      alt="Especialista de Valle Logistics verificando maquinaria pesada importada"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Arco curvo separador izquierdo para desktop */}
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

                    {/* Separador superior curvo para vista móvil/tablet que inicia y termina en los bordes */}
                    <svg
                      viewBox="0 0 400 60"
                      preserveAspectRatio="none"
                      className="block lg:hidden absolute inset-x-0 top-0 w-full h-11 pointer-events-none select-none z-10"
                      aria-hidden="true"
                    >
                      <path d="M 0 0 L 400 0 L 400 35 Q 200 -10 0 35 Z" fill="#FFFFFF" />
                      <path d="M 0 35 Q 200 -10 400 35 L 400 48 Q 200 3 0 48 Z" fill="#E5A40B" />
                      <path d="M 0 48 Q 200 3 400 48 L 400 54 Q 200 9 0 54 Z" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MobileHomeFeaturedServices;
