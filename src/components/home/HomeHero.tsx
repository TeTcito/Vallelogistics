import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';

export const HomeHero: React.FC = () => {
  return (
    <section className="relative bg-brand-navy text-white overflow-visible pt-10 sm:pt-14 pb-36 sm:pb-48 lg:pb-64 xl:pb-72">
      {/* 1. IMAGEN DE FONDO: Buque de carga continuo con integración fotográfica en toda la sección */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-cargo-ship.jpg"
          alt="Buque portacontenedores de carga marítima internacional Valle Logistics"
          className="w-full h-full object-cover object-center lg:object-right"
        />
      </div>

      {/* 2. SOMBRA GLOBAL SUPERPUESTA A LA IMAGEN HASTA EL 60% CON 30% DE TRANSPARENCIA Y DEGRADADO SUAVE DE 200px */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none hero-half-shadow"
        aria-hidden="true"
      />

      {/* 3. MÁSCARA CIRCULAR SUPERIOR IZQUIERDA: Acompañamiento en compras internacionales */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -45, y: -25 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-8 -left-8 sm:-top-10 sm:-left-10 lg:-top-12 lg:-left-12 z-10 pointer-events-none"
      >
        <div className="relative">
          {/* Círculo con imagen de acompañamiento a clientes */}
          <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 sm:border-[6px] border-brand-yellow shadow-2xl relative bg-brand-navy-surface">
            <img
              src="/images/client-accompaniment.jpg"
              alt="Acompañamiento personalizado y asesoría en compras internacionales Valle Logistics"
              className="w-full h-full object-cover object-[center_top] transform scale-100"
            />
            {/* Sombra de viñeta interna */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/20" />
          </div>

          {/* Anillo de acento exterior decorativo */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-full border border-brand-yellow/30 pointer-events-none" />
        </div>
      </motion.div>

      {/* Patrón de puntos decorativos tipo cuadrícula */}
      <div className="hidden xl:grid grid-cols-4 gap-2.5 absolute top-28 left-[460px] z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
        ))}
      </div>

      {/* 4. CONTENIDO CENTRAL: Alineado exactamente al margen del Logo en el Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-10 xl:col-span-9 space-y-4 sm:space-y-5 text-left">
            {/* Titular en exactamente 2 líneas: Línea 1 "Bienvenido a VALLE" (VALLE resaltado), Línea 2 "Logistics and Import" seguido */}
            <Reveal direction="down" delay={0.05} distance={48}>
              <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.25rem] uppercase leading-[1.12] tracking-normal text-white max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                <span className="block text-white items-baseline">
                  Bienvenido a{' '}
                  <span className="text-brand-yellow text-[1.18em] tracking-wide inline-block font-black drop-shadow-md">
                    Valle
                  </span>
                </span>
                <span className="block text-white whitespace-normal sm:whitespace-nowrap">
                  <span className="text-brand-yellow">Logistics</span> and Import
                </span>
              </h1>
            </Reveal>

            {/* Subtítulo justificado y con contraste reforzado */}
            <Reveal direction="blur" delay={0.15}>
              <p className="text-sm sm:text-base lg:text-[1.05rem] text-slate-100 max-w-xl font-normal leading-relaxed text-justify [text-align-last:left] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Importamos y comercializamos maquinaria, repuestos y productos multissectoriales, brindando asesoría
                integral en compras internacionales, aduanas y logística con acompañamiento continuo hasta la entrega final.
              </p>
            </Reveal>

            {/* Botones de acción */}
            <Reveal direction="up" delay={0.25} distance={44}>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-2.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider pl-5 pr-1.5 py-1.5 rounded-lg shadow-yellow transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Solicitar Cotización</span>
                  <span className="w-8 h-8 rounded bg-white text-brand-navy flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </Link>

                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 text-white hover:text-brand-yellow font-heading font-bold uppercase text-xs sm:text-sm tracking-wider px-3.5 py-2.5 transition-colors"
                >
                  <span>Ver Catálogo de Repuestos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 4. CORTE INFERIOR EN ÁNGULO CON BORDE AMARILLO */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 lg:h-20 object-fill block"
          preserveAspectRatio="none"
        >
          {/* Borde amarillo acento */}
          <path
            d="M0,80 L760,80 L1080,24 L1440,54 L1440,80 Z"
            fill="#FDB913"
          />
          {/* Fondo blanco de la siguiente sección */}
          <path
            d="M0,80 L760,80 L1080,28 L1440,58 L1440,80 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* 5. TRAILER Y CAJAS EN LA PARTE INFERIOR IZQUIERDA */}
      <motion.div
        initial={{ opacity: 0, x: -65, y: 35, scale: 0.94 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative lg:absolute lg:bottom-[-70px] xl:bottom-[-90px] 2xl:bottom-[-100px] lg:left-4 xl:left-8 z-30 max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl px-4 sm:px-6 lg:px-0 mt-16 sm:mt-20 lg:mt-0 pointer-events-none"
      >
        <img
          src="/images/hero-truck-boxes.png"
          alt="Trailer comercial moderno con logo Valle Logistics y cajas de carga a la derecha"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
};
