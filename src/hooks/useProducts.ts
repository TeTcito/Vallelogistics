import { useState, useEffect, useCallback } from 'react';
import { supabase, DatabaseProduct } from '@/lib/supabase';
import { Product, ProductTag } from '@/types';
import { PRODUCTS_DATA } from '@/data/products';
import { fetchAllProducts } from '@/services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mapDbProductToProduct = (dbProd: DatabaseProduct): Product => {
    return {
      id: dbProd.id,
      name: dbProd.name,
      category: dbProd.category,
      subcategory: dbProd.subcategory || 'General',
      brand: 'Valle Logistics',
      sku: dbProd.sku || `VL-${dbProd.id.slice(0, 6)}`,
      image:
        dbProd.image && !dbProd.image.startsWith('blob:')
          ? dbProd.image
          : '/images/hero-truck-boxes.png',
      compatibility:
        Array.isArray(dbProd.compatibility) && dbProd.compatibility.length > 0
          ? dbProd.compatibility
          : [],
      tag: (dbProd.tag as ProductTag) || undefined,
      price: dbProd.show_price && dbProd.price ? Number(dbProd.price) : undefined,
      showPrice: dbProd.show_price,
      rating: dbProd.rating ? Number(dbProd.rating) : 5,
      description: dbProd.description || undefined,
      stockStatus:
        (dbProd.stock_status as
          | 'Disponible'
          | 'Bajo pedido'
          | 'Consultar'
          | 'Próximamente') || 'Disponible',
      createdAt: dbProd.created_at || undefined,
    };
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllProducts();
      if (data && data.length > 0) {
        setProducts(data.map(mapDbProductToProduct));
      } else {
        setProducts(PRODUCTS_DATA);
      }
    } catch (err: any) {
      console.error('Error al sincronizar productos:', err);
      setError(err.message || 'Error al conectar con la base de datos');
      setProducts(PRODUCTS_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // Suscripción en tiempo real a cambios en la tabla products
    const channel = supabase
      .channel('public:products:changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
  };
}
