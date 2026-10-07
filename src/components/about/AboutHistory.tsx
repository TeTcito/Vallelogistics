import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, HardHat, FileCheck2, ShieldCheck, Briefcase, Calendar } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';

interface AboutFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ABOUT_PILLARS: AboutFeatureItem[] = [
  {
    id: 'pillar-1',
    title: 'Servicio Integral de Importación',
    description:
      'Brindamos un servicio integral que comprende desde la búsqueda, evaluación y negociación con proveedores internacionales hasta la coordinación logística y el proceso de importación.',
    icon: <HardHat className="w-6 h-6 text-brand-navy stroke-[1.75]" />,
  },
  {
    id: 'pillar-2',
    title: 'Responsabilidad, Transparencia y Atención Personalizada',
    description:
      'En Vallelogistics entendemos que cada compra representa una inversión importante. Por ello, trabajamos con responsabilidad, transparencia y atención personalizada, analizando las necesidades de cada cliente para ofrecer alternativas eficientes, competitivas y adaptadas a sus requerimientos.',
    icon: <FileCheck2 className="w-6 h-6 text-brand-navy stroke-[1.75]" />,
  },
  {
    id: 'pillar-3',
    title: 'Seguridad y Seguimiento Permanente',
    description:
      'Nuestro conocimiento de los procesos de comercio exterior y nuestra relación con proveedores internacionales nos permiten acompañar cada operación con seguridad y seguimiento permanente, procurando que nuestros clientes tengan información clara durante todo el proceso.',
    icon: <ShieldCheck className="w-6 h-6 text-brand-navy stroke-[1.75]" />,
  },
  {
    id: 'pillar-4',
    title: 'Relaciones de Confianza y Aliado Estratégico',
    description:
      'Más que importar productos, en Valle Logistics construimos relaciones de confianza. Nuestro propósito es convertirnos en un aliado estratégico para empresas, emprendedores y clientes que buscan productos, maquinaria, repuestos y soluciones de importación con respaldo, eficiencia y compromiso.',
    icon: <Briefcase className="w-6 h-6 text-brand-navy stroke-[1.75]" />,
  },
];

export const AboutHistory: React.FC = () => {
  return (
    <section
      id="historia"
      className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden"
    >
      {/* Trazos arquitectónicos sutiles de fondo en los extremos (idénticos a la referencia) */}
      <svg
        className="hidden xl:block absolute left-0 bottom-10 w-56 h-[460px] text-slate-200/70 pointer-events-none select-none"
        viewBox="0 0 200 450"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 440V140L95 85V440M95 150H165V440M35 180H70M35 230H70M35 280H70M35 330H70M115 200H145M115 250H145M115 300H145"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <svg
        className="hidden xl:block absolute right-0 bottom-10 w-56 h-[460px] text-slate-200/70 pointer-events-none select-none"
        viewBox="0 0 200 450"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M190 440V120L105 65V440M105 160H35V440M130 160H165M130 210H165M130 260H165M130 310H165M55 210H85M55 260H85M55 310H85"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            ENCABEZADO SUPERIOR DE 2 COLUMNAS: TÍTULO A LA IZQUIERDA + PÁRRAFO CON BORDE A LA DERECHA
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Columna Izquierda: Etiqueta y Titular */}
          <Reveal direction="left" className="lg:col-span-5">
            <div>
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-brand-gray block mb-2.5">
                QUIÉNES SOMOS · ECUADOR &amp; EL MUNDO
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[36px] text-brand-navy leading-[1.16] tracking-tight">
                Importaciones y Soluciones Logísticas Integrales
              </h2>
            </div>
          </Reveal>

          {/* Columna Derecha: Párrafo con línea vertical izquierda */}
          <Reveal direction="right" delay={0.1} className="lg:col-span-7">
            <div className="border-l-2 border-slate-300 pl-5 sm:pl-8 py-1">
              <p className="text-brand-gray text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-justify">
                Nuestra experiencia se centra en la importación de maquinaria, repuestos, partes y
                accesorios para vehículos de carga pesada y maquinaria, además de la gestión de
                importaciones de todo tipo de productos, de acuerdo con las necesidades específicas
                de cada cliente y en cumplimiento con la normativa aplicable.
              </p>
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            CUERPO PRINCIPAL DE 2 COLUMNAS: COLLAGE + HISTORIA DEL COMIENZO (IZQ) / 4 PILARES (DER)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* COLUMNA IZQUIERDA: Collage de 3 fotos con tarjeta amarilla central + Tarjeta Historia del Comienzo */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Collage de 3 Fotografías + Tarjeta Amarilla Central Superpuesta */}
            <div className="relative grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
              {/* Foto Vertical Izquierda */}
              <Reveal direction="diagonal-left" delay={0.05} className="col-span-6">
                <div className="rounded-2xl overflow-hidden h-[320px] sm:h-[380px] w-full shadow-sm bg-slate-100">
                  <img
                    src="/images/about-collage-imports.jpg"
                    alt="Recepción e importación de repuestos, filtros y componentes para vehículos de carga pesada en Vallelogistics"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Reveal>

              {/* 2 Fotos Apiladas a la Derecha */}
              <div className="col-span-6 flex flex-col gap-3.5 sm:gap-4">
                <Reveal direction="right" delay={0.14}>
                  <div className="rounded-2xl overflow-hidden h-[152px] sm:h-[182px] w-full shadow-sm bg-slate-100">
                    <img
                      src="/images/client-accompaniment.jpg"
                      alt="Negociación directa con proveedores internacionales entre China y Ecuador"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Reveal>

                <Reveal direction="diagonal-right" delay={0.22}>
                  <div className="rounded-2xl overflow-hidden h-[152px] sm:h-[182px] w-full shadow-sm bg-slate-100">
                    <img
                      src="/images/process-specialist-main.jpg"
                      alt="Acompañamiento logístico y comercio exterior Vallelogistics"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Reveal>
              </div>

              {/* Tarjeta Amarilla Central Flotante (con 2 indicadores divididos) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <Reveal direction="zoom-in" delay={0.3}>
                  <div className="bg-brand-yellow text-brand-navy rounded-2xl px-5 py-5 sm:px-7 sm:py-6 w-[162px] sm:w-[192px] text-center shadow-[0_18px_38px_-6px_rgba(253,185,19,0.55)] border-2 border-white">
                    <div>
                      <span className="font-heading font-black text-2xl sm:text-3xl text-brand-navy block leading-none">
                        China - EC
                      </span>
                      <span className="font-sans font-semibold text-[11px] sm:text-xs text-brand-navy/85 mt-1.5 block">
                        Conexión Directa
                      </span>
                    </div>

                    <div className="my-3.5 sm:my-4 border-t border-brand-navy/20" />

                    <div>
                      <span className="font-heading font-black text-2xl sm:text-3xl text-brand-navy block leading-none">
                        100%
                      </span>
                      <span className="font-sans font-semibold text-[11px] sm:text-xs text-brand-navy/85 mt-1.5 block">
                        Respaldo Integral
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* 2. Bloque Inferior Izquierdo: Historia del Comienzo (con insignia amarilla y foto lateral) */}
            <Reveal direction="up" delay={0.18}>
              <div className="mt-6 rounded-2xl bg-[#F8F9FB] border border-slate-200/80 p-5 sm:p-6 shadow-subtle relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-brand-yellow text-brand-navy flex items-center justify-center shadow-xs">
                      <Calendar className="w-4 h-4 stroke-[2.2]" />
                    </span>
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-navy tracking-tight">
                      Historia del comienzo
                    </h3>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-yellow text-brand-navy font-heading font-extrabold text-[11px] uppercase tracking-wider shadow-xs">
                    24 de junio de 2026
                  </span>
                </div>

                <p className="text-brand-gray text-xs sm:text-[13.5px] leading-relaxed text-justify">
                  <strong>Vallelogistics</strong> inició sus actividades el{' '}
                  <strong>24 de junio de 2026</strong>. La idea nació durante nuestro viaje a{' '}
                  <strong>China</strong>, donde identificamos importantes oportunidades de negocio y
                  comercio entre <strong>China y Ecuador</strong>. A partir de esta experiencia
                  decidimos crear una empresa enfocada en brindar soluciones confiables y
                  personalizadas en importaciones, logística y comercio exterior, acompañando a
                  nuestros clientes durante todo el proceso.
                </p>

                <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] sm:text-xs font-heading font-bold text-brand-navy">
                  <span>Vallelogistics and Import</span>
                  <span className="text-brand-yellow-hover">
                    — Conectamos oportunidades, movemos tu futuro.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* COLUMNA DERECHA: 4 Ítems con Ícono Circular + Título + Descripción y Barra Inferior */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="space-y-6 sm:space-y-7">
              {ABOUT_PILLARS.map((pillar, idx) => (
                <Reveal key={pillar.id} direction="flip-up" delay={0.08 + idx * 0.08}>
                  <div className="flex items-start gap-4 sm:gap-5 group">
                    {/* Círculo gris claro con ícono lineal */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-100 group-hover:bg-brand-yellow/25 flex items-center justify-center shrink-0 transition-colors duration-300">
                      {pillar.icon}
                    </div>

                    {/* Texto del pilar */}
                    <div>
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-navy leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-brand-gray text-xs sm:text-[13.5px] leading-relaxed mt-1.5 text-justify">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Barra de Acción Inferior: Botón Oscuro Píldora + Teléfono con Ícono Amarillo */}
            <Reveal direction="scale" delay={0.35}>
              <div className="mt-9 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 sm:gap-8">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-blue text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Contáctanos
                </Link>

                <a
                  href={`tel:${COMPANY_DATA.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-3.5 group"
                >
                  <span className="w-11 h-11 rounded-full bg-brand-yellow/20 text-brand-yellow-hover flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-300">
                    <PhoneCall className="w-5 h-5 stroke-[2.2]" />
                  </span>
                  <div>
                    <span className="font-heading font-extrabold text-sm sm:text-base text-brand-navy block leading-tight group-hover:text-brand-blue transition-colors">
                      {COMPANY_DATA.phoneDisplay}
                    </span>
                    <span className="text-[11px] text-brand-gray block mt-0.5">
                      Llámanos para Asesoría
                    </span>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
