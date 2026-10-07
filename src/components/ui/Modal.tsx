import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '2xl',
}) => {
  // Manejo de tecla Escape y bloqueo de scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Contenedor del Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Modal de información'}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-brand shadow-2xl border border-slate-100 overflow-hidden z-10 my-8`}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-brand-light">
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-brand-dark">
                {title || 'Detalle'}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana emergente"
                className="p-1.5 rounded-full text-brand-gray hover:text-brand-dark hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
