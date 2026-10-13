import React from 'react';
import { COMPANY_DATA } from '@/data/company';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Reveal } from '@/components/ui/Reveal';

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

          {/* Único botón de acción directa (ambos hacían lo mismo) */}
          <Reveal direction="up" delay={0.1} className="w-full sm:w-auto mt-4">
            <Button
              href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                'Hola Valle Logistics, deseo cotizar con atención inmediata.'
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

          {/* Micro-crédito legal minimalista */}
          <p className="text-[10px] text-slate-400/80 mt-4 text-center">
            &copy; {new Date().getFullYear()} {COMPANY_DATA.legalName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
