import React from 'react';
import {
  Truck,
  CreditCard,
  ShieldCheck,
  MessagesSquare,
  UserCheck,
  ChevronsRight,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export interface ProductsBannerProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const ProductsBanner: React.FC<ProductsBannerProps> = ({ onSelectCategory }) => {
  const handleCategoryAction = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 64;
      const offset = headerHeight + 20;
      const elementTop = catalogEl.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, elementTop - offset),
        behavior: 'smooth',
      });
    }
  };

  const benefits = [
    {
      icon: Truck,
      title: 'ENVÍOS A TODO EL PAÍS',
      desc: 'Despacho terrestre y aéreo',
    },
    {
      icon: CreditCard,
      title: 'IMPORTACIÓN SEGURA',
      desc: 'Gestión 100% garantizada',
    },
    {
      icon: ShieldCheck,
      title: 'COMPRA CON CONFIANZA',
      desc: 'Repuestos OEM y alternativos',
    },
    {
      icon: MessagesSquare,
      title: 'SOPORTE TÉCNICO 24/7',
      desc: 'Asesoría por Part Number',
    },
    {
      icon: UserCheck,
      title: 'ATENCIÓN PERSONALIZADA',
      desc: 'Acompañamiento de punta a punta',
    },
  ];

  return (
    <section className="bg-brand-light pt-6 sm:pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BLOQUE SUPERIOR: BANNER PRINCIPAL (IZQUIERDA) + 2 TARJETAS LATERALES (DERECHA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* TARJETA PRINCIPAL IZQUIERDA FIJA: MAQUINARIA, UÑAS & HIDRÁULICA (8 COLUMNAS) */}
          <Reveal direction="left" className="lg:col-span-8 flex">
            <div className="w-full bg-white border border-slate-200/90 rounded-sm px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10 pb-8 relative overflow-hidden flex flex-col justify-center min-h-[360px] sm:min-h-[410px] shadow-subtle">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 items-center gap-6 my-auto">
                {/* Texto izquierdo */}
                <div className="sm:col-span-6 z-10 text-left">
                  <h1 className="uppercase text-brand-navy tracking-tight">
                    <span className="block font-heading font-light text-2xl sm:text-3xl lg:text-[2.45rem] leading-[1.08]">
                      MAQUINARIA PESADA
                    </span>
                    <span className="block font-heading font-black text-2xl sm:text-3xl lg:text-[2.55rem] leading-[1.08] mt-0.5">
                      UÑAS &amp; HIDRÁULICA
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base lg:text-[1.08rem] text-brand-gray font-normal mt-3 mb-7 leading-snug">
                    Herramientas de corte GET, puntas forjadas, bombas hidráulicas y repuestos de alto rendimiento para maquinaria pesada.
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCategoryAction('Repuestos para Maquinaria')}
                    className="group inline-flex items-stretch bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs sm:text-[13px] uppercase tracking-wider rounded-[3px] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    <span className="px-6 py-3.5 flex items-center">
                      VER CATÁLOGO
                    </span>
                    <span className="px-3.5 py-3.5 bg-black/[0.06] border-l border-brand-navy/15 flex items-center justify-center">
                      <ChevronsRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </div>

                {/* Imagen derecha sobre fondo blanco */}
                <div className="sm:col-span-6 flex items-center justify-center relative">
                  <img
                    src="/images/products-promo-shocks.jpg"
                    alt="Repuestos para maquinaria pesada, uñas e hidráulica"
                    className="w-full max-h-[250px] sm:max-h-[300px] lg:max-h-[330px] object-contain mix-blend-multiply select-none"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* COLUMNA DERECHA CON 2 TARJETAS APILADAS (4 COLUMNAS) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* TARJETA SUPERIOR DERECHA: TRÁILER & CABEZALES ACTROS */}
            <Reveal direction="right" delay={0.1} className="flex-1 flex">
              <div
                onClick={() =>
                  handleCategoryAction('Repuestos y accesorios para Actros - Mercedes Benz')
                }
                className="w-full bg-white border border-slate-200/90 rounded-sm p-6 sm:p-7 relative overflow-hidden flex-1 flex items-center min-h-[190px] shadow-subtle group cursor-pointer hover:border-brand-blue/40 transition-colors"
              >
                <div className="relative z-10 max-w-[58%]">
                  <h2 className="font-heading uppercase leading-tight tracking-tight">
                    <span className="block font-extrabold text-lg sm:text-xl text-brand-yellow">
                      TRÁILER &amp;
                    </span>
                    <span className="block font-black text-lg sm:text-xl text-brand-navy">
                      CABEZALES HD
                    </span>
                  </h2>
                  <p className="text-xs text-brand-gray mt-1.5">
                    Línea Mercedes-Benz Actros
                  </p>

                  <span className="inline-block mt-6 text-xs font-heading font-bold text-brand-navy underline underline-offset-4 decoration-brand-navy/60 group-hover:text-brand-blue group-hover:decoration-brand-blue transition-colors">
                    Ver Repuestos
                  </span>
                </div>

                <img
                  src="/images/products-promo-rim.jpg"
                  alt="Aros y repuestos para tráiler Mercedes-Benz Actros"
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-44 sm:w-48 h-44 sm:h-48 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
            </Reveal>

            {/* TARJETA INFERIOR DERECHA: MÁXIMA TRACCIÓN NEUMÁTICOS OTR (PRÓXIMAMENTE) */}
            <Reveal direction="diagonal-right" delay={0.18} className="flex-1 flex">
              <div
                onClick={() => handleCategoryAction('Llantas')}
                className="w-full bg-white border border-slate-200/90 rounded-sm p-6 sm:p-7 relative overflow-hidden flex-1 flex items-center min-h-[190px] shadow-subtle group cursor-pointer hover:border-brand-blue/40 transition-colors"
              >
                <div className="relative z-10 max-w-[58%]">
                  <h2 className="font-heading uppercase leading-tight tracking-tight">
                    <span className="block font-extrabold text-lg sm:text-xl text-brand-yellow">
                      MÁXIMA TRACCIÓN
                    </span>
                    <span className="block font-black text-lg sm:text-xl text-brand-navy">
                      NEUMÁTICOS OTR
                    </span>
                  </h2>
                  <p className="text-xs text-brand-gray mt-1.5 font-medium leading-relaxed">
                    Llantas para minería y tráiler <span className="text-amber-600 font-bold">(Próximamente)</span>
                  </p>

                  <span className="inline-block mt-6 text-xs font-heading font-bold text-brand-navy underline underline-offset-4 decoration-brand-navy/60 group-hover:text-brand-blue group-hover:decoration-brand-blue transition-colors">
                    Consultar Línea
                  </span>
                </div>

                <img
                  src="/images/promo-otr-tyres-transparent.png"
                  alt="Neumáticos radiales y llantas OTR para maquinaria pesada"
                  className="absolute right-[-14px] bottom-[-12px] w-44 sm:w-48 h-44 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* FRANJA INFERIOR DE 5 BENEFICIOS */}
        <Reveal direction="up" delay={0.15} className="mt-5">
          <div className="bg-white border border-slate-200/90 rounded-sm px-6 py-6 shadow-subtle">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {benefits.map((b, idx) => {
                const IconComp = b.icon;
                return (
                  <Reveal key={idx} direction="flip-up" delay={0.18 + idx * 0.06} distance={18}>
                    <div className="flex items-center gap-3.5">
                      <IconComp className="w-9 h-9 text-brand-yellow stroke-[1.6] flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-heading font-extrabold text-xs sm:text-[13px] uppercase text-brand-navy tracking-tight truncate">
                          {b.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-brand-gray mt-0.5 truncate">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
