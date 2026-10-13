import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { MobileHeader } from './MobileHeader';
import { MobileFooter } from './MobileFooter';
import { MobileNav } from './MobileNav';
import { MobileWhatsAppButton } from './MobileWhatsAppButton';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

export const MobileLayout: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark selection:bg-brand-yellow selection:text-brand-navy">
      <ScrollToTop />
      <TopBar />
      <MobileHeader />

      <main className="flex-1 flex flex-col relative overflow-x-clip" id="mobile-main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
              transitionEnd: { transform: 'none' },
            }}
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.25, ease: [0.645, 0.045, 0.355, 1] },
            }}
            className="flex-1 flex flex-col"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="pb-14">
        <MobileFooter />
      </div>

      <MobileWhatsAppButton />
      <MobileNav />
    </div>
  );
};

export default MobileLayout;
