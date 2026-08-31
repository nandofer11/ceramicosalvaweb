"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import StripeBar from '@/components/ui/StripeBar';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: '¿Hacen envíos a otras regiones del Perú?',
    answer:
      'Actualmente nuestro servicio de entrega está disponible en la región San Martín, ciudades como Rioja, Nueva Cajamarca, Tarapoto, Moyobamba, Naranjos, etc. y zonas aledañas. Contáctanos para más información.',
  },
  {
    question: '¿Por qué sus productos son color claro (blanco)?',
    answer:
      'Las canteras en la zona son de arcilla blanca no roja, los productos que estan bien cocidos son aquellos que presentan color blanco y se lo conoce por el sonido campanoso que tiene.',
  },
  {
    question: '¿Ofrecen descuentos para compras al por mayor?',
    answer:
      'Sí, contamos con precios para compras al por mayor y para proyectos de construcción. El descuento aplica a partir de trailers de +12 millares.',
  },
  {
    question: '¿Tienen servicio de transporte?',
    answer:
      'Sí, contamos con servicio tercerizado de transporte y desestiba para entregas dentro de la región San Martín. El costo del servicio depende de la distancia y el volumen de la compra.',
  },
  {
    question: '¿Qué tipos de productos de arcilla ofrecen?',
    answer:
      'Ofrecemos 3 principales productos, ladrillos pandereta, ladrillos de techo 12, ladrillos King Kong. Puedes consultar nuestra sección de productos para más detalles.',
  },
];

