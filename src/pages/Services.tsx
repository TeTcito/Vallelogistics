import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DesktopServices } from '@/views/desktop/pages/DesktopServices';
import { MobileServices } from '@/views/mobile/pages/MobileServices';

/**
 * Services
 * Distribuidor de vista: Renderiza DesktopServices o MobileServices de forma 100% aislada.
 */
export const Services: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServices /> : <DesktopServices />;
};

export default Services;
