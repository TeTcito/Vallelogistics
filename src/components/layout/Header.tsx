import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detección de scroll para sombra sutil sin alterar bruscamente la altura
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al navegar
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Productos', path: '/productos' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contacto' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b ${
        isScrolled ? 'shadow-card border-slate-200/80 py-2.5' : 'border-slate-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo transparente y estilizado a escala proporcionada */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
            aria-label="Valle Logistics and Import - Inicio"
          >
            <img
              src="/images/logo.png"
              alt="Valle Logistics and Import"
              className="h-8 sm:h-9 w-auto object-contain transition-transform hover:opacity-95"
            />
          </Link>

          {/* Navegación Desktop Central */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Menú principal">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 font-heading text-sm xl:text-base uppercase font-bold tracking-wider transition-colors duration-200 rounded-md ${
                    isActive
                      ? 'text-brand-blue'
                      : 'text-brand-dark hover:text-brand-blue hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-yellow rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bloque Derecho Compacto: Botón CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Button to="/contacto" variant="primary" size="sm" showArrow className="px-4 py-2 text-xs">
              Cotizar Carga
            </Button>
          </div>

          {/* Botones Móviles */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button to="/contacto" variant="primary" size="sm" className="text-xs px-3 py-1.5 min-h-[34px]">
              Cotizar
            </Button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-brand-dark hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-brand-blue" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-slate-100 bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg font-heading text-base font-bold tracking-wide uppercase transition-colors ${
                      isActive
                        ? 'bg-brand-blue/10 text-brand-blue border-l-4 border-brand-yellow'
                        : 'text-brand-dark hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </NavLink>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100">
                <Button to="/contacto" variant="primary" size="md" className="w-full text-xs" showArrow>
                  Solicitar Cotización Gratuita
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
