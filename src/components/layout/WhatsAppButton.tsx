import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
    'Hola Valle Logistics, deseo cotizar servicios de importación o repuestos para maquinaria.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2 select-none">
      {/* Tooltip flotante interactivo */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-brand-dark p-3 rounded-2xl shadow-elevated border border-slate-100 max-w-xs relative flex items-start gap-2"
          >
            <div className="flex-1 text-xs">
              <p className="font-heading font-bold text-brand-navy text-sm uppercase">
                ¿Necesitas cotizar hoy?
              </p>
              <p className="text-brand-gray mt-0.5">
                Chatea con un asesor especialista en importaciones y repuestos.
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
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Verde/Amarillo de WhatsApp */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Valle Logistics"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow"
      >
        {/* Efecto de pulso concéntrico */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <WhatsAppIcon className="w-7 h-7 relative z-10" />
      </motion.a>
    </div>
  );
};
