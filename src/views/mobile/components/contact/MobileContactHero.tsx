import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

export const MobileContactHero: React.FC = () => {
  return (
    <section className="relative pt-16 sm:pt-20 pb-36 sm:pb-44 bg-[#071C47] overflow-hidden">
      <img
        src="/images/contact-hero-advisor.jpg"
        alt="Asesoría comercial y atención al cliente de Valle Logistics and Import"
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{ objectPosition: 'center calc(20% - 20px)' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#061B4B]/90 via-[#082461]/82 to-[#061B4B]/78"
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <Reveal direction="down">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Contáctanos
          </h1>
        </Reveal>
        <Reveal direction="blur" delay={0.12}>
          <p className="mt-3 text-sm text-slate-200/95 font-normal leading-relaxed max-w-lg mx-auto">
            Valle Logistics está listo para brindarte la solución adecuada de acuerdo a tus necesidades
          </p>
        </Reveal>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-14 bg-white pointer-events-none"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        aria-hidden="true"
      />
    </section>
  );
};

export default MobileContactHero;
