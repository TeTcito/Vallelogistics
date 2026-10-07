import React from 'react';
import { BRAND_PARTNERS } from '@/data/about';
import { Reveal } from '@/components/ui/Reveal';

export const HomePartners: React.FC = () => {
  return (
    <section className="bg-white pt-16 sm:pt-24 lg:pt-28 xl:pt-32 pb-12 border-b border-slate-200 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" amount={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Texto lateral */}
            <div className="md:w-1/4 text-center md:text-left flex-shrink-0">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-blue">
                Alianzas Globales
              </span>
              <h3 className="font-heading font-extrabold text-xl text-brand-dark uppercase">
                Líneas Navieras &amp; Aliados
              </h3>
            </div>

            {/* Franja de logos en escala de grises que recuperan color al hacer hover */}
            <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center w-full">
              {BRAND_PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="w-full max-w-[150px] p-2 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer bg-white rounded-lg shadow-sm border border-slate-100"
                  title={`${partner.name} - ${partner.category}`}
                >
                  <img
                    src={partner.logo}
                    alt={`Logo aliado ${partner.name}`}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
