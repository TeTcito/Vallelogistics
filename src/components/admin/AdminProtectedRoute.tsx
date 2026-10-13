import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export const AdminProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-yellow" />
        <p className="font-heading tracking-wider uppercase text-sm text-slate-300">
          Cargando entorno seguro de administración...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal-admin/login" replace />;
  }

  return <Outlet />;
};
