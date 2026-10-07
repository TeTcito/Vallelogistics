import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  PhoneCall,
  Mail,
  MapPin,
  Facebook,
  AlertCircle,
} from 'lucide-react';
import { COMPANY_DATA, getWhatsAppLink } from '@/data/company';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Ingrese su nombre' }),
  company: z.string().optional(),
  phone: z.string().min(7, { message: 'Ingrese un teléfono válido' }),
  email: z.string().email({ message: 'Ingrese un correo electrónico válido' }),
  subject: z.string().min(3, { message: 'Indique el asunto de su consulta' }),
  message: z.string().min(8, { message: 'Por favor escriba su mensaje' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactFormSection: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsLoading(true);

    const lines = [
      'Hola Valle Logistics, les escribo desde el formulario de Contacto:',
      `• Nombre: ${data.name}`,
      data.company ? `• Empresa: ${data.company}` : '',
      `• Teléfono: ${data.phone}`,
      `• Correo: ${data.email}`,
      `• Asunto: ${data.subject}`,
      `• Mensaje: ${data.message}`,
    ].filter(Boolean);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      window.open(getWhatsAppLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
      reset();
    }, 500);
  };

  const inputBaseClass =
    'w-full px-4 py-3 rounded-lg bg-[#F4F6FA] border text-xs sm:text-sm text-brand-navy placeholder:text-slate-400 outline-none transition-all duration-200';

  return (
    <section
      id="formulario-contacto"
      className="relative z-20 -mt-28 sm:-mt-36 lg:-mt-44 pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(6,27,75,0.14)] border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* COLUMNA IZQUIERDA: Ponte en contacto (Get in touch) */}
            <div className="lg:col-span-5 bg-[#F8FAFD] p-7 sm:p-10 lg:p-11 border-b lg:border-b-0 lg:border-r border-slate-200/75 flex flex-col justify-between">
              <div>
                <Reveal direction="left" delay={0.08}>
                  <div>
                    <h2 className="font-heading font-bold text-2xl sm:text-[26px] text-brand-navy tracking-tight">
                      Ponte en contacto
                    </h2>
                    <p className="text-xs sm:text-[13px] text-brand-gray leading-relaxed mt-2.5 text-justify">
                      Estamos listos para asesorarte en la importación de maquinaria, repuestos de
                      carga pesada y logística internacional a tu medida.
                    </p>
                  </div>
                </Reveal>

                {/* Lista de 3 bloques de contacto con íconos circulares azules */}
                <div className="mt-7 space-y-6">
                  {/* 1. Ubicación / Oficina Principal */}
                  <Reveal direction="up" delay={0.14}>
                    <div className="flex items-start gap-4">
                      <a
                        href={COMPANY_DATA.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Ver ubicación en Google Maps"
                        className="w-11 h-11 rounded-full bg-[#1554F0] hover:bg-brand-blue text-white flex items-center justify-center flex-shrink-0 shadow-sm transition-colors"
                      >
                        <MapPin className="w-5 h-5 stroke-[2]" />
                      </a>
                      <div>
                        <h3 className="font-heading font-bold text-[15px] text-brand-navy leading-snug">
                          Oficina Principal
                        </h3>
                        <a
                          href={COMPANY_DATA.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-[13px] text-brand-gray hover:text-[#1554F0] transition-colors mt-0.5 block leading-relaxed"
                        >
                          <span className="block">{COMPANY_DATA.address}</span>
                          <span className="block">
                            {COMPANY_DATA.addressCity} - {COMPANY_DATA.addressCountry}
                          </span>
                        </a>
                      </div>
                    </div>
                  </Reveal>

                  {/* 2. Correo Electrónico */}
                  <Reveal direction="up" delay={0.22}>
                    <div className="flex items-start gap-4">
                      <a
                        href={`mailto:${COMPANY_DATA.email}`}
                        aria-label="Enviar correo electrónico"
                        className="w-11 h-11 rounded-full bg-[#1554F0] hover:bg-brand-blue text-white flex items-center justify-center flex-shrink-0 shadow-sm transition-colors"
                      >
                        <Mail className="w-5 h-5 stroke-[2]" />
                      </a>
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-[15px] text-brand-navy leading-snug">
                          Escríbenos
                        </h3>
                        <a
                          href={`mailto:${COMPANY_DATA.email}`}
                          className="text-xs sm:text-[13px] text-brand-gray hover:text-[#1554F0] transition-colors mt-0.5 block break-all leading-relaxed"
                        >
                          {COMPANY_DATA.email}
                        </a>
                      </div>
                    </div>
                  </Reveal>

                  {/* 3. Teléfonos: Contactos y Cotizaciones */}
                  <Reveal direction="up" delay={0.3}>
                    <div className="flex items-start gap-4">
                      <a
                        href={`tel:${COMPANY_DATA.phone}`}
                        aria-label="Llamar a Valle Logistics"
                        className="w-11 h-11 rounded-full bg-[#1554F0] hover:bg-brand-blue text-white flex items-center justify-center flex-shrink-0 shadow-sm transition-colors"
                      >
                        <PhoneCall className="w-5 h-5 stroke-[2]" />
                      </a>
                      <div>
                        <h3 className="font-heading font-bold text-[15px] text-brand-navy leading-snug">
                          Llámanos
                        </h3>
                        <div className="mt-0.5 space-y-0.5 text-xs sm:text-[13px] text-brand-gray leading-relaxed">
                          <a
                            href={`tel:${COMPANY_DATA.phone}`}
                            className="hover:text-[#1554F0] transition-colors block"
                          >
                            Contactos : {COMPANY_DATA.phoneDisplay}
                          </a>
                          <a
                            href={`tel:${COMPANY_DATA.phoneSecondary}`}
                            className="hover:text-[#1554F0] transition-colors block"
                          >
                            Cotizaciones : {COMPANY_DATA.phoneSecondaryDisplay}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Separador e íconos de Redes Sociales */}
              <Reveal direction="zoom-in" delay={0.36}>
                <div className="pt-7 mt-7 border-t border-slate-200/90">
                  <h4 className="font-heading font-bold text-xs sm:text-[13.5px] text-brand-navy mb-3.5">
                    Síguenos en nuestras redes sociales
                  </h4>
                  <div className="flex items-center gap-2.5">
                    <a
                      href={COMPANY_DATA.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook de Valle Logistics"
                      className="w-9 h-9 rounded-full bg-[#1554F0] hover:bg-brand-navy text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:-translate-y-0.5"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={COMPANY_DATA.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok de Valle Logistics"
                      className="w-9 h-9 rounded-full bg-[#1554F0] hover:bg-brand-navy text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:-translate-y-0.5"
                    >
                      <TikTokIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={COMPANY_DATA.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp de Cotizaciones Valle Logistics"
                      className="w-9 h-9 rounded-full bg-[#1554F0] hover:bg-brand-navy text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:-translate-y-0.5"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* COLUMNA DERECHA: Envíanos un mensaje (Send us a message) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-10 lg:p-11">
              <Reveal direction="right" delay={0.1}>
                <h2 className="font-heading font-bold text-2xl sm:text-[26px] text-brand-navy tracking-tight mb-6">
                  Envíanos un mensaje
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.18}>
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="p-8 bg-blue-50/60 border border-blue-200/80 rounded-2xl text-center space-y-4 my-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#1554F0]/10 text-[#1554F0] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="font-heading font-extrabold text-xl text-brand-navy">
                        ¡Mensaje Enviado con Éxito!
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-gray max-w-md mx-auto leading-relaxed">
                        Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo a la
                        brevedad.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setIsSuccess(false)}
                          className="px-6 py-2.5 rounded-full bg-[#1554F0] hover:bg-brand-blue text-white font-heading font-bold text-xs tracking-wide transition-colors"
                        >
                          Enviar otro mensaje
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                      noValidate
                    >
                      {/* Fila 1: Nombre + Empresa */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-heading font-semibold text-brand-navy mb-1.5"
                          >
                            Nombre
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            {...register('name')}
                            placeholder="Nombre"
                            className={`${inputBaseClass} ${
                              errors.name
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-transparent focus:border-[#1554F0]/40 focus:bg-white'
                            }`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-company"
                            className="block text-xs font-heading font-semibold text-brand-navy mb-1.5"
                          >
                            Empresa
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            {...register('company')}
                            placeholder="Empresa"
                            className={`${inputBaseClass} border-transparent focus:border-[#1554F0]/40 focus:bg-white`}
                          />
                        </div>
                      </div>

                      {/* Fila 2: Teléfono + Correo electrónico */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-heading font-semibold text-brand-navy mb-1.5"
                          >
                            Teléfono
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            {...register('phone')}
                            placeholder="Teléfono"
                            className={`${inputBaseClass} ${
                              errors.phone
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-transparent focus:border-[#1554F0]/40 focus:bg-white'
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-heading font-semibold text-brand-navy mb-1.5"
                          >
                            Correo electrónico
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            {...register('email')}
                            placeholder="Correo electrónico"
                            className={`${inputBaseClass} ${
                              errors.email
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-transparent focus:border-[#1554F0]/40 focus:bg-white'
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Fila 3: Asunto */}
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-xs font-heading font-semibold text-brand-navy mb-1.5"
                        >
                          Asunto
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          {...register('subject')}
                          placeholder="Asunto"
                          className={`${inputBaseClass} ${
                            errors.subject
                              ? 'border-red-400 bg-red-50/30'
                              : 'border-transparent focus:border-[#1554F0]/40 focus:bg-white'
                          }`}
                        />
                        {errors.subject && (
                          <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      {/* Fila 4: Mensaje */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-heading font-semibold text-brand-navy mb-1.5"
                        >
                          Mensaje
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          {...register('message')}
                          placeholder="Mensaje"
                          className={`${inputBaseClass} resize-none ${
                            errors.message
                              ? 'border-red-400 bg-red-50/30'
                              : 'border-transparent focus:border-[#1554F0]/40 focus:bg-white'
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Fila 5: Botón Píldora Azul de ancho completo */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3.5 px-6 rounded-full bg-[#1554F0] hover:bg-brand-blue text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_-4px_rgba(21,84,240,0.45)] hover:shadow-[0_12px_25px_-4px_rgba(21,84,240,0.6)] transition-all duration-300 disabled:opacity-60"
                        >
                          {isLoading ? 'Enviando...' : 'Enviar'}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
