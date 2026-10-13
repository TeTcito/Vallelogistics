import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut, ExternalLink, User as UserIcon, Shield } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: 'profile' | 'articles';
  setActiveTab: (tab: 'profile' | 'articles') => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, profile, signOut } = useAuth();

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'Administrador';

  return (
    <header className="bg-brand-navy border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo y título de sección */}
          <div className="flex items-center gap-4">
            <a href="/portal-admin" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Valle Logistics Logo"
                className="h-11 w-auto object-contain brightness-105"
              />
              <div className="hidden sm:block border-l border-slate-700 pl-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block">
                  Panel de Administración
                </span>
                <span className="text-xs text-slate-300">Valle Logistics</span>
              </div>
            </a>
          </div>

          {/* Navegación por pestañas */}
          <nav className="flex items-center gap-2 sm:gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserIcon className="w-4 h-4 text-brand-yellow" />
              <span>Mi Perfil</span>
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'articles'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-4 h-4 text-brand-yellow" />
              <span>Gestión de Artículos</span>
            </button>
          </nav>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-white leading-tight">
                {displayName}
              </span>
              <span className="text-[11px] text-slate-400">{user?.email}</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Abrir sitio web público"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="hidden sm:inline">Ver Sitio Web</span>
            </a>

            <button
              onClick={signOut}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-xs font-semibold flex items-center gap-1.5 border border-red-500/20 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
