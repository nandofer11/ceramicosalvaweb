"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

export default function EmpresaPage() {
  // Estados para las animaciones y efectos
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    historia: false,
    mision: false,
    vision: false,
    valores: false,
    misionVision: false
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
          const historia = document.getElementById('historia');
          const misionVision = document.getElementById('mision-vision');
          const valores = document.getElementById('valores');
          
          const newVisibility = {
            historia: historia ? currentScrollY > historia.offsetTop - window.innerHeight + 200 : false,
            mision: misionVision ? currentScrollY > misionVision.offsetTop - window.innerHeight + 200 : false,
            vision: misionVision ? currentScrollY > misionVision.offsetTop - window.innerHeight + 200 : false,
            misionVision: misionVision ? currentScrollY > misionVision.offsetTop - window.innerHeight + 200 : false,
            valores: valores ? currentScrollY > valores.offsetTop - window.innerHeight + 200 : false
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

  return (
    <MainLayout>
      {/* Hero Section moderna y minimalista */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"
            style={{ backdropFilter: 'blur(1px)' }}
          ></div>
          <div 
            className="w-full h-full" 
            style={{ 
              background: 'radial-gradient(circle at center, rgba(252, 96, 46, 0.1), transparent 70%)',
              transform: `scale(1.1) translateY(${scrollY * 0.08}px)` 
            }}
          />
          <Image
            src="/images/fachada.jpg"
            alt="Cerámicos Alva"
            fill
            priority
            className="object-cover object-center"
            style={{ 
              opacity: 0.9, 
              filter: "grayscale(20%)",
              transform: `scale(1.1) translateY(${scrollY * 0.05}px)` 
            }}
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Nuestra <span className="text-[#FC602E]">empresa</span>
            </motion.h1>
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="h-1 w-24 bg-[#FC602E] mx-auto mb-6"
            ></motion.div> */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Cerámicos Alva, una empresa comprometida con ofrecer buenos productos.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Historia - Sección moderna con efecto parallax */}
      <section id="historia" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            animate={isVisible.historia ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Nuestra trayectoria</h2>
            <div className="h-1 w-20 bg-[#FC602E] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Más de una década construyendo confianza con productos de calidad
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.historia ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 mb-6 leading-relaxed text-justify">
                  <span className="font-semibold text-[#FC602E] text-xl">Cerámicos Alva EIRL</span>, fue constituida formalmente en el año 2010, pero su historia se remonta a mucho antes. Desde 1993, nuestro fundador, Julio Alva, inició esta actividad con dedicación artesanal y visión emprendedora, sentando las bases de lo que hoy es una empresa sólida y reconocida en la región San Martín.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                  Nuestra planta de producción, está ubicada en el Caserío &quot;Las Delicias&quot;, en el kilómetro 8 de la Carretera Fernando Belaunde Terry, en Rioja.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                  A lo largo de estos años, hemos ido perfeccionado nuestros procesos, incorporado maquinaria y formnado un buen equipo para ofrecer ladrillos que cumplen con la industria de la construcción.
                </p>
              </div>
              
              <div className="mt-8 inline-block">
                <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#FC602E]">
                  <div className="text-4xl font-bold text-[#FC602E]">1993</div>
                  <div>
                    <p className="font-medium text-gray-900">Año de fundación</p>
                    <p className="text-gray-600">Iniciamos operaciones en Rioja en el rubro de la construcción.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.historia ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative rounded-lg overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end"
                >
                  <div className="p-6">
                    <h3 className="text-white text-xl font-medium mb-2">Ladrillera antiguamente</h3>
                    <p className="text-white/80">Julio Alva - Rioja, San Martín</p>
                  </div>
                </div>
                <Image
                  src="/images/foto_historia.jpg"
                  alt="Cerámicos Alva - Historia"
                  width={700}
                  height={440}
                  className="w-full h-auto rounded-lg shadow-lg object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute -bottom-12 -left-12 hidden lg:block">
                <div 
                  className="w-36 h-36 rounded-full border-8 border-white shadow-lg overflow-hidden"
                  style={{ 
                    transform: `translateY(${scrollY * 0.03}px) rotate(${scrollY * 0.01}deg)` 
                  }}
                >
                  <Image
                    src="/images/trailer.png"
                    alt="Cerámicos Alva - Transporte"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -top-12 -right-12 hidden lg:block">
                <div 
                  className="w-28 h-28 rounded-full bg-[#FC602E]/10 border-4 border-[#FC602E]/20"
                  style={{ 
                    transform: `translateY(${scrollY * -0.02}px)` 
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión con diseño moderno y animaciones */}
      <section id="mision-vision" className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            animate={isVisible.mision ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Propósito y Dirección</h2>
            <div className="h-1 w-20 bg-[#FC602E] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guiando nuestro camino 
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.mision ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 relative z-10 h-full group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FC602E] to-[#FF8A65] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                
                <div className="mb-6">
                  <div className="inline-block p-4 rounded-full bg-[#FC602E]/10 text-[#FC602E]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FC602E] transition-colors duration-300">Nuestra Misión</h3>
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="leading-relaxed text-justify">
                    Fabricar y comercializar productos de arcilla de calidad que satisfagan las necesidades del sector construcción en la región San Martín, brindando soluciones confiables, sostenibles y económicas a nuestros clientes, y contribuyendo al desarrollo de nuestra comunidad.
                  </p>
                </div>
                
                <div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#FC602E]/20 to-transparent -z-10"
                  style={{
                    transform: `translateY(${scrollY * 0.02}px)`
                  }}
                ></div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.vision ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 relative z-10 h-full group hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FC602E] to-[#FF8A65] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                
                <div className="mb-6">
                  <div className="inline-block p-4 rounded-full bg-[#FC602E]/10 text-[#FC602E]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FC602E] transition-colors duration-300">Nuestra Visión</h3>
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="leading-relaxed text-justify">
                    Ser reconocidos como una empresa líder en la fabricación y comercialización de ladrillos de arcilla en la región San Martín, distinguiéndonos por la calidad de nuestros productos y nuestro compromiso con el desarrollo sostenible y el medio ambiente.
                  </p>
                </div>
                
                <div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#FC602E]/20 to-transparent -z-10"
                  style={{
                    transform: `translateY(${scrollY * 0.02}px)`
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores - Diseño moderno con tarjetas animadas */}
      <section id="valores" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            animate={isVisible.valores ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Nuestros Valores</h2>
            <div className="h-1 w-20 bg-[#FC602E] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Principios que guían cada ladrillo que fabricamos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Calidad",
                description: "Nos esforzamos por ofrecer productos bien cocidos, controlando cada etapa de nuestro proceso productivo.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                delay: 0.1
              },
              {
                title: "Responsabilidad",
                description: "Asumimos nuestros compromisos con seriedad, cumpliendo con los plazos de entrega acordadas con nuestros clientes.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                delay: 0.2
              },
              {
                title: "Integridad",
                description: "Actuamos con honestidad, transparencia y ética en todas nuestras operaciones y relaciones comerciales.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                delay: 0.3
              },
              {
                title: "Compromiso ambiental",
                description: "Buscamos implementar prácticas sostenibles en nuestros procesos para minimizar el impacto ambiental y contribuir a la conservación de los recursos naturales.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                ),
                delay: 0.4
              }
            ].map((valor, index) => (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.valores ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: valor.delay }}
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center hover:shadow-lg hover:border-[#FC602E]/20 hover:translate-y-[-8px] transition-all duration-300 h-full">
                  <div className="bg-[#FC602E]/10 text-[#FC602E] rounded-full p-4 mb-5 group-hover:bg-[#FC602E] group-hover:text-white transition-colors duration-300">
                    {valor.icon}
                  </div>
                  
                  <h4 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#FC602E] transition-colors duration-300">{valor.title}</h4>
                  
                  <p className="text-center text-gray-600">{valor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Sección final con animación */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(252, 96, 46, 0.05), transparent 70%)',
            transform: `scale(1.1) translateY(${scrollY * 0.03}px)` 
          }}
        />
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#FC602E]/5 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#FC602E]/5 blur-xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible.valores ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="md:w-2/5 relative hidden md:block">
              <div className="absolute inset-0 bg-[#FC602E]">
                <div 
                  className="w-full h-full opacity-90"
                  style={{ 
                    backgroundImage: "url('/images/hero-pandereta.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(20%) contrast(1.1)"
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FC602E] via-[#FC602E]/80 to-transparent opacity-90"></div>
              </div>
            </div>
            
            <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">¿Listo para construir?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Contáctanos hoy para conocer más sobre nuestros productos y servicios.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/productos" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#FC602E] hover:bg-[#E55529] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC602E] transition-colors duration-300"
                >
                  Ver Productos
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href="/contacto" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC602E] transition-colors duration-300"
                >
                  Contáctanos
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}