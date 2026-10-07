import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { ScrollToTop } from './ScrollToTop';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark selection:bg-brand-yellow selection:text-brand-navy">
      <ScrollToTop />
      <TopBar />
      <Header />

      <main className="flex-1 flex flex-col relative overflow-x-clip" id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
              transitionEnd: { transform: 'none' },
            }}
            exit={{
              opacity: 0,
              y: -16,
              transition: { duration: 0.3, ease: [0.645, 0.045, 0.355, 1] },
            }}
            className="flex-1 flex flex-col"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
