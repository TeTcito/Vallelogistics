import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DesktopHome } from '@/views/desktop/pages/DesktopHome';
import { MobileHome } from '@/views/mobile/pages/MobileHome';

/**
 * Home
 * Distribuidor de vista: Renderiza DesktopHome o MobileHome de forma 100% aislada.
 */
export const Home: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHome /> : <DesktopHome />;
};

export default Home;
