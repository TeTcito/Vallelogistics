import React, { useRef, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Layers, ShoppingBag, Users, Phone } from 'lucide-react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  activeColor: string;
}

// Generadores geométricos puros fuera del render para máximo rendimiento
const getBorderPath = (cx: number, w: number) => {
  const scoopHalfW = 53;
  const leftX = cx - scoopHalfW;
  const rightX = cx + scoopHalfW;
  const depth = 39;
  const endX = Math.max(w, 800);
  return `M -20,1.5 L ${Math.max(-20, leftX)},1.5 C ${cx - 29},1.5 ${cx - 17},${depth} ${cx},${depth} C ${cx + 17},${depth} ${cx + 29},1.5 ${rightX},1.5 L ${endX},1.5`;
};

const getBgPath = (cx: number, w: number) => {
  const scoopHalfW = 53;
  const leftX = cx - scoopHalfW;
  const rightX = cx + scoopHalfW;
  const depth = 39;
  const h = 46;
  const endX = Math.max(w, 800);
  return `M -20,1.5 L ${Math.max(-20, leftX)},1.5 C ${cx - 29},1.5 ${cx - 17},${depth} ${cx},${depth} C ${cx + 17},${depth} ${cx + 29},1.5 ${rightX},1.5 L ${endX},1.5 L ${endX},${h + 80} L -20,${h + 80} Z`;
};

/**
 * MobileNav (MobileBottomNav)
 * Barra de navegación inferior fluida con efecto de ola hidrodinámica y botón gota de agua.
 * La gota emerge suavemente desde abajo/detrás de la barra y se sumerge al desactivarse.
 */
