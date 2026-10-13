import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DesktopProducts } from '@/views/desktop/pages/DesktopProducts';
import { MobileProducts } from '@/views/mobile/pages/MobileProducts';

/**
 * Products
 * Distribuidor de vista: Renderiza DesktopProducts o MobileProducts de forma 100% aislada.
 */
export const Products: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProducts /> : <DesktopProducts />;
};

export default Products;
