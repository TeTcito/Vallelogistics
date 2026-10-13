import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';

/**
 * MobileHomeHero
 * Sección Hero para la vista móvil:
 * - Fondo buque ajustado al ancho con opacidad reducida en la derecha para máxima visibilidad.
 * - Título, mensaje en 1 línea y botones compactos alineados a la izquierda.
 * - Trailer y carga en la izquierda superpuesto en la mitad de la máscara inferior.
 */
export const MobileHomeHero: React.FC = () => {
  return (
    <section className="relative bg-brand-navy text-white overflow-x-clip overflow-y-visible pt-4 pb-20 sm:pb-24">
      {/* 1. IMAGEN DE FONDO: Buque de carga ajustado exactamente al ancho de pantalla */}
      <div className="absolute inset-x-0 top-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-cargo-ship.jpg"
          alt="Buque portacontenedores de carga marítima internacional Valle Logistics"
          className="w-full h-auto object-contain object-top block"
        />
        {/* Degradado lateral: Oscuro a la izquierda para contraste del texto, translúcido a la derecha para destacar el buque */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/35 to-transparent"
          aria-hidden="true"
        />
        {/* Fundido suave inferior hacia el fondo azul marino */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-navy/90"
          aria-hidden="true"
        />
      </div>

      {/* 2. CONTENIDO ALINEADO A LA IZQUIERDA (TÍTULO Y BOTONES) */}
      <div className="max-w-7xl mx-auto px-4 relative z-20 pt-2 sm:pt-3">
        <div className="max-w-[70%] sm:max-w-[65%] space-y-2.5 text-left">
          {/* Título ampliado alineado a la izquierda */}
          <Reveal direction="down" delay={0.05} distance={20}>
            <h1 className="font-heading font-black text-[1.55rem] sm:text-[1.85rem] uppercase leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <span className="block text-white">
                Bienvenido a{' '}
                <span className="text-brand-yellow font-black">Valle</span>
              </span>
              <span className="block mt-0.5 text-white">
                <span className="text-brand-yellow">Logistics</span> & Import
              </span>
            </h1>
          </Reveal>

          {/* Botones más compactos con textos resumidos ("Cotizar" y "Catálogo") */}
          <Reveal direction="up" delay={0.16} distance={18}>
            <div className="pt-0.5 flex flex-wrap items-center gap-1.5">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-1 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider pl-2.5 pr-1 py-0.5 rounded shadow-sm transition-all duration-300"
              >
                <span>Cotizar</span>
                <span className="w-4 h-4 rounded bg-white text-brand-navy flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
              </Link>

              <Link
                to="/productos"
                className="inline-flex items-center gap-1 text-white hover:text-brand-yellow font-heading font-bold uppercase text-[10px] sm:text-[11px] tracking-wider px-2 py-0.5 rounded transition-colors"
              >
                <span>Catálogo</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 3. MÁSCARA / CORTE ANGULAR INFERIOR (Con compensación de subpíxel para eliminar cualquier línea de costura) */}
      <div className="absolute -bottom-[2px] sm:-bottom-[3px] left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 object-fill block overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M0,82 L760,80 L1080,24 L1440,54 L1440,82 Z"
            fill="#FDB913"
          />
          <path
            d="M0,82 L760,80 L1080,28 L1440,58 L1440,82 Z"
            fill="#FFFFFF"
          />
        </svg>
        {/* Franja de purga blanca para asegurar 0% líneas de costura o subpíxeles oscuros */}
        <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-white pointer-events-none" />
      </div>

      {/* 4. TRAILER Y CARGA EN LA IZQUIERDA: Efecto de entrada dinámico (deslizamiento, elevación y escala) */}
      <motion.div
        initial={{ opacity: 0, x: -65, y: 35, scale: 0.92 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-2 sm:left-4 bottom-[-16px] sm:bottom-[-20px] z-20 w-[196px] sm:w-[228px] pointer-events-none"
      >
        <img
          src="/images/hero-truck-boxes.png"
          alt="Trailer comercial y carga Valle Logistics"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default MobileHomeHero;
