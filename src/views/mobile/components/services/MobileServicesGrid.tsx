import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_DATA } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';

export const MobileServicesGrid: React.FC = () => {
  const whatsappQuoteUrl = `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
    'Hola Valle Logistics, deseo cotizar una importación / servicio logístico.'
  )}`;

  const whatsappVisitUrl = `https://wa.me/${COMPANY_DATA.whatsappNumber}?text=${encodeURIComponent(
    'Hola Valle Logistics, deseo agendar una asesoría personalizada en comercio exterior y maquinaria.'
  )}`;

  return (
    <section
      id="catalogo-servicios"
      className="relative bg-[#F7F8FB] overflow-hidden pt-[20px] pb-10 sm:pb-14 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative">
        {/* =========================================================================
            BLOQUE SUPERIOR (APARTADO 1): TEXTO A LA IZQUIERDA + IMAGEN A LA DERECHA
            ========================================================================= */}
        <div className="grid grid-cols-2 items-center gap-3 sm:gap-6">
          {/* Columna Izquierda: Titular, párrafo y 2 botones píldora */}
          <div className="relative z-20">
            <Reveal direction="left" distance={20}>
              <h1 className="font-heading font-black text-[16px] xs:text-[17.5px] sm:text-2xl leading-[1.14] tracking-tight">
                <span className="block text-brand-yellow-hover text-[12.5px] xs:text-[14px] sm:text-base font-black">24/7</span>
                <span className="block text-brand-navy">Importaciones</span>
                <span className="block text-brand-navy">y Logística en</span>
                <span className="block">
                  <span className="text-brand-yellow-hover">La </span>
                  <span className="text-brand-navy">Que </span>
                  <span className="text-brand-yellow-hover">Confías</span>
                </span>
              </h1>
            </Reveal>

            <Reveal direction="blur" delay={0.08}>
              <p className="text-brand-gray text-[10.5px] xs:text-[11.5px] sm:text-sm leading-relaxed mt-2 text-justify sm:text-left">
                Coordinamos todo el proceso de importación de maquinaria, repuestos y gestión aduanera con respaldo integral hasta la entrega.
              </p>
            </Reveal>

            {/* Botones Píldora */}
            <Reveal direction="up" delay={0.16} distance={15}>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-yellow-hover via-brand-yellow to-[#F59E0B] text-brand-navy font-heading font-extrabold text-[10px] sm:text-xs tracking-wide shadow-xs active:scale-95 transition-all"
                >
                  Llamar Ahora
                </a>

                <a
                  href="#proceso-logistico"
                  className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-brand-navy font-heading font-bold text-[9.5px] sm:text-xs border border-brand-yellow-hover/40 shadow-2xs active:scale-95 transition-all"
                >
                  Ver Proceso
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna Derecha: Especialistas supervisando maquinaria pesada con ribbon 3D */}
          <div className="flex justify-center items-center relative z-10">
            <Reveal direction="zoom-in" delay={0.1} className="w-full flex justify-center">
              <div className="w-full max-w-[185px] sm:max-w-[260px]">
                <svg
                  viewBox="105 40 875 795"
                  className="w-full h-auto block select-none overflow-visible drop-shadow-[0_10px_22px_rgba(6,27,75,0.08)]"
                  role="img"
                  aria-label="Especialistas de Valle Logistics inspeccionando y dirigiendo maquinaria pesada de importación"
                >
                  <defs>
                    {/* Degradado de la cinta curva superior */}
                    <linearGradient id="topRibbonGrad" x1="12%" y1="35%" x2="88%" y2="75%">
                      <stop offset="0%" stopColor="#FDB913" />
                      <stop offset="38%" stopColor="#E5A40B" />
                      <stop offset="65%" stopColor="#0A3D91" />
                      <stop offset="90%" stopColor="#061B4B" />
                    </linearGradient>

                    {/* Máscara de recorte orgánica CERRADA */}
                    <clipPath id="topPhotoClip">
                      <path d="M 475, 248 C 565, 240, 685, 224, 785, 232 C 880, 242, 932, 338, 928, 495 C 924, 638, 888, 728, 782, 752 C 655, 780, 450, 782, 300, 758 C 178, 738, 138, 665, 154, 545 C 168, 440, 192, 348, 252, 302 C 308, 262, 388, 258, 475, 248 Z" />
                    </clipPath>

                    {/* Recorte superior brazo hidráulico pop-out */}
                    <clipPath id="topHelmetPopOutClip">
                      <rect x="420" y="35" width="440" height="240" />
                    </clipPath>
                  </defs>

                  {/* 1. Cinta curva exterior */}
                  <path
                    d="M 470, 218 C 565, 210, 690, 192, 802, 200 C 908, 212, 966, 322, 962, 495 C 958, 655, 916, 764, 796, 792 C 660, 825, 445, 826, 288, 798 C 148, 774, 102, 688, 120, 550 C 136, 430, 164, 326, 230, 274 C 294, 230, 382, 226, 470, 218 Z"
                    fill="url(#topRibbonGrad)"
                  />

                  {/* 2. Refuerzo de onda en azul marino */}
                  <path
                    d="M 470, 218 C 565, 210, 690, 192, 802, 200 C 895, 210, 952, 295, 960, 420 L 925, 425 C 918, 315, 868, 240, 785, 232 C 685, 224, 565, 240, 475, 248 Z"
                    fill="#061B4B"
                  />

                  {/* 3. Fotografía principal recortada */}
                  <g clipPath="url(#topPhotoClip)">
                    <image
                      href="/images/services-showcase-top.jpg"
                      x="45"
                      y="40"
                      width="930"
                      height="767"
                      preserveAspectRatio="none"
                    />
                  </g>

                  {/* 4. Efecto 3D Pop-Out */}
                  <g clipPath="url(#topHelmetPopOutClip)">
                    <image
                      href="/images/services-showcase-top-cutout.png"
                      x="45"
                      y="40"
                      width="930"
                      height="767"
                      preserveAspectRatio="none"
                    />
                  </g>
                </svg>
              </div>
            </Reveal>
          </div>
        </div>

        {/* =========================================================================
            BLOQUE INFERIOR (APARTADO 2): IMAGEN A LA IZQUIERDA + TEXTO A LA DERECHA
            ========================================================================= */}
        <div className="grid grid-cols-2 items-center gap-3 sm:gap-6 mt-7 sm:mt-10 pt-4 border-t border-slate-200/60 sm:border-0">
          {/* Columna Izquierda: Especialista con máscara orgánica */}
          <div className="flex justify-center items-center relative z-10">
            <Reveal direction="zoom-in" delay={0.1} className="w-full flex justify-center">
              <div className="w-full max-w-[175px] sm:max-w-[240px]">
                <svg
                  viewBox="20 25 785 940"
                  className="w-full h-auto block select-none drop-shadow-[0_10px_22px_rgba(6,27,75,0.08)]"
                  role="img"
                  aria-label="Especialista de Valle Logistics supervisando componentes y repuestos"
                >
                  <defs>
                    {/* Degradado de la onda inferior izquierda */}
                    <linearGradient id="bottomRibbonGrad" x1="12%" y1="10%" x2="84%" y2="88%">
                      <stop offset="0%" stopColor="#FDB913" />
                      <stop offset="38%" stopColor="#E5A40B" />
                      <stop offset="66%" stopColor="#0A3D91" />
                      <stop offset="92%" stopColor="#061B4B" />
                    </linearGradient>

                    {/* Máscara de recorte orgánica */}
                    <clipPath id="bottomPhotoClip">
                      <path d="M 265, 96 C 365, 96, 450, 162, 550, 220 C 665, 286, 742, 388, 746, 525 C 750, 668, 675, 802, 555, 860 C 435, 916, 270, 912, 175, 838 C 88, 770, 72, 648, 80, 505 C 88, 360, 110, 235, 165, 158 C 198, 112, 228, 96, 265, 96 Z" />
                    </clipPath>

                    {/* Recorte pop-out del casco blanco */}
                    <clipPath id="bottomHelmetPopOutClip">
                      <rect x="180" y="40" width="420" height="260" />
                    </clipPath>
                  </defs>

                  {/* 1. Cinta curva exterior */}
                  <path
                    d="M 255, 36 C 368, 36, 458, 115, 568, 178 C 698, 252, 788, 368, 792, 525 C 796, 688, 712, 840, 580, 904 C 448, 966, 255, 958, 145, 875 C 48, 800, 28, 662, 38, 500 C 48, 340, 72, 200, 132, 112 C 170, 58, 206, 36, 255, 36 Z"
                    fill="url(#bottomRibbonGrad)"
                  />

                  {/* 2. Reborde interior plateado */}
                  <path
                    d="M 262, 72 C 366, 72, 452, 145, 550, 220 C 665, 286, 742, 388, 746, 525 C 750, 668, 675, 802, 555, 860 C 435, 916, 270, 912, 175, 838 C 88, 770, 62, 645, 68, 498 C 75, 350, 96, 220, 152, 140 C 186, 90, 220, 72, 262, 72 Z"
                    fill="#D5DCE6"
                  />

                  {/* 3. Fotografía recortada */}
                  <g clipPath="url(#bottomPhotoClip)">
                    <image
                      href="/images/services-showcase-bottom.jpg"
                      x="0"
                      y="10"
                      width="820"
                      height="930"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>

                  {/* 4. Pop-Out del casco */}
                  <g clipPath="url(#bottomHelmetPopOutClip)">
                    <image
                      href="/images/services-showcase-bottom-cutout.png"
                      x="0"
                      y="10"
                      width="820"
                      height="930"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                </svg>
              </div>
            </Reveal>
          </div>

          {/* Columna Derecha: Titular, párrafo, 2 botones píldora y pie con correo */}
          <div className="relative z-20">
            <Reveal direction="right" distance={20}>
              <h2 className="font-heading text-[16px] xs:text-[17.5px] sm:text-2xl leading-[1.14] tracking-tight text-brand-navy font-black">
                <span className="block font-medium text-brand-navy">Soluciones en</span>
                <span className="block">
                  <span className="font-black text-brand-yellow-hover">Comercio </span>
                  <span className="font-normal text-brand-navy">para Tu</span>
                </span>
                <span className="block font-black text-brand-navy">
                  Operación Continua.
                </span>
              </h2>
            </Reveal>

            <Reveal direction="blur" delay={0.08}>
              <p className="text-brand-gray text-[10.5px] xs:text-[11.5px] sm:text-sm leading-relaxed mt-2 text-justify sm:text-left">
                Búsqueda con proveedores globales, transporte multimodal y desaduanaje ágil de repuestos de alto rendimiento.
              </p>
            </Reveal>

            {/* Botones Píldora Inferiores */}
            <Reveal direction="up" delay={0.16} distance={15}>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <a
                  href={whatsappVisitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-yellow-hover via-brand-yellow to-[#F59E0B] text-brand-navy font-heading font-extrabold text-[10px] sm:text-xs tracking-wide shadow-xs active:scale-95 transition-all"
                >
                  Agendar Cita
                </a>

                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-brand-navy font-heading font-bold text-[9.5px] sm:text-xs border border-brand-yellow-hover/40 shadow-2xs active:scale-95 transition-all"
                >
                  Contacto
                </Link>
              </div>
            </Reveal>

            {/* Detalle Inferior: Correo corporativo + Círculos superpuestos */}
            <Reveal direction="scale" delay={0.24}>
              <div className="mt-3 sm:mt-4 pt-1.5 flex items-center justify-between sm:justify-start gap-2 border-t border-slate-200/60">
                <a
                  href={`mailto:${COMPANY_DATA.email}`}
                  className="text-[9.5px] sm:text-xs text-brand-gray/80 hover:text-brand-navy font-medium truncate"
                >
                  {COMPANY_DATA.email}
                </a>

                <div className="flex items-center shrink-0" aria-hidden="true">
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-brand-yellow" />
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-brand-yellow-hover -ml-1 sm:-ml-1.5" />
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-400/80 ml-1" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileServicesGrid;
