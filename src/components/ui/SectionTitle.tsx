import React from 'react';

export interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  isLight?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  isLight = false,
  className = '',
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignClasses[align]} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-1 bg-brand-yellow rounded-full" />
          <span
            className={`font-heading uppercase font-bold tracking-widest text-xs md:text-sm ${
              isLight ? 'text-brand-yellow' : 'text-brand-blue'
            }`}
          >
            {badge}
          </span>
          <span className="w-6 h-1 bg-brand-yellow rounded-full" />
        </div>
      )}

      <h2
        className={`font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-normal leading-tight ${
          isLight ? 'text-white' : 'text-brand-dark'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
            isLight ? 'text-slate-300' : 'text-brand-gray'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
