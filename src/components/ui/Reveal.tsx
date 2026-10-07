import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export type RevealDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'scale'
  | 'zoom-in'
  | 'blur'
  | 'flip-up'
  | 'diagonal-left'
  | 'diagonal-right';

export interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  amount?: number;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.72,
  distance = 58,
  className = '',
  amount = 0.16,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount,
    margin: '-40px 0px -40px 0px',
  });

  let initialX = 0;
  let initialY = 0;
  let initialScale = 1;
  let initialRotateX = 0;
  let initialFilter = 'blur(0px)';

  switch (direction) {
    case 'up':
      initialY = distance;
      initialScale = 0.96;
      initialFilter = 'blur(3px)';
      break;
    case 'down':
      initialY = -distance;
      initialScale = 0.96;
      initialFilter = 'blur(3px)';
      break;
    case 'left':
      initialX = -distance * 1.15;
      initialScale = 0.97;
      initialFilter = 'blur(3px)';
      break;
    case 'right':
      initialX = distance * 1.15;
      initialScale = 0.97;
      initialFilter = 'blur(3px)';
      break;
    case 'scale':
      initialScale = 0.84;
      initialY = 34;
      initialFilter = 'blur(4px)';
      break;
    case 'zoom-in':
      initialScale = 0.76;
      initialFilter = 'blur(8px)';
      break;
    case 'blur':
      initialY = 40;
      initialScale = 0.94;
      initialFilter = 'blur(10px)';
      break;
    case 'flip-up':
      initialY = 46;
      initialScale = 0.9;
      initialRotateX = 28;
      initialFilter = 'blur(3px)';
      break;
    case 'diagonal-left':
      initialX = -distance;
      initialY = distance * 0.8;
      initialScale = 0.94;
      break;
    case 'diagonal-right':
      initialX = distance;
      initialY = distance * 0.8;
      initialScale = 0.94;
      break;
  }

  const hiddenState = {
    opacity: 0,
    x: initialX,
    y: initialY,
    scale: initialScale,
    rotateX: initialRotateX,
    filter: initialFilter,
    transition: {
      duration: 0.42,
      delay: 0,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  };

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={isInView ? visibleState : hiddenState}
      className={className}
      style={direction === 'flip-up' ? { transformPerspective: 1000 } : undefined}
    >
      {children}
    </motion.div>
  );
};

