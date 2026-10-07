import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { ServicesProcess } from '@/components/services/ServicesProcess';
import { ServicesQuoteCTA } from '@/components/services/ServicesQuoteCTA';

export const Services: React.FC = () => {
  return (
    <>
      <SEO
        title="Importaciones, Comercio Exterior y Logística Internacional"
        description="Importación de maquinaria, repuestos y productos multissectoriales, asesoría en comercio exterior, búsqueda de proveedores, aduanas y logística multimodal con acompañamiento de punta a punta."
      />

      {/* 1. Sección Principal de Servicios (Diseño de doble bloque con ondas orgánicas) */}
      <ServicesGrid />

      {/* 2. Proceso de importación en pasos + Respaldo de servicios */}
      <ServicesProcess />

      {/* 3. CTA de cotización rápida */}
      <ServicesQuoteCTA />
    </>
  );
};

export default Services;
