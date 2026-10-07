import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoadingFallback } from '@/components/ui/LoadingFallback';

// Carga perezosa de rutas (React.lazy + Suspense)
const HomePage = lazy(() => import('@/pages/Home'));
const ServicesPage = lazy(() => import('@/pages/Services'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/Contact'));

export const router = createBrowserRouter(
  [
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
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
