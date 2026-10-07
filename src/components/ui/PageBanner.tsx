import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PageBannerProps {
  title: React.ReactNode;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  quickTags?: string[];
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  breadcrumbs,
  badge,
  imageSrc,
  imageAlt,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  quickTags,
}) => {
  return (
    <section className="relative bg-brand-navy text-white pt-12 sm:pt-16 pb-24 sm:pb-28 lg:pb-32 overflow-hidden border-b border-brand-navy-surface">
      {/* 1. IMAGEN DE FONDO FOTOGRÁFICA TEMÁTICA */}
      {imageSrc && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={imageSrc}
            alt={imageAlt || 'Banner Valle Logistics'}
            className="w-full h-full object-cover object-center lg:object-right"
          />
        </div>
      )}

      {/* 2. SOMBRA GLOBAL SUPERPUESTA A LA IMAGEN HASTA EL 60% CON SUAVIZADO DE 200px */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none hero-half-shadow"
        aria-hidden="true"
      />

      {/* Filtro de contraste adicional vertical */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none bg-gradient-to-t from-brand-navy/60 via-transparent to-brand-navy/30"
        aria-hidden="true"
      />

      {/* Patrón de puntos decorativos tipo cuadrícula sutil */}
      <div className="hidden xl:grid grid-cols-4 gap-2.5 absolute top-12 left-1/2 z-10 opacity-15 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
        ))}
      </div>

      {/* 3. CONTENIDO CENTRAL: Alineado exactamente al margen del Logo en el Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="max-w-3xl space-y-4 sm:space-y-5 text-left"
        >
          {/* Breadcrumb navegable */}
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-slate-300">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="hover:text-brand-yellow flex items-center gap-1 transition-colors drop-shadow"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Inicio</span>
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="inline-flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  {crumb.path ? (
                    <Link
                      to={crumb.path}
                      className="hover:text-brand-yellow transition-colors drop-shadow"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brand-yellow font-bold drop-shadow">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Badge superior */}
          {badge && (
            <span className="inline-block px-3 py-1 rounded bg-brand-yellow/15 text-brand-yellow font-heading uppercase text-xs tracking-widest font-extrabold border border-brand-yellow/30 drop-shadow">
              {badge}
            </span>
          )}

          {/* Título corporativo en 2 tonos */}
          <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] uppercase leading-[1.14] tracking-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {title}
          </h1>

          {/* Subtítulo justificado con sombra para legibilidad */}
          {subtitle && (
            <p className="text-sm sm:text-base lg:text-[1.02rem] text-slate-100 font-normal leading-relaxed text-justify [text-align-last:left] max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {subtitle}
            </p>
          )}

          {/* Etiquetas rápidas destacadas */}
          {quickTags && quickTags.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-2">
              {quickTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-navy-surface/75 text-slate-200 border border-white/15 backdrop-blur-sm shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Botones de acción opcionales */}
          {(ctaText || secondaryCtaText) && (
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {ctaText && ctaLink && (
                <a
                  href={ctaLink}
                  className="group inline-flex items-center gap-2.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider pl-5 pr-1.5 py-1.5 rounded-lg shadow-yellow transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>{ctaText}</span>
                  <span className="w-8 h-8 rounded bg-white text-brand-navy flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </a>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <a
                  href={secondaryCtaLink}
                  className="inline-flex items-center gap-2 text-white hover:text-brand-yellow font-heading font-bold uppercase text-xs sm:text-sm tracking-wider px-3.5 py-2.5 transition-colors"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* 4. CORTE INFERIOR EN ÁNGULO CON BORDE AMARILLO */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 lg:h-14 object-fill block"
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
    </section>
  );
};
