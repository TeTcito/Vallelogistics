import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DesktopContact } from '@/views/desktop/pages/DesktopContact';
import { MobileContact } from '@/views/mobile/pages/MobileContact';

/**
 * Contact
 * Distribuidor de vista: Renderiza DesktopContact o MobileContact de forma 100% aislada.
 */
export const Contact: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileContact /> : <DesktopContact />;
};

export default Contact;
