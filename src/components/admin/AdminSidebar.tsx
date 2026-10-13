import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Package,
  PlusCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export type AdminTab = 'profile' | 'articles' | 'new-article';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  totalProductsCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  totalProductsCount,
}) => {
  const { user, profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : 'Valeria Lares';

  const menuItems: {
    id: AdminTab;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'profile',
      label: 'Mi Perfil',
      description: 'Datos personales y clave',
      icon: User,
    },
    {
      id: 'articles',
      label: 'Gestión de Artículos',
      description: 'Ver, editar y eliminar piezas',
      icon: Package,
      badge: totalProductsCount,
      badgeColor: 'bg-brand-yellow text-slate-900',
    },
    {
      id: 'new-article',
      label: 'Agregar Artículos',
      description: 'Crear nuevo artículo con WebP',
      icon: PlusCircle,
      badge: 'Nuevo',
      badgeColor: 'bg-emerald-500 text-white',
    },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-5 bg-brand-navy text-slate-100">
      <div>
        {/* ========================================================
            CONTENEDOR DEL LOGO CON ALTO CONTRASTE (Fondo blanco nítido)
           ======================================================== */}
        <div className="mb-6">
          <div className="bg-white p-3.5 rounded-2xl shadow-md border border-white/20 flex items-center justify-center group transition-all">
            <img
              src="/images/logo.png"
              alt="Valle Logistics Logo"
              className="h-12 w-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-3 px-2 flex items-center justify-between text-xs">
            <span className="font-heading font-black tracking-widest uppercase text-brand-yellow text-[10px]">
              PANEL ADMINISTRATIVO
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Tarjeta de identificación del Administrador */}
        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800/80 mb-6 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-yellow to-amber-500 text-slate-900 font-heading font-black text-lg flex items-center justify-center shrink-0 shadow-sm">
            {profile?.first_name ? profile.first_name.charAt(0).toUpperCase() : 'V'}
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-heading font-bold text-xs uppercase text-white truncate block">
              {displayName}
            </span>
            <span className="text-[11px] text-slate-400 truncate block">
              {user?.email || 'admin@vallelogistics.com'}
            </span>
          </div>
        </div>

        {/* ========================================================
            MÓDULOS DE NAVEGACIÓN LATERAL
           ======================================================== */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
            Módulos del Sistema
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-lg ring-1 ring-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-white/20 text-brand-yellow shadow-inner'
                        : 'bg-slate-800/80 text-slate-400 group-hover:text-brand-yellow group-hover:bg-slate-700/80'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-heading font-bold text-xs sm:text-sm tracking-tight block truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] truncate block ${
                        isActive ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                </div>

                {item.badge !== undefined ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-2 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-white translate-x-0.5' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          PIE DEL PANEL: SITIO WEB & CERRAR SESIÓN
         ======================================================== */}
      <div className="pt-6 border-t border-slate-800/80 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors border border-slate-800"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-brand-yellow" />
            <span>Ver Sitio Web Público</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </a>

        <button
          type="button"
          onClick={signOut}
          className="w-full p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>

        <p className="text-[10px] text-center text-slate-500 pt-1">
          Valle Logistics &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Barra superior en móviles (con botón de menú hamburguesa) */}
      <div className="md:hidden bg-brand-navy border-b border-slate-800 p-4 flex items-center justify-between text-white sticky top-0 z-30 shadow-md">
        <div className="bg-white px-2.5 py-1 rounded-xl">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Drawer móvil */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 h-full bg-brand-navy shadow-2xl animate-slideRight">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Sidebar fijo en Escritorio (A la izquierda) */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 shrink-0 h-screen sticky top-0 border-r border-slate-800 shadow-xl z-20 overflow-y-auto">
        {sidebarContent}
      </aside>
    </>
  );
};
