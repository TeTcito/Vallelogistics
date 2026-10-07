import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Eye,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES, BRANDS_LIST } from '@/data/products';
import { COMPANY_DATA, getProductWhatsAppLink } from '@/data/company';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Reveal } from '@/components/ui/Reveal';

export interface ProductsCatalogProps {
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 9;

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  initialCategory,
}) => {
  // Estados de filtrado, búsqueda y paginación
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sincronizar categoría inicial si cambia externamente (ej. al hacer clic en los banners superiores)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setCurrentPage(1);
    }
  }, [initialCategory]);

  // Volver a la página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedBrand]);

  // Acordeón en sidebar
  const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(true);
  const [isBrandAccordionOpen, setIsBrandAccordionOpen] = useState(true);

  // Resetear filtros
  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setCurrentPage(1);
  };

  // Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
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
  }, [search, selectedCategory, selectedBrand]);

  // Productos "Más vendidos" para el bloque del sidebar
  const bestsellers = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.tag === 'Más vendido').slice(0, 3);
  }, []);

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
        {/* Layout: Panel izquierdo fijo (Sticky Sidebar) + Artículos a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PANEL IZQUIERDO DE FILTROS (Fijo al hacer scroll hasta llegar al tope inferior) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-20 self-start space-y-4">
            {/* 1. Buscador */}
            <Reveal direction="left" delay={0}>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-heading font-bold text-sm uppercase text-brand-dark mb-2.5 flex items-center justify-between">
                  <span>Buscar Pieza</span>
                  <Search className="w-4 h-4 text-brand-yellow" />
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Part Number, CAT, bomba..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-brand-dark"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </Reveal>

            {/* 2. Categorías (Acordeón) */}
            <Reveal direction="left" delay={0.08}>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCategoryAccordionOpen(!isCategoryAccordionOpen)}
                  className="w-full flex items-center justify-between font-heading font-bold text-sm uppercase text-brand-dark mb-1.5"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-blue" />
                    Categorías
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoryAccordionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCategoryAccordionOpen && (
                  <div className="space-y-1 pt-1.5">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-brand-blue text-white font-bold'
                          : 'text-brand-dark hover:bg-slate-100'
                      }`}
                    >
                      <span>Todas las Familias</span>
                      <span className="text-[11px] opacity-75">{PRODUCTS_DATA.length}</span>
                    </button>
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const count = PRODUCTS_DATA.filter((p) => p.category === cat.name).length;
                      const isSelected = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-xs sm:text-sm flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-brand-blue text-white font-bold'
                              : 'text-brand-gray hover:text-brand-dark hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-[11px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Reveal>

            {/* 3. Marcas de Maquinaria */}
            <Reveal direction="left" delay={0.16}>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsBrandAccordionOpen(!isBrandAccordionOpen)}
                  className="w-full flex items-center justify-between font-heading font-bold text-sm uppercase text-brand-dark mb-1.5"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-brand-yellow" />
                    Marcas Principales
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isBrandAccordionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isBrandAccordionOpen && (
                  <div className="space-y-1 pt-1.5 max-h-36 overflow-y-auto">
                    <button
                      onClick={() => setSelectedBrand('all')}
                      className={`w-full text-left px-3 py-1 rounded text-xs transition-colors ${
                        selectedBrand === 'all'
                          ? 'text-brand-blue font-bold'
                          : 'text-brand-gray hover:text-brand-dark'
                      }`}
                    >
                      • Todas las Marcas
                    </button>
                    {BRANDS_LIST.map((brand, bIdx) => (
                      <button
                        key={bIdx}
                        onClick={() => setSelectedBrand(brand)}
                        className={`w-full text-left px-3 py-1 rounded text-xs transition-colors truncate ${
                          selectedBrand === brand
                            ? 'text-brand-blue font-bold bg-brand-light'
                            : 'text-brand-gray hover:text-brand-dark'
                        }`}
                      >
                        • {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* 4. Bloque "Más Vendidos" en Sidebar */}
            <Reveal direction="left" delay={0.24} className="hidden sm:block">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-heading font-bold text-sm uppercase text-brand-dark mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-yellow" />
                  Más Vendidos
                </h3>

                <div className="space-y-3">
                  {bestsellers.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setQuickViewProduct(item)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-xs uppercase text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-brand-gray truncate">SKU: {item.sku}</p>
                        <span className="text-xs font-bold text-brand-blue block">
                          {item.price ? `$${item.price.toLocaleString('es-ES')}` : 'Cotizar'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Botón de limpiar filtros */}
            {(search || selectedCategory !== 'all' || selectedBrand !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleResetFilters}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                Limpiar Filtros
              </Button>
            )}
          </aside>

          {/* GRILLA DE ARTÍCULOS (9 columnas en desktop) */}
          <div className="lg:col-span-9">
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
              /* GRILLA DE 3 COLUMNAS CON TRANSICIÓN LIMPIA ENTRE PÁGINAS */
              <AnimatePresence mode="wait">
                <motion.div
                  key={`page-${safePage}-${selectedCategory}-${selectedBrand}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
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
                        initial={{ opacity: 0, y: 44, scale: 0.91 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.14, margin: '-30px 0px -30px 0px' }}
                        transition={{
                          duration: 0.58,
                          delay: (idx % 3) * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="bg-white rounded-2xl border border-slate-200 hover:border-brand-blue/40 shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                      >
                        {/* Cabecera de la tarjeta con imagen y tag */}
                        <div>
                          <div className="relative h-48 bg-slate-100 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Tag badge (Nuevo / Más vendido / Oferta) */}
                            {product.tag && (
                              <div className="absolute top-3 left-3">
                                <Badge variant={tagVariant} size="sm">
                                  {product.tag}
                                </Badge>
                              </div>
                            )}

                            {/* Botón flotante de Vista Rápida */}
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(product)}
                              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-brand-dark flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors shadow-sm"
                              title="Ver ficha técnica"
                              aria-label={`Ver detalle rápido de ${product.name}`}
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Rating estrellas */}
                            <div className="absolute bottom-2.5 left-3 bg-brand-navy/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-white flex items-center gap-1 font-bold">
                              <Star className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
                              <span>{product.rating || '5.0'}</span>
                            </div>
                          </div>

                          {/* Cuerpo de la tarjeta */}
                          <div className="p-5">
                            <div className="flex items-center justify-between text-xs text-brand-gray mb-1">
                              <span className="font-heading uppercase font-semibold text-brand-blue">
                                {product.brand}
                              </span>
                              <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">
                                {product.sku}
                              </span>
                            </div>

                            <h3
                              onClick={() => setQuickViewProduct(product)}
                              className="font-heading font-extrabold text-lg uppercase text-brand-dark hover:text-brand-blue transition-colors cursor-pointer line-clamp-2 leading-tight min-h-[44px]"
                            >
                              {product.name}
                            </h3>

                            {/* Compatibilidad resumida */}
                            <div className="mt-3 flex flex-wrap gap-1">
                              {product.compatibility.slice(0, 2).map((comp, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[10px] bg-brand-light text-brand-gray px-2 py-0.5 rounded font-medium"
                                >
                                  {comp}
                                </span>
                              ))}
                              {product.compatibility.length > 2 && (
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                  +{product.compatibility.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Pie de la tarjeta: Precio y Botón de Cotización por WhatsApp */}
                        <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                          <div className="flex items-baseline justify-between my-3">
                            <span className="text-xs text-brand-gray">Precio estimado:</span>
                            {product.price ? (
                              <span className="font-heading font-extrabold text-xl text-brand-dark">
                                ${product.price.toLocaleString('es-ES')} USD
                              </span>
                            ) : (
                              <span className="font-heading font-bold text-xs uppercase bg-amber-50 text-amber-800 px-2 py-1 rounded border border-amber-200">
                                Precio bajo cotización
                              </span>
                            )}
                          </div>

                          {/* Botón "Cotizar por WhatsApp" o "Consultar a Futuro" */}
                          <Button
                            href={getProductWhatsAppLink(product.name, product.sku)}
                            isExternal
                            variant={isUpcoming ? 'secondary' : 'primary'}
                            size="sm"
                            className="w-full"
                            icon={<WhatsAppIcon className="w-4 h-4" />}
                            iconPosition="left"
                          >
                            {isUpcoming ? 'Consultar a Futuro' : 'Cotizar por WhatsApp'}
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
                {quickViewProduct.compatibility.map((c, i) => (
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
    </section>
  );
};
