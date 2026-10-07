import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { router } from './router';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="never">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </MotionConfig>
    </HelmetProvider>
  );
};

export default App;
