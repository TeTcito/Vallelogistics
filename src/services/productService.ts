import { supabase, DatabaseProduct } from '@/lib/supabase';
import { PRODUCTS_DATA } from '@/data/products';

const LOCAL_PRODUCTS_KEY = 'valle_custom_products_registry';

export function getLocalProducts(): DatabaseProduct[] {
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (raw) {
      const parsed: DatabaseProduct[] = JSON.parse(raw);
      let hadInvalidBlobs = false;
      const sanitized = parsed.map((p) => {
        // Los URLs "blob:" expiran al recargar la pestaña del navegador
        if (p.image && p.image.startsWith('blob:')) {
          hadInvalidBlobs = true;
          return {
            ...p,
            image: '/images/hero-truck-boxes.png',
          };
        }
        return p;
      });
      if (hadInvalidBlobs) {
        saveLocalProducts(sanitized);
      }
      return sanitized;
    }
  } catch (e) {
    console.error('Error al leer productos locales:', e);
  }
  return [];
}

export function saveLocalProducts(products: DatabaseProduct[]): void {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error al guardar productos locales:', e);
  }
}

export async function fetchAllProducts(): Promise<DatabaseProduct[]> {
  const localList = getLocalProducts();

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Si tenemos productos locales modificados que no se hayan reflejado aún en la nube, los combinamos
      const remoteMap = new Map<string, DatabaseProduct>();
      data.forEach((p: DatabaseProduct) => remoteMap.set(p.id, p));

      // Sobrescribir con locales más recientes si existen
      const pendingSync: DatabaseProduct[] = [];
      localList.forEach((local) => {
        const existingRemote = remoteMap.get(local.id);
        if (!existingRemote) {
          pendingSync.push(local);
        }
        remoteMap.set(local.id, local);
      });

      // Intentar sincronizar en segundo plano productos que solo están en local
      if (pendingSync.length > 0) {
        setTimeout(() => {
          syncPendingLocalProducts().catch(() => {});
        }, 1000);
      }

      return Array.from(remoteMap.values()).sort((a, b) => {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return timeB - timeA;
      });
    }
  } catch (err) {
    console.warn('Aviso al conectar con Supabase, usando respaldo local:', err);
  }

  // Si la base remota no respondió o está vacía, usar local o inicial
  if (localList.length > 0) {
    return localList.sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    });
  }

  // Convertir PRODUCTS_DATA a DatabaseProduct
  // Asignar fechas base anteriores para que cualquier artículo creado recientemente aparezca primero
  const basePastTime = Date.now() - 1000 * 60 * 60 * 24 * 30; // 30 días atrás
  return PRODUCTS_DATA.map((p, idx) => ({
    id: p.id,
    name: p.name,
    description: p.description || null,
    price: p.price ?? null,
    show_price: p.showPrice ?? (p.price !== undefined),
    image: p.image || null,
    tag: p.tag || null,
    category: p.category,
    subcategory: p.subcategory || null,
    brand: p.brand || 'Valle Logistics',
    sku: p.sku || null,
    compatibility: p.compatibility || [],
    rating: p.rating || 5,
    stock_status: p.stockStatus || 'Disponible',
    created_at: new Date(basePastTime + idx * 60000).toISOString(),
    updated_at: new Date().toISOString(),
  })).reverse();
}

export async function syncPendingLocalProducts(): Promise<{
  total: number;
  synced: number;
  failed: number;
  rlsBlocked: boolean;
}> {
  const localList = getLocalProducts();
  if (localList.length === 0) {
    return { total: 0, synced: 0, failed: 0, rlsBlocked: false };
  }

  let synced = 0;
  let failed = 0;
  let rlsBlocked = false;

  for (const prod of localList) {
    try {
      const { error } = await supabase
        .from('products')
        .upsert(prod, { onConflict: 'id' });

      if (!error) {
        synced++;
      } else {
        failed++;
        if (error.code === '42501' || error.message.toLowerCase().includes('policy')) {
          rlsBlocked = true;
        }
        console.warn('Sincronización pendiente falló:', prod.name, error.message);
      }
    } catch {
      failed++;
    }
  }

  return { total: localList.length, synced, failed, rlsBlocked };
}

export async function checkCloudWritable(): Promise<{ writable: boolean; reason?: string }> {
  try {
    const probeId = '__rls_probe__';
    const { error } = await supabase.from('products').upsert(
      {
        id: probeId,
        name: 'Probe',
        category: 'Llantas',
        compatibility: [],
        rating: 5,
        stock_status: 'Disponible',
        show_price: false,
      },
      { onConflict: 'id' }
    );

    if (error) {
      if (error.code === '42501' || error.message.toLowerCase().includes('policy')) {
        return {
          writable: false,
          reason: 'Bloqueado por Row-Level Security (RLS) en Supabase (error 42501).',
        };
      }
      return { writable: false, reason: error.message };
    }

    // Limpiar el registro sonda
    await supabase.from('products').delete().eq('id', probeId);
    return { writable: true };
  } catch (err: any) {
    return { writable: false, reason: err.message };
  }
}

export async function persistProduct(product: DatabaseProduct): Promise<{
  success: boolean;
  cloudSynced: boolean;
  cloudError?: string;
}> {
  // Asegurar fecha de creación para ordenación correcta
  if (!product.created_at) {
    product.created_at = new Date().toISOString();
  }
  product.updated_at = new Date().toISOString();

  // 1. Guardar en almacenamiento local para respuesta instantánea
  const currentList = getLocalProducts();
  const index = currentList.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    currentList[index] = product;
  } else {
    currentList.unshift(product);
  }

  // Mantener ordenado siempre por más reciente primero
  currentList.sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });

  saveLocalProducts(currentList);

  // 2. Intentar guardar en Supabase
  let cloudSynced = false;
  let cloudError: string | undefined;

  try {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'id' });

    if (error) {
      cloudError = error.message;
      console.warn('Nota sobre sincronización en Supabase:', error.message);
    } else {
      cloudSynced = true;
    }
  } catch (err: any) {
    cloudError = err.message || 'Error de red con Supabase';
    console.warn('Aviso al sincronizar en la nube:', err);
  }

  return { success: true, cloudSynced, cloudError };
}

export async function removeProduct(id: string): Promise<void> {
  // 1. Remover de local
  const currentList = getLocalProducts().filter((p) => p.id !== id);
  saveLocalProducts(currentList);

  // 2. Intentar remover de Supabase
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.warn('Nota sobre borrado en Supabase:', error.message);
    }
  } catch (err) {
    console.warn('Aviso al borrar en la nube:', err);
  }
}
