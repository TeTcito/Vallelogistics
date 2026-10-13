import React, { useState, useRef } from 'react';
import { DatabaseProduct, supabase } from '@/lib/supabase';
import { persistProduct } from '@/services/productService';
import {
  compressAndConvertToWebP,
  CompressionResult,
  formatFileSize,
} from '@/utils/imageCompressor';
import {
  UploadCloud,
  X,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  DollarSign,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminArticleFormProps {
  initialProduct?: DatabaseProduct | null;
  onSaved: () => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  'Repuestos y accesorios para Actros - Mercedes Benz',
  'Repuestos para Maquinaria',
  'Llantas',
  'Logística y Repuestos Generales',
];

const TAG_OPTIONS = [
  { value: '', label: 'Sin etiqueta' },
  { value: 'Más vendido', label: '🔥 Más vendido' },
  { value: 'Destacado', label: '⭐ Destacado' },
  { value: 'Oferta', label: '🏷️ Oferta' },
  { value: 'Nuevo', label: '✨ Nuevo' },
];

export const AdminArticleForm: React.FC<AdminArticleFormProps> = ({
  initialProduct,
  onSaved,
  onCancel,
}) => {
  const isEditing = Boolean(initialProduct);

  // Valores iniciales
  const defaultValues = {
    name: initialProduct?.name || '',
    description: initialProduct?.description || '',
    category:
      initialProduct?.category ||
      'Repuestos y accesorios para Actros - Mercedes Benz',
    tag: initialProduct?.tag || '',
    price: initialProduct?.price !== null && initialProduct?.price !== undefined
      ? String(initialProduct.price)
      : '',
    show_price: initialProduct?.show_price ?? true,
    image: initialProduct?.image || '',
  };

  // Estados del formulario
  const [name, setName] = useState(defaultValues.name);
  const [description, setDescription] = useState(defaultValues.description);
  const [category, setCategory] = useState(defaultValues.category);
  const [tag, setTag] = useState(defaultValues.tag);
  const [price, setPrice] = useState(defaultValues.price);
  const [showPrice, setShowPrice] = useState(defaultValues.show_price);
  const [currentImageUrl, setCurrentImageUrl] = useState(defaultValues.image);

  // Estados de imagen y compresión WebP
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados de guardado y feedback
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Detección precisa de si el usuario ha realizado modificaciones
  const hasChanges =
    name.trim() !== defaultValues.name.trim() ||
    description.trim() !== defaultValues.description.trim() ||
    category !== defaultValues.category ||
    tag !== defaultValues.tag ||
    price.trim() !== defaultValues.price.trim() ||
    showPrice !== defaultValues.show_price ||
    compressionResult !== null;

  // Manejar selección y compresión inmediata a WebP
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setErrorMessage(null);

      // Comprimir y transformar a WebP directamente en el navegador
      const result = await compressAndConvertToWebP(file, 1200, 1200, 0.78);
      setCompressionResult(result);
      setCurrentImageUrl(result.previewUrl);
    } catch (err: any) {
      console.error('Error al procesar la imagen:', err);
      setErrorMessage(
        err.message || 'Error al convertir la imagen a formato WebP optimizado.'
      );
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemoveImage = () => {
    setCompressionResult(null);
    setCurrentImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('El título del artículo es obligatorio.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      let finalImageUrl = currentImageUrl;

      // 1. Si hay una nueva imagen comprimida a WebP, subir a Supabase Storage
      if (compressionResult) {
        const uniqueId = initialProduct?.id || `art-${Date.now()}`;
        const fileName = `${uniqueId}-${Date.now()}.webp`;

        // Respaldo permanente local en WebP base64 (nunca expira como un blob)
        finalImageUrl = compressionResult.base64DataUrl || compressionResult.previewUrl;

        try {
          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, compressionResult.file, {
              contentType: 'image/webp',
              upsert: true,
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from('product-images')
              .getPublicUrl(fileName);
            if (publicUrlData?.publicUrl) {
              finalImageUrl = publicUrlData.publicUrl;
            }
          } else {
            console.warn(
              'Nota: Supabase Storage aún no tiene el bucket "product-images" configurado. Se guardó respaldo optimizado WebP.',
              uploadError.message
            );
          }
        } catch (storageErr) {
          console.warn('Aviso al subir imagen a Supabase Storage:', storageErr);
        }
      }

      // 2. Preparar el payload del artículo
      const parsedPrice = price.trim() === '' ? null : parseFloat(price);

      const productPayload: Partial<DatabaseProduct> = {
        name: name.trim(),
        description: description.trim() || null,
        category,
        tag: tag || null,
        price: parsedPrice,
        show_price: showPrice,
        image: finalImageUrl || null,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && initialProduct) {
        const fullProduct: DatabaseProduct = {
          ...initialProduct,
          ...productPayload,
        } as DatabaseProduct;
        await persistProduct(fullProduct);
      } else {
        const newProduct: DatabaseProduct = {
          id: `prod-${Date.now()}`,
          brand: 'Valle Logistics',
          sku: `VL-${Math.floor(1000 + Math.random() * 9000)}`,
          stock_status: 'Disponible',
          rating: 5.0,
          compatibility: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...productPayload,
        } as DatabaseProduct;
        await persistProduct(newProduct);
      }

      onSaved();
    } catch (err: any) {
      console.error('Error al guardar artículo:', err);
      setErrorMessage(
        err.message || 'Ocurrió un error al guardar los datos del artículo.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 animate-fadeIn">
      {/* Cabecera del Formulario */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-1">
            {isEditing ? 'Modo Edición' : 'Nuevo Registro'}
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
            {isEditing ? `Editar: ${initialProduct?.name}` : 'Agregar Nuevo Artículo'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete o modifique los campos distribuidos en las tres columnas de control.
          </p>
        </div>

        {/* =========================================================================
            BOTONES DE ACCIÓN:
            - Si NO ha hecho cambios: Solo botón "Cancelar".
            - Si ha hecho cambios: Botones "Guardar cambios" y "Cancelar".
           ========================================================================= */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Cancelar</span>
          </button>

          {hasChanges && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || isCompressing}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60 animate-fadeIn"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-yellow" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-brand-yellow" />
                  <span>{isEditing ? 'Guardar Cambios' : 'Crear Artículo'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Alerta de Error si ocurre */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs sm:text-sm text-red-700 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* =========================================================================
          ESTRUCTURA DE 3 COLUMNAS REQUERIDA:
          - Columna 1: Título, Descripción y Categorización (Más vendido, Destacados, etc.)
          - Columna 2: Subir imagen (Conversión a WebP y compresión máxima)
          - Columna 3: Precio y Botón para ocultar/mostrar precio
         ========================================================================= */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ==================== COLUMNA 1 ==================== */}
        <div className="space-y-5 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <FileText className="w-4 h-4 text-brand-blue" />
              <h3 className="font-heading font-bold text-sm uppercase text-slate-800">
                1. Información Principal
              </h3>
            </div>

            {/* Título del artículo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título del Artículo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Válvula EBS Wabco Actros"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 bg-white font-medium"
              />
            </div>

            {/* Descripción del artículo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descripción del Artículo
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalles técnicos, especificaciones y compatibilidad del componente..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 bg-white resize-y font-medium"
              />
            </div>

            {/* Categorización / Tags (Más vendido, Destacados, etc.) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Etiqueta / Destacado
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TAG_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTag(opt.value)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all border ${
                      tag === opt.value
                        ? 'bg-brand-navy text-brand-yellow border-brand-navy shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categoría general */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Categoría del Catálogo
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-blue bg-white font-medium cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ==================== COLUMNA 2 ==================== */}
        <div className="space-y-5 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <ImageIcon className="w-4 h-4 text-brand-blue" />
              <h3 className="font-heading font-bold text-sm uppercase text-slate-800">
                2. Imagen Optimizada (WebP)
              </h3>
            </div>

            {/* Zona de Carga / Vista previa */}
            <div className="space-y-3">
              {currentImageUrl ? (
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-inner group">
                  <img
                    src={currentImageUrl}
                    alt="Vista previa del artículo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-brand-yellow transition-colors shadow"
                    >
                      Cambiar
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow"
                      title="Quitar imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-brand-blue bg-white flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-100 text-brand-blue flex items-center justify-center mb-3 transition-colors">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <span className="font-heading font-bold text-sm text-slate-800">
                    Haga clic para subir la imagen
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                    JPG, PNG o WEBP. Se optimizará y convertirá automáticamente a WebP de alta fidelidad.
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {/* Indicador de proceso de compresión */}
              {isCompressing && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-brand-blue">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                  <span>Convirtiendo a WebP y comprimiendo en cliente...</span>
                </div>
              )}

              {/* Estadísticas de ahorro y compresión si se cargó una nueva imagen */}
              {compressionResult && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Optimizada para la Base de Datos!</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 flex justify-between pt-1 border-t border-emerald-200/60">
                    <span>Original: {formatFileSize(compressionResult.originalSize)}</span>
                    <span>➔</span>
                    <span className="font-bold">
                      WebP: {formatFileSize(compressionResult.compressedSize)} (-
                      {compressionResult.savingsPercentage}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================== COLUMNA 3 ==================== */}
        <div className="space-y-5 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <DollarSign className="w-4 h-4 text-brand-blue" />
              <h3 className="font-heading font-bold text-sm uppercase text-slate-800">
                3. Precio y Visibilidad
              </h3>
            </div>

            {/* Campo Precio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Precio del Artículo (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 bg-white font-mono font-bold text-slate-800"
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Deje vacío si el precio es variable o solo bajo cotización personalizada.
              </span>
            </div>

            {/* Botón para ocultar o mostrar el precio */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Control de Visibilidad del Precio
              </label>

              <button
                type="button"
                onClick={() => setShowPrice(!showPrice)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                  showPrice
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                    : 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                }`}
              >
                <div
                  className={`p-2 rounded-xl mt-0.5 ${
                    showPrice
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-amber-200 text-amber-800'
                  }`}
                >
                  {showPrice ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="block font-heading font-bold text-sm">
                    {showPrice
                      ? 'Precio Visible al Público'
                      : 'Precio Oculto al Público'}
                  </span>
                  <span className="block text-xs opacity-85 mt-0.5">
                    {showPrice
                      ? 'Los clientes verán el monto en dólares directamente en el catálogo.'
                      : 'El monto no se mostrará; aparecerá el botón "Precio bajo cotización" para invitar al cliente a cotizar por WhatsApp.'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Pie inferior con los botones reflejados también abajo para mayor ergonomía */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Cancelar</span>
        </button>

        {hasChanges && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || isCompressing}
            className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60 animate-fadeIn"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-yellow" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-brand-yellow" />
                <span>{isEditing ? 'Guardar Cambios' : 'Crear Artículo'}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
