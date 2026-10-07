import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'blue' | 'navy' | 'red' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'yellow',
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    yellow: 'bg-brand-yellow text-brand-navy font-bold shadow-sm',
    blue: 'bg-brand-blue text-white font-semibold',
    navy: 'bg-brand-navy text-brand-yellow font-semibold',
    red: 'bg-red-600 text-white font-bold',
    outline: 'border border-brand-blue text-brand-blue bg-white/80',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider',
    md: 'text-xs px-3 py-1 tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-heading rounded-md ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
