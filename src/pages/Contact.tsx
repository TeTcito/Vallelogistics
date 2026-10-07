import React from 'react';
import { SEO } from '@/components/ui/SEO';
import { Reveal } from '@/components/ui/Reveal';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactMapSection } from '@/components/contact/ContactMapSection';

export const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Contáctanos - Cotizaciones y Asesoría"
        description="Póngase en contacto con Valle Logistics and Import en Cuenca, Ecuador. Cotice importación de maquinaria, repuestos de carga pesada y logística internacional."
      />

      {/* =========================================================================
          1. PRIMERA SECCIÓN: HERO DE CONTACTO CON CORTE DIAGONAL INFERIOR
          ========================================================================= */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-40 sm:pb-48 lg:pb-56 bg-[#071C47] overflow-hidden">
        {/* Fotografía de fondo con asesora comercial */}
        <img
          src="/images/contact-hero-advisor.jpg"
          alt="Asesoría comercial y atención al cliente de Valle Logistics and Import"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ objectPosition: 'center calc(20% - 20px)' }}
        />

        {/* Superposición azul marino corporativa */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#061B4B]/90 via-[#082461]/82 to-[#061B4B]/78"
          aria-hidden="true"
        />

        {/* Contenido central: Título + Subtítulo en 2 líneas */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal direction="down">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-white tracking-tight leading-tight">
              Contáctanos
            </h1>
          </Reveal>
          <Reveal direction="blur" delay={0.12}>
            <p className="mt-4 text-sm sm:text-base lg:text-[17px] text-slate-200/95 font-normal leading-relaxed max-w-lg mx-auto">
              Valle Logistics está listo para brindarte la solución adecuada de acuerdo a tus
              necesidades
            </p>
          </Reveal>
        </div>

        {/* Corte diagonal inferior blanco (inclinado de izquierda a derecha como en la referencia) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-14 sm:h-20 lg:h-24 bg-white pointer-events-none"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden="true"
        />
      </section>

      {/* =========================================================================
          2. SEGUNDA SECCIÓN: TARJETA FLOTANTE (PONTE EN CONTACTO + ENVÍANOS UN MENSAJE)
          ========================================================================= */}
      <ContactFormSection />

      {/* =========================================================================
          3. TERCERA SECCIÓN: MAPA A ANCHO COMPLETO
          ========================================================================= */}
      <ContactMapSection />
    </div>
  );
};

export default Contact;
