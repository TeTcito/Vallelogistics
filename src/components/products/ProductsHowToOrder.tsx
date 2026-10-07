import React from 'react';
import { Camera, Send, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { COMPANY_DATA } from '@/data/company';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const ProductsHowToOrder: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Camera,
      title: 'Identifica tu Pieza',
      desc: 'Toma una foto de la placa de la máquina (VIN/Serial) o indícanos el Part Number que necesitas reemplazar.',
    },
    {
      num: '02',
      icon: Send,
      title: 'Envíanos la Solicitud',
      desc: 'Escríbenos por WhatsApp con los datos. Nuestros ingenieros verificarán compatibilidad en manuales de fábrica.',
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: 'Recibe en Destino',
      desc: 'Te entregamos una cotización con tiempo de entrega garantizado. Despachamos a faenas, talleres o almacenes en todo el país.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle
            badge="Simple y Rápido"
            title="¿Cómo Pedir tu Repuesto de Maquinaria?"
            subtitle="Evite errores de compatibilidad y pérdida de tiempo. En 3 sencillos pasos gestionamos la pieza exacta para su equipo."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconC = step.icon;
            return (
              <Reveal key={index} direction="up" delay={index * 0.12}>
                <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-200/80 hover:border-brand-blue/40 transition-all duration-300 relative group flex flex-col justify-between h-full">
                  <div>
                    {/* Número y badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-300">
                        <IconC className="w-7 h-7" />
                      </div>
                      <span className="font-heading font-extrabold text-4xl text-slate-200 group-hover:text-brand-yellow transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl text-brand-dark uppercase tracking-tight mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-brand-gray leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-heading font-bold uppercase text-brand-blue">
                    <span>Paso {index + 1} de 3</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA Final de la sección */}
        <Reveal direction="up" delay={0.3}>
          <div className="mt-14 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card border border-brand-yellow/30">
            <div className="text-center sm:text-left">
              <h4 className="font-heading font-extrabold text-2xl uppercase">
                ¿Tienes una máquina parada en faena?
              </h4>
              <p className="text-slate-300 text-sm mt-1">
                Escríbenos directamente y activaremos la búsqueda prioritaria por vía aérea express.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                  'Hola Valle Logistics, tengo una máquina detenida y necesito cotizar un repuesto urgente.'
                )}`}
                isExternal
                variant="primary"
                size="md"
                icon={<WhatsAppIcon className="w-4 h-4" />}
                iconPosition="left"
              >
                Atención Prioritaria por WhatsApp
              </Button>
              <Button to="/contacto" variant="outline" size="md" className="border-white text-white hover:bg-white hover:text-brand-navy">
                Formulario de Contacto
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
