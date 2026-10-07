import React from 'react';
import { TEAM_MEMBERS } from '@/data/about';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Briefcase } from 'lucide-react';

export const AboutTeam: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle
            badge="Nuestro Equipo Humano"
            title="Liderazgo con Experiencia en Comercio y Maquinaria"
            subtitle="Detrás de cada contenedor despachado y cada repuesto entregado hay un equipo de especialistas comprometidos con la excelencia."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <Reveal key={member.id} direction="up" delay={index * 0.1}>
              <div className="bg-brand-light rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-blue/40 shadow-sm hover:shadow-card transition-all duration-300 group flex flex-col justify-between h-full">
                {/* Foto / Placeholder del Miembro */}
                <div>
                  <div className="h-64 overflow-hidden bg-brand-navy-dark relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Datos del Miembro */}
                  <div className="p-6">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-brand-blue block mb-1">
                      {member.role}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-brand-dark uppercase tracking-tight group-hover:text-brand-blue transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-brand-gray mt-2 leading-relaxed text-justify">
                      {member.experience}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-200/70 mt-2">
                  <div className="flex items-center gap-2 text-xs font-heading font-semibold text-brand-dark">
                    <Briefcase className="w-3.5 h-3.5 text-brand-yellow" />
                    <span>Valle Logistics Specialist</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
