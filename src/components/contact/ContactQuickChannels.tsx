import React from 'react';
import { PhoneCall, Mail, Clock, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const ContactQuickChannels: React.FC = () => {
  const channels = [
    {
      title: 'WhatsApp Directo',
      desc: 'Respuestas en minutos para cotizaciones urgentes de repuestos y fletes.',
      value: COMPANY_DATA.whatsappDisplay,
      href: `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
        'Hola Valle Logistics, deseo comunicarme por WhatsApp.'
      )}`,
      actionText: 'Abrir Chat',
      icon: WhatsAppIcon,
      accent: 'bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white',
    },
    {
      title: 'Central Telefónica',
      desc: 'Atención personalizada para operaciones en curso y consultas aduaneras.',
      value: COMPANY_DATA.phoneDisplay,
      href: `tel:${COMPANY_DATA.phone.replace(/\s+/g, '')}`,
      actionText: 'Llamar Ahora',
      icon: PhoneCall,
      accent: 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white',
    },
    {
      title: 'Email de Cotizaciones',
      desc: 'Envío de especificaciones técnicas, licitaciones y órdenes de compra.',
      value: COMPANY_DATA.emailSales,
      href: `mailto:${COMPANY_DATA.emailSales}`,
      actionText: 'Redactar Correo',
      icon: Mail,
      accent: 'bg-brand-yellow/20 text-brand-navy group-hover:bg-brand-yellow group-hover:text-brand-navy',
    },
    {
      title: 'Horario Operativo',
      desc: 'Nuestros equipos de almacén y despacho trabajan con guardias continuas.',
      value: `${COMPANY_DATA.scheduleWeekdays} | ${COMPANY_DATA.scheduleSaturday}`,
      href: '#formulario-contacto',
      actionText: 'Ver Disponibilidad',
      icon: Clock,
      accent: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle
            badge="Canales Directos"
            title="Elija el Medio de Comunicación de su Preferencia"
            subtitle="Conectamos rápidamente con su equipo para agilizar sus operaciones sin burocracia."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((ch, index) => {
            const IconComp = ch.icon;
            return (
              <Reveal key={index} direction="up" delay={index * 0.1}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-brand-light rounded-2xl p-6 border border-slate-200 hover:border-brand-blue/40 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${ch.accent}`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="font-heading font-extrabold text-xl text-brand-dark uppercase tracking-tight mb-1">
                      {ch.title}
                    </h3>

                    <p className="text-xs text-brand-gray leading-relaxed mb-4">
                      {ch.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="font-heading font-bold text-sm text-brand-navy truncate mb-2">
                      {ch.value}
                    </p>
                    <span className="text-xs font-heading font-bold uppercase text-brand-blue group-hover:text-brand-yellow-hover flex items-center gap-1 transition-colors">
                      <span>{ch.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
