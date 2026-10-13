import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export const MobileAboutHero: React.FC = () => {
  return (
    <section className="relative bg-brand-navy text-white overflow-hidden pt-4 pb-7 xs:pb-8 sm:pb-10 min-h-[260px] xs:min-h-[280px]">
      {/* 1. IMAGEN DE FONDO A TODO EL ANCHO DE LA PÁGINA (BORDE A BORDE SIN RECORTES) */}
      <div className="absolute inset-x-0 top-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/about-hero-imports.jpg"
          alt="Equipo de comercio exterior e importaciones China - Ecuador de Vallelogistics en terminal portuaria"
          className="w-full h-auto object-contain object-top block select-none"
        />
        {/* Degradado lateral: oscuro a la izquierda para contraste del texto, translúcido a la derecha para destacar al equipo y el puerto */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/60 to-transparent"
          aria-hidden="true"
        />
        {/* Fundido suave inferior hacia el fondo azul marino de la sección */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-navy"
          aria-hidden="true"
        />
      </div>

      {/* 2. TEXTOS SUPERPUESTOS ALINEADOS A LA IZQUIERDA (SIN TAPAR AL EQUIPO) */}
      <div className="max-w-7xl mx-auto px-4 xs:px-5 relative z-10 w-full pt-1">
        <div className="max-w-[58%] xs:max-w-[54%] sm:max-w-sm text-left">
          {/* Badge superior */}
          <Reveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-yellow/20 border border-brand-yellow/35 backdrop-blur-xs mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              <span className="font-heading font-black text-[9px] xs:text-[10px] uppercase tracking-wider text-brand-yellow">
                Valle Logistics &amp; Import
              </span>
            </div>
          </Reveal>

          {/* Titular */}
          <Reveal direction="left" delay={0.12}>
            <h1 className="font-heading font-black text-lg xs:text-xl sm:text-2xl text-white leading-[1.12] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <span className="block text-white">Conectamos Oportunidades,</span>
              <span className="block mt-0.5 text-brand-yellow">Movemos Tu Futuro.</span>
            </h1>
          </Reveal>

          {/* Párrafo descriptivo */}
          <Reveal direction="blur" delay={0.2}>
            <p className="text-slate-200/95 text-[10.5px] xs:text-[11.5px] leading-snug mt-1.5 text-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] font-normal line-clamp-2 xs:line-clamp-3">
              Soluciones integrales de importación y logística internacional con proveedores confiables.
            </p>
          </Reveal>

          {/* Botones de acción */}
          <Reveal direction="up" delay={0.28}>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-[10px] xs:text-[11px] tracking-wide shadow-yellow hover:-translate-y-0.5 transition-all duration-300"
              >
                Cotizar Ahora
              </Link>
              <a
                href="#historia"
                className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-brand-navy font-heading font-extrabold text-[10px] xs:text-[11px] tracking-wide shadow-sm hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-xs"
              >
                Conocer Más
              </a>
            </div>
          </Reveal>

          {/* Reseñas y Avatares */}
          <Reveal direction="scale" delay={0.34}>
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/15">
              <div className="flex items-center">
                <img
                  src="/images/team-1.jpg"
                  alt="Aliado estratégico 1"
                  className="w-6 h-6 rounded-full object-cover border-2 border-brand-yellow shadow-xs"
                />
                <img
                  src="/images/team-2.jpg"
                  alt="Aliado estratégico 2"
                  className="w-6 h-6 rounded-full object-cover border-2 border-brand-yellow -ml-2 shadow-xs"
                />
                <img
                  src="/images/team-3.jpg"
                  alt="Aliado estratégico 3"
                  className="w-6 h-6 rounded-full object-cover border-2 border-brand-yellow -ml-2 shadow-xs"
                />
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-white" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-2.5 h-2.5 fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                </div>
                <span className="block text-[9.5px] text-slate-200 font-semibold mt-0.5 drop-shadow-xs">
                  Aliado Confiable
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MobileAboutHero;
