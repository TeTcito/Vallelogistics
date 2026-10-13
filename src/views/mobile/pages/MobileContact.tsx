import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { MobileContactHero } from '../components/contact/MobileContactHero';
import { MobileContactFormSection } from '../components/contact/MobileContactFormSection';
import { MobileContactMapSection } from '../components/contact/MobileContactMapSection';

export const MobileContact: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Contáctanos - Cotizaciones y Asesoría"
        description="Póngase en contacto con Valle Logistics and Import en Cuenca, Ecuador. Cotice importación de maquinaria, repuestos de carga pesada y logística internacional."
      />
      <MobileContactHero />
      <MobileContactFormSection />
      <MobileContactMapSection />
    </div>
  );
};

export default MobileContact;
