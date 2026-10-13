import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { MobileHomeHero } from '../components/home/MobileHomeHero';
import { MobileHomeFeaturedProducts } from '../components/home/MobileHomeFeaturedProducts';
import { MobileHomeWhyUs } from '../components/home/MobileHomeWhyUs';
import { MobileHomeFeaturedServices } from '../components/home/MobileHomeFeaturedServices';

export const MobileHome: React.FC = () => {
  return (
    <>
      <SEO
        title="Inicio - Importaciones, Comercio Exterior & Maquinaria"
        description="Valle Logistics and Import: Importaciones de maquinaria, repuestos y productos multissectoriales, asesoría en comercio exterior, aduanas y logística con acompañamiento continuo."
      />
      <MobileHomeHero />
      <MobileHomeFeaturedProducts />
      <MobileHomeWhyUs />
      <MobileHomeFeaturedServices />
    </>
  );
};

export default MobileHome;
