import React from 'react';
import { PackageCheck, Globe2, Cog, Users2 } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';

export const HomeStats: React.FC = () => {
  const stats = [
    {
      id: 'stat-1',
      value: COMPANY_DATA.stats.successfulShipments,
      suffix: '+',
      label: 'Envíos Exitosos',
      sublabel: 'Vía marítima, aérea y terrestre',
      icon: PackageCheck,
    },
    {
      id: 'stat-2',
      value: COMPANY_DATA.stats.countriesCovered,
      suffix: '+',
      label: 'Países Conectados',
      sublabel: 'Rutas activas en 4 continentes',
      icon: Globe2,
    },
    {
      id: 'stat-3',
      value: COMPANY_DATA.stats.catalogParts,
      suffix: '+',
      label: 'Repuestos en Catálogo',
      sublabel: 'Maquinaria pesada e industrial',
      icon: Cog,
    },
    {
      id: 'stat-4',
      value: COMPANY_DATA.stats.satisfiedClients,
      suffix: '+',
      label: 'Clientes Satisfechos',
      sublabel: 'Minería, construcción y agro',
      icon: Users2,
    },
  ];

  return (
    <section className="bg-brand-navy text-white py-16 lg:py-20 relative overflow-hidden border-y border-brand-navy-surface">
      {/* Elementos diagonales de fondo */}
      <div className="absolute top-0 right-0 w-96 h-full bg-brand-blue/15 -skew-x-12 transform pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-full bg-brand-navy-dark/40 -skew-x-12 transform pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Reveal key={stat.id} direction="up" delay={index * 0.1}>
                <div className="bg-brand-navy-surface/80 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/30 text-brand-yellow flex items-center justify-center mb-4 group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-1 flex items-baseline gap-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>

                  <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-brand-yellow">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 font-normal">
                    {stat.sublabel}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
