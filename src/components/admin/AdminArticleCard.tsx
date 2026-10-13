import React from 'react';
import { DatabaseProduct } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

interface AdminArticleCardProps {
  product: DatabaseProduct;
  onEdit: (product: DatabaseProduct) => void;
  onDelete: (product: DatabaseProduct) => void;
}

export const AdminArticleCard: React.FC<AdminArticleCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const tagVariant =
    product.tag === 'Más vendido'
      ? 'yellow'
      : product.tag === 'Oferta'
      ? 'red'
      : product.tag === 'Destacado'
      ? 'blue'
      : 'blue';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Cabecera Cuadrada de la Tarjeta (Imagen del artículo) */}
        <div className="relative aspect-square bg-slate-100 overflow-hidden border-b border-slate-100">
          <img
            src={product.image || '/images/hero-truck-boxes.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge de Categorización / Tag (Más vendido, Destacado, Oferta, etc.) */}
          {product.tag && (
            <div className="absolute top-3 left-3">
              <Badge variant={tagVariant} size="sm">
                {product.tag}
              </Badge>
            </div>
          )}

          {/* Indicador de si el precio está visible u oculto */}
          <div className="absolute top-3 right-3">
            {product.show_price ? (
              <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                <Eye className="w-3 h-3" />
                <span>Visible</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-slate-800/90 backdrop-blur-sm text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                <EyeOff className="w-3 h-3" />
                <span>Precio Oculto</span>
              </span>
            )}
          </div>

          {/* Categoría flotante inferior */}
          <div className="absolute bottom-2.5 left-3 bg-brand-navy/85 backdrop-blur-sm px-2.5 py-0.5 rounded text-[11px] text-white font-medium max-w-[80%] truncate">
            {product.category}
          </div>
        </div>

        {/* Contenido de la Tarjeta */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-brand-gray mb-1.5">
            <span className="font-heading uppercase font-semibold text-brand-blue truncate max-w-[65%]">
              {product.brand || 'Valle Logistics'}
            </span>
            {product.sku && (
              <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                {product.sku}
              </span>
            )}
          </div>

          <h3 className="font-heading font-extrabold text-base uppercase text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight min-h-[40px]">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Pie de la Tarjeta: Precio y Botones de Acción */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-2">
        <div className="flex items-baseline justify-between my-3">
          <span className="text-[11px] font-semibold text-brand-gray">Precio catálogo:</span>
          {product.show_price && product.price ? (
            <span className="font-heading font-extrabold text-lg text-brand-dark">
              ${Number(product.price).toLocaleString('es-ES')} USD
            </span>
          ) : (
            <span className="font-heading font-bold text-[11px] uppercase bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              Bajo Cotización
            </span>
          )}
        </div>

        {/* Botones de Editar y Eliminar */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="w-full py-2 px-3 rounded-xl bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn"
          >
            <Edit3 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Editar</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/del"
          >
            <Trash2 className="w-3.5 h-3.5 group-hover/del:scale-110 transition-transform" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
