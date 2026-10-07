import React, { useState } from 'react';
import { SEO } from '@/components/ui/SEO';
import { ProductsBanner } from '@/components/products/ProductsBanner';
import { ProductsCatalog } from '@/components/products/ProductsCatalog';

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <>
      <SEO
        title="Catálogo de Repuestos para Maquinaria Pesada"
        description="Suministro de repuestos originales y alternativos para motores, bombas hidráulicas, tren de rodaje, filtros y cuchillas de maquinaria pesada Caterpillar, Komatsu, Volvo y más."
      />

      {/* 1. Primera sección: Banner principal + 2 tarjetas laterales + franja de 5 beneficios */}
      <ProductsBanner onSelectCategory={(cat) => setSelectedCategory(cat)} />

      {/* 2. Catálogo con panel izquierdo de filtros y grilla de artículos */}
      <ProductsCatalog initialCategory={selectedCategory} />
    </>
  );
};

export default Products;
