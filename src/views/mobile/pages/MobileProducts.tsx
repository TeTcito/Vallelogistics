import React, { useState } from 'react';
import { SEO } from '@/components/ui/SEO';
import { MobileProductsBanner } from '../components/products/MobileProductsBanner';
import { MobileProductsCatalog } from '../components/products/MobileProductsCatalog';

export const MobileProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <>
      <SEO
        title="Catálogo de Repuestos para Maquinaria Pesada"
        description="Suministro de repuestos originales y alternativos para motores, bombas hidráulicas, tren de rodaje, filtros y cuchillas de maquinaria pesada Caterpillar, Komatsu, Volvo y más."
      />
      <MobileProductsBanner onSelectCategory={(cat) => setSelectedCategory(cat)} />
      <MobileProductsCatalog initialCategory={selectedCategory} />
    </>
  );
};

export default MobileProducts;
