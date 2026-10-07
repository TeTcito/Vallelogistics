import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeFeaturedProducts } from '@/components/home/HomeFeaturedProducts';
import { HomeWhyUs } from '@/components/home/HomeWhyUs';
import { HomeFeaturedServices } from '@/components/home/HomeFeaturedServices';

export const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Inicio - Importaciones, Comercio Exterior & Maquinaria"
        description="Valle Logistics and Import: Importaciones de maquinaria, repuestos y productos multissectoriales, asesoría en comercio exterior, aduanas y logística con acompañamiento continuo."
      />
      {/* 1. Hero Principal */}
      <HomeHero />

      {/* 2. Repuestos Destacados: Promos Actros y Uñas + Catálogo de 3 Categorías */}
      <HomeFeaturedProducts />

      {/* 3. Por qué elegirnos */}
      <HomeWhyUs />

      {/* 4. Servicios destacados */}
      <HomeFeaturedServices />
    </>
  );
};

export default Home;
