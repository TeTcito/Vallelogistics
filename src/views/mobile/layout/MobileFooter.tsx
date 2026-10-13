import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Reveal } from '@/components/ui/Reveal';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const MobileFooter: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden border-t-0">
      {/* Sección Resumida de Atención Inmediata */}
      <div className="py-6 px-4 sm:px-6 relative text-center">
        {/* Rayas decorativas sutiles de fondo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #FDB913 0px, #FDB913 1px, transparent 1px, transparent 12px)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
          <Reveal direction="up">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow text-[10px] font-heading font-black uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Atención Inmediata
            </div>

            <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight leading-tight">
              ¿Listo para cotizar su flete o repuesto?
            </h3>

            <p className="text-slate-300 text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
              Asesoría directa y tarifas competitivas en importación y maquinaria pesada.
            </p>
          </Reveal>

          {/* Botón de cotización por WhatsApp */}
          <Reveal direction="up" delay={0.1} className="w-full sm:w-auto mt-4">
            <Button
              href={`https://wa.me/${COMPANY_DATA.whatsappQuotesNumber}?text=${encodeURIComponent(
                'Hola Valle Logistics, deseo cotizar flete o repuestos con atención inmediata.'
              )}`}
              isExternal
              variant="primary"
              size="sm"
              icon={<WhatsAppIcon className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto justify-center text-xs py-2 px-6 shadow-yellow"
            >
              Cotizar por WhatsApp
            </Button>
          </Reveal>

          {/* Redes Sociales en Móvil */}
          <div className="flex items-center justify-center gap-3.5 mt-5">
            <a
              href={COMPANY_DATA.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Valle Logistics"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_DATA.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Valle Logistics"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_DATA.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Valle Logistics"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_DATA.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Valle Logistics"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-navy flex items-center justify-center transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Micro-crédito legal minimalista */}
          <p className="text-[10px] text-slate-400/80 mt-3 text-center">
            &copy; {new Date().getFullYear()} {COMPANY_DATA.legalName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
