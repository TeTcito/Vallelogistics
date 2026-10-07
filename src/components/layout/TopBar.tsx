import React from 'react';
import { MapPin, Mail, Clock, Phone, Facebook } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

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

export const TopBar: React.FC = () => {
  return (
    <div className="bg-brand-navy-dark text-slate-300 text-xs py-2 px-4 border-b border-brand-navy-surface hidden lg:block select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Lado izquierdo: Dirección, email y horario */}
        <div className="flex items-center gap-6">
          <a
            href={COMPANY_DATA.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
            <span>
              {COMPANY_DATA.address}, {COMPANY_DATA.addressCity} - {COMPANY_DATA.addressCountry}
            </span>
          </a>

          <a
            href={`mailto:${COMPANY_DATA.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
            <span>{COMPANY_DATA.email}</span>
          </a>

          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
            <span>{COMPANY_DATA.scheduleWeekdays}</span>
          </div>
        </div>

        {/* Lado derecho: Teléfonos (Contactos y Cotizaciones) y Redes Sociales */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${COMPANY_DATA.phone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Contactos: {COMPANY_DATA.phoneDisplay}</span>
          </a>

          <span className="text-slate-600">|</span>

          <a
            href={`tel:${COMPANY_DATA.phoneSecondary}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Cotizaciones: {COMPANY_DATA.phoneSecondaryDisplay}</span>
          </a>

          <div className="h-3.5 w-px bg-slate-700" />

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px] font-heading uppercase">Síguenos:</span>
            <a
              href={COMPANY_DATA.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Valle Logistics"
              className="hover:text-brand-yellow transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_DATA.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Valle Logistics"
              className="hover:text-brand-yellow transition-colors"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_DATA.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Valle Logistics"
              className="hover:text-brand-yellow transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
