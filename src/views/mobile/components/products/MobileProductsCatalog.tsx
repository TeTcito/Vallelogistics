import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCT_CATEGORIES, BRANDS_LIST } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';
import { COMPANY_DATA, getProductWhatsAppLink } from '@/data/company';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Reveal } from '@/components/ui/Reveal';

export interface ProductsCatalogProps {
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 12;

export const MobileProductsCatalog: React.FC<ProductsCatalogProps> = ({
  initialCategory,
}) => {
  const { products } = useProducts();

  // Estados de filtrado, búsqueda y paginación
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Escuchar eventos globales del MobileHeader para búsqueda y apertura de filtros
  useEffect(() => {
    const handleCatalogSearch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (typeof customEvent.detail === 'string') {
        setSearch(customEvent.detail);
      }
    };

    const handleOpenFilter = () => {
      setIsFilterModalOpen(true);
    };

    window.addEventListener('catalog-search', handleCatalogSearch);
    window.addEventListener('catalog-open-filter', handleOpenFilter);

    return () => {
      window.removeEventListener('catalog-search', handleCatalogSearch);
      window.removeEventListener('catalog-open-filter', handleOpenFilter);
    };
  }, []);

  // Notificar al MobileHeader sobre estado activo de filtros y valor de búsqueda
  useEffect(() => {
    const hasActive =
      search.trim() !== '' ||
      selectedCategory !== 'all' ||
      selectedBrand !== 'all' ||
      sortBy !== 'recent';

    window.dispatchEvent(
      new CustomEvent('catalog-filter-state', {
        detail: { hasActiveFilters: hasActive },
      })
    );

    window.dispatchEvent(
      new CustomEvent('catalog-query-sync', {
        detail: search,
      })
    );
  }, [search, selectedCategory, selectedBrand, sortBy]);