export const MobileNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);
  const borderPathRef = useRef<SVGPathElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInitializedRef = useRef<boolean>(false);
  const navWidthRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth : 390
  );

  const navItems: NavItem[] = useMemo(() => [
    { path: '/', label: 'Inicio', icon: Home, activeColor: '#FDB913' },
    { path: '/servicios', label: 'Servicios', icon: Layers, activeColor: '#38BDF8' },
    { path: '/productos', label: 'Catálogo', icon: ShoppingBag, activeColor: '#FDB913' },
    { path: '/nosotros', label: 'Nosotros', icon: Users, activeColor: '#60A5FA' },
    { path: '/contacto', label: 'Contacto', icon: Phone, activeColor: '#4ADE80' },
  ], []);

  const getActiveIndex = useCallback((): number => {
    const p = location.pathname;
    if (p === '/') return 0;
    if (p.startsWith('/servicios')) return 1;
    if (p.startsWith('/productos')) return 2;
    if (p.startsWith('/nosotros')) return 3;
    if (p.startsWith('/contacto')) return 4;
    return 0;
  }, [location.pathname]);

  const activeIndex = getActiveIndex();

  // Física de resorte calibrada para ola orgánica relajada y continua
  const rawX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 195
  );
  const springX = useSpring(rawX, { stiffness: 210, damping: 26, mass: 0.9 });

  const updateNotchPosition = useCallback((forceImmediate = false) => {
    const activeItem = itemRefs.current[activeIndex];
    const menu = menuRef.current;
    if (activeItem && menu) {
      const activeRect = activeItem.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const centerX = activeRect.left - menuRect.left + activeRect.width / 2;
      navWidthRef.current = Math.max(
        menuRect.width || 0,
        window.innerWidth || 0,
        document.documentElement.clientWidth || 0,
        420
      );

      // Si es el primer render o un redimensionamiento forzado, posicionar directamente
      if (forceImmediate || !isInitializedRef.current) {
        isInitializedRef.current = true;
        rawX.jump(centerX);
        if (borderPathRef.current && bgPathRef.current) {
          const w = navWidthRef.current;
          borderPathRef.current.setAttribute('d', getBorderPath(centerX, w));
          bgPathRef.current.setAttribute('d', getBgPath(centerX, w));
        }
      } else {
        // En transiciones de pestañas: SOLO actualizar rawX para que springX viaje fluidamente sin saltos
        rawX.set(centerX);
      }
    }
  }, [activeIndex, rawX]);

  useLayoutEffect(() => {
    updateNotchPosition();
    const handleResize = () => {
      updateNotchPosition(true);
    };

    window.addEventListener('resize', handleResize);
    const rId = requestAnimationFrame(() => updateNotchPosition());

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rId);
    };
  }, [updateNotchPosition, location.pathname]);

  // Actualización directa al DOM del SVG a 60-120fps guiada por el resorte
  useEffect(() => {
    return springX.on('change', (cx) => {
      const w = navWidthRef.current;
      if (borderPathRef.current) {
        borderPathRef.current.setAttribute('d', getBorderPath(cx, w));
      }
      if (bgPathRef.current) {
        bgPathRef.current.setAttribute('d', getBgPath(cx, w));
      }
    });
  }, [springX]);

  const handleTabClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const initialW = typeof window !== 'undefined' ? Math.max(window.innerWidth, 420) : 420;
  const initialCx = initialW / 2;

  return (
    <nav
      ref={menuRef}
      className="fixed bottom-0 left-0 right-0 z-[100] h-[46px] w-full select-none overflow-visible pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Navegación móvil inferior"
    >
      {/* Respaldo sólido inferior para safe-area en teléfonos con barra home */}
      <div className="absolute -bottom-10 left-0 right-0 h-10 bg-[#061B4B] pointer-events-none -z-10" />

      {/* CAPA 1: GOTA DE AGUA ACTIVA (POR DEBAJO DEL SVG DE LA BARRA) */}
      <div className="flex items-center justify-around max-w-md mx-auto absolute inset-0 z-10 h-full pointer-events-none px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <div
              key={`drop-${item.path}`}
              className="relative flex-1 h-full flex items-center justify-center py-0.5 px-1"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="active-drop"
                    initial={{ y: 32, opacity: 0, scale: 0.65 }}
                    animate={{ y: -14, opacity: 1, scale: 1 }}
                    exit={{
                      y: 32,
                      opacity: 0,
                      scale: 0.65,
                      transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
                    }}
                    transition={{
                      duration: 0.52,
                      delay: 0.14, // Espera a que la ola llegue a este punto antes de emerger
                      ease: [0.16, 1, 0.3, 1], // Curva suave, sedosa y SIN rebote
                    }}
                    className="absolute w-[41px] h-[41px] rounded-full bg-gradient-to-tr from-[#FDB913] via-[#38BDF8] to-[#FED564] p-[2px] shadow-[0_4px_18px_rgba(253,185,19,0.55)] flex items-center justify-center will-change-transform"
                  >
                    <div className="w-full h-full rounded-full bg-[#061B4B] flex items-center justify-center text-white">
                      <Icon
                        className="w-[18px] h-[18px] stroke-[2.5]"
                        style={{ color: item.activeColor }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CAPA 2: FONDO Y TRAZO SUPERIOR SVG (CUBRE POR ENCIMA A LA GOTA CUANDO BAJA) */}
      <svg
        className="absolute inset-0 w-full h-[72px] z-20 pointer-events-none overflow-visible will-change-transform"
        style={{ filter: 'drop-shadow(0 -4px 18px rgba(6, 27, 75, 0.45))' }}
      >
        <defs>
          <linearGradient id="navbar-valle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDB913" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0A3D91" />
            <stop offset="100%" stopColor="#FDB913" />
          </linearGradient>
          <filter id="navbar-valle-glow" x="-10%" y="-30%" width="120%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#FDB913" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Fondo oscuro sólido sin transparencia con el color de la marca (#061B4B) */}
        <path
          ref={bgPathRef}
          d={getBgPath(initialCx, initialW)}
          fill="#061B4B"
          fillOpacity="1"
        />

        {/* Trazo continuo con gradiente (actualizado directo por ref) */}
        <path
          ref={borderPathRef}
          d={getBorderPath(initialCx, initialW)}
          fill="none"
          stroke="url(#navbar-valle-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#navbar-valle-glow)"
        />
      </svg>

      {/* CAPA 3: BOTONES INTERACTIVOS E ICONOS INACTIVOS (EN EL FRENTE) */}
      <div className="flex items-center justify-around max-w-md mx-auto relative z-30 h-full pointer-events-auto px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={item.path}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(item.path)}
              className="relative flex-1 h-full flex items-center justify-center py-0.5 px-1 cursor-pointer select-none group"
              aria-label={item.label}
            >
              {/* Icono inactivo siempre centrado con transición suave de opacidad */}
              <motion.div
                animate={{
                  opacity: isActive ? 0 : 1,
                  scale: isActive ? 0.75 : 1,
                }}
                transition={{
                  duration: isActive ? 0.2 : 0.28,
                  delay: isActive ? 0 : 0.12,
                }}
                className="w-7 h-7 flex items-center justify-center text-slate-300 group-hover:text-white transition-colors"
              >
                <Icon className="w-[18px] h-[18px] stroke-2" />
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
