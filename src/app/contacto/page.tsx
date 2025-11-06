"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

import { sendContactForm, sendViaMailto, ContactData } from '@/services/emailService';

export default function ContactoPage() {
  // Variable no utilizada comentada
  // const [activeIndex, setActiveIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(-1);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    formulario: false,
    mapa: false,
    faqs: false,
    cta: false
  });
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });
  
  // Datos de FAQs
  const faqs = [
    {
      question: "¿Hacen envíos a otras regiones del Perú?",
      answer: "Actualmente nuestro servicio de entrega está disponible en la región San Martín, ciudades como Rioja, Nueva Cajamarca, Tarapoto, Moyobamba, Naranjos, etc. y zonas aledañas. Contáctanos para más información."
    },
    {
      question: "¿Por qué sus productos son color claro (blanco)?",
      answer: "Las canteras en la zona son de arcilla blanca no roja, los productos que estan bien cocidos son aquellos que presentan color blanco y se lo conoce por el sonido campanoso que tiene."
    },
    {
      question: "¿Ofrecen descuentos para compras al por mayor?",
      answer: "Sí, contamos con precios para compras al por mayor y para proyectos de construcción. El descuento aplica a partir de trailers de +10 millares."
    },
    {
      question: "¿Tienen servicio de transporte?",
      answer: "Sí, contamos con servicio tercerizado de transporte y desestiba para entregas dentro de la región San Martín. El costo del servicio depende de la distancia y el volumen de la compra."
    },
    {
      question: "¿Qué tipos de productos de arcilla ofrecen?",
      answer: "Ofrecemos 3 principales productos, ladrillos pandereta, ladrillos de techo 12, ladrillos King Kong. Puedes consultar nuestra sección de productos para más detalles."
    }
  ];

  // Efecto para manejar el scroll optimizado
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          
          // Detecta cuando ciertos elementos están en el viewport
          const formulario = document.getElementById('formulario-contacto');
          const mapa = document.getElementById('mapa-ubicacion');
          const faqs = document.getElementById('preguntas-frecuentes');
          const cta = document.getElementById('llamado-accion');
          
          const newVisibility = {
            hero: true, // Siempre visible al inicio
            formulario: formulario ? currentScrollY > formulario.offsetTop - window.innerHeight + 200 : false,
            mapa: mapa ? currentScrollY > mapa.offsetTop - window.innerHeight + 200 : false,
            faqs: faqs ? currentScrollY > faqs.offsetTop - window.innerHeight + 200 : false,
            cta: cta ? currentScrollY > cta.offsetTop - window.innerHeight + 200 : false
          };
          
          // Solo actualizar si hay cambios
          setIsVisible(prev => {
            const hasChanges = Object.keys(newVisibility).some(key => 
              prev[key as keyof typeof prev] !== newVisibility[key as keyof typeof newVisibility]
            );
            
            return hasChanges ? newVisibility : prev;
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Throttle más agresivo
    let lastScrollTime = 0;
    const scrollThrottle = 100; // Aumentado a 100ms
    
    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime >= scrollThrottle) {
        lastScrollTime = now;
        handleScroll();
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Inicializar después de que el DOM esté listo
    const timer = setTimeout(() => {
      handleScroll();
    }, 200);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Función para expandir/colapsar FAQs
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? -1 : index);
  };
  
  // Función para manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar formulario
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Por favor completa todos los campos obligatorios.'
      });
      return;
    }
    
    // Establecer estado de envío
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: 'Enviando mensaje...'
    });
    
    try {
      // Preparar datos para EmailJS
      const contactData: ContactData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: formData.mensaje
      };

      // Intentar enviar con EmailJS
      const result = await sendContactForm(contactData);
      
      if (result.success) {
        // Éxito
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: result.message
        });
        
        // Resetear formulario
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          mensaje: ''
        });
      } else {
        // Error con EmailJS, ofrecer alternativa
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: `${result.message} ¿Deseas enviar por email tradicional?`
        });
        
        // Después de 3 segundos, ofrecer mailto como alternativa
        setTimeout(() => {
          if (window.confirm('¿Deseas abrir tu cliente de email para enviar el mensaje?')) {
            sendViaMailto(contactData, 'contact');
          }
        }, 3000);
      }
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Ocurrió un error al enviar el mensaje. ¿Deseas enviar por email tradicional?'
      });
      
      // Ofrecer mailto como alternativa
      setTimeout(() => {
        if (window.confirm('¿Deseas abrir tu cliente de email para enviar el mensaje?')) {
          const contactData: ContactData = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            telefono: formData.telefono,
            mensaje: formData.mensaje
          };
          sendViaMailto(contactData, 'contact');
        }
      }, 3000);
    }
  };

  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ 
              transform: `scale(1.1) translateY(${scrollY * 0.03}px)` 
            }}
            className="w-full h-full"
          >
            <Image
              src="/images/fachada.jpg"
              alt="Contacto Cerámicos Alva"
              fill
              priority
              className="object-cover object-center"
              style={{ 
                filter: "brightness(0.7)" 
              }}
            />
          </motion.div>
          {/* Overlay con gradiente más elegante */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        </div>
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="relative inline-block">
                Contacto
               
              </span>
            </motion.h1>
            <motion.p 
              className="ext-lg md:text-xl text-white/90 max-w-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Estamos aquí para ayudarte. Contáctanos para resolver tus dudas.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contenido Principal */}
      <section id="formulario-contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            initial="hidden"
            animate={isVisible.formulario ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            {/* Formulario de Contacto */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-xl border border-gray-100"
              variants={scaleUp}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.4 }
              }}
            >
              <motion.h2 
                className="text-2xl font-bold mb-8 relative inline-block text-gray-900"
                variants={fadeInUp}
              >
                Envíanos un mensaje
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-[#FC602E]/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible.formulario ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </motion.h2>
              <motion.form 
                className="space-y-6"
                variants={staggerContainer}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Mensaje de estado del formulario */}
                <AnimatePresence>
                  {(formStatus.isSuccess || formStatus.isError) && (
                    <motion.div
                      className={`p-4 rounded-lg ${formStatus.isSuccess ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {formStatus.isSuccess ? (
                            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{formStatus.message}</p>
                        </div>
                        <div className="ml-auto pl-3">
                          <div className="-mx-1.5 -my-1.5">
                            <button
                              type="button"
                              onClick={() => setFormStatus(prev => ({ ...prev, isSuccess: false, isError: false }))}
                              className={`inline-flex rounded-md p-1.5 ${formStatus.isSuccess ? 'text-green-600 hover:bg-green-100' : 'text-red-600 hover:bg-red-100'}`}
                            >
                              <span className="sr-only">Descartar</span>
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  variants={fadeIn}
                >
                  <motion.div 
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-600 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full px-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                      placeholder="Tu nombre"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-600 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      className="w-full px-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                      placeholder="Tu apellido"
                      required
                      value={formData.apellido}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="tu@ejemplo.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-600 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="w-full px-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="Teléfono de contacto"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </motion.div>
                
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-600 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    className="w-full px-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    value={formData.mensaje}
                    onChange={handleInputChange}
                  ></textarea>
                </motion.div>
                <motion.div 
                  className="pt-2"
                  variants={fadeIn}
                >
                  <Button 
                    type="submit" 
                    fullWidth
                    disabled={formStatus.isSubmitting}
                    loading={formStatus.isSubmitting}
                    iconPosition="right"
                    color="primary"
                    size="lg"
                    className="bg-[#FC602E] hover:bg-[#e55525] text-white py-3"
                    icon={
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    }
                  >
                    {formStatus.isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div 
              className="flex flex-col justify-between"
              variants={staggerContainer}
              transition={{ delayChildren: 0.3 }}
            >
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-gray-800 mb-8 relative inline-block"
                  variants={fadeInUp}
                >
                  Información de contacto
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 bg-[#FC602E]/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={isVisible.formulario ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                </motion.h2>
                
                <motion.div 
                  className="space-y-8"
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="mt-1 bg-primary/10 p-4 rounded-full mr-5"
                      whileHover={{ rotate: 15, scale: 1.1, backgroundColor: "rgba(252, 96, 46, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <motion.svg 
                        className="h-6 w-6 text-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={isVisible.formulario ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, repeat: 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </motion.svg>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible.formulario ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        Dirección
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 font-light"
                        initial={{ opacity: 0 }}
                        animate={isVisible.formulario ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        Carretera Fernando Belaúnde Terry Km. 08<br />
                        Caserío &quot;Las Delicias&quot;<br />
                        Rioja, San Martín - Perú
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="mt-1 bg-primary/10 p-4 rounded-full mr-5"
                      whileHover={{ rotate: 15, scale: 1.1, backgroundColor: "rgba(252, 96, 46, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <motion.svg 
                        className="h-6 w-6 text-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={isVisible.formulario ? { rotate: 15 } : { rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, repeat: 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </motion.svg>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible.formulario ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        Teléfonos
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 font-light"
                        initial={{ opacity: 0 }}
                        animate={isVisible.formulario ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        WhatsApp: +51 970 584 592
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="mt-1 bg-primary/10 p-4 rounded-full mr-5"
                      whileHover={{ rotate: 15, scale: 1.1, backgroundColor: "rgba(252, 96, 46, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <motion.svg 
                        className="h-6 w-6 text-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={isVisible.formulario ? { y: [0, -3, 0] } : { y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, repeat: 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </motion.svg>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible.formulario ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        Correo Electrónico
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 font-light"
                        initial={{ opacity: 0 }}
                        animate={isVisible.formulario ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        ceramicosalva@gmail.com<br />
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="mt-1 bg-primary/10 p-4 rounded-full mr-5"
                      whileHover={{ rotate: 15, scale: 1.1, backgroundColor: "rgba(252, 96, 46, 0.2)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <motion.svg 
                        className="h-6 w-6 text-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={isVisible.formulario ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 1.5, delay: 0.7, repeat: 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </motion.svg>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-lg font-semibold text-gray-800 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible.formulario ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        Horario de Atención
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 font-light"
                        initial={{ opacity: 0 }}
                        animate={isVisible.formulario ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        Lunes a Sábados: 8:00 AM - 5:00 PM<br />
                        Domingos: Cerrado
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div 
                className="mt-12"
                variants={fadeIn}
                transition={{ delay: 0.8 }}
              >
                <motion.h3 
                  className="text-lg font-semibold text-gray-800 mb-4"
                  variants={fadeInUp}
                >
                  Síguenos en redes sociales
                </motion.h3>
                <motion.div 
                  className="flex space-x-5"
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isVisible.formulario ? "visible" : "hidden"}
                >
                  <motion.a 
                    href="https://www.facebook.com/CeramicosAlva/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 p-4 rounded-full shadow-md hover:shadow-lg border border-blue-100 transition-all duration-300"
                    variants={fadeIn}
                    whileHover={{ 
                      scale: 1.15, 
                      backgroundColor: "#1877f2",
                      color: "#ffffff",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/ceramicosalva/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-pink-600 p-4 rounded-full shadow-md hover:shadow-lg border border-pink-100 transition-all duration-300"
                    variants={fadeIn}
                    whileHover={{ 
                      scale: 1.15, 
                      backgroundColor: "#E1306C",
                      color: "#ffffff",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mapa */}
      <section id="mapa-ubicacion" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate={isVisible.mapa ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-10" variants={fadeInUp}>
              <motion.h2 
                className="text-3xl font-bold text-gray-800 mb-4 relative inline-block"
                variants={fadeInUp}
              >
                Encuéntranos
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-[#FC602E]/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible.mapa ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                variants={fadeIn}
              >
                Visita nuestra planta de producción y oficinas
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg"
              variants={scaleUp}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                scale: 1.01,
                transition: { duration: 0.4 }
              }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.787124433171!2d-77.22367672463902!3d-6.023933259156747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6d9c0482e2441%3A0x894b3539fe49736f!2sCer%C3%A1micos%20Alva%20EIRL!5e0!3m2!1ses!2spe!4v1744829204099!5m2!1ses!2spe" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
            
           
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section id="preguntas-frecuentes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate={isVisible.faqs ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <motion.h2 
                className="text-3xl font-bold text-gray-800 mb-6 relative inline-block"
                variants={fadeInUp}
              >
                Preguntas Frecuentes
                <motion.div 
                  className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-[#FC602E]/60 rounded-full"
                  initial={{ width: 0, left: "50%" }}
                  animate={isVisible.faqs ? { width: "50%", left: "25%" } : { width: 0, left: "50%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                variants={fadeIn}
              >
                Respuestas a las preguntas más comunes sobre nuestros productos y servicios.
              </motion.p>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'shadow-md' : ''
                  }`}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ scale: expandedFaq === index ? 1.01 : 1.02, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="p-5 sm:p-6 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFaq(index)}
                    whileHover={{ backgroundColor: "rgba(252, 96, 46, 0.03)" }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{faq.question}</h3>
                    <motion.div 
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-500"
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-gray-100">
                          <motion.p 
                            className="text-gray-600"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                className="text-gray-600 mb-6"
                variants={fadeIn}
              >
                ¿No encuentras lo que estás buscando?
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="#formulario-contacto">
                  <Button 
                    variant="outline"
                  >
                    Contáctanos directamente
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section id="llamado-accion" className="py-20 bg-gradient-to-r from-primary to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="w-full h-full bg-repeat"
            style={{ 
              backgroundImage: "url('/images/logo_white.png')",
              backgroundSize: "300px",
              transform: `translateY(${scrollY * 0.1}px) rotate(5deg)`
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate={isVisible.cta ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              ¿Listo para iniciar tu proyecto?
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl mb-10 text-white/90 font-light max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Solicita una cotización para iniciar tu construcción.
            </motion.p>
            <motion.div
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                color="secondary" 
                size="lg"
                className="shadow-xl"
              >
                <Link href="/cotizacion" className="flex items-center">
                  Solicitar cotización
                  <motion.svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-12 flex justify-center space-x-8"
              variants={staggerContainer}
            >
              <motion.div 
                className="text-center"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl font-bold mb-1">+100</div>
                <div className="text-sm font-light text-white/80">Millares mensual</div>
              </motion.div>
              <motion.div 
                className="text-center"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl font-bold mb-1">20+</div>
                <div className="text-sm font-light text-white/80">Años de experiencia</div>
              </motion.div>
              <motion.div 
                className="text-center"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm font-light text-white/80">Garantía de calidad</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 