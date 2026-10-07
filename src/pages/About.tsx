import React from 'react';
import { Star } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';
import { Reveal } from '@/components/ui/Reveal';
import { AboutHistory } from '@/components/about/AboutHistory';
import { AboutMissionVision } from '@/components/about/AboutMissionVision';
import { AboutAlliances } from '@/components/about/AboutAlliances';

export const About: React.FC = () => {
  return (
    <>
      <SEO
        title="Nosotros - Importaciones, Logística y Comercio Exterior"
        description="Vallelogistics: empresa ecuatoriana especializada en importaciones de maquinaria, repuestos, partes y accesorios para carga pesada y soluciones logísticas integrales."
      />

      {/* =========================================================================
          1. HERO PRINCIPAL DE NOSOTROS (DISEÑO IDÉNTICO A LA REFERENCIA)
          ========================================================================= */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center bg-[#181B20] overflow-hidden">
        {/* Imagen de fondo de comercio exterior, importaciones China-Ecuador y repuestos */}
        <img
          src="/images/about-hero-imports.jpg"
          alt="Equipo de comercio exterior e importaciones China - Ecuador de Vallelogistics en terminal portuaria"
          className="absolute inset-0 w-full h-full object-cover object-right lg:object-center select-none"
        />

        {/* Degradado oscuro suave en la mitad izquierda para resaltar el texto blanco */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#12151A]/95 via-[#12151A]/80 to-transparent"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            {/* Etiqueta superior en mayúsculas */}
            <Reveal direction="down" delay={0.05}>
              <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.22em] text-slate-200 block mb-3">
                VALLELOGISTICS AND IMPORT
              </span>
            </Reveal>

            {/* Titular en 2 líneas */}
            <Reveal direction="left" delay={0.12}>
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[46px] text-white leading-[1.12] tracking-tight">
                <span className="block">Conectamos Oportunidades,</span>
                <span className="block mt-1">Movemos Soluciones.</span>
              </h1>
            </Reveal>

            {/* Párrafo descriptivo principal */}
            <Reveal direction="blur" delay={0.2}>
              <p className="text-slate-200/90 text-xs sm:text-sm lg:text-[15px] leading-relaxed mt-4 max-w-lg text-justify">
                Somos una empresa ecuatoriana especializada en importaciones y soluciones
                logísticas, comprometida con conectar a nuestros clientes con proveedores y
                productos confiables a nivel internacional.
              </p>
            </Reveal>

            {/* Dos Botones Píldora (Amarillo + Blanco) */}
            <Reveal direction="up" delay={0.28}>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#cotizar-nosotros"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-yellow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Cotizar Ahora
                </a>

                <a
                  href="#historia"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white hover:bg-slate-100 text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Conocer Más
                </a>
              </div>
            </Reveal>

            {/* Bloque Inferior: 3 Avatares Superpuestos + 5 Estrellas + Texto de Confianza */}
            <Reveal direction="scale" delay={0.36}>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center">
                  <img
                    src="/images/team-1.jpg"
                    alt="Cliente y aliado estratégico Vallelogistics 1"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img
                    src="/images/team-2.jpg"
                    alt="Cliente y aliado estratégico Vallelogistics 2"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white -ml-2.5 shadow-sm"
                  />
                  <img
                    src="/images/team-3.jpg"
                    alt="Cliente y aliado estratégico Vallelogistics 3"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white -ml-2.5 shadow-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-0.5 text-white" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow"
                      />
                    ))}
                  </div>
                  <span className="block text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5">
                    Aliado Estratégico Confiable
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. EXPERIENCIA, COLLAGE 3 FOTOS + TARJETA AMARILLA, HISTORIA DEL COMIENZO Y 4 PILARES
          ========================================================================= */}
      <AboutHistory />

      {/* =========================================================================
          3. FRANJA AMARILLA SUPERIOR + 4 TARJETAS DE ESPECIALIDADES Y BOTONES PÍLDORA
          ========================================================================= */}
      <AboutMissionVision />

      {/* =========================================================================
          4. FORMULARIO DE COTIZACIÓN CON ESPECIALISTA + TARJETA "POR QUÉ ELEGIRNOS"
          ========================================================================= */}
      <AboutAlliances />
    </>
  );
};

export default About;
