/**
 * Configuración de la cuenta maestra de administración de Valle Logistics.
 * Permite acceso directo e instantáneo sin depender de verificación por correo de terceros.
 */

export interface AdminAccountData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

export const DEFAULT_ADMIN_ACCOUNT: AdminAccountData = {
  email: 'admin@vallelogistics.com',
  password: 'valle2026',
  firstName: 'Valeria',
  lastName: 'Lares',
  phone: '+593 99 999 9999',
  bio: 'Administradora General de Valle Logistics',
};

const STORAGE_KEY = 'valle_admin_account_credentials';

export function getAdminAccount(): AdminAccountData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_ADMIN_ACCOUNT, ...parsed };
    }
  } catch (e) {
    console.error('Error al leer credenciales:', e);
  }
  return DEFAULT_ADMIN_ACCOUNT;
}

export function saveAdminAccount(data: Partial<AdminAccountData>): AdminAccountData {
  const current = getAdminAccount();
  const updated = { ...current, ...data };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error al guardar credenciales:', e);
  }
  return updated;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const account = getAdminAccount();
  const cleanEmail = email.trim().toLowerCase();
  const accountEmail = account.email.trim().toLowerCase();

  // Permite ingresar con el correo configurado o con el usuario "admin"
  const isEmailMatch = cleanEmail === accountEmail || cleanEmail === 'admin';
  const isPasswordMatch = password === account.password;

  return isEmailMatch && isPasswordMatch;
}
