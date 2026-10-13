import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { router } from './router';

import { AuthProvider } from './context/AuthContext';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="never">
        <AuthProvider>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </AuthProvider>
      </MotionConfig>
    </HelmetProvider>
  );
};

export default App;
