import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DesktopLayout } from '@/views/desktop/layout/DesktopLayout';
import { MobileLayout } from '@/views/mobile/layout/MobileLayout';

/**
 * MainLayout
 * Enrutador de layout: selecciona DesktopLayout o MobileLayout
 * asegurando una separación total entre la vista de escritorio y la de móvil.
 */
export const MainLayout: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
};

export default MainLayout;
