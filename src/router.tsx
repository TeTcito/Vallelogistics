import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoadingFallback } from '@/components/ui/LoadingFallback';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';

// Carga perezosa de rutas públicas
const HomePage = lazy(() => import('@/pages/Home'));
const ServicesPage = lazy(() => import('@/pages/Services'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/Contact'));

// Carga perezosa de rutas del panel de administración (completamente independientes)
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboard'));

export const router = createBrowserRouter(
  [
    // ==========================================
    // RUTAS PÚBLICAS (Con MainLayout, Header, Footer)
    // ==========================================
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: 'servicios',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ServicesPage />
            </Suspense>
          ),
        },
        {
          path: 'productos',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ProductsPage />
            </Suspense>
          ),
        },
        {
          path: 'nosotros',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <AboutPage />
            </Suspense>
          ),
        },
        {
          path: 'contacto',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ContactPage />
            </Suspense>
          ),
        },
      ],
    },

    // ==========================================
    // RUTA DE LOGIN INDEPENDIENTE
    // (Sin Header ni Footer públicos, acceso exclusivo por link directo)
    // ==========================================
    {
      path: '/portal-admin/login',
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <AdminLoginPage />
        </Suspense>
      ),
    },
    {
      path: '/admin/login',
      element: <Navigate to="/portal-admin/login" replace />,
    },

    // ==========================================
    // RUTAS PROTEGIDAS DEL PANEL DE ADMINISTRACIÓN
    // ==========================================
    {
      path: '/portal-admin',
      element: <AdminProtectedRoute />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboardPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/admin',
      element: <Navigate to="/portal-admin" replace />,
    },

    // Ruta comodín para 404
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
