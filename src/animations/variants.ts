import { Variants } from 'framer-motion';

// Easing estándar suave
export const easeOutCubic = [0.215, 0.61, 0.355, 1];
export const easeInOutCubic = [0.645, 0.045, 0.355, 1];

// Transición entre páginas (fade + vertical 24px -> 0, salida 16px)
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.3,
      ease: easeInOutCubic,
    },
  },
};

// Variantes por elemento
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: easeOutCubic,
    },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: easeOutCubic,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeOutCubic,
    },
  },
};

// Contenedores escalonados
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

// Formas diagonales del Hero
export const diagonalSlide: Variants = {
  hidden: { opacity: 0, x: 80, skewX: -12 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: -12,
    transition: {
      duration: 0.8,
      ease: easeOutCubic,
    },
  },
};