const contactoItems = [
  {
    title: 'Dirección',
    lines: [
      'Carretera Fernando Belaúnde Terry Km. 08',
      'Caserío "Las Delicias"',
      'Rioja, San Martín - Perú',
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    ),
  },
  {
    title: 'Teléfonos',
    lines: ['WhatsApp: +51 970 584 592'],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: 'Correo Electrónico',
    lines: ['ceramicosalva@gmail.com'],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Horario de Atención',
    lines: ['Lunes a Sábados: 8:00 AM - 5:00 PM', 'Domingos: Cerrado'],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

const inputClass =
  'w-full px-4 py-3 border border-concrete-200 bg-concrete-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all duration-300 text-ink placeholder:text-concrete-400';

export default function ContactoPage() {
  const [expandedFaq, setExpandedFaq] = useState(-1);

  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: '',
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: '',
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? -1 : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nombre_completo || !formData.ciudad || !formData.mensaje) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Por favor completa todos los campos obligatorios.',
      });
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: 'Enviando mensaje...',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: result.message,
        });

        setFormData({
          nombre_completo: '',
          email: '',
          telefono: '',
          ciudad: '',
          mensaje: '',
        });
      } else {
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: result.error || 'Ocurrió un error al enviar el mensaje',
        });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Error de conexión. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <MainLayout>
      
      {/* ============ FORMULARIO + INFORMACIÓN ============ */}
      <section id="formulario-contacto" className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative border-2 border-concrete-200 bg-white p-7 md:p-9 clip-corner">
                <StripeBar className="absolute top-0 left-0 right-0 h-1.5" />
                <h2 className="font-display uppercase text-2xl md:text-3xl font-bold text-ink mb-2">
                  Envíanos un mensaje
                </h2>
                <div className="h-1 bg-primary w-16 mb-8" aria-hidden />

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <AnimatePresence>
                    {(formStatus.isSuccess || formStatus.isError) && (
                      <motion.div
                        className={`p-4 border-2 ${
                          formStatus.isSuccess
                            ? 'bg-concrete-50 border-success text-success'
                            : 'bg-concrete-50 border-danger text-danger'
                        }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {formStatus.isSuccess ? (
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{formStatus.message}</p>
                          </div>
                          <div className="ml-auto pl-3">
                            <button
                              type="button"
                              onClick={() =>
                                setFormStatus((prev) => ({
                                  ...prev,
                                  isSuccess: false,
                                  isError: false,
                                }))
                              }
                              className={`inline-flex rounded-none p-1.5 ${
                                formStatus.isSuccess
                                  ? 'text-success hover:bg-concrete-100'
                                  : 'text-danger hover:bg-concrete-100'
                              }`}
                            >
                              <span className="sr-only">Descartar</span>
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor="nombre_completo" className="block text-sm font-semibold text-gray-dark mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre_completo"
                      name="nombre_completo"
                      className={inputClass}
                      placeholder="Tu nombre completo"
                      required
                      value={formData.nombre_completo}
                      onChange={handleInputChange}
                    />
                    <p className="mt-1.5 text-xs text-concrete-400">Ej. Carlos Pérez</p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-dark mb-2">
                      Correo Electrónico <span className="text-xs font-normal text-concrete-400">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={inputClass}
                      placeholder="tu@ejemplo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold text-gray-dark mb-2">
                      Celular / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      className={inputClass}
                      placeholder="Tu celular"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                    <p className="mt-1.5 text-xs text-concrete-400">Ej. 976456345</p>
                  </div>

                  <div>
                    <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-dark mb-2">
                      Ciudad / Distrito
                    </label>
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      className={inputClass}
                      placeholder="Ej. Rioja"
                      required
                      value={formData.ciudad}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-dark mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={5}
                      className={inputClass}
                      placeholder="Escribe tu mensaje aquí..."
                      required
                      value={formData.mensaje}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      fullWidth
                      disabled={formStatus.isSubmitting}
                      loading={formStatus.isSubmitting}
                      iconPosition="right"
                      color="primary"
                      size="lg"
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      }
                    >
                      {formStatus.isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="font-display uppercase text-2xl md:text-3xl font-bold text-ink mb-2">
                  Información de contacto
                </h2>
                <div className="h-1 bg-primary w-16 mb-10" aria-hidden />

                <div className="space-y-8">
                  {contactoItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start gap-5"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display uppercase text-lg font-semibold text-ink mb-1.5 tracking-wide">
                          {item.title}
                        </h3>
                        {item.lines.map((line) => (
                          <p key={line} className="text-concrete-600 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <h3 className="font-display uppercase text-lg font-semibold text-ink mb-4 tracking-wide">
                  Síguenos en redes sociales
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/CeramicosAlva/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 bg-ink text-white flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/ceramicosalva/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 bg-ink text-white flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@ceramicosalva"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-12 h-12 bg-ink text-white flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ MAPA ============ */}
      <section id="mapa-ubicacion" className="py-16 md:py-20 bg-concrete-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Ubicación"
            title="Encuéntranos"
            description="Visita nuestra planta de producción y oficinas"
            align="center"
          />

          <motion.div
            className="mt-12 max-w-5xl mx-auto border-2 border-concrete-200 bg-white p-2 clip-corner"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-[400px] md:h-[500px] w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.787124433171!2d-77.22367672463902!3d-6.023933259156747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6d9c0482e2441%3A0x894b3539fe49736f!2sCer%C3%A1micos%20Alva%20EIRL!5e0!3m2!1ses!2spe!4v1744829204099!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación de Cerámicos Alva"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FAQs ============ */}
      <section id="preguntas-frecuentes" className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              kicker="Dudas comunes"
              title="Preguntas Frecuentes"
              description="Respuestas a las preguntas más comunes sobre nuestros productos y servicios."
              align="center"
            />

            <div className="mt-12 space-y-3">
              {faqs.map((faq, index) => {
                const expanded = expandedFaq === index;
                return (
                  <motion.div
                    key={index}
                    className={`border-2 transition-colors duration-300 ${
                      expanded ? 'border-primary bg-white' : 'border-concrete-200 bg-white hover:border-concrete-300'
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={expanded}
                      className="w-full p-5 sm:p-6 flex justify-between items-center text-left cursor-pointer"
                    >
                      <h3 className={`font-display text-lg sm:text-xl font-semibold leading-tight ${expanded ? 'text-primary' : 'text-ink'}`}>
                        {faq.question}
                      </h3>
                      <span
                        className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          expanded ? 'bg-primary text-white' : 'bg-concrete-100 text-ink'
                        }`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                        >
                          <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-4 border-t-2 border-primary/15">
                            <p className="text-concrete-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-concrete-600 mb-6">¿No encuentras lo que estás buscando?</p>
              <Link href="#formulario-contacto">
                <Button variant="outline" color="primary">
                  Contáctanos directamente
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="llamado-accion" className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden />
        <StripeBar className="absolute top-0 left-0 right-0 h-2" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl leading-[1.02] mb-6">
              ¿Listo para iniciar tu <span className="text-ink">proyecto?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-10">
              Solicita una cotización para iniciar tu construcción.
            </p>
            <Button color="secondary" size="lg">
              <Link href="/cotizacion" className="flex items-center">
                Solicitar cotización
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>

            <div className="mt-14 grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-4xl font-bold">+100</div>
                <div className="text-sm font-light text-white/80">Millares mensual</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold">20+</div>
                <div className="text-sm font-light text-white/80">Años de experiencia</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold">100%</div>
                <div className="text-sm font-light text-white/80">Garantía de calidad</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}