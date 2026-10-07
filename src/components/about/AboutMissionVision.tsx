import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface SpecialtyCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const SPECIALTY_CARDS: SpecialtyCardItem[] = [
  {
    id: 'spec-1',
    title: 'Maquinaria y Carga Pesada',
    description:
      'Importación de maquinaria y equipos para vehículos de carga pesada e industria, adaptados a los requerimientos técnicos de cada operación.',
    image: '/images/service-specialist-banner.jpg',
    link: '/servicios',
  },
  {
    id: 'spec-2',
    title: 'Repuestos, Partes y Accesorios',
    description:
      'Suministro directo de repuestos, partes y accesorios para vehículos de carga pesada y maquinaria con calidad verificada en origen.',
    image: '/images/services-showcase-bottom.jpg',
    link: '/productos',
  },
  {
    id: 'spec-3',
    title: 'Proveedores Internacionales',
    description:
      'Búsqueda, evaluación y negociación directa con fabricantes confiables en China y a nivel global para asegurar alternativas competitivas.',
    image: '/images/client-accompaniment.jpg',
    link: '/servicios',
  },
  {
    id: 'spec-4',
    title: 'Gestión Logística Integral',
    description:
      'Coordinación logística e importación de todo tipo de productos con seguimiento permanente y estricto cumplimiento de la normativa aplicable.',
    image: '/images/why-choose-us-team.jpg',
    link: '/servicios',
  },
];

export const AboutMissionVision: React.FC = () => {
  return (
    <section className="relative bg-white pb-16 sm:pb-20 overflow-hidden">
      {/* Franja superior amarilla que cubre el encabezado y la mitad superior de las fotografías */}
      <div
        className="absolute inset-x-0 top-0 h-[360px] sm:h-[390px] lg:h-[380px] bg-brand-yellow pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14 sm:pt-16 lg:pt-20">
        {/* =========================================================================
            ENCABEZADO DENTRO DE LA FRANJA AMARILLA (2 COLUMNAS)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-10 sm:mb-12">
          {/* Columna Izquierda: Etiqueta + Título en 2 líneas */}
          <Reveal direction="left" className="lg:col-span-5">
            <div>
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-brand-navy/80 block mb-2">
                NUESTROS SERVICIOS
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[35px] text-brand-navy leading-[1.16] tracking-tight">
                Soluciones Ideales Para Tus Operaciones de Importación
              </h2>
            </div>
          </Reveal>

          {/* Columna Derecha: Párrafo con línea vertical sutil */}
          <Reveal direction="right" delay={0.1} className="lg:col-span-7">
            <div className="border-l border-brand-navy/25 pl-5 sm:pl-8 py-1">
              <p className="text-brand-navy/85 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-medium text-justify">
                Conectamos a empresas, emprendedores y clientes con proveedores y productos
                confiables a nivel internacional. Cada compra representa una inversión importante,
                por lo que brindamos acompañamiento seguro, información clara y alternativas
                eficientes de principio a fin.
              </p>
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            GRILLA DE 4 TARJETAS FOTOGRÁFICAS CON FLECHA Y LÍNEA INFERIOR
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {SPECIALTY_CARDS.map((card, index) => (
            <Reveal key={card.id} direction="flip-up" delay={index * 0.09}>
              <div className="group flex flex-col justify-between h-full">
                <div>
                  {/* Fotografía redondeada que cruza la franja amarilla y el fondo blanco */}
                  <Link
                    to={card.link}
                    className="block rounded-2xl overflow-hidden h-56 sm:h-60 w-full shadow-md bg-brand-navy"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Fila de Título + Flecha Derecha */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      to={card.link}
                      className="font-heading font-extrabold text-base sm:text-[17px] text-brand-navy group-hover:text-brand-blue transition-colors leading-snug"
                    >
                      {card.title}
                    </Link>
                    <Link
                      to={card.link}
                      aria-label={`Ver más sobre ${card.title}`}
                      className="text-brand-navy group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                    </Link>
                  </div>

                  {/* Descripción */}
                  <p className="mt-2.5 text-brand-gray text-xs sm:text-[13px] leading-relaxed text-justify">
                    {card.description}
                  </p>
                </div>

                {/* Línea horizontal inferior */}
                <div className="mt-5 border-b border-slate-300 group-hover:border-brand-yellow-hover transition-colors" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* =========================================================================
            BOTONES PÍLDORA CENTRADOS INFERIORES (AMARILLO + AZUL MARINO OSCURO)
            ========================================================================= */}
        <Reveal direction="zoom-in" delay={0.22}>
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#cotizar-nosotros"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Solicitar Cotización
            </a>

            <Link
              to="/servicios"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-navy hover:bg-brand-blue text-white font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Ver Todos los Servicios
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
