import React from 'react';
import { ArrowRight, Truck, Tractor } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export interface ProductsPromosProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const ProductsPromos: React.FC<ProductsPromosProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* BANNER 1: Repuestos para Cabezales de Tráiler Mercedes-Benz Actros */}
          <Reveal direction="left">
            <div className="relative rounded-2xl overflow-hidden bg-brand-navy text-white min-h-[320px] sm:min-h-[360px] p-8 sm:p-10 shadow-elevated border border-white/10 group flex flex-col justify-between">
              {/* Fotografía de fondo con zoom suave al hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/promo-mercedes-actros.jpg"
                  alt="Cabezal de tráiler Mercedes-Benz Actros para transporte pesado"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75"
                />
                {/* Degradado oscuro para máxima legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/85 to-transparent" />
                <div className="absolute inset-0 bg-black/25" />
              </div>

              {/* Contenido Superior */}
              <div className="relative z-10 max-w-sm space-y-3.5">
                {/* Badge amarillo estilo e-commerce destacado */}
                <div className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-navy font-heading font-black text-xs uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                  <Truck className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>LÍNEA DESTACADA TRÁILER</span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight drop-shadow-md">
                  Cabezales Mercedes-Benz <br />
                  <span className="text-brand-yellow font-black">Actros & Axor</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow">
                  Válvulas moduladoras EBS Wabco, kits de embrague reforzados Sachs, ópticas LED DRL,
                  pastillas Knorr-Bremse y filtración certificada para flotas de carga pesada.
                </p>
              </div>

              {/* Botón de Acción Inferior */}
              <div className="relative z-10 pt-6">
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Repuestos y accesorios para Actros - Mercedes Benz')}
                  className="group/btn inline-flex items-center gap-2.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-black text-xs sm:text-sm uppercase tracking-wider pl-5 pr-2 py-2 rounded-lg shadow-yellow transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Explorar Repuestos Actros</span>
                  <span className="w-7 h-7 rounded bg-brand-navy text-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* BANNER 2: Repuestos de Uñas y Cuchillas para Tractores */}
          <Reveal direction="right">
            <div className="relative rounded-2xl overflow-hidden bg-brand-navy text-white min-h-[320px] sm:min-h-[360px] p-8 sm:p-10 shadow-elevated border border-white/10 group flex flex-col justify-between">
              {/* Fotografía de fondo con zoom suave al hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/promo-unas-tractores.jpg"
                  alt="Uñas y cuchillas forjadas para tractores de orugas y excavadoras"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75"
                />
                {/* Degradado oscuro para máxima legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/85 to-transparent" />
                <div className="absolute inset-0 bg-black/25" />
              </div>

              {/* Contenido Superior */}
              <div className="relative z-10 max-w-sm space-y-3.5">
                {/* Badge amarillo estilo e-commerce destacado */}
                <div className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-navy font-heading font-black text-xs uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                  <Tractor className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>HERRAMIENTAS DE CORTE GET</span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight drop-shadow-md">
                  Uñas y Dientes <br />
                  <span className="text-brand-yellow font-black">para Tractores</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow">
                  Puntas forjadas serie J350/J450, uñas de desgarrador (ripper shanks) para D8R/D8T,
                  cuchillas antidesgaste Hardox HB500 y adaptadores para minería de alta abrasión.
                </p>
              </div>

              {/* Botón de Acción Inferior */}
              <div className="relative z-10 pt-6">
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Repuestos para Maquinaria')}
                  className="group/btn inline-flex items-center gap-2.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-black text-xs sm:text-sm uppercase tracking-wider pl-5 pr-2 py-2 rounded-lg shadow-yellow transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Explorar Uñas y Maquinaria</span>
                  <span className="w-7 h-7 rounded bg-brand-navy text-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
