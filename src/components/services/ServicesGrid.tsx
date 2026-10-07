import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_DATA } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';

export const ServicesGrid: React.FC = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* =========================================================================
            BLOQUE SUPERIOR (FILA 1): TEXTO A LA IZQUIERDA + MÁSCARA ORGÁNICA COMPLETA A LA DERECHA
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">
          {/* Columna Izquierda: Titular 4 líneas, párrafo y 2 botones píldora */}
          <div className="lg:col-span-5 xl:col-span-5 relative z-20">
            <div className="max-w-md">
              <Reveal direction="left" distance={42}>
                <h1 className="font-heading font-black text-4xl sm:text-5xl xl:text-[54px] leading-[1.08] tracking-tight">
                  <span className="block text-brand-yellow-hover">24/7</span>
                  <span className="block text-brand-navy mt-1">Importaciones</span>
                  <span className="block text-brand-navy mt-1">y Logística en</span>
                  <span className="block mt-1">
                    <span className="text-brand-yellow-hover">La </span>
                    <span className="text-brand-navy">Que </span>
                    <span className="text-brand-yellow-hover">Confías</span>
                  </span>
                </h1>
              </Reveal>

              <Reveal direction="blur" delay={0.12}>
                <p className="text-brand-gray text-sm sm:text-[15px] leading-relaxed mt-6 text-justify">
                  Coordinamos todo el proceso de compra internacional de maquinaria, repuestos y
                  mercancías, brindando gestión aduanera y acompañamiento seguro hasta la entrega
                  final.
                </p>
              </Reveal>

              {/* Botones Píldora */}
              <Reveal direction="up" delay={0.22} distance={24}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappQuoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-brand-yellow-hover via-brand-yellow to-[#F59E0B] text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_-4px_rgba(229,164,11,0.45)] hover:shadow-[0_12px_25px_-4px_rgba(229,164,11,0.6)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Llamar Ahora
                  </a>

                  <a
                    href="#proceso-logistico"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/85 hover:bg-white text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide border border-brand-yellow-hover/45 hover:border-brand-navy/40 shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Ver Proceso
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Columna Derecha: Especialistas supervisando maquinaria pesada con brazo hidráulico sobresaliente en 3D */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end relative z-10">
            <Reveal direction="zoom-in" delay={0.1} className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[650px]">
                <svg
                  viewBox="105 40 875 795"
                  className="w-full h-auto block select-none overflow-visible drop-shadow-[0_18px_38px_rgba(6,27,75,0.08)]"
                  role="img"
                  aria-label="Especialistas de Valle Logistics inspeccionando y dirigiendo maquinaria pesada de importación"
                >
                  <defs>
                    {/* Degradado de la cinta curva superior: Amarillo/Ámbar en la izquierda -> Azul Marino en la derecha y base */}
                    <linearGradient id="topRibbonGrad" x1="12%" y1="35%" x2="88%" y2="75%">
                      <stop offset="0%" stopColor="#FDB913" />
                      <stop offset="38%" stopColor="#E5A40B" />
                      <stop offset="65%" stopColor="#0A3D91" />
                      <stop offset="90%" stopColor="#061B4B" />
                    </linearGradient>

                    {/* Máscara de recorte orgánica CERRADA al 100% para la fotografía superior derecha */}
                    <clipPath id="topPhotoClip">
                      <path d="M 475, 248 C 565, 240, 685, 224, 785, 232 C 880, 242, 932, 338, 928, 495 C 924, 638, 888, 728, 782, 752 C 655, 780, 450, 782, 300, 758 C 178, 738, 138, 665, 154, 545 C 168, 440, 192, 348, 252, 302 C 308, 262, 388, 258, 475, 248 Z" />
                    </clipPath>

                    {/* Recorte superior para que el brazo hidráulico de la máquina sobresalga limpiamente por encima de la curva */}
                    <clipPath id="topHelmetPopOutClip">
                      <rect x="420" y="35" width="440" height="240" />
                    </clipPath>
                  </defs>

                  {/* 1. Cinta curva exterior CERRADA (Forma orgánica completa sin cortes rectos) */}
                  <path
                    d="M 470, 218 C 565, 210, 690, 192, 802, 200 C 908, 212, 966, 322, 962, 495 C 958, 655, 916, 764, 796, 792 C 660, 825, 445, 826, 288, 798 C 148, 774, 102, 688, 120, 550 C 136, 430, 164, 326, 230, 274 C 294, 230, 382, 226, 470, 218 Z"
                    fill="url(#topRibbonGrad)"
                  />

                  {/* 2. Refuerzo de onda superior derecha en Azul Marino corporativo */}
                  <path
                    d="M 470, 218 C 565, 210, 690, 192, 802, 200 C 895, 210, 952, 295, 960, 420 L 925, 425 C 918, 315, 868, 240, 785, 232 C 685, 224, 565, 240, 475, 248 Z"
                    fill="#061B4B"
                  />

                  {/* 3. Fotografía principal recortada dentro de la forma orgánica cerrada */}
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

                  {/* 4. Efecto 3D Pop-Out: La parte superior del brazo de la máquina sobresale sobre el borde curvo */}
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
            BLOQUE INFERIOR (FILA 2): MÁSCARA ORGÁNICA COMPLETA A LA IZQUIERDA + TEXTO A LA DERECHA
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6 mt-6 lg:-mt-14 xl:-mt-20">
          {/* Columna Izquierda: Especialista con máscara orgánica cerrada 360° */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start relative z-10 order-2 lg:order-1">
            <Reveal direction="diagonal-left" delay={0.1} className="w-full flex justify-center lg:justify-start">
              <div className="w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[590px]">
                <svg
                  viewBox="20 25 785 940"
                  className="w-full h-auto block select-none drop-shadow-[0_18px_38px_rgba(6,27,75,0.08)]"
                  role="img"
                  aria-label="Especialista de Valle Logistics supervisando componentes y repuestos"
                >
                  <defs>
                    {/* Degradado de la onda inferior izquierda: Amarillo/Ámbar arriba -> Azul Marino en la derecha y base */}
                    <linearGradient id="bottomRibbonGrad" x1="12%" y1="10%" x2="84%" y2="88%">
                      <stop offset="0%" stopColor="#FDB913" />
                      <stop offset="38%" stopColor="#E5A40B" />
                      <stop offset="66%" stopColor="#0A3D91" />
                      <stop offset="92%" stopColor="#061B4B" />
                    </linearGradient>

                    {/* Máscara de recorte orgánica CERRADA al 100% para la fotografía inferior izquierda */}
                    <clipPath id="bottomPhotoClip">
                      <path d="M 265, 96 C 365, 96, 450, 162, 550, 220 C 665, 286, 742, 388, 746, 525 C 750, 668, 675, 802, 555, 860 C 435, 916, 270, 912, 175, 838 C 88, 770, 72, 648, 80, 505 C 88, 360, 110, 235, 165, 158 C 198, 112, 228, 96, 265, 96 Z" />
                    </clipPath>

                    {/* Recorte para que la parte superior del casco blanco sobresalga sutilmente sobre el borde interior */}
                    <clipPath id="bottomHelmetPopOutClip">
                      <rect x="180" y="40" width="420" height="260" />
                    </clipPath>
                  </defs>

                  {/* 1. Cinta curva exterior CERRADA (Forma orgánica completa sin cortes rectos en izquierda ni abajo) */}
                  <path
                    d="M 255, 36 C 368, 36, 458, 115, 568, 178 C 698, 252, 788, 368, 792, 525 C 796, 688, 712, 840, 580, 904 C 448, 966, 255, 958, 145, 875 C 48, 800, 28, 662, 38, 500 C 48, 340, 72, 200, 132, 112 C 170, 58, 206, 36, 255, 36 Z"
                    fill="url(#bottomRibbonGrad)"
                  />

                  {/* 2. Reborde interior plateado en media luna suave (sin escalones, fundiéndose hacia los lados) */}
                  <path
                    d="M 262, 72 C 366, 72, 452, 145, 550, 220 C 665, 286, 742, 388, 746, 525 C 750, 668, 675, 802, 555, 860 C 435, 916, 270, 912, 175, 838 C 88, 770, 62, 645, 68, 498 C 75, 350, 96, 220, 152, 140 C 186, 90, 220, 72, 262, 72 Z"
                    fill="#D5DCE6"
                  />

                  {/* 3. Fotografía recortada dentro de la forma orgánica cerrada */}
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

                  {/* 4. Sutil superposición del casco blanco sobre el reborde plateado */}
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

          {/* Columna Derecha: Titular combinando grosores, párrafo, 2 botones píldora y pie con correo + círculos */}
          <div className="lg:col-span-6 xl:col-span-6 lg:pl-8 xl:pl-14 relative z-20 order-1 lg:order-2">
            <div className="max-w-lg">
              <Reveal direction="right" distance={42}>
                <h2 className="font-heading text-3xl sm:text-4xl xl:text-[44px] leading-[1.14] tracking-tight text-brand-navy">
                  <span className="block font-medium">Soluciones en</span>
                  <span className="block mt-1">
                    <span className="font-black text-brand-yellow-hover">Comercio </span>
                    <span className="font-normal text-brand-navy">para Tu</span>
                  </span>
                  <span className="block font-black text-brand-navy mt-1">
                    Operación Continua.
                  </span>
                </h2>
              </Reveal>

              <Reveal direction="blur" delay={0.12}>
                <p className="text-brand-gray text-sm sm:text-[15px] leading-relaxed mt-5 max-w-md text-justify">
                  Nos encargamos de la búsqueda y negociación con proveedores globales, transporte
                  multimodal, desaduanaje ágil y suministro de maquinaria y repuestos de alto
                  rendimiento.
                </p>
              </Reveal>

              {/* Botones Píldora Inferiores */}
              <Reveal direction="up" delay={0.22} distance={24}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappVisitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-brand-yellow-hover via-brand-yellow to-[#F59E0B] text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_-4px_rgba(229,164,11,0.45)] hover:shadow-[0_12px_25px_-4px_rgba(229,164,11,0.6)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Agendar Asesoría
                  </a>

                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/85 hover:bg-white text-brand-navy font-heading font-extrabold text-xs sm:text-sm tracking-wide border border-brand-yellow-hover/45 hover:border-brand-navy/40 shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Solicitar Cotización
                  </Link>
                </div>
              </Reveal>

              {/* Detalle Inferior Derecho: Correo corporativo + Círculos superpuestos */}
              <Reveal direction="scale" delay={0.3}>
                <div className="mt-12 sm:mt-16 pt-4 flex items-center justify-end gap-4">
                  <a
                    href={`mailto:${COMPANY_DATA.email}`}
                    className="text-xs sm:text-sm text-brand-gray/75 hover:text-brand-navy font-medium tracking-wide transition-colors"
                  >
                    {COMPANY_DATA.email}
                  </a>

                  <div className="flex items-center" aria-hidden="true">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-yellow shadow-xs" />
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-yellow-hover -ml-2.5 shadow-xs" />
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-400/80 ml-2" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
