import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DesktopAbout } from '@/views/desktop/pages/DesktopAbout';
import { MobileAbout } from '@/views/mobile/pages/MobileAbout';

/**
 * About
 * Distribuidor de vista: Renderiza DesktopAbout o MobileAbout de forma 100% aislada.
 */
export const About: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileAbout /> : <DesktopAbout />;
};

export default About;
