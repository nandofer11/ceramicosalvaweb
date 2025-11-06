'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { motion } from 'framer-motion';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    productos: false,
    porque: false,
    cobertura: false
  });
  
  // Efecto para manejar el scroll optimizado
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          
          // Detecta cuando ciertos elementos están en el viewport
          const productos = document.getElementById('productos');
          const porque = document.getElementById('porque-elegirnos');
          const cobertura = document.getElementById('cobertura');
          
          const newVisibility = {
            hero: true, // Siempre visible al inicio
            productos: productos ? currentScrollY > productos.offsetTop - window.innerHeight + 200 : false,
            porque: porque ? currentScrollY > porque.offsetTop - window.innerHeight + 200 : false,
            cobertura: cobertura ? currentScrollY > cobertura.offsetTop - window.innerHeight + 200 : false
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
    hidden: { scale: 0.9, opacity: 0 },
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
      <section className="relative h-[600px] md:h-[650px] overflow-hidden">
        {/* Imagen de fondo con efecto parallax */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
          <motion.div
            style={{ 
              transform: `scale(1.1) translateY(${scrollY * 0.03}px)` 
            }}
            className="w-full h-full"
          >
            <Image
              src="/images/bg-hero.png"
              alt="Fábrica de Cerámicos Alva"
              fill
              priority
              className="object-cover"
              style={{ filter: "brightness(0.8)" }}
            />
          </motion.div>
        </div>

        {/* Contenido en dos columnas */}
        <div className="relative h-full flex items-center z-20 py-4">
          <div className="container mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center justify-center h-full">
              
              {/* Segunda columna - Imagen (Primera en móviles) */}
              <motion.div 
                className="flex justify-center lg:justify-end order-1 lg:order-2 w-full"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="relative w-[280px] h-[220px] lg:w-[550px] lg:h-[480px]"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 } 
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src="/images/hero-pandereta.png"
                      alt="Ladrillos Pandereta - Cerámicos Alva"
                      fill
                      priority
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Primera columna - Texto (Segunda en móviles) */}
              <motion.div 
                className="flex flex-col justify-center order-2 lg:order-1 w-full"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  className="bg-[#FC602E]/90 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg backdrop-blur-sm mx-auto w-full max-w-md lg:max-w-none"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    scale: 1.02, 
                    transition: { duration: 0.3 } 
                  }}
                >
                  <motion.h1 
                    className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 text-center lg:text-left leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    FABRICANTES DE LADRILLOS DE ARCILLA
                  </motion.h1>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl text-white mb-3 sm:mb-4 lg:mb-6 text-center lg:text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Empresa Riojana contribuyendo al desarrollo del Alto Mayo.
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Link 
                      href="/productos" 
                      className="bg-white text-[#FC602E] px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-center text-xs sm:text-sm lg:text-base"
                    >
                      Ver Productos
                    </Link>
                    <Link 
                      href="/cotizacion" 
                      className="bg-transparent border-2 border-white text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FC602E] transition-all duration-300 text-center text-xs sm:text-sm lg:text-base"
                    >
                      Solicitar Cotización
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="productos" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con dos columnas */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            initial="hidden"
            animate={isVisible.productos ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div 
              className="flex flex-col"
              variants={fadeInUp}
            >
              <motion.h2 
                className="font-anton text-2xl md:text-3xl font-bold text-black text-center md:text-end"
                variants={fadeInUp}
              >
                CONSTRUCCIONES SEGURAS<br />
                <span className="text-primary relative">
                  PRODUCTOS DE CALIDAD!
                </span>
              </motion.h2>
            </motion.div>
            <motion.div 
              className="flex flex-col md:border-l md:border-[#FC602E] md:pl-8"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-black mb-2 text-center md:text-start"
                variants={fadeInUp}
              >
                Principales productos
              </motion.h3>
              <motion.p 
                className="text-lg text-black text-center md:text-start"
                variants={fadeInUp}
              >
                Ofrecemos ladrillos de primera y segunda calidad.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Línea separadora */}
          <motion.div 
            className="h-1 bg-[#FC602E] w-full mb-12"
            initial={{ width: 0 }}
            animate={isVisible.productos ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          ></motion.div>

          {/* Grid de productos */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.productos ? "visible" : "hidden"}
          >
            {/* Producto 1 */}
            <motion.div 
              className="rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-2 flex flex-col h-full bg-white"
              variants={scaleUp}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="relative flex items-center justify-center p-4 flex-grow-0"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/images/pandereta.png"
                  alt="Ladrillo Pandereta rayas"
                  width={100}
                  height={100}
                  className="object-contain max-h-full max-w-full"
                />
              </motion.div>
              <div className="p-4 mt-auto">
                <motion.h3 
                  className="text-xl text-primary font-semibold mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible.productos ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Pandereta rayas
                </motion.h3>
                <motion.p 
                  className="text-gray-dark"
                  initial={{ opacity: 0 }}
                  animate={isVisible.productos ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Ideal para muros divisorios y cerramientos, se adapta a proyectos residenciales, comerciales e industriales.  
                </motion.p>
              </div>
            </motion.div>

            {/* Producto 2 */}
            <motion.div 
              className="rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-2 flex flex-col h-full bg-white"
              variants={scaleUp}
              transition={{ delay: 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="relative flex items-center justify-center p-4 flex-grow-0"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/images/techo12.png"
                  alt="Ladrillo Techo 12"
                  width={180}
                  height={180}
                  className="object-contain max-h-full max-w-full"
                />
              </motion.div>
              <div className="p-4 mt-auto">
                <motion.h3 
                  className="text-xl text-primary font-semibold mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible.productos ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Techo 12
                </motion.h3>
                <motion.p 
                  className="text-gray-dark"
                  initial={{ opacity: 0 }}
                  animate={isVisible.productos ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Diseñado para losas aligeradas. Ofrece alta resistencia y menor peso en la estructura.
                </motion.p>
              </div>
            </motion.div>

            {/* Producto 3 */}
            <motion.div 
              className="rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-2 flex flex-col h-full bg-white"
              variants={scaleUp}
              transition={{ delay: 0.2 }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="relative flex items-center justify-center p-4 flex-grow-0"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/images/kingkong.png"
                  alt="Ladrillo King Kong 18 huecos"
                  width={100}
                  height={100}
                  className="object-contain max-h-full max-w-full"
                />
              </motion.div>
              <div className="p-4 mt-auto">
                <motion.h3 
                  className="text-xl text-primary font-semibold mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible.productos ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  King Kong 18 huecos
                </motion.h3>
                <motion.p 
                  className="text-gray-dark"
                  initial={{ opacity: 0 }}
                  animate={isVisible.productos ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Para muros portantes. Alta resistencia sísmica y durabilidad para construcciones seguras.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Botón Ver todos */}
          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.productos ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/productos"
                className="inline-flex items-center px-6 py-3 bg-[#FC602E] text-white rounded-lg hover:bg-[#FC602E]/90 transition-colors"
              >
                Ver todos
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section id="porque-elegirnos" className="py-16 bg-[#FC602E] text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            animate={isVisible.porque ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            {/* Columna izquierda */}
            <motion.div 
              className="flex flex-col justify-center"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-4xl font-bold mb-6 relative"
                variants={fadeInUp}
              >
                ¿Por qué elegir Cerámicos Alva?
                <motion.div 
                  className="absolute -bottom-3 left-0 h-1 bg-white/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible.porque ? { width: "60%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </motion.h2>
              <motion.p 
                className="text-lg"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                Somos una empresa con varios años de experiencia, comprometida con entregar
                productos bien cocidos y con la satisfacción de nuestros clientes.
              </motion.p>
            </motion.div>

            {/* Columna derecha */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
            >
              {/* Card 1 */}
              <motion.div 
                className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#dc4815]/40 cursor-pointer"
                variants={fadeIn}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(220, 72, 21, 0.4)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={isVisible.porque ? { rotate: [0, 15, 0, -15, 0] } : { rotate: 0 }}
                      transition={{ duration: 2, delay: 0.3, repeat: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </motion.svg>
                  </motion.div>
                </div>
                <div>
                  <motion.h3 
                    className="text-lg font-semibold mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible.porque ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Productos de calidad 
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-white/80"
                    initial={{ opacity: 0 }}
                    animate={isVisible.porque ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Contamos con maquinaria industrial para ofrecer productos de calidad y durabilidad.
                  </motion.p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#dc4815]/40 cursor-pointer"
                variants={fadeIn}
                transition={{ delay: 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(220, 72, 21, 0.4)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={isVisible.porque ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 2, delay: 0.4, repeat: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                  </motion.div>
                </div>
                <div>
                  <motion.h3 
                    className="text-lg font-semibold mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible.porque ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Entrega puntual
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-white/80"
                    initial={{ opacity: 0 }}
                    animate={isVisible.porque ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Respetamos los plazos de contrato para que tu proyecto avance sin retrasos.
                  </motion.p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#dc4815]/40 cursor-pointer"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(220, 72, 21, 0.4)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={isVisible.porque ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, repeat: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </motion.svg>
                  </motion.div>
                </div>
                <div>
                  <motion.h3 
                    className="text-lg font-semibold mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible.porque ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Experiencia regional
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-white/80"
                    initial={{ opacity: 0 }}
                    animate={isVisible.porque ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Más de 20 años construyendo junto a las principales ciudades de la región San Martín.
                  </motion.p>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#dc4815]/40 cursor-pointer"
                variants={fadeIn}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(220, 72, 21, 0.4)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={isVisible.porque ? { y: [0, -5, 0] } : { y: 0 }}
                      transition={{ duration: 1, delay: 0.6, repeat: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </motion.svg>
                  </motion.div>
                </div>
                <div>
                  <motion.h3 
                    className="text-lg font-semibold mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible.porque ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Servicio transporte
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-white/80"
                    initial={{ opacity: 0 }}
                    animate={isVisible.porque ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Ofrecemos transporte y descarga directamente en el lugar de tu obra.
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    {/* Zonas de cobertura */}
<section id="cobertura" className="py-8 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
      initial="hidden"
      animate={isVisible.cobertura ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {/* Columna izquierda */}
      <motion.div
        variants={fadeInUp}
      >
        <motion.h2 
          className="text-3xl font-bold text-[#FC602E] mb-3 relative inline-block"
          variants={fadeInUp}
        >
          Zonas de Cobertura
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 bg-[#FC602E]/60 rounded-full"
            initial={{ width: 0 }}
            animate={isVisible.cobertura ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-dark mb-4"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          Atendemos a las principales ciudades de la región San Martín
        </motion.p>

        <motion.div 
          className="space-y-2 mb-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible.cobertura ? "visible" : "hidden"}
        >
          {[
            'Rioja',
            'Moyobamba',
            'Nueva Cajamarca',
            'Soritor',
            'Tarapoto',
            'Juanjuí'
          ].map((city, index) => (
            <motion.div 
              key={city} 
              className="flex items-center space-x-2"
              variants={fadeIn}
              custom={index}
              transition={{ delay: 0.1 * index }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <motion.svg 
                  className="w-4 h-4 text-green-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ scale: 0 }}
                  animate={isVisible.cobertura ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </motion.svg>
              </motion.div>
              <span className="text-base text-gray-dark">{city}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="text-sm text-gray-dark italic"
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
        >
          ¿Necesitas entrega en otra ciudad? Contáctanos para verificar disponibilidad.
        </motion.p>
      </motion.div>

      {/* Columna derecha - Mapa */}
      <motion.div 
        className="relative h-64 md:h-[400px]  overflow-hidden "
        variants={scaleUp}
        transition={{ delay: 0.3 }}
        whileHover={{ 
          scale: 1.02,
        
          transition: { duration: 0.3 }
        }}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={isVisible.cobertura ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/mapa.png"
            alt="Mapa de cobertura - Región San Martín"
            fill
            className="object-contain object-center rounded-lg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</section>
    </MainLayout>
  );
}
