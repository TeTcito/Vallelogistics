import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const MobileHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const location = useLocation();

  const isProductsPage = location.pathname === '/productos';

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

  // Manejo de búsqueda en productos
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    window.dispatchEvent(new CustomEvent('catalog-search', { detail: val }));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    window.dispatchEvent(new CustomEvent('catalog-search', { detail: '' }));
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
      const catalogEl = document.getElementById('catalogo');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenFilter = () => {
    window.dispatchEvent(new CustomEvent('catalog-open-filter'));
  };

  // Sincronizar estado de búsqueda y filtros con el catálogo
  useEffect(() => {
    const handleSyncQuery = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (typeof customEvent.detail === 'string') {
        setSearchQuery(customEvent.detail);
      }
    };
    const handleFilterState = (e: Event) => {
      const customEvent = e as CustomEvent<{ hasActiveFilters: boolean }>;
      if (customEvent.detail) {
        setHasActiveFilters(!!customEvent.detail.hasActiveFilters);
      }
    };

    window.addEventListener('catalog-query-sync', handleSyncQuery);
    window.addEventListener('catalog-filter-state', handleFilterState);

    return () => {
      window.removeEventListener('catalog-query-sync', handleSyncQuery);
      window.removeEventListener('catalog-filter-state', handleFilterState);
    };
  }, []);

  // Limpiar búsqueda al cambiar de página
  useEffect(() => {
    if (!isProductsPage) {
      setSearchQuery('');
      setHasActiveFilters(false);
    }
  }, [isProductsPage]);

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

          {/* Bloque Derecho Compacto: Botón CTA (oculto en /productos) */}
          {!isProductsPage && (
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <Button to="/contacto" variant="primary" size="sm" showArrow className="px-4 py-2 text-xs">
                Cotizar Carga
              </Button>
            </div>
          )}

          {/* Botones Móviles: En /productos muestra buscador y filtro, en otras páginas muestra Cotizar */}
          {isProductsPage ? (
            <div className="flex items-center gap-1.5 xs:gap-2 flex-1 justify-end lg:hidden min-w-0 max-w-[280px] xs:max-w-[325px] sm:max-w-lg -ml-5 sm:ml-0">
              {/* Barra de Búsqueda ampliada 20px hacia la izquierda */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Buscar repuesto..."
                  className="w-full pl-7 xs:pl-8 pr-6 xs:pr-7 py-1.5 rounded-lg border border-slate-200/90 bg-slate-50/90 hover:bg-white focus:bg-white text-xs text-brand-dark placeholder-slate-400 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  aria-label="Buscar repuesto en catálogo"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 xs:left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Botón de Filtro y Ordenamiento al lado de la barra de búsqueda */}
              <button
                type="button"
                onClick={handleOpenFilter}
                className={`relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all shrink-0 ${
                  hasActiveFilters
                    ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-brand-dark border-slate-200/90'
                }`}
                aria-label="Filtros y Ordenar catálogo"
                title="Filtros y Ordenar por"
              >
                <Filter className="w-3.5 h-3.5" />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-yellow rounded-full border-2 border-white ring-1 ring-brand-blue" />
                )}
              </button>

              {/* Botón Menú Móvil */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 xs:p-2 rounded-lg text-brand-dark hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue transition-colors shrink-0"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-brand-blue" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          ) : (
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
          )}
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

export default MobileHeader;
