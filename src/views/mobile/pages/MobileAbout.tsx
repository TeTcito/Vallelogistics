import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { MobileAboutHero } from '../components/about/MobileAboutHero';
import { MobileAboutHistory } from '../components/about/MobileAboutHistory';
import { MobileAboutMissionVision } from '../components/about/MobileAboutMissionVision';
import { MobileAboutAlliances } from '../components/about/MobileAboutAlliances';

export const MobileAbout: React.FC = () => {
  return (
    <>
      <SEO
        title="Nosotros - Importaciones, Logística y Comercio Exterior"
        description="Vallelogistics: empresa ecuatoriana especializada en importaciones de maquinaria, repuestos, partes y accesorios para carga pesada y soluciones logísticas integrales."
      />
      <MobileAboutHero />
      <MobileAboutHistory />
      <MobileAboutMissionVision />
      <MobileAboutAlliances />
    </>
  );
};

export default MobileAbout;
