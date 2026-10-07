import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

interface ServiceFAQItem {
  id: string;
  question: string;
  answer: string;
}

const SERVICE_FAQ_ITEMS: ServiceFAQItem[] = [
  {
    id: 'srv-faq-1',
    question: '¿Qué tan rápido responden una solicitud de cotización?',
    answer:
      'Respondemos a todas las solicitudes de cotización de maquinaria, repuestos o logística internacional en menos de 24 horas hábiles, y brindamos atención inmediata vía WhatsApp.',
  },
  {
    id: 'srv-faq-2',
    question: '¿Ofrecen asesoría y cotizaciones sin costo?',
    answer:
      'Sí, realizamos el análisis de sus necesidades, búsqueda de proveedores confiables y elaboramos una cotización y comparativa detallada de costos y normativas sin compromiso.',
  },
  {
    id: 'srv-faq-3',
    question: '¿Se encargan de aduanas y clasificación HS Code?',
    answer:
      'Contamos con especialistas aduaneros que gestionan toda la tramitación, clasificación arancelaria (HS Code), cálculo de tributos (IVA, FODINFA, aranceles) y doble despacho si aplica.',
  },
  {
    id: 'srv-faq-4',
    question: '¿A qué zonas y ciudades realizan las entregas finales?',
    answer:
      'Coordinamos el transporte interno a cualquier ciudad del Ecuador y entregamos directamente en sitio (obra, bodega u oficina), incluyendo verificación de estado y soporte postventa.',
  },
];

export const ServicesQuoteCTA: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#F4F8FD] via-[#EEF5FC] to-[#E9F2FB] border border-brand-blue-100/70 p-4 sm:p-6 lg:p-7 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* 1. Columna Izquierda: Fotografía técnica redondeada */}
            <Reveal direction="left" delay={0.05} className="lg:col-span-4">
              <div className="relative h-56 sm:h-64 lg:h-[260px] w-full rounded-2xl overflow-hidden shadow-sm bg-white">
                <img
                  src="/images/services-faq-tools.jpg"
                  alt="Planificación técnica, planos de maquinaria y herramientas de precisión Valle Logistics"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </Reveal>

            {/* 2. Columna Central: Etiqueta FAQ, Titular en 2 líneas, Descripción y Botón Píldora Azul */}
            <Reveal direction="blur" delay={0.14} className="lg:col-span-4 px-2 sm:px-4 lg:px-2">
              <span className="font-heading font-extrabold text-xs uppercase tracking-[0.16em] text-brand-blue block mb-2">
                FAQ
              </span>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[32px] text-brand-navy leading-[1.16] tracking-tight">
                <span className="block">¿Tienes Dudas?</span>
                <span className="block mt-0.5">¡Tenemos Respuestas!</span>
              </h2>

              <p className="text-brand-gray text-xs sm:text-sm leading-relaxed mt-3.5 max-w-sm text-justify">
                Encuentra respuestas rápidas a las consultas más frecuentes sobre importación,
                aduanas y maquinaria, o contáctanos para ayuda personalizada.
              </p>

              <div className="mt-6">
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-navy text-white font-heading font-bold text-xs sm:text-[13px] tracking-wide shadow-[0_6px_18px_-3px_rgba(10,61,145,0.4)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Ver Todas las Preguntas</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Reveal>

            {/* 3. Columna Derecha: Tarjeta Blanca con 4 Preguntas Desplegables (+ / -) */}
            <Reveal direction="right" delay={0.22} className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-[0_8px_28px_rgba(6,27,75,0.055)] border border-slate-100/90 px-5 sm:px-6 py-2 divide-y divide-slate-100">
                {SERVICE_FAQ_ITEMS.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div key={item.id} className="py-3.5">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                      >
                        <span className="font-heading font-bold text-xs sm:text-[13.5px] text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                          {item.question}
                        </span>
                        <span className="text-brand-navy group-hover:text-brand-blue shrink-0 transition-transform duration-200">
                          {isOpen ? (
                            <Minus className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="pt-2.5 text-xs text-brand-gray leading-relaxed text-justify">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
