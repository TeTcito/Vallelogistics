import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  isExternal?: boolean;
  showArrow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  isExternal = false,
  showArrow = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  // Clases base
  const baseStyles =
    'group inline-flex items-center justify-center font-heading uppercase font-bold tracking-wider transition-all duration-300 rounded-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  // Tamaños
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-4 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-6 py-3 gap-2 min-h-[46px]',
    lg: 'text-base px-8 py-4 gap-2.5 min-h-[54px]',
  };

  // Variantes de color
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover shadow-yellow hover:shadow-lg hover:-translate-y-0.5',
    secondary:
      'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-subtle hover:shadow-card hover:-translate-y-0.5',
    outline:
      'bg-transparent text-brand-navy border-2 border-brand-blue hover:bg-brand-blue hover:text-white',
    white:
      'bg-white text-brand-navy hover:bg-brand-light shadow-card hover:shadow-elevated hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-brand-dark hover:bg-brand-light hover:text-brand-blue',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
