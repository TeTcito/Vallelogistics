import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { MobileServicesGrid } from '../components/services/MobileServicesGrid';
import { MobileServicesProcess } from '../components/services/MobileServicesProcess';
import { MobileServicesQuoteCTA } from '../components/services/MobileServicesQuoteCTA';

export const MobileServices: React.FC = () => {
  return (
    <>
      <SEO
        title="Importaciones, Comercio Exterior y Logística Internacional"
        description="Importación de maquinaria, repuestos y productos multissectoriales, asesoría en comercio exterior, búsqueda de proveedores, aduanas y logística multimodal con acompañamiento de punta a punta."
      />
      <MobileServicesGrid />
      <MobileServicesProcess />
      <MobileServicesQuoteCTA />
    </>
  );
};

export default MobileServices;
