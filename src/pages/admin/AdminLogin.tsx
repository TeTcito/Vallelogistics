import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DEFAULT_ADMIN_ACCOUNT } from '@/config/adminAccount';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
  PackageCheck,
  Globe2,
  KeyRound,
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Si ya está autenticado, redirigir al panel
  useEffect(() => {
    if (user) {
      navigate('/portal-admin', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor ingrese su usuario o correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      await signIn(email.trim(), password);
      navigate('/portal-admin');
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      setErrorMessage(
        err.message || 'Usuario o contraseña incorrectos. Verifique sus datos.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillDefaults = () => {
    setEmail(DEFAULT_ADMIN_ACCOUNT.email);
    setPassword(DEFAULT_ADMIN_ACCOUNT.password);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-950 text-slate-100 selection:bg-brand-yellow selection:text-slate-900">
      {/* ========================================================
          1/4 DE LA PANTALLA: FORMULARIO INDEPENDIENTE DE ACCESO
          (Exclusivamente para Iniciar Sesión, sin registro público)
         ======================================================== */}
      <div className="w-full lg:w-1/4 lg:min-w-[360px] xl:w-1/4 bg-white text-slate-900 flex flex-col justify-between p-6 sm:p-8 lg:p-10 shadow-2xl relative z-10 border-r border-slate-200">
        <div>
          {/* Logo Corporativo */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/images/logo.png"
              alt="Valle Logistics Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Encabezado del Formulario */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Acceso Administrativo Privado</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ingrese con sus credenciales de administración para acceder al panel de Valle Logistics.
            </p>
          </div>

          {/* Alertas de Error */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Formulario de Acceso */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Usuario o Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vallelogistics.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 bg-slate-50/50 text-slate-900 font-medium"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 px-4 bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-yellow" />
                  <span>Ingresando...</span>
                </>
              ) : (
                <>
                  <span>Entrar al Panel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Tarjeta de ayuda con credenciales de acceso directo */}
          <div className="mt-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 flex items-center gap-1.5 text-[11px]">
                <KeyRound className="w-3.5 h-3.5 text-brand-blue" />
                <span>Cuenta Registrada:</span>
              </span>
              <button
                type="button"
                onClick={handleFillDefaults}
                className="text-[11px] font-bold text-brand-blue hover:underline"
              >
                Auto-completar
              </button>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-400">Usuario:</span>
                <span className="font-bold">admin@vallelogistics.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clave:</span>
                <span className="font-bold">valle2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del formulario */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span>Acceso confidencial para administración</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Valle Logistics &copy; {new Date().getFullYear()}. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* ========================================================
          3/4 DE LA PANTALLA: IMAGEN VISUAL DE VALLE LOGISTICS
         ======================================================== */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-slate-950 items-end p-12 xl:p-16">
        <img
          src="/images/service-specialist-banner.jpg"
          alt="Operaciones Valle Logistics"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08] scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 backdrop-blur-md text-brand-yellow text-xs font-bold uppercase tracking-widest">
            <PackageCheck className="w-4 h-4" />
            <span>Sistema Central de Administración</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl xl:text-5xl text-white tracking-tight leading-tight">
            Gestión Inteligente de Repuestos y Logística Pesada
          </h2>

          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            Bienvenida al centro de control de Valle Logistics. Administre el catálogo de repuestos
            para cabezales Actros Mercedes-Benz, maquinaria pesada y orugas en tiempo real con
            sincronización instantánea.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
              <span className="block text-2xl font-black text-brand-yellow font-heading">
                100%
              </span>
              <span className="text-xs text-slate-300 font-medium">Sincronizado</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
              <span className="block text-2xl font-black text-white font-heading">WebP</span>
              <span className="text-xs text-slate-300 font-medium">Ultra Comprimido</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl flex flex-col justify-center">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <Globe2 className="w-4 h-4" /> En Línea
              </span>
              <span className="text-xs text-slate-300 font-medium mt-1">Panel Activo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
