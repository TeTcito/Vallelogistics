import { useState, useEffect } from 'react';

/**
 * Hook para detectar si la pantalla actual corresponde a un viewport móvil/tablet.
 * Por defecto usa 1024px (breakpoint 'lg' de Tailwind), separando vista móvil y escritorio.
 */
export const useIsMobile = (breakpoint = 1024): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
