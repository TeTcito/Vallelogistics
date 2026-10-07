import React from 'react';
import { FAQ_DATA } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { COMPANY_DATA } from '@/data/company';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const ContactFAQSection: React.FC = () => {
  const accordionItems = FAQ_DATA.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div className="space-y-2">
        <p>{faq.answer}</p>
        {faq.category && (
          <span className="inline-block text-[11px] font-heading font-bold uppercase text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
            Categoría: {faq.category}
          </span>
        )}
      </div>
    ),
  }));

  return (
    <section className="py-20 lg:py-28 bg-brand-light border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle
            badge="Resolvemos sus Dudas"
            title="Preguntas Frecuentes sobre Importaciones y Repuestos"
            subtitle="Conozca las respuestas a las inquietudes más comunes sobre tiempos de tránsito, trámites aduaneros y compatibilidad técnica."
          />
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="mt-14">
            <Accordion items={accordionItems} allowMultiple={false} defaultOpenId="faq-1" />
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-heading font-bold text-lg text-brand-dark uppercase">
                ¿Tiene alguna otra duda no respondida aquí?
              </h4>
              <p className="text-xs text-brand-gray mt-0.5">
                Nuestros agentes de aduana están listos para revisar su caso en tiempo real.
              </p>
            </div>

            <Button
              href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                'Hola Valle Logistics, tengo una consulta específica que no encontré en las preguntas frecuentes.'
              )}`}
              isExternal
              variant="primary"
              size="sm"
              icon={<WhatsAppIcon className="w-4 h-4" />}
              iconPosition="left"
            >
              Consultar a un Experto
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
