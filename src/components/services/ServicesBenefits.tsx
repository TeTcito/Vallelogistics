import React from 'react';
import { Eye, FileText, Globe, Percent, ShieldCheck } from 'lucide-react';
import { SERVICE_BENEFITS } from '@/data/services';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';

export const ServicesBenefits: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Eye':
        return <Eye className="w-7 h-7" />;
      case 'FileText':
        return <FileText className="w-7 h-7" />;
      case 'Globe':
        return <Globe className="w-7 h-7" />;
      default:
        return <Percent className="w-7 h-7" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle
            badge="Diferenciales Clave"
            title="Ventajas Estratégicas para su Negocio"
            subtitle="Nos convertimos en una extensión de su departamento de compras internacionales para maximizar la rentabilidad de cada embarque."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICE_BENEFITS.map((benefit, index) => (
            <Reveal key={index} direction="up" delay={index * 0.1}>
              <div className="p-7 rounded-2xl bg-brand-light border border-slate-200 hover:border-brand-blue/30 transition-all duration-300 hover:shadow-card group flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-300 shadow-sm">
                    {getIcon(benefit.iconName)}
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-brand-dark uppercase tracking-tight mb-2">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-brand-gray leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-heading font-bold text-brand-blue uppercase">
                  <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                  <span>Estándar Valle Logistics</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
