
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

const products = [
  {
    id: 'pandereta',
    name: 'Pandereta rayas',
    image: '/images/pandereta.png',
    description: 'Ideal para muros divisorios y cerramientos, se adapta a proyectos residenciales, comerciales e industriales.',
    features: [
      'Medidas: 10 x 12 x 25 cm',
      'Peso: 2.2 kg (aproximado)',
      'Rendimiento: 32 unidades por m²',
      'Alta resistencia térmica',
      'Buen aislamiento acústico',
    ],
    applications: [
      'Muros divisorios interiores',
      'Tabiquería en general',
      'Cerramientos no portantes',
    ],
  },
  {
    id: 'techo',
    name: 'Techo 12',
    image: '/images/techo12.png',
    description: 'Diseñado específicamente para losas aligeradas. Optimiza el peso de la estructura manteniendo la resistencia necesaria.',
    features: [
      'Medidas: 30 x 30 x 12 cm',
      'Peso: 6.8 kg (aproximado)',
      'Rendimiento: 9 unidades por m²',
      'Alta resistencia a la compresión',
      'Menor peso en la estructura',
    ],
    applications: [
      'Losas aligeradas',
      'Techos de concreto armado',
      'Entrepisos',
    ],
  },
  {
    id: 'king-kong',
    name: 'King Kong 18 huecos',
    image: '/images/kingkong.png',
    description: 'Perfecto para muros portantes. Proporciona alta resistencia sísmica y durabilidad para construcciones seguras.',
    features: [
      'Medidas: 9 x 13 x 24 cm',
      'Peso: 3.5 kg (aproximado)',
      'Rendimiento: 36 unidades por m²',
      'Alta resistencia a la compresión',
      'Excelente resistencia sísmica',
      '18 perforaciones para ahorro de material',
    ],
    applications: [
      'Muros portantes',
      'Columnas estructurales',
      'Construcciones de alta resistencia',
    ],
  },
  {
    id: 'segunda',
    name: 'Ladrillos de segunda',
    image: '/images/pandereta.png',
    description: 'Ladrillos que presentan pequeñas imperfecciones estéticas o rajaduras menores pero que mantienen sus propiedades estructurales. Ideales para construcciones económicas.',
    features: [
      'Mismas dimensiones que los productos estándar',
      'Pequeñas irregularidades estéticas',
      'Precio más económico',
      'Mantienen propiedades básicas estructurales',
    ],
    applications: [
      'Construcciones económicas',
      'Cercos perimétricos',
      'Obras no vistas o que serán tarrajeadas',
      'Construcciones temporales',
    ],
  },
];

