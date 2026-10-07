import React, { useState } from 'react';
import { Handshake, ThumbsUp, Clock, ChevronDown } from 'lucide-react';
import { COMPANY_DATA, getWhatsAppLink } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';

export const AboutAlliances: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [workType, setWorkType] = useState('');
  const [originOption, setOriginOption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      'Hola Vallelogistics, deseo solicitar una cotización desde la página Nosotros.',
      name ? `• Nombre: ${name}` : '',
      contact ? `• Contacto: ${contact}` : '',
      city ? `• Ciudad / Empresa: ${city}` : '',
      workType ? `• Requerimiento: ${workType}` : '',
      originOption ? `• Modalidad / Origen: ${originOption}` : '',
      description ? `• Descripción del pedido: ${description}` : '',
    ].filter(Boolean);

    window.open(getWhatsAppLink(parts.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cotizar-nosotros" className="pt-8 pb-20 lg:pb-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PARTE 1: FORMULARIO "SOLICITA UNA COTIZACIÓN" ALINEADO ARRIBA CON EL ESPECIALISTA
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-stretch">
          {/* Columna Izquierda: Comienza exactamente a la altura superior de la imagen del especialista */}
          <div className="lg:col-span-8 flex flex-col justify-between pb-6 lg:pb-8">
            <div>
              <Reveal direction="left">
                <div>
                  <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-brand-gray block mb-1.5">
                    COTIZACIÓN PERSONALIZADA
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight">
                    Solicita una Cotización
                  </h2>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Fila 1, Columna 1: Nombre */}
                  <div>
                    <label htmlFor="about-quote-name" className="sr-only">
                      Tu Nombre
                    </label>
                    <input
                      id="about-quote-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu Nombre*"
                      className="w-full rounded-lg bg-[#F4F5F8] border border-transparent focus:border-brand-yellow focus:bg-white px-4 py-3.5 text-xs sm:text-sm text-brand-navy placeholder:text-brand-gray/75 transition-all outline-none"
                    />
                  </div>

                  {/* Fila 1, Columna 2: Correo o WhatsApp */}
                  <div>
                    <label htmlFor="about-quote-contact" className="sr-only">
                      Correo o Teléfono
                    </label>
                    <input
                      id="about-quote-contact"
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Correo o Teléfono*"
                      className="w-full rounded-lg bg-[#F4F5F8] border border-transparent focus:border-brand-yellow focus:bg-white px-4 py-3.5 text-xs sm:text-sm text-brand-navy placeholder:text-brand-gray/75 transition-all outline-none"
                    />
                  </div>

                  {/* Fila 1, Columna 3: Ciudad / Empresa */}
                  <div>
                    <label htmlFor="about-quote-city" className="sr-only">
                      Ciudad o Empresa
                    </label>
                    <input
                      id="about-quote-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad / Empresa"
                      className="w-full rounded-lg bg-[#F4F5F8] border border-transparent focus:border-brand-yellow focus:bg-white px-4 py-3.5 text-xs sm:text-sm text-brand-navy placeholder:text-brand-gray/75 transition-all outline-none"
                    />
                  </div>

                  {/* Fila 2 (3 columnas completas): Bloque de Descripción para detallar repuestos, maquinaria o productos */}
                  <div className="sm:col-span-3">
                    <label htmlFor="about-quote-description" className="sr-only">
                      Descripción de los productos, repuestos o maquinaria a cotizar
                    </label>
                    <textarea
                      id="about-quote-description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descripción de lo que deseas importar o cotizar (repuestos, partes de carga pesada, maquinaria, código de parte, cantidad o requerimientos específicos)..."
                      className="w-full rounded-lg bg-[#F4F5F8] border border-transparent focus:border-brand-yellow focus:bg-white px-4 py-3.5 text-xs sm:text-sm text-brand-navy placeholder:text-brand-gray/75 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Fila 3, Columna 1: Selector de Tipo de Importación */}
                  <div className="relative">
                    <label htmlFor="about-quote-type" className="sr-only">
                      Tipo de Producto o Servicio
                    </label>
                    <select
                      id="about-quote-type"
                      value={workType}
                      onChange={(e) => setWorkType(e.target.value)}
                      className="w-full appearance-none rounded-lg bg-[#F4F5F8] border border-transparent focus:border-brand-yellow focus:bg-white px-4 py-3.5 pr-9 text-xs sm:text-sm text-brand-gray transition-all outline-none"
                    >
                      <option value="">Tipo de Importación / Producto</option>
                      <option value="Maquinaria Pesada">Maquinaria Pesada</option>
                      <option value="Repuestos, Partes y Accesorios">
                        Repuestos, Partes y Accesorios
                      </option>
                      <option value="Productos Multisectoriales">
                        Importación de Todo Tipo de Productos
                      </option>
                      <option value="Búsqueda de Proveedor Internacional">
                        Búsqueda y Negociación con Proveedores
                      </option>
                      <option value="Coordinación Logística y Aduanas">
                        Coordinación Logística y Aduanas
                      </option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-brand-gray absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Fila 3, Columna 2: Selector de Modalidad / Origen */}
                  <div className="relative">
                    <label htmlFor="about-quote-origin" className="sr-only">
                      Origen o Modalidad
                    </label>
                    <select
                      id="about-quote-origin"
                      value={originOption}
                      onChange={(e) => setOriginOption(e.target.value)}
                      className="w-full appearance-none rounded-lg bg-[#F4F5F8] border border-transparent focus:border-brand-yellow focus:bg-white px-4 py-3.5 pr-9 text-xs sm:text-sm text-brand-gray transition-all outline-none"
                    >
                      <option value="">Origen / Modalidad</option>
                      <option value="Importación China - Ecuador">
                        Importación Directa China - Ecuador
                      </option>
                      <option value="Importación Internacional General">
                        Importación Internacional General
                      </option>
                      <option value="Cotización de Repuestos Carga Pesada">
                        Cotización de Repuestos Carga Pesada
                      </option>
                      <option value="Asesoría Integral de Comercio Exterior">
                        Asesoría en Comercio Exterior
                      </option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-brand-gray absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Fila 3, Columna 3: Botón Amarillo de Envío */}
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-heading font-extrabold text-xs sm:text-sm px-5 py-3.5 shadow-xs hover:shadow-md transition-all duration-300"
                    >
                      Obtener Cotización
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>

          {/* Columna Derecha: Especialista alineado arriba con el título y apoyado abajo sobre la tarjeta */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end items-end overflow-hidden">
            <Reveal direction="right" delay={0.15} className="w-full flex justify-center lg:justify-end">
              <img
                src="/images/about-quote-specialist.jpg"
                alt={`Especialista de ${COMPANY_DATA.name} invitando a cotizar su importación`}
                className="w-64 sm:w-72 lg:w-[320px] h-auto lg:h-[360px] object-cover object-top block select-none -mt-4 lg:-mt-6"
              />
            </Reveal>
          </div>
        </div>

        {/* =========================================================================
            PARTE 2: TARJETA INFERIOR "POR QUÉ ELEGIRNOS" (CAJA AMARILLA + 3 BENEFICIOS CON ÍCONO)
            ========================================================================= */}
        <div className="rounded-2xl bg-[#F8F9FB] border border-slate-200/80 shadow-[0_10px_35px_rgba(6,27,75,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Bloque Izquierdo Amarillo */}
          <Reveal direction="diagonal-left" className="lg:col-span-3 flex">
            <div className="w-full bg-brand-yellow p-7 sm:p-8 rounded-2xl flex flex-col justify-center">
              <span className="font-heading font-bold text-[11px] uppercase tracking-[0.18em] text-brand-navy/80 block mb-2">
                CONFIANZA Y RESPALDO
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy leading-[1.15] tracking-tight">
                <span className="block">Por Qué</span>
                <span className="block">Elegirnos</span>
              </h3>
              <p className="text-xs text-brand-navy/85 leading-relaxed mt-3 font-medium">
                Vallelogistics and Import — conectamos oportunidades, movemos tu futuro.
              </p>
            </div>
          </Reveal>

          {/* Bloque Derecho: 3 Columnas con Ícono Lineal Centrado + Título + Texto */}
          <div className="lg:col-span-9 p-7 sm:p-9 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 gap-6 md:gap-0 items-center">
            {/* Ítem 1 */}
            <Reveal direction="flip-up" delay={0.12}>
              <div className="text-center px-2 sm:px-6 pt-2 md:pt-0">
                <div className="w-12 h-12 mx-auto mb-3.5 flex items-center justify-center text-brand-navy">
                  <Handshake className="w-9 h-9 stroke-[1.5]" />
                </div>
                <h4 className="font-heading font-extrabold text-base sm:text-[17px] text-brand-navy">
                  Proveedores Confiables
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed mt-2">
                  Búsqueda, evaluación y negociación directa en China y a nivel internacional.
                </p>
              </div>
            </Reveal>

            {/* Ítem 2 */}
            <Reveal direction="flip-up" delay={0.22}>
              <div className="text-center px-2 sm:px-6 pt-6 md:pt-0">
                <div className="w-12 h-12 mx-auto mb-3.5 flex items-center justify-center text-brand-navy">
                  <ThumbsUp className="w-9 h-9 stroke-[1.5]" />
                </div>
                <h4 className="font-heading font-extrabold text-base sm:text-[17px] text-brand-navy">
                  Atención Personalizada
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed mt-2">
                  Cuidamos cada inversión con responsabilidad, transparencia y costos competitivos.
                </p>
              </div>
            </Reveal>

            {/* Ítem 3 */}
            <Reveal direction="flip-up" delay={0.32}>
              <div className="text-center px-2 sm:px-6 pt-6 md:pt-0">
                <div className="w-12 h-12 mx-auto mb-3.5 flex items-center justify-center text-brand-navy">
                  <Clock className="w-9 h-9 stroke-[1.5]" />
                </div>
                <h4 className="font-heading font-extrabold text-base sm:text-[17px] text-brand-navy">
                  Seguimiento Permanente
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed mt-2">
                  Acompañamiento seguro e información clara durante todo el proceso de importación.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
