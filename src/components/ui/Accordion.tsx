import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [items[0]?.id || '']
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`border rounded-brand transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-brand-blue/40 bg-white shadow-card'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-heading font-bold text-lg text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <span className={`transition-colors ${isOpen ? 'text-brand-blue' : 'text-brand-dark'}`}>
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`p-1.5 rounded-full flex-shrink-0 ${
                  isOpen ? 'bg-brand-blue text-white' : 'bg-brand-light text-brand-gray'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: { height: { duration: 0.3 }, opacity: { duration: 0.25, delay: 0.05 } },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { height: { duration: 0.25 }, opacity: { duration: 0.2 } },
                  }}
                >
                  <div className="px-5 pb-5 pt-1 text-brand-gray text-base leading-relaxed border-t border-slate-100">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
