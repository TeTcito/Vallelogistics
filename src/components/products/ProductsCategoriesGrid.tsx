import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';

export interface ProductsCategoriesGridProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const ProductsCategoriesGrid: React.FC<ProductsCategoriesGridProps> = ({
  onSelectCategory,
}) => {
  // Mostramos las 3 categorías principales solicitadas
  const featuredCategories = PRODUCT_CATEGORIES;

  const handleClickCategory = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionTitle
              badge="Líneas Principales"
              title="Categorías Destacadas de Repuestos"
              subtitle="Acceda a las familias de repuestos principales para transporte pesado y maquinaria minera."
              align="left"
            />
            <button
              onClick={() => handleClickCategory('all')}
              className="text-brand-blue hover:text-brand-yellow-hover font-heading font-bold uppercase text-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Ver todas las categorías</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredCategories.map((cat, index) => (
            <Reveal key={cat.id} direction="up" delay={index * 0.1}>
              <div
                onClick={() => handleClickCategory(cat.name)}
                className="bg-brand-light rounded-2xl p-6 border border-slate-200 hover:border-brand-blue/50 hover:shadow-card transition-all duration-300 group flex flex-col justify-between cursor-pointer h-full"
              >
                <div>
                  {/* Imagen de la Categoría */}
                  <div className="h-48 rounded-xl overflow-hidden bg-brand-navy-dark relative mb-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-60" />
                    {cat.id === 'llantas' && (
                      <div className="absolute top-3 right-3 bg-brand-yellow text-brand-navy px-2.5 py-1 rounded-md text-[10px] font-heading font-black uppercase tracking-wider shadow">
                        A Futuro
                      </div>
                    )}
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-brand-dark uppercase tracking-tight group-hover:text-brand-blue transition-colors">
                    {cat.name}
                  </h3>

                  {/* Subcategorías */}
                  <ul className="mt-3 space-y-1.5 text-xs text-brand-gray">
                    {cat.subcategories.map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                        <span className="hover:text-brand-dark transition-colors">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-heading font-bold text-brand-blue uppercase">
                  <span>Ver Productos</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