  // Sincronizar categoría inicial si cambia externamente (ej. al hacer clic en los banners superiores)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setCurrentPage(1);
    }
  }, [initialCategory]);

  // Volver a la página 1 cuando cambian los filtros u ordenamiento
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedBrand, sortBy]);

  // Bloquear scroll de la página cuando el drawer de filtros está abierto
  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterModalOpen]);

  // Resetear filtros
  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSortBy('recent');
    setCurrentPage(1);
  };

  // Filtrado y ordenamiento reactivo de productos
  const filteredProducts = useMemo(() => {
    const list = products.filter((item) => {
      // 1. Búsqueda por nombre, SKU o compatibilidad
      if (search.trim() !== '') {
        const query = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCompat = item.compatibility.some((c) =>
          c.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSku && !matchesBrand && !matchesCompat) {
          return false;
        }
      }

      // 2. Filtro de Categoría
      if (selectedCategory !== 'all') {
        if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Filtro de Marca
      if (selectedBrand !== 'all') {
        if (!item.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    // Ordenamiento: por defecto "Más recientes" primero
    return [...list].sort((a, b) => {
      if (sortBy === 'recent') {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      }
      if (sortBy === 'price-asc') {
        return (a.price ?? Infinity) - (b.price ?? Infinity);
      }
      if (sortBy === 'price-desc') {
        return (b.price ?? -Infinity) - (a.price ?? -Infinity);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [products, search, selectedCategory, selectedBrand, sortBy]);

  // Cálculos de paginación
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === safePage) return;
    setCurrentPage(page);

    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 64;
      const offset = headerHeight + 20;
      const elementTop = catalogEl.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, elementTop - offset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="pt-4 pb-16 sm:pb-24 bg-brand-light scroll-mt-24" id="catalogo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BARRA DE CONTEO Y ESTADO DE FILTROS/ORDEN */}
        <div className="flex items-center justify-between mb-3 px-1 text-xs text-slate-600 font-medium">
          <div>
            Mostrando <span className="font-bold text-brand-dark">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'artículo' : 'artículos en catálogo'}
            {sortBy !== 'recent' && (
              <span className="ml-1.5 text-[11px] text-brand-blue font-semibold">
                • {sortBy === 'price-asc' ? 'Menor precio' : sortBy === 'price-desc' ? 'Mayor precio' : 'A - Z'}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-brand-dark text-xs font-bold shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Filter className="w-3 h-3 text-brand-blue" />
            <span>Filtros y Orden</span>
            {(selectedCategory !== 'all' || selectedBrand !== 'all' || sortBy !== 'recent') && (
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            )}
          </button>
        </div>

        {/* CHIPS DE FILTROS ACTIVOS */}
        {(selectedCategory !== 'all' || selectedBrand !== 'all' || search.trim() !== '') && (
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Filtros:</span>
            {search.trim() !== '' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-brand-blue/10 text-brand-blue font-medium border border-brand-blue/20">
                Búsqueda: "{search}"
                <button type="button" onClick={() => setSearch('')} className="hover:text-brand-dark">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-brand-blue/10 text-brand-blue font-medium border border-brand-blue/20">
                {selectedCategory}
                <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-brand-dark">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedBrand !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-brand-blue/10 text-brand-blue font-medium border border-brand-blue/20">
                {selectedBrand}
                <button type="button" onClick={() => setSelectedBrand('all')} className="hover:text-brand-dark">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-brand-dark underline ml-1"
            >
              Limpiar todo
            </button>
          </div>
        )}

        <div className="w-full">

            {/* ESTADO VACÍO */}
            {displayedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-heading font-bold text-2xl uppercase text-brand-dark">
                  No se encontraron repuestos con esos criterios
                </h4>
                <p className="text-sm text-brand-gray max-w-md mx-auto text-justify">
                  ¿Busca un componente específico o número de parte descatalogado? Consúltenos directamente por WhatsApp y lo ubicaremos en nuestra red de proveedores internacionales.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={handleResetFilters}>
                    Restablecer Filtros
                  </Button>
                  <Button
                    href={`https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
                      `Hola Valle Logistics, busco un repuesto que no encontré en el catálogo: ${search}`
                    )}`}
                    isExternal
                    variant="primary"
                    size="sm"
                  >
                    Cotizar por Encargo
                  </Button>
                </div>
              </div>
            ) : (
              /* GRILLA DE 2 COLUMNAS (MÁXIMO 6 FILAS = 12 PRODUCTOS POR PÁGINA) */
              <AnimatePresence mode="wait">
                <motion.div
                  key={`page-${safePage}-${selectedCategory}-${selectedBrand}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4"
                >
                  {displayedProducts.map((product, idx) => {
                    const isUpcoming =
                      product.stockStatus === 'Próximamente' ||
                      product.tag === 'Próximamente';
                    const tagVariant =
                      product.tag === 'Más vendido'
                        ? 'yellow'
                        : product.tag === 'Oferta'
                        ? 'red'
                        : product.tag === 'Próximamente'
                        ? 'yellow'
                        : 'blue';

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.08 }}
                        transition={{
                          duration: 0.45,
                          delay: (idx % 2) * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 hover:border-brand-blue/40 shadow-xs hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                      >
                        {/* Cabecera de la tarjeta con imagen y tag */}
                        <div>
                          <div className="relative h-28 xs:h-36 sm:h-44 bg-slate-100 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Tag badge */}
                            {product.tag && (
                              <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2">
                                <Badge variant={tagVariant} size="sm" className="text-[9px] px-1.5 py-0.5 font-bold">
                                  {product.tag}
                                </Badge>
                              </div>
                            )}

                            {/* Botón flotante de Vista Rápida */}
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(product)}
                              className="absolute top-1.5 right-1.5 xs:top-2 xs:right-2 w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-white/90 backdrop-blur-sm text-brand-dark flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors shadow-xs"
                              title="Ver ficha técnica"
                              aria-label={`Ver detalle rápido de ${product.name}`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Rating estrellas */}
                            <div className="absolute bottom-1.5 left-1.5 xs:bottom-2 xs:left-2 bg-brand-navy/85 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white flex items-center gap-0.5 font-bold">
                              <Star className="w-2.5 h-2.5 text-brand-yellow fill-brand-yellow" />
                              <span>{product.rating || '5.0'}</span>
                            </div>
                          </div>

                          {/* Cuerpo de la tarjeta */}
                          <div className="p-2.5 xs:p-3">
                            <div className="flex items-center justify-between text-[10px] xs:text-[11px] text-brand-gray mb-1">
                              <span className="font-heading uppercase font-bold text-brand-blue truncate">
                                {product.brand}
                              </span>
                              <span className="font-mono text-[9px] bg-slate-100 px-1 py-0.5 rounded truncate">
                                {product.sku}
                              </span>
                            </div>

                            <h3
                              onClick={() => setQuickViewProduct(product)}
                              className="font-heading font-extrabold text-xs xs:text-[13px] sm:text-sm uppercase text-brand-dark hover:text-brand-blue transition-colors cursor-pointer line-clamp-2 leading-tight min-h-[32px] xs:min-h-[36px]"
                            >
                              {product.name}
                            </h3>

                            {/* Descripción del producto guardada en la administración */}
                            {product.description ? (
                              <p className="mt-1.5 text-[9.5px] xs:text-[10px] text-brand-gray line-clamp-2 leading-tight">
                                {product.description}
                              </p>
                            ) : product.compatibility && product.compatibility.length > 0 ? (
                              <div className="mt-1.5 flex flex-wrap gap-1">
                                {product.compatibility.slice(0, 1).map((comp, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className="text-[9px] bg-brand-light text-brand-gray px-1.5 py-0.5 rounded font-medium truncate max-w-[120px]"
                                  >
                                    {comp}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Pie de la tarjeta: Precio y Botón de Cotización por WhatsApp */}
                        <div className="p-2.5 xs:p-3 pt-0 border-t border-slate-100 mt-1">
                          <div className="my-1.5">
                            <span className="text-[9px] text-brand-gray block">Precio estimado:</span>
                            {product.price ? (
                              <span className="font-heading font-extrabold text-xs xs:text-sm text-brand-dark">
                                ${product.price.toLocaleString('es-ES')} USD
                              </span>
                            ) : (
                              <span className="font-heading font-bold text-[10px] uppercase text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded inline-block">
                                A cotizar
                              </span>
                            )}
                          </div>

                          {/* Botón WhatsApp */}
                          <Button
                            href={getProductWhatsAppLink(product.name, product.sku)}
                            isExternal
                            variant={isUpcoming ? 'secondary' : 'primary'}
                            size="sm"
                            className="w-full text-[10.5px] xs:text-xs py-1.5 px-2 justify-center"
                            icon={<WhatsAppIcon className="w-3.5 h-3.5" />}
                            iconPosition="left"
                          >
                            <span>{isUpcoming ? 'Consultar' : 'Cotizar'}</span>
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Barra de Paginación */}
            {filteredProducts.length > 0 && (
              <Reveal direction="up" delay={0.12}>
                <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm text-brand-gray font-medium">
                    Mostrando{' '}
                    <span className="font-bold text-brand-navy">{startIndex + 1}</span>–
                    <span className="font-bold text-brand-navy">
                      {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}
                    </span>{' '}
                    de{' '}
                    <span className="font-bold text-brand-navy">{filteredProducts.length}</span>{' '}
                    artículos disponibles
                  </p>

                  <nav
                    className="flex items-center gap-1.5"
                    aria-label="Paginación de productos"
                  >
                    {/* Botón Anterior */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(safePage - 1)}
                      disabled={safePage === 1}
                      aria-label="Página anterior"
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-heading font-bold uppercase text-brand-navy hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Anterior</span>
                    </button>

                    {/* Números de Página */}
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => {
                      const isActive = page === safePage;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          aria-current={isActive ? 'page' : undefined}
                          aria-label={`Ir a la página ${page}`}
                          className={`w-9 h-9 rounded-lg border font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                              : 'bg-white border-slate-200 text-brand-navy hover:border-brand-blue hover:text-brand-blue'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* Botón Siguiente */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(safePage + 1)}
                      disabled={safePage === totalPages}
                      aria-label="Página siguiente"
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-heading font-bold uppercase text-brand-navy hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
                    >
                      <span className="hidden sm:inline">Siguiente</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
                </div>
              </Reveal>
            )}
          </div>
        </div>

      {/* MODAL DE VISTA RÁPIDA */}
      <Modal
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        title={quickViewProduct?.name || 'Ficha Técnica'}
        maxWidth="2xl"
      >
        {quickViewProduct && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-60 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-heading uppercase font-bold text-brand-blue">
                    {quickViewProduct.brand}
                  </span>
                  {quickViewProduct.tag && (
                    <Badge variant="yellow" size="sm">
                      {quickViewProduct.tag}
                    </Badge>
                  )}
                </div>

                <div className="font-mono text-xs bg-slate-100 p-2 rounded text-slate-700">
                  <strong>SKU:</strong> {quickViewProduct.sku}
                </div>

                <div className="text-xs text-brand-gray">
                  <strong>Categoría:</strong> {quickViewProduct.category} ({quickViewProduct.subcategory})
                </div>

                <div className="text-xs text-brand-gray">
                  <strong>Disponibilidad:</strong>{' '}
                  <span
                    className={
                      quickViewProduct.stockStatus === 'Próximamente'
                        ? 'text-amber-600 font-bold'
                        : 'text-green-700 font-bold'
                    }
                  >
                    {quickViewProduct.stockStatus || 'Disponible'}
                  </span>
                </div>

                <div className="pt-2">
                  {quickViewProduct.price ? (
                    <div className="font-heading font-extrabold text-2xl text-brand-navy">
                      ${quickViewProduct.price.toLocaleString('es-ES')} USD
                    </div>
                  ) : (
                    <div className="font-heading font-bold text-sm uppercase text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                      Precio bajo cotización según volumen
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm uppercase text-brand-dark mb-1">
                Descripción Técnica:
              </h4>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed text-justify">
                {quickViewProduct.description ||
                  'Pieza fabricada con tolerancias estrictas para servicio continuo y trabajo pesado en faenas mineras e industriales.'}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm uppercase text-brand-dark mb-2">
                Modelos de Maquinaria Compatibles:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.compatibility.map((c: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-brand-light border border-slate-200 px-2.5 py-1 rounded-md text-brand-dark font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button
                href={getProductWhatsAppLink(quickViewProduct.name, quickViewProduct.sku)}
                isExternal
                variant="primary"
                size="md"
                className="flex-1"
                icon={<WhatsAppIcon className="w-4 h-4" />}
                iconPosition="left"
              >
                {quickViewProduct.stockStatus === 'Próximamente'
                  ? 'Consultar Disponibilidad Futura'
                  : 'Solicitar Cotización por WhatsApp'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setQuickViewProduct(null)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* VENTANA FLOTANTE HACIA LA IZQUIERDA (DRAWER DE FILTROS) */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop oscuro con desenfoque */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Panel flotante deslizable hacia la izquierda */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtros del catálogo"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 w-[84%] max-w-[320px] bg-white shadow-2xl z-50 flex flex-col h-full border-r border-slate-200"
            >
              {/* Encabezado del Drawer */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-brand-light">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-blue" />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-dark">
                    Filtros de Catálogo
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-dark hover:bg-slate-200/70 transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenido con scroll */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* 1. ORDENAR POR (PRIMERA SECCIÓN) */}
                <div className="bg-slate-50/90 p-3 rounded-xl border border-slate-200/90">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                      <ArrowUpDown className="w-3.5 h-3.5 text-brand-blue" />
                      Ordenar por
                    </h4>
                    <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">
                      {sortBy === 'recent'
                        ? 'Recientes'
                        : sortBy === 'price-asc'
                        ? 'Menor precio'
                        : sortBy === 'price-desc'
                        ? 'Mayor precio'
                        : 'A - Z'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'recent', label: 'Más recientes' },
                      { id: 'price-asc', label: 'Menor precio' },
                      { id: 'price-desc', label: 'Mayor precio' },
                      { id: 'name-asc', label: 'Nombre: A - Z' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSortBy(opt.id)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                          sortBy === opt.id
                            ? 'bg-brand-blue text-white border-brand-blue shadow-xs font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Categorías */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-blue" />
                      Categorías
                    </h4>
                    {selectedCategory !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className="text-[11px] font-semibold text-brand-blue hover:underline"
                      >
                        Ver todas
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-slate-50 text-brand-dark hover:bg-slate-100'
                      }`}
                    >
                      <span>Todas las Familias</span>
                      <span className="text-[11px] opacity-80">{products.length}</span>
                    </button>
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const count = products.filter((p) => p.category === cat.name).length;
                      const isSelected = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-[11px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Marcas Principales */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-brand-yellow" />
                      Marcas
                    </h4>
                    {selectedBrand !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedBrand('all')}
                        className="text-[11px] font-semibold text-brand-blue hover:underline"
                      >
                        Todas
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedBrand('all')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedBrand === 'all'
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Todas
                    </button>
                    {BRANDS_LIST.map((brand, bIdx) => {
                      const isSelected = selectedBrand === brand;
                      return (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {brand}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pie de acción fijo en el Drawer */}
              <div className="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs py-2"
                  onClick={handleResetFilters}
                >
                  Restablecer
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs py-2"
                  onClick={() => {
                    setIsFilterModalOpen(false);
                    const catalogEl = document.getElementById('catalogo');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Ver ({filteredProducts.length})
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MobileProductsCatalog;
