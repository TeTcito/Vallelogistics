import React, { useState, useEffect, useMemo } from 'react';
import { DatabaseProduct } from '@/lib/supabase';
import {
  fetchAllProducts,
  removeProduct,
  checkCloudWritable,
  syncPendingLocalProducts,
} from '@/services/productService';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { AdminProfileSection } from '@/components/admin/AdminProfileSection';
import { AdminArticleCard } from '@/components/admin/AdminArticleCard';
import { AdminArticleForm } from '@/components/admin/AdminArticleForm';
import {
  Plus,
  Search,
  Package,
  Loader2,
  Trash2,
  X,
  Sparkles,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

export const SQL_SYNC_SCRIPT = `-- 1. Habilitar permisos de lectura y escritura en la tabla de productos
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir todo en products" ON public.products;
CREATE POLICY "Permitir todo en products"
ON public.products
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 2. Habilitar almacenamiento público de fotos de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Permitir todo en product-images" ON storage.objects;
CREATE POLICY "Permitir todo en product-images"
ON storage.objects
FOR ALL
TO anon, authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');`;

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('articles');

  // Estados de Artículos
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Estado de Sincronización en Nube
  const [cloudStatus, setCloudStatus] = useState<{
    checked: boolean;
    writable: boolean;
    reason?: string;
  }>({ checked: false, writable: true });
  const [syncingCloud, setSyncingCloud] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [showSqlModal, setShowSqlModal] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  // Si está editando un artículo desde la lista de 'articles'
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);

  // Modal de confirmación para eliminar
  const [productToDelete, setProductToDelete] = useState<DatabaseProduct | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Verificar estado de la nube
  const verifyCloud = async () => {
    const status = await checkCloudWritable();
    setCloudStatus({ checked: true, writable: status.writable, reason: status.reason });
  };

  // Cargar productos
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const list = await fetchAllProducts();
      setProducts(list);
    } catch (err) {
      console.error('Error cargando productos:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    verifyCloud();
  }, []);

  const handleSyncCloud = async () => {
    try {
      setSyncingCloud(true);
      setSyncFeedback(null);
      const res = await syncPendingLocalProducts();
      await verifyCloud();
      await fetchProducts();

      if (res.rlsBlocked) {
        setSyncFeedback(
          `⚠️ Supabase RLS aún bloquea la escritura. Aplica el script SQL en Supabase para sincronizar ${res.failed} artículo(s).`
        );
      } else if (res.synced > 0) {
        setSyncFeedback(`✅ ¡Éxito! ${res.synced} artículo(s) sincronizados correctamente en la nube.`);
      } else {
        setSyncFeedback('✅ La base de datos en la nube está sincronizada.');
      }
    } catch (err: any) {
      setSyncFeedback(`Error: ${err.message || 'No se pudo sincronizar'}`);
    } finally {
      setSyncingCloud(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SYNC_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filtrado de productos en el panel (Siempre ordenado: los más nuevos primero)
  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSku = p.sku ? p.sku.toLowerCase().includes(query) : false;
        const matchesDesc = p.description
          ? p.description.toLowerCase().includes(query)
          : false;
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      if (categoryFilter !== 'all') {
        if (p.category !== categoryFilter) return false;
      }

      return true;
    });

    // Ordenar siempre los más recientes primero
    return list.sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    });
  }, [products, searchTerm, categoryFilter]);

  // Manejador para editar
  const handleEditProduct = (prod: DatabaseProduct) => {
    setEditingProduct(prod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejador para nuevo producto
  const handleGoToNewArticle = () => {
    setEditingProduct(null);
    setActiveTab('new-article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);

    try {
      await removeProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('No se pudo eliminar el artículo. Intente de nuevo.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col md:flex-row">
      {/* ========================================================
          PANEL A LA IZQUIERDA (Sidebar lateral con módulos y logo contrastado)
         ======================================================== */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setEditingProduct(null);
          setActiveTab(tab);
        }}
        totalProductsCount={products.length}
      />

      {/* ========================================================
          CONTENIDO DEL MÓDULO ACTIVO A LA DERECHA
         ======================================================== */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* MÓDULO 1: MI PERFIL */}
          {activeTab === 'profile' && <AdminProfileSection />}

          {/* MÓDULO 2: GESTIÓN DE ARTÍCULOS */}
          {activeTab === 'articles' && (
            <div className="space-y-8">
              {editingProduct ? (
                /* Modo edición de un artículo existente */
                <AdminArticleForm
                  initialProduct={editingProduct}
                  onSaved={() => {
                    setEditingProduct(null);
                    fetchProducts();
                  }}
                  onCancel={() => setEditingProduct(null)}
                />
              ) : (
                /* Listado de artículos como tarjetitas cuadradas */
                <div className="space-y-6">
                  {/* Cabecera del Módulo */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold mb-2">
                        <Package className="w-3.5 h-3.5" />
                        <span>Catálogo de Productos</span>
                      </div>
                      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        Gestión de Artículos
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                        Tarjetas de repuestos idénticas a la tienda web. Puede editar
                        precios, visibilidad, imágenes y eliminar componentes.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoToNewArticle}
                      className="px-6 py-3 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-slate-900 font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0"
                    >
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                      <span>Agregar Artículo</span>
                    </button>
                  </div>

                  {/* ALERTA DE SINCRONIZACIÓN EN NUBE (RLS) */}
                  {!cloudStatus.writable && cloudStatus.checked && (
                    <div className="bg-amber-50 border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5 animate-fadeIn">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 bg-amber-500/15 text-amber-800 rounded-2xl shrink-0 mt-0.5">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                              Sincronización Nube Bloqueada
                            </span>
                            <span className="text-xs text-amber-800/80 font-medium font-mono">
                              RLS Error 42501
                            </span>
                          </div>
                          <h3 className="font-heading font-extrabold text-base text-slate-900">
                            Los productos nuevos solo se ven en este navegador
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                            Supabase tiene activo Row-Level Security sin política de escritura pública. Los artículos que agregas aquí no llegan a la nube y por eso <strong>no aparecen en móviles ni en otros dispositivos</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-2.5 shrink-0 self-end md:self-auto">
                        <button
                          type="button"
                          onClick={() => setShowSqlModal(true)}
                          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-heading font-bold text-xs uppercase tracking-wide transition-all shadow-sm flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Desbloquear en Supabase (1 min)</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleSyncCloud}
                          disabled={syncingCloud}
                          className="px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-amber-700 ${syncingCloud ? 'animate-spin' : ''}`} />
                          <span>{syncingCloud ? 'Probando...' : 'Reintentar Sync'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FEEDBACK DE SINCRONIZACIÓN */}
                  {syncFeedback && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 px-5 flex items-center justify-between text-xs font-semibold text-brand-navy animate-fadeIn">
                      <span>{syncFeedback}</span>
                      <button
                        type="button"
                        onClick={() => setSyncFeedback(null)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Barra de Filtros y Búsqueda */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
                      <div className="relative w-full sm:w-80">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Buscar por nombre, SKU o descripción..."
                          className="w-full pl-10 pr-8 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue font-medium"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue font-medium bg-white text-slate-700"
                      >
                        <option value="all">Todas las Categorías</option>
                        <option value="Repuestos y accesorios para Actros - Mercedes Benz">
                          Actros - Mercedes Benz
                        </option>
                        <option value="Repuestos para Maquinaria">
                          Repuestos para Maquinaria
                        </option>
                        <option value="Llantas">Llantas</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-500 font-medium self-end sm:self-auto flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleSyncCloud}
                        disabled={syncingCloud}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-blue text-slate-700 hover:text-brand-blue text-[11px] font-bold shadow-2xs transition-colors"
                        title="Subir y sincronizar productos de este navegador con la nube de Supabase"
                      >
                        <RefreshCw className={`w-3 h-3 text-brand-blue ${syncingCloud ? 'animate-spin' : ''}`} />
                        <span>{syncingCloud ? 'Sincronizando...' : 'Sincronizar Nube'}</span>
                      </button>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-brand-blue text-[11px] font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Más recientes primero</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Conexión en la nube activa" />
                        <span>
                          Mostrando{' '}
                          <strong className="text-slate-800 font-bold">
                            {filteredProducts.length}
                          </strong>{' '}
                          de {products.length} artículos
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Listado de Tarjetas Cuadradas */}
                  {loadingProducts ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
                      <Loader2 className="w-10 h-10 animate-spin text-brand-yellow mx-auto" />
                      <p className="font-heading font-bold text-slate-700 uppercase tracking-wider text-sm">
                        Cargando catálogo de artículos...
                      </p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                      <Package className="w-12 h-12 text-slate-300 mx-auto" />
                      <h3 className="font-heading font-bold text-xl text-slate-800 uppercase">
                        No se encontraron artículos
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        No hay artículos con los criterios actuales. Puede restablecer los filtros o
                        crear un nuevo artículo.
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                        >
                          Limpiar Búsqueda
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <AdminArticleCard
                          key={product.id}
                          product={product}
                          onEdit={handleEditProduct}
                          onDelete={(prod) => setProductToDelete(prod)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Banner inferior para agregar artículos */}
                  <div className="pt-6">
                    <div className="bg-gradient-to-r from-blue-900 via-brand-navy to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Expansión del Catálogo</span>
                        </div>
                        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                          Agregar Nuevos Artículos al Catálogo
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                          Suba componentes con imagen WebP comprimida, precio y descripción con sincronización inmediata.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoToNewArticle}
                        className="px-8 py-4 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-slate-900 font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 transition-all shrink-0"
                      >
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                        <span>Agregar Artículos</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 3: AGREGAR ARTÍCULOS (Módulo Independiente) */}
          {activeTab === 'new-article' && (
            <div className="space-y-6 animate-fadeIn">
              <AdminArticleForm
                initialProduct={null}
                onSaved={() => {
                  fetchProducts();
                  setActiveTab('articles');
                }}
                onCancel={() => setActiveTab('articles')}
              />
            </div>
          )}
        </div>
      </main>

      {/* Modal de confirmación para eliminar */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleIn">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              ¿Eliminar este artículo?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              ¿Está segura de que desea eliminar permanentemente{' '}
              <strong className="text-slate-900 font-bold">
                "{productToDelete.name}"
              </strong>{' '}
              del catálogo? Esta acción no se puede deshacer.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <span>Sí, Eliminar Artículo</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Solución SQL para desbloquear Supabase RLS */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scaleIn max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    Desbloquear Sincronización en Supabase
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sigue estos 3 pasos rápidos (toma menos de 1 minuto)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <ol className="list-decimal list-inside space-y-2.5 font-medium">
                <li>
                  Abre tu consola de Supabase en el{' '}
                  <a
                    href="https://supabase.com/dashboard/project/yusllfpksycdjzkmlouk/sql/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-blue font-bold underline inline-flex items-center gap-1"
                  >
                    SQL Editor del Proyecto <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  .
                </li>
                <li>Pega el siguiente código SQL y haz clic en <strong>RUN</strong>.</li>
                <li>Vuelve aquí y haz clic en <strong>Reintentar Sync</strong>. ¡Tus artículos se subirán a la nube de inmediato!</li>
              </ol>

              <div className="relative rounded-2xl bg-slate-900 p-4 pt-3 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner border border-slate-800">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>SQL para Supabase</span>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold transition-colors"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar SQL</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11.5px] leading-relaxed text-blue-200">
                  {SQL_SYNC_SCRIPT}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSqlModal(false);
                  handleSyncCloud();
                }}
                disabled={syncingCloud}
                className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow"
              >
                <RefreshCw className={`w-4 h-4 ${syncingCloud ? 'animate-spin' : ''}`} />
                <span>Ya ejecuté el SQL, Sincronizar Ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