export default function ProductosPage() {
  // Eliminadas las variables no utilizadas
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    productos: false,
    beneficios: false,
    galeria: false
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
          const productos = document.getElementById('catalogo');
          const beneficios = document.getElementById('beneficios');
          const galeria = document.getElementById('galeria');
          
          const newVisibility = {
            hero: true, // Siempre visible al inicio
            productos: productos ? currentScrollY > productos.offsetTop - window.innerHeight + 200 : false,
            beneficios: beneficios ? currentScrollY > beneficios.offsetTop - window.innerHeight + 200 : false,
            galeria: galeria ? currentScrollY > galeria.offsetTop - window.innerHeight + 200 : false
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

  // Función para WhatsApp por producto
  const handleWhatsAppProduct = (productName: string) => {
    const phoneNumber = '+51970584592';
    const message = encodeURIComponent(`Hola, vengo de la web de ceramicosalva.com, quiero saber sobre ${productName}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <MainLayout>
      {/* Hero Section con efecto parallax */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
          <div 
            className="w-full h-full" 
            style={{ 
              background: 'radial-gradient(circle at center, rgba(252, 96, 46, 0.1), transparent 70%)',
              transform: `scale(1.1) translateY(${scrollY * 0.05}px)` 
            }}
          />
          <Image
            src="/images/slider2.png"
            alt="Productos de Cerámicos Alva"
            fill
            priority
            className="object-cover object-center transform scale-110"
            style={{ 
              filter: "brightness(0.8)",
              transform: `scale(1.1) translateY(${scrollY * 0.03}px)` 
            }}
          />
        </div>
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-4xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Nuestros <span className="text-[#FC602E] relative">
                Productos
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-3xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Ofrecemos ladrillos de arcilla bien cocidos para satisfacer las necesidades de su proyecto constructivo.
            </motion.p>
            {/* <Button size="lg">
              <Link href="#catalogo" className="flex items-center">
                Ver catálogo
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </Button> */}
          </div>
        </motion.div>
      </section>

      {/* Productos */}
      <section id="catalogo" className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate={isVisible.productos ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-2"
              variants={fadeInUp}
            >
              Productos
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-[#FC602E] mx-auto mb-4"
              initial={{ width: 0 }}
              animate={{ width: isVisible.productos ? 96 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <motion.p 
              className="text-lg text-gray-dark max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Conoce nuestros principales ladrillos de arcilla.
            </motion.p>
          </motion.div>

          {/* Grid de 4 columnas para productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                id={product.id}
                className={`${product.id === 'segunda' 
                  ? 'bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col'
                  : 'bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.productos ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                {/* Encabezado con nombre del producto */}
                <div className={`${product.id === 'segunda' 
                  ? 'bg-gray-600 px-4 py-3 text-white relative' 
                  : 'bg-[#FC602E] px-4 py-3 text-white'
                }`}>
                  
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
                
                {/* Imagen del producto */}
                <div className={`p-4 flex justify-center items-center ${product.id === 'segunda' ? 'bg-gray-200' : 'bg-gray-50'} relative h-36`}>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className={`object-contain ${product.id === 'segunda' ? 'opacity-90 filter contrast-95' : ''}`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                    {product.id === 'segunda' && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        Max. 1 millar
                      </div>
                    )}
                  </div>
                </div>

                {/* Detalles del producto */}
                <div className={`p-4 flex-grow ${product.id === 'segunda' ? 'text-gray-800' : 'text-gray-700'}`}>
                  <p className={`mb-3 text-sm ${product.id === 'segunda' ? 'text-gray-600 italic' : ''}`}>
                    {product.description}
                  </p>
                  
                  <div className="mb-3">
                    <h4 className={`text-base font-semibold mb-2 flex items-center ${product.id === 'segunda' ? 'text-gray-600' : 'text-[#FC602E]'}`}>
                      <svg className={`h-4 w-4 mr-1 ${product.id === 'segunda' ? 'text-gray-600' : 'text-[#FC602E]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Características:
                    </h4>
                    <ul className={`space-y-0.5 ml-5 list-disc text-sm ${product.id === 'segunda' ? 'text-gray-500' : 'text-gray-600'}`}>
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón WhatsApp */}
                  <div className="mt-auto pt-3">
                    <button
                      onClick={() => handleWhatsAppProduct(product.name)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all duration-300 hover:scale-[1.01] ${
                        product.id === 'segunda' 
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300' 
                          : 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
                      } shadow-sm hover:shadow-md`}
                    >
                      <svg 
                        className="w-3.5 h-3.5" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                      </svg>
                      <span>Cotizar</span>
                    </button>
                  </div>
                </div>
                
              
              </motion.div>
            ))}
          </div>
          
          {/* Banner informativo sobre flete y transporte */}
          <motion.div 
            className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-6 shadow-md mb-12 border-l-4 border-[#FC602E]"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible.productos ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <motion.div 
                className="bg-[#FC602E]/10 p-3 rounded-full"
                whileHover={{ backgroundColor: "rgba(252, 96, 46, 0.2)" }}
                animate={{ rotate: isVisible.productos ? 5 : 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 200, damping: 5 }}
              >
                <svg 
                  className="w-10 h-10 text-[#FC602E]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Transporte y Descarga</h3>
                <p className="text-gray-700">
                  Entregamos la carga <strong>cargada a su movilidad sin costo adicional</strong>. Si requiere entrega a domicilio, 
                  contamos con <strong>servicio adicional de transporte y descarga</strong> para mayor comodidad.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 flex items-center border border-gray-300">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Carga en su movilidad sin costo
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 flex items-center border border-gray-300">
                    <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Entrega a domicilio disponible
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 flex items-center border border-gray-300">
                    <svg className="w-4 h-4 mr-1 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Servicio confiable y puntual
                  </div>
                </div>
              </div>
              {/* <Button size="lg" className="whitespace-nowrap">
                <Link href="/cotizacion" className="flex items-center">
                  Solicitar transporte
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Button> */}
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={isVisible.beneficios ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-2"
              variants={fadeInUp}
            >
              Beneficios de nuestros productos
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-[#FC602E] mx-auto mb-4"
              initial={{ width: 0 }}
              animate={{ width: isVisible.beneficios ? 96 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <motion.p 
              className="text-lg text-gray-dark max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Nuestros ladrillos de arcilla ofrecen los siguientes beneficios para su proyecto de construcción.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Beneficio 1 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#FC602E] group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.beneficios ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="w-16 h-16 bg-[#FC602E]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FC602E]/20 transition-colors duration-300"
                whileHover={{ rotate: 360, backgroundColor: "rgba(252, 96, 46, 0.3)" }}
                transition={{ duration: 1.5 }}
              >
                <svg className="w-8 h-8 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-4 group-hover:text-[#FC602E] transition-colors duration-300"
              >
                Resistencia
              </motion.h3>
              <p className="text-gray-700 leading-relaxed">
                Nuestros ladrillos son resistentes a la compresión, garantizando la seguridad estructural de su construcción, comercializamos ladrillos bien cocidos.
              </p>
            </motion.div>

            {/* Beneficio 2 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#FC602E] group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.beneficios ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="w-16 h-16 bg-[#FC602E]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FC602E]/20 transition-colors duration-300"
                whileHover={{ rotate: 360, backgroundColor: "rgba(252, 96, 46, 0.3)" }}
                transition={{ duration: 1.5 }}
              >
                <svg className="w-8 h-8 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-4 group-hover:text-[#FC602E] transition-colors duration-300"
              >
                Durabilidad
              </motion.h3>
              <p className="text-gray-700 leading-relaxed">
                Son resistentes al paso del tiempo, manteniendo sus propiedades estructurales durante décadas sin deterioro significativo.
              </p>
            </motion.div>

            {/* Beneficio 3 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#FC602E] group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.beneficios ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="w-16 h-16 bg-[#FC602E]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FC602E]/20 transition-colors duration-300"
                whileHover={{ rotate: 360, backgroundColor: "rgba(252, 96, 46, 0.3)" }}
                transition={{ duration: 1.5 }}
              >
                <svg className="w-8 h-8 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-4 group-hover:text-[#FC602E] transition-colors duration-300"
              >
                Económicamente eficientes
              </motion.h3>
              <p className="text-gray-700 leading-relaxed">
                Ofrecen una excelente relación calidad-precio, reduciendo los costos de construcción a largo plazo y minimizando gastos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galería de proyectos */}
      <section id="galeria" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate={isVisible.galeria ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-2"
              variants={fadeInUp}
            >
              Galería
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-[#FC602E] mx-auto mb-4"
              initial={{ width: 0 }}
              animate={{ width: isVisible.galeria ? 96 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            {/* <motion.p 
              className="text-lg text-gray-dark max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Algunos ejemplos de construcciones y de nuestros productos.
            </motion.p> */}
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.galeria ? "visible" : "hidden"}
          >
            <motion.div 
              className="relative rounded-lg overflow-hidden group h-48 md:h-64 col-span-2"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <motion.p 
                  className="text-white font-bold text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Envío de King Kong
                </motion.p>
              </div>
              <Image 
                src="/images/hero-background.png" 
                alt="Proyecto 1" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden group h-48"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <motion.p 
                  className="text-white font-bold text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Fábrica
                </motion.p>
              </div>
              <Image 
                src="/images/hero-background2.JPG" 
                alt="Proyecto 2" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden group h-48"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <motion.p 
                  className="text-white font-bold text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Trailer con King Kong
                </motion.p>
              </div>
              <Image 
                src="/images/slider2.png" 
                alt="Proyecto 3" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden group h-48"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <motion.p 
                  className="text-white font-bold text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Fachada de fábrica
                </motion.p>
              </div>
              <Image 
                src="/images/fachada.jpg" 
                alt="Proyecto 4" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden group h-48"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <motion.p 
                  className="text-white font-bold text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Trailer
                </motion.p>
              </div>
              <Image 
                src="/images/trailer.png" 
                alt="Proyecto 5" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden group h-48 col-span-2"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <motion.p 
                  className="text-white font-bold text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Horno Pandereta
                </motion.p>
              </div>
              <Image 
                src="/images/bg-hero.png" 
                alt="Proyecto 6" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

    </MainLayout>
  );
} 