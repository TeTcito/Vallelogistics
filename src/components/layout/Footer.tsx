import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Reveal } from '@/components/ui/Reveal';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EDF2F8] text-slate-600 relative overflow-hidden border-t border-slate-200">
      {/* 1. Banda superior CTA de cotización rápida */}
      <div className="bg-brand-navy border-b border-brand-yellow/30 py-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Reveal direction="left">
            <div className="text-center md:text-left">
              <span className="text-brand-yellow font-heading uppercase font-bold text-sm tracking-widest block mb-1">
                Atención Inmediata
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                ¿Listo para cotizar su próximo flete o repuesto?
              </h3>
              <p className="text-slate-200 text-sm mt-1 max-w-xl">
                Nuestros especialistas en logística y maquinaria pesada están a su disposición para ofrecerle la mejor tarifa del mercado.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <Button to="/contacto" variant="primary" size="lg" showArrow>
                Solicitar Cotización
              </Button>
              <Button
                href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=Hola%20Valle%20Logistics,%20deseo%20una%20cotizaci%C3%B3n%20urgente.`}
                isExternal
                variant="white"
                size="lg"
                icon={<WhatsAppIcon className="w-4 h-4" />}
                iconPosition="left"
              >
                WhatsApp Directo
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 2. Cuerpo principal del Footer (4 columnas) sobre fondo platino claro que resalta el logo original */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Columna 1: Logo sin fondo blanco & Resumen de 6 líneas */}
          <Reveal direction="up" delay={0}>
            <div className="space-y-4">
              <Link to="/" className="inline-block focus:outline-none">
                <img
                  src="/images/logo.png"
                  alt="Valle Logistics and Import"
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </Link>

              <p className="text-slate-600 text-sm leading-relaxed text-justify line-clamp-6">
                Somos una empresa ecuatoriana especializada en importaciones y logística
                internacional. Conectamos a nuestros clientes con proveedores confiables en
                maquinaria, repuestos de carga pesada y productos globales.
              </p>

              <div className="pt-1">
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-brand-navy block mb-3">
                  Conéctate con nosotros
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={COMPANY_DATA.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-lg bg-brand-navy hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors shadow-xs"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_DATA.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-9 h-9 rounded-lg bg-brand-navy hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors shadow-xs"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_DATA.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-9 h-9 rounded-lg bg-brand-navy hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors shadow-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Columna 2: Enlaces Rápidos */}
          <Reveal direction="up" delay={0.08}>
            <div>
              <h4 className="font-heading font-extrabold text-lg text-brand-navy uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-yellow rounded-sm" />
                Navegación
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                {[
                  { label: 'Inicio', path: '/' },
                  { label: 'Nuestros Servicios', path: '/servicios' },
                  { label: 'Catálogo de Repuestos', path: '/productos' },
                  { label: 'Quiénes Somos', path: '/nosotros' },
                  { label: 'Contáctanos', path: '/contacto' },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-slate-600 hover:text-brand-blue transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-brand-yellow-hover group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Columna 3: Servicios Principales (Títulos Resumidos) */}
          <Reveal direction="up" delay={0.16}>
            <div>
              <h4 className="font-heading font-extrabold text-lg text-brand-navy uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-yellow rounded-sm" />
                Servicios Clave
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                {[
                  'Maquinaria y Repuestos',
                  'Importación General',
                  'Gestión de Proveedores',
                  'Transporte Multimodal',
                  'Aduanas y Nacionalización',
                  'Asesoría y Acompañamiento',
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      to="/servicios"
                      className="text-slate-600 hover:text-brand-blue transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-brand-yellow-hover group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Columna 4: Información de Contacto Directo */}
          <Reveal direction="up" delay={0.24}>
            <div className="space-y-4">
              <h4 className="font-heading font-extrabold text-lg text-brand-navy uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-yellow rounded-sm" />
                Atención Directa
              </h4>

              <a
                href={COMPANY_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-slate-600 hover:text-brand-blue transition-colors"
              >
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY_DATA.address}, {COMPANY_DATA.addressCity} - {COMPANY_DATA.addressCountry}
                </span>
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Phone className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href={`tel:${COMPANY_DATA.phone}`}
                    className="hover:text-brand-blue block transition-colors font-medium text-brand-navy"
                  >
                    Contactos: {COMPANY_DATA.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${COMPANY_DATA.phoneSecondary}`}
                    className="hover:text-brand-blue block transition-colors font-medium text-brand-navy"
                  >
                    Cotizaciones: {COMPANY_DATA.phoneSecondaryDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Mail className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${COMPANY_DATA.email}`}
                    className="hover:text-brand-blue block break-all transition-colors"
                  >
                    {COMPANY_DATA.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-500 pt-1">
                <Clock className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p>{COMPANY_DATA.scheduleWeekdays}</p>
                  <p>{COMPANY_DATA.scheduleSaturday}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 3. Barra inferior de copyright y acreditación */}
      <div className="border-t border-slate-300/80 py-5 px-4 bg-[#E2E8F2] text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-brand-navy">{COMPANY_DATA.legalName}</strong>. Todos los derechos reservados.
            <span className="block sm:inline sm:ml-2 text-brand-blue font-semibold">
              "{COMPANY_DATA.slogan}"
            </span>
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-brand-navy font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              Comercio Seguro y Certificado
            </span>
            <Link to="/contacto" className="hover:text-brand-blue font-medium transition-colors">
              Términos &amp; Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
