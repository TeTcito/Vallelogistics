import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/**
 * MobileWhatsAppButton
 * Botón flotante de WhatsApp optimizado para móvil,
 * posicionado sobre la barra de navegación inferior (MobileNav).
 */
export const MobileWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
    'Hola Valle Logistics, deseo cotizar servicios de importación o repuestos para maquinaria.'
  )}`;

  return (
    <div className="fixed bottom-20 right-4 z-40 flex items-end flex-col gap-2 select-none pointer-events-auto">
      {/* Tooltip flotante interactivo */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-brand-dark p-3 rounded-2xl shadow-elevated border border-slate-100 max-w-[240px] relative flex items-start gap-2"
          >
            <div className="flex-1 text-xs">
              <p className="font-heading font-bold text-brand-navy text-xs uppercase">
                ¿Necesitas cotizar?
              </p>
              <p className="text-brand-gray mt-0.5 text-[11px] leading-tight">
                Chatea con un asesor especialista.
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-brand-dark p-1 rounded"
              aria-label="Cerrar mensaje"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {/* Triángulo inferior hacia el botón */}
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Verde de WhatsApp */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Valle Logistics"
        whileTap={{ scale: 0.92 }}
        className="relative w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <WhatsAppIcon className="w-6 h-6 relative z-10" />
      </motion.a>
    </div>
  );
};

export default MobileWhatsAppButton;
