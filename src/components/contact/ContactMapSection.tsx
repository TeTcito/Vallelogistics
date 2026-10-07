import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';

export const ContactMapSection: React.FC = () => {
  return (
    <section className="w-full relative bg-slate-100 border-t border-slate-200/80 overflow-hidden">
      {/* Mapa a ancho completo tal cual el diseño de referencia */}
      <Reveal direction="blur">
        <div className="w-full h-[380px] sm:h-[440px] lg:h-[480px] relative">
          <iframe
            title="Mapa de ubicación de Valle Logistics and Import en Cuenca, Ecuador"
            src={COMPANY_DATA.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full block"
          />

          {/* Botón flotante discreto para abrir directamente el enlace oficial de Google Maps */}
          <div className="absolute bottom-5 left-4 sm:left-6 z-10">
            <Reveal direction="up" delay={0.2}>
              <a
                href={COMPANY_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-brand-navy font-heading font-bold text-xs shadow-elevated border border-slate-200/80 hover:text-[#1554F0] transition-all duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1554F0]" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
