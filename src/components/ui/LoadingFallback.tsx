import React from 'react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-blue border-t-transparent animate-spin" />
      </div>
      <p className="font-heading uppercase font-bold text-sm tracking-wider text-brand-navy">
        Cargando Valle Logistics...
      </p>
    </div>
  );
};
