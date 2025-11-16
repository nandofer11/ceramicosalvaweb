"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

export default function CotizacionPage() {
  // Estado para manejar las animaciones (no utilizado actualmente)
  // const [isVisible, setIsVisible] = useState({
  //   hero: false,
  //   formulario: false,
  //   paso1: false,
  //   paso2: false,
  //   paso3: false,
  //   paso4: false
  // });
  // Estados para controlar los diferentes flujos del formulario
  const [tipoPersona, setTipoPersona] = useState<'natural' | 'juridica' | null>(null);
  const [tipoSeleccionProducto, setTipoSeleccionProducto] = useState<'unico' | 'multiple' | null>(null);
  const [tipoEntrega, setTipoEntrega] = useState<'propio' | 'envio' | null>(null);
  const [tipoDescarga, setTipoDescarga] = useState<'propio' | 'solicitar' | null>(null);

  // Estado para manejar el paso actual del formulario
  const [pasoActual, setPasoActual] = useState<number>(1);
  // Variable no utilizada comentada
  // const [currentStep, setCurrentStep] = useState<number>(1);
  const [progreso, setProgreso] = useState<number>(25);
  
  // Estado para controlar la visibilidad de los botones de navegación se maneja dinámicamente

  // Estado para el envío del formulario
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  // Estado para el contador de reset automático
  const [resetCountdown, setResetCountdown] = useState(0);

  // Funciones de validación
  const validateDNI = (dni: string): boolean => {
    return dni.length === 8 && /^\d{8}$/.test(dni);
  };

  const validateRUC = (ruc: string): boolean => {
    return ruc.length === 11 && /^\d{11}$/.test(ruc);
  };

  const validateCelular = (celular: string): boolean => {
    return celular.length === 9 && /^\d{9}$/.test(celular);
  };

  const validateEmail = (email: string): boolean => {
    if (!email || email.trim() === '') return true; // Es opcional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNombres = (nombres: string): boolean => {
    return nombres.trim().length > 0;
  };

  const validateRazonSocial = (razonSocial: string): boolean => {
    return razonSocial.trim().length > 0;
  };

  // Función para resetear todo el formulario
  const resetFormulario = () => {
    // Resetear estados de pasos
    setPasoActual(1);
    setProgreso(25);
    
    // Resetear tipos de persona y selecciones
    setTipoPersona(null);
    setTipoSeleccionProducto(null);
    setTipoEntrega(null);
    setTipoDescarga(null);
    
    // Resetear productos
    setProductoUnico(null);
    setCantidadUnico(0);
    setUnidadMedida('');
    setProductosSeleccionados([
      { id: 'pandereta', nombre: 'Pandereta rayas', cantidad: 0, seleccionado: false },
      { id: 'techo12', nombre: 'Techo 12', cantidad: 0, seleccionado: false },
      { id: 'king_kong', nombre: 'King Kong 18 huecos', cantidad: 0, seleccionado: false },
      { id: 'segunda', nombre: 'Ladrillos de segunda', cantidad: 0, seleccionado: false },
    ]);
    
    // Resetear datos del formulario
    setFormData({
      dni: '',
      nombres: '',
      apellidos: '',
      ruc: '',
      razon_social: '',
      celular: '',
      email: '',
      ciudad: '',
      direccion: '',
      celular_receptor: '',
      comentarios: '',
      acepto_terminos: false
    });
    
    // Resetear estado del formulario
    setFormStatus({
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      message: ''
    });
    
    // Resetear contador
    setResetCountdown(0);
  };

  // Funciones para WhatsApp
  const handleWhatsAppImmediate = () => {
    const phoneNumber = '+51970584592';
    const message = encodeURIComponent('Hola, vengo de la web de ceramicosalva.com. Necesito una cotización. ¿Pueden ayudarme?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '+51970584592';
    const message = encodeURIComponent('Hola, vengo de la web de ceramicosalva.com. Me gustaría hablar con un asesor sobre sus productos.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Función para obtener el nombre del producto por ID
  const getProductNameById = (productId: string): string => {
    const productNames: { [key: string]: string } = {
      'pandereta': 'Pandereta rayas',
      'techo12': 'Techo 12',
      'king_kong': 'King Kong 18 huecos',
      'segunda': 'Ladrillos de segunda'
    };
    return productNames[productId] || productId;
  };
  
  // (Eliminado: función duplicada, se deja la versión que limpia datos más abajo)
  
  const handleTipoSeleccionProductoChange = (tipo: 'unico' | 'multiple') => {
    setTipoSeleccionProducto(tipo);
    // Limpiar selección de productos y cantidades al cambiar tipo
    setProductoUnico(null);
    setCantidadUnico(0);
    setUnidadMedida('');
    setProductosSeleccionados([
      { id: 'pandereta', nombre: 'Pandereta rayas', cantidad: 0, seleccionado: false },
      { id: 'techo12', nombre: 'Techo 12', cantidad: 0, seleccionado: false },
      { id: 'king_kong', nombre: 'King Kong 18 huecos', cantidad: 0, seleccionado: false },
      { id: 'segunda', nombre: 'Ladrillos de segunda', cantidad: 0, seleccionado: false },
    ]);
  };
  
  const handleProductoUnicoChange = (producto: string) => {
    setProductoUnico(producto);
  };
  
  const handleCantidadUnicoChange = (cantidad: number) => {
    setCantidadUnico(cantidad);
  };
  
  const handleTipoEntregaChange = (tipo: 'propio' | 'envio') => {
    setTipoEntrega(tipo);
  };
  
  const handleTipoDescargaChange = (tipo: 'propio' | 'solicitar') => {
    setTipoDescarga(tipo);
  };
  
  const handleUnidadMedidaChange = (valor: string) => {
    setUnidadMedida(valor);
  };
  
  // Estado para controlar la unidad de medida (millares o unidades)
  const [unidadMedida, setUnidadMedida] = useState<string>('');

  // Estado para los productos seleccionados
  const [productosSeleccionados, setProductosSeleccionados] = useState<{
    id: string;
    nombre: string;
    cantidad: number;
    seleccionado: boolean;
  }[]>([
    { id: 'pandereta', nombre: 'Pandereta rayas', cantidad: 0, seleccionado: false },
    { id: 'techo12', nombre: 'Techo 12', cantidad: 0, seleccionado: false },
    { id: 'king_kong', nombre: 'King Kong 18 huecos', cantidad: 0, seleccionado: false },
    { id: 'segunda', nombre: 'Ladrillos de segunda', cantidad: 0, seleccionado: false },
  ]);

  // Estado para el producto único seleccionado
  const [productoUnico, setProductoUnico] = useState<string | null>(null);
  const [cantidadUnico, setCantidadUnico] = useState<number>(0);

  // Campos de formulario comunes
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    ruc: '',
    razon_social: '',
    celular: '',
    email: '',
    ciudad: '',
    direccion: '',
    celular_receptor: '',
    comentarios: '',
    acepto_terminos: false
  });

  // Función para actualizar el progreso basado en el paso actual
  useEffect(() => {
    setProgreso(pasoActual * 25);
    
    // Comentado para evitar error ya que isVisible se comentó arriba
    // Activar animaciones del paso actual
    // setIsVisible(prev => ({
    //   ...prev,
    //   hero: true,
    //   formulario: true,
    //   paso1: pasoActual >= 1,
    //   paso2: pasoActual >= 2,
    //   paso3: pasoActual >= 3,
    //   paso4: pasoActual >= 4
    // }));
    
    // El botón siempre se muestra, solo cambia su estado
  }, [pasoActual]);
  
  // Función para avanzar al siguiente paso
  const avanzarPaso = () => {
    if (pasoActual < 4) {
      const nuevoPaso = pasoActual + 1;
      setPasoActual(nuevoPaso);
      // setCurrentStep(nuevoPaso); // Comentado porque currentStep no se usa
      setProgreso(nuevoPaso * 25); // 25%, 50%, 75%, 100%
    }
  };
  
  // Revisar continuamente si los datos ingresados permiten avanzar
  useEffect(() => {
    // El botón siempre se muestra, solo cambia su estado habilitado/deshabilitado
    // No necesitamos setMostrarBotonSiguiente(canAdvance()) aquí ya que usamos canAdvance() directamente en el JSX
  }, [formData, tipoPersona, tipoSeleccionProducto, productoUnico, cantidadUnico, productosSeleccionados, tipoEntrega, tipoDescarga, unidadMedida, pasoActual]);

  // Efecto para manejar el contador de reset automático
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (resetCountdown > 0) {
      interval = setInterval(() => {
        setResetCountdown(prev => {
          if (prev <= 1) {
            resetFormulario();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resetCountdown]);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Función para manejar la selección de productos múltiples
  const handleProductoChange = (id: string, checked: boolean) => {
    setProductosSeleccionados(prev =>
      prev.map(producto =>
        producto.id === id ? { ...producto, seleccionado: checked } : producto
      )
    );
  };

  // Función para manejar la cantidad de productos múltiples
  const handleCantidadChange = (id: string, cantidad: number) => {
    setProductosSeleccionados(prev =>
      prev.map(producto =>
        producto.id === id ? { ...producto, cantidad } : producto
      )
    );
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que estemos en el paso 4
    if (pasoActual !== 4) {
      return;
    }

    // Establecer estado de envío
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: 'Enviando solicitud de cotización...'
    });

    try {
      // Preparar datos para enviar
      const cotizacionData = {
        // Información personal/empresa
        tipoPersona,
        dni: formData.dni,
        nombres: formData.nombres,
        ruc: formData.ruc,
        razon_social: formData.razon_social,
        celular: formData.celular,
        email: formData.email,
        
        // Productos
        tipoSeleccionProducto,
        productoUnico,
        cantidadUnico,
        productosSeleccionados,
        unidadMedida,
        
        // Entrega
        tipoEntrega,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        celular_receptor: formData.celular_receptor,
        tipoDescarga,
        
        // Comentarios
        comentarios: formData.comentarios
      };

      // Enviar a la API
      const response = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cotizacionData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Éxito
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: result.message
        });

        // Iniciar contador de reset automático
        setResetCountdown(5);
      } else {
        // Error
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: result.error || 'Ocurrió un error al enviar la solicitud'
        });
      }

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Error de conexión. Por favor, inténtalo de nuevo.'
      });
    }
  };

  // Verificar si se puede avanzar al siguiente paso
  // Limpiar datos al cambiar tipo de persona
  const handleTipoPersonaChange = (nuevoTipo: 'natural' | 'juridica') => {
    setTipoPersona(nuevoTipo);
    if (nuevoTipo === 'natural') {
      setFormData((prev) => ({
        ...prev,
        dni: '',
        nombres: '',
        ruc: '',
        razon_social: '',
        celular: '',
        email: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        ruc: '',
        razon_social: '',
        dni: '',
        nombres: '',
        celular: '',
        email: '',
      }));
    }
  };

  const canAdvance = () => {
    switch (pasoActual) {
      case 1:
        // Paso 1: Validaciones específicas según tipo de persona
        if (tipoPersona === 'natural') {
          return (
            validateDNI(formData.dni) &&
            validateNombres(formData.nombres) &&
            validateCelular(formData.celular) &&
            validateEmail(formData.email)
          );
        } else if (tipoPersona === 'juridica') {
          return (
            validateRUC(formData.ruc) &&
            validateRazonSocial(formData.razon_social) &&
            validateCelular(formData.celular) &&
            validateEmail(formData.email)
          );
        }
        return false;
      case 2:
        if (tipoSeleccionProducto === 'unico') {
          return !!productoUnico && 
            cantidadUnico > 0 && 
            (unidadMedida === 'millares' || unidadMedida === 'unidades');
        } else if (tipoSeleccionProducto === 'multiple') {
          return productosSeleccionados.some(
            p => p.seleccionado && p.cantidad > 0 && (unidadMedida === 'millares' || unidadMedida === 'unidades')
          );
        }
        return false;
      case 3:
        if (tipoEntrega === 'propio') {
          return true;
        } else if (tipoEntrega === 'envio') {
          return !!formData.ciudad && !!formData.direccion && !!formData.celular_receptor && !!tipoDescarga;
        }
        return false;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <MainLayout>
      {/* Hero Section con diseño mejorado */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
          <Image
            src="/images/fachada.jpg"
            alt="Solicitar cotización - Cerámicos Alva"
            fill
            priority
            className="object-cover object-center scale-110"
            style={{
              filter: "brightness(0.8)",
              transform: "scale(1.05)",
              transition: "transform 10s ease, filter 1.5s ease"
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Solicitar <span className="text-[#FC602E]">Cotización</span>
            </h1>
            <p className="text-lg text-white/90 max-w-3xl">
              Obtén un presupuesto personalizado para tus proyectos de construcción
            </p>
          </div>
        </div>
      </section>



      {/* Contenido Principal */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            {/* Formulario de Cotización   */}
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Solicitud de Cotización</h2>
                <p className="text-sm text-gray-600">Complete el formulario paso a paso para recibir su presupuesto personalizado</p>
              </div>

              {/* Barra de progreso */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-[#FC602E]">Progreso</span>
                  <span className="text-sm font-medium text-[#FC602E] animate-pulse">{progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#FC602E] h-2.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progreso}%`, boxShadow: '0 0 8px rgba(252, 96, 46, 0.5)' }}
                  ></div>
                </div>
              </div>

              {/* Pasos de navegación */}
              <div className="flex mb-4 border-b border-gray-100 pb-3">
                {[1, 2, 3, 4].map((paso) => (
                  <button
                    key={paso}
                    type="button"
                    onClick={() => paso <= pasoActual && setPasoActual(paso)}
                    className={`flex-1 text-center py-1.5 px-2 text-sm font-medium rounded-lg transition-all duration-300 ${pasoActual === paso
                        ? 'bg-[#FC602E]/10 text-[#FC602E] border-b-2 border-[#FC602E] transform scale-105 hover:bg-[#FC602E]/20'
                        : paso < pasoActual
                          ? 'text-gray-700 hover:bg-gray-50 hover:text-[#FC602E] cursor-pointer hover:scale-105'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                    disabled={paso > pasoActual}
                  >
                    <div className="flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${pasoActual === paso
                          ? 'bg-[#FC602E] text-white'
                          : paso < pasoActual
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                        {paso < pasoActual ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span>{paso}</span>
                        )}
                      </div>
                      <span className="hidden sm:inline">{
                        paso === 1 ? "Información" :
                          paso === 2 ? "Productos" :
                            paso === 3 ? "Entrega" :
                              "Confirmar"
                      }</span>
                    </div>
                  </button>
                ))}
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* PASO 1: Información personal */}
                {pasoActual === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-duration-300">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Tipo de Persona
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <div
                          className={`flex-1 min-w-[180px] p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${tipoPersona === 'natural'
                              ? 'border-[#FC602E] bg-[#FC602E]/5 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                          onClick={() => handleTipoPersonaChange('natural')}
                        >
                          <div className="flex items-start">
                            <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoPersona === 'natural' ? 'border-[#FC602E]' : 'border-gray-400'
                              }`}>
                              {tipoPersona === 'natural' && (
                                <div className="w-3 h-3 rounded-full bg-[#FC602E] animate-pulse"></div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Persona Natural</h4>
                              <p className="text-xs text-gray-600">Para clientes individuales</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`flex-1 min-w-[180px] p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${tipoPersona === 'juridica'
                              ? 'border-[#FC602E] bg-[#FC602E]/5 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                          onClick={() => handleTipoPersonaChange('juridica')}
                        >
                          <div className="flex items-start">
                            <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoPersona === 'juridica' ? 'border-[#FC602E]' : 'border-gray-400'
                              }`}>
                              {tipoPersona === 'juridica' && (
                                <div className="w-3 h-3 rounded-full bg-[#FC602E] animate-pulse"></div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Persona Jurídica</h4>
                              <p className="text-xs text-gray-600">Para empresas y organizaciones</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Información de identificación según tipo de persona */}
                    {tipoPersona && (
                      <div className="bg-gray-50 p-4 rounded-lg shadow-sm transition-all duration-500 ease-in hover:shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-[#FC602E] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          {tipoPersona === 'natural' ? 'Información Personal' : 'Información de la Empresa'}
                        </h3>

                        {tipoPersona === 'natural' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            <div>
                              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                                DNI <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="dni"
                                name="dni"
                                maxLength={8}
                                className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-gray-50 transform hover:scale-[1.01] text-gray-800 placeholder:text-gray-500 ${
                                  formData.dni === '' 
                                    ? 'border-gray-300 focus:ring-[#FC602E]/50 focus:border-[#FC602E]'
                                    : validateDNI(formData.dni)
                                      ? 'border-green-500 focus:ring-green-500/50 focus:border-green-500 bg-green-50'
                                      : 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50'
                                }`}
                                placeholder="12345678"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                              />
                              {formData.dni !== '' && !validateDNI(formData.dni) && (
                                <p className="text-red-500 text-xs mt-1">El DNI debe tener exactamente 8 dígitos</p>
                              )}
                              {formData.dni !== '' && validateDNI(formData.dni) && (
                                <p className="text-green-500 text-xs mt-1">✓ DNI válido</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombres y Apellidos <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-800 placeholder:text-gray-500 ${
                                  formData.nombres === '' 
                                    ? 'border-gray-300 focus:ring-[#FC602E]/50 focus:border-[#FC602E]'
                                    : validateNombres(formData.nombres)
                                      ? 'border-green-500 focus:ring-green-500/50 focus:border-green-500 bg-green-50'
                                      : 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50'
                                }`}
                                placeholder="Juan Pérez García"
                                value={formData.nombres}
                                onChange={handleChange}
                                required
                              />
                              {formData.nombres !== '' && !validateNombres(formData.nombres) && (
                                <p className="text-red-500 text-xs mt-1">Los nombres y apellidos no pueden estar vacíos</p>
                              )}
                              {formData.nombres !== '' && validateNombres(formData.nombres) && (
                                <p className="text-green-500 text-xs mt-1">✓ Nombres válidos</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            <div>
                              <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-1">
                                RUC <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="ruc"
                                name="ruc"
                                maxLength={11}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-800 placeholder:text-gray-500 ${
                                  formData.ruc === '' 
                                    ? 'border-gray-300 focus:ring-[#FC602E]/50 focus:border-[#FC602E]'
                                    : validateRUC(formData.ruc)
                                      ? 'border-green-500 focus:ring-green-500/50 focus:border-green-500 bg-green-50'
                                      : 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50'
                                }`}
                                placeholder="12345678901"
                                value={formData.ruc}
                                onChange={handleChange}
                                required
                              />
                              {formData.ruc !== '' && !validateRUC(formData.ruc) && (
                                <p className="text-red-500 text-xs mt-1">El RUC debe tener exactamente 11 dígitos</p>
                              )}
                              {formData.ruc !== '' && validateRUC(formData.ruc) && (
                                <p className="text-green-500 text-xs mt-1">✓ RUC válido</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="razon_social" className="block text-sm font-medium text-gray-700 mb-1">
                                Razón Social <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="razon_social"
                                name="razon_social"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-800 placeholder:text-gray-500 ${
                                  formData.razon_social === '' 
                                    ? 'border-gray-300 focus:ring-[#FC602E]/50 focus:border-[#FC602E]'
                                    : validateRazonSocial(formData.razon_social)
                                      ? 'border-green-500 focus:ring-green-500/50 focus:border-green-500 bg-green-50'
                                      : 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50'
                                }`}
                                placeholder="Cerámicos Alva S.A.C."
                                value={formData.razon_social}
                                onChange={handleChange}
                                required
                              />
                              {formData.razon_social !== '' && !validateRazonSocial(formData.razon_social) && (
                                <p className="text-red-500 text-xs mt-1">La razón social no puede estar vacía</p>
                              )}
                              {formData.razon_social !== '' && validateRazonSocial(formData.razon_social) && (
                                <p className="text-green-500 text-xs mt-1">✓ Razón social válida</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Información de contacto */}
                    {tipoPersona && (
                      <div className="bg-gray-50 p-5 rounded-lg shadow-sm transition-all duration-500 ease-in">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Información de Contacto
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          <div>
                            <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">
                              WhatsApp <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500">+51</span>
                              </div>
                              <input
                                type="tel"
                                id="celular"
                                name="celular"
                                className={`w-full pl-10 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] text-gray-800 placeholder:text-gray-500 ${
                                  formData.celular === '' 
                                    ? 'border-gray-300 focus:ring-[#FC602E]/50 focus:border-[#FC602E]'
                                    : validateCelular(formData.celular)
                                      ? 'border-green-500 focus:ring-green-500/50 focus:border-green-500 bg-green-50'
                                      : 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50'
                                }`}
                                placeholder="987654321"
                                maxLength={9}
                                pattern="[0-9]{9}"
                                value={formData.celular}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            {formData.celular !== '' && !validateCelular(formData.celular) && (
                              <p className="text-red-500 text-xs mt-1">El número de WhatsApp debe tener exactamente 9 dígitos</p>
                            )}
                            {formData.celular !== '' && validateCelular(formData.celular) && (
                              <p className="text-green-500 text-xs mt-1">✓ Número de WhatsApp válido</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Para compartir el PDF de la cotización.</p>
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Correo electrónico (opcional)
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-800 placeholder:text-gray-500 ${
                                formData.email === '' 
                                  ? 'border-gray-300 focus:ring-[#FC602E]/50 focus:border-[#FC602E]'
                                  : validateEmail(formData.email)
                                    ? 'border-green-500 focus:ring-green-500/50 focus:border-green-500 bg-green-50'
                                    : 'border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-red-50'
                              }`}
                              placeholder="ejemplo@correo.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {formData.email !== '' && !validateEmail(formData.email) && (
                              <p className="text-red-500 text-xs mt-1">Ingrese un correo electrónico válido</p>
                            )}
                            {formData.email !== '' && validateEmail(formData.email) && (
                              <p className="text-green-500 text-xs mt-1">✓ Correo electrónico válido</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* PASO 2: Selección de productos */}
                {pasoActual === 2 && (
                  <div className="bg-gray-50 p-6 rounded-xl animate-fadeIn">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Productos de Interés
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div
                        className={`flex-1 min-w-[200px] p-4 border-2 rounded-lg cursor-pointer transition-all ${tipoSeleccionProducto === 'unico'
                            ? 'border-[#FC602E] bg-[#FC602E]/5'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => handleTipoSeleccionProductoChange('unico')}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoSeleccionProducto === 'unico' ? 'border-[#FC602E]' : 'border-gray-400'
                            }`}>
                            {tipoSeleccionProducto === 'unico' && (
                              <div className="w-3 h-3 rounded-full bg-[#FC602E]"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">Un solo producto</h4>
                            <p className="text-sm text-gray-600">Seleccionar un tipo de ladrillo</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex-1 min-w-[200px] p-4 border-2 rounded-lg cursor-pointer transition-all ${tipoSeleccionProducto === 'multiple'
                            ? 'border-[#FC602E] bg-[#FC602E]/5'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => handleTipoSeleccionProductoChange('multiple')}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoSeleccionProducto === 'multiple' ? 'border-[#FC602E]' : 'border-gray-400'
                            }`}>
                            {tipoSeleccionProducto === 'multiple' && (
                              <div className="w-3 h-3 rounded-full bg-[#FC602E]"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">Múltiples productos</h4>
                            <p className="text-sm text-gray-600">Seleccionar varios tipos de ladrillos</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {tipoSeleccionProducto === 'unico' && (
                      <div className="mt-3 space-y-3">
                        <div>
                          <label htmlFor="producto" className="block text-sm font-medium text-gray-700 mb-1">
                            Seleccione el producto <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="producto"
                            name="producto"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] transition-all duration-300 hover:bg-gray-50 cursor-pointer"
                            value={productoUnico || ''}
                            onChange={(e) => handleProductoUnicoChange(e.target.value)}
                            required={tipoSeleccionProducto === 'unico'}
                          >
                            <option value="">Seleccione un producto</option>
                            <option value="pandereta">Pandereta rayas</option>
                            <option value="techo12">Techo 12</option>
                            <option value="king_kong">King Kong 18 huecos</option>
                            <option value="segunda">Ladrillos de segunda</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-2">
                            Cantidad <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-2 items-end">
                            <div className="flex-grow">
                              <input
                                type="number"
                                id="cantidad"
                                name="cantidad"
                                min="1"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E]"
                                placeholder="Ej: 5"
                                value={cantidadUnico || ''}
                                onChange={(e) => handleCantidadUnicoChange(parseInt(e.target.value) || 0)}
                                required={tipoSeleccionProducto === 'unico'}
                              />
                            </div>
                            <div className="w-32">
                              <select
                                id="unidadMedida"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] text-gray-800"
                                value={unidadMedida}
                                onChange={(e) => handleUnidadMedidaChange(e.target.value)}
                              >
                                <option value="">Medida</option>
                                <option value="millares">Millares</option>
                                <option value="unidades">Unidades</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {tipoSeleccionProducto === 'multiple' && (
                      <div className="mt-3 space-y-4">
                        {productosSeleccionados.map((producto) => (
                          <div key={producto.id} className="border border-gray-200 rounded-lg p-3 hover:border-[#FC602E]/30 hover:bg-[#FC602E]/5 transition-all duration-300">
                            <div className="flex items-center mb-3">
                              <input
                                type="checkbox"
                                id={`check-${producto.id}`}
                                checked={producto.seleccionado}
                                onChange={(e) => handleProductoChange(producto.id, e.target.checked)}
                                className="h-4 w-4 text-[#FC602E] border-gray-300 rounded focus:ring-[#FC602E]"
                              />
                              <label htmlFor={`check-${producto.id}`} className="ml-2 block text-sm font-medium text-gray-700">
                                {producto.nombre}
                              </label>
                            </div>

                            {producto.seleccionado && (
                              <div className="ml-6 mt-2">
                                <label htmlFor={`cantidad-${producto.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                  Cantidad <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2 items-end max-w-xs">
                                  <div className="flex-grow">
                                    <input
                                      type="number"
                                      id={`cantidad-${producto.id}`}
                                      min="1"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E]"
                                      placeholder="Ej: 3"
                                      value={producto.cantidad || ''}
                                      onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value) || 0)}
                                      required={producto.seleccionado}
                                    />
                                  </div>
                                  <div className="w-24">
                                    <select
                                      id={`unidadMedida-multi-${producto.id}`}
                                      className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] text-gray-800 text-sm"
                                      value={unidadMedida}
                                      onChange={(e) => handleUnidadMedidaChange(e.target.value)}
                                    >
                                      <option value="">Medida</option>
                                      <option value="millares">Millares</option>
                                      <option value="unidades">Unidades</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* PASO 3: Opciones de entrega */}
                {pasoActual === 3 && (
                  <div className="bg-gray-50 p-6 rounded-xl animate-fadeIn">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                      Opciones de Entrega
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div
                        className={`flex-1 min-w-[200px] p-4 border-2 rounded-lg cursor-pointer transition-all ${tipoEntrega === 'propio'
                            ? 'border-[#FC602E] bg-[#FC602E]/5'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => handleTipoEntregaChange('propio')}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoEntrega === 'propio' ? 'border-[#FC602E]' : 'border-gray-400'
                            }`}>
                            {tipoEntrega === 'propio' && (
                              <div className="w-3 h-3 rounded-full bg-[#FC602E]"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">Envío movilidad propia</h4>
                            <p className="text-sm text-gray-600">Recogeré con mi movilidad</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex-1 min-w-[200px] p-4 border-2 rounded-lg cursor-pointer transition-all ${tipoEntrega === 'envio'
                            ? 'border-[#FC602E] bg-[#FC602E]/5'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => handleTipoEntregaChange('envio')}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoEntrega === 'envio' ? 'border-[#FC602E]' : 'border-gray-400'
                            }`}>
                            {tipoEntrega === 'envio' && (
                              <div className="w-3 h-3 rounded-full bg-[#FC602E]"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">Entrega a domicilio</h4>
                            <p className="text-sm text-gray-600">Solicitar envío (servicio adicional)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {tipoEntrega === 'envio' && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                              Ciudad <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="ciudad"
                              name="ciudad"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] text-gray-800 placeholder:text-gray-500"
                              placeholder="Ej: Rioja"
                              value={formData.ciudad}
                              onChange={handleChange}
                              required={tipoEntrega === 'envio'}
                            />
                          </div>
                          <div>
                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                              Dirección de entrega <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="direccion"
                              name="direccion"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] text-gray-800 placeholder:text-gray-500"
                              placeholder="Ej: Jr. Lima 123"
                              value={formData.direccion}
                              onChange={handleChange}
                              required={tipoEntrega === 'envio'}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="celular_receptor" className="block text-sm font-medium text-gray-700 mb-1">
                            Celular del receptor <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">+51</span>
                            </div>
                            <input
                              type="tel"
                              id="celular_receptor"
                              name="celular_receptor"
                              className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] text-gray-800 placeholder:text-gray-500"
                              placeholder="987654321"
                              maxLength={9}
                              pattern="[0-9]{9}"
                              value={formData.celular_receptor}
                              onChange={handleChange}
                              required={tipoEntrega === 'envio'}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Servicio de descarga</h4>

                          <div className="flex flex-wrap gap-4">
                            <div
                              className={`flex-1 min-w-[200px] p-3 border rounded-lg cursor-pointer transition-all ${tipoDescarga === 'propio'
                                  ? 'border-[#FC602E] bg-[#FC602E]/5'
                                  : 'border-gray-200 hover:border-gray-300'
                                }`}
                              onClick={() => handleTipoDescargaChange('propio')}
                            >
                              <div className="flex items-start">
                                <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoDescarga === 'propio' ? 'border-[#FC602E]' : 'border-gray-400'
                                  }`}>
                                  {tipoDescarga === 'propio' && (
                                    <div className="w-2 h-2 rounded-full bg-[#FC602E]"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm">Tengo personal para descarga</p>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`flex-1 min-w-[200px] p-3 border rounded-lg cursor-pointer transition-all ${tipoDescarga === 'solicitar'
                                  ? 'border-[#FC602E] bg-[#FC602E]/5'
                                  : 'border-gray-200 hover:border-gray-300'
                                }`}
                              onClick={() => handleTipoDescargaChange('solicitar')}
                            >
                              <div className="flex items-start">
                                <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center mr-2 ${tipoDescarga === 'solicitar' ? 'border-[#FC602E]' : 'border-gray-400'
                                  }`}>
                                  {tipoDescarga === 'solicitar' && (
                                    <div className="w-2 h-2 rounded-full bg-[#FC602E]"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm">Solicitar servicio de descarga</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* PASO 4: Confirmación */}
                {pasoActual === 4 && (
                  <div className="bg-gray-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md animate-fadeIn">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC602E] transition-all duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Confirmación de Cotización
                    </h3>
                    
                    <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-sm text-gray-700">
                        Por favor, revisa que toda la información sea correcta antes de enviar tu solicitud.
                      </p>
                    </div>

                    {/* Resumen del formulario */}
                    <div className="space-y-6 mb-6">
                      {/* Información Personal */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Información {tipoPersona === 'natural' ? 'Personal' : 'de la Empresa'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {tipoPersona === 'natural' ? (
                            <>
                              <div>
                                <span className="font-medium text-gray-600">DNI:</span>
                                <span className="ml-2 text-gray-800">{formData.dni}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Nombres y Apellidos:</span>
                                <span className="ml-2 text-gray-800">{formData.nombres}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <span className="font-medium text-gray-600">RUC:</span>
                                <span className="ml-2 text-gray-800">{formData.ruc}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Razón Social:</span>
                                <span className="ml-2 text-gray-800">{formData.razon_social}</span>
                              </div>
                            </>
                          )}
                          <div>
                            <span className="font-medium text-gray-600">WhatsApp:</span>
                            <span className="ml-2 text-gray-800">+51 {formData.celular}</span>
                          </div>
                          {formData.email && (
                            <div>
                              <span className="font-medium text-gray-600">Email:</span>
                              <span className="ml-2 text-gray-800">{formData.email}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Productos Solicitados */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          Productos Solicitados
                        </h4>
                        <div className="space-y-2 text-sm">
                          {tipoSeleccionProducto === 'unico' && productoUnico && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-800">
                                {getProductNameById(productoUnico)}
                              </span>
                              <span className="font-medium text-gray-600">
                                {cantidadUnico} {unidadMedida}
                              </span>
                            </div>
                          )}
                          {tipoSeleccionProducto === 'multiple' && (
                            <>
                              {productosSeleccionados
                                .filter(producto => producto.seleccionado && producto.cantidad > 0)
                                .map(producto => (
                                  <div key={producto.id} className="flex justify-between items-center">
                                    <span className="text-gray-800">{producto.nombre}</span>
                                    <span className="font-medium text-gray-600">
                                      {producto.cantidad} {unidadMedida}
                                    </span>
                                  </div>
                                ))
                              }
                            </>
                          )}
                        </div>
                      </div>

                      {/* Información de Entrega */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                          Información de Entrega
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Tipo de entrega:</span>
                            <span className="ml-2 text-gray-800">
                              {tipoEntrega === 'propio' ? 'Recogeré con mi movilidad' : 'Entrega a domicilio'}
                            </span>
                          </div>
                          {tipoEntrega === 'envio' && (
                            <>
                              <div>
                                <span className="font-medium text-gray-600">Ciudad:</span>
                                <span className="ml-2 text-gray-800">{formData.ciudad}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Dirección:</span>
                                <span className="ml-2 text-gray-800">{formData.direccion}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Celular del receptor:</span>
                                <span className="ml-2 text-gray-800">+51 {formData.celular_receptor}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Servicio de descarga:</span>
                                <span className="ml-2 text-gray-800">
                                  {tipoDescarga === 'propio' ? 'Tengo personal para descarga' : 'Solicitar servicio de descarga'}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Mensaje de estado del formulario */}
                    {(formStatus.isSuccess || formStatus.isError || formStatus.isSubmitting) && (
                      <div className={`mt-6 p-4 rounded-lg border ${
                        formStatus.isSuccess 
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : formStatus.isError
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-blue-50 border-blue-200 text-blue-800'
                      }`}>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {formStatus.isSuccess ? (
                              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : formStatus.isError ? (
                              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5 text-blue-500 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">{formStatus.message}</p>
                            {formStatus.isSuccess && resetCountdown > 0 && (
                              <p className="text-xs text-green-600 mt-1">
                                El formulario se reiniciará automáticamente en {resetCountdown} segundo{resetCountdown !== 1 ? 's' : ''}...
                              </p>
                            )}
                            {formStatus.isSuccess && (
                              <div className="mt-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setResetCountdown(0); // Detener el contador
                                    resetFormulario();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                  Hacer otra cotización ahora
                                </button>
                              </div>
                            )}
                          </div>
                          {!formStatus.isSubmitting && (
                            <div className="ml-auto pl-3">
                              <button
                                type="button"
                                onClick={() => setFormStatus(prev => ({ ...prev, isSuccess: false, isError: false }))}
                                className={`inline-flex rounded-md p-1.5 ${
                                  formStatus.isSuccess 
                                    ? 'text-green-600 hover:bg-green-100'
                                    : 'text-red-600 hover:bg-red-100'
                                }`}
                              >
                                <span className="sr-only">Cerrar</span>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Comentarios adicionales */}
                    <div className="mt-6">
                      <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-2">
                        Comentarios Adicionales <span className="text-sm text-gray-500 ml-1">(opcional)</span>
                      </label>
                      <textarea
                        id="comentarios"
                        name="comentarios"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC602E]/50 focus:border-[#FC602E] transition-all duration-300 hover:bg-gray-50 text-gray-800 placeholder:text-gray-500"
                        placeholder="Escriba aquí cualquier información adicional relevante para su cotización (horarios de entrega preferidos, especificaciones especiales, etc.)..."
                        value={formData.comentarios}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                
                {/* Eliminamos los comentarios adicionales para los pasos 1-3 */}

                {/* Términos y condiciones - eliminados de aquí para evitar duplicación */}

                {/* Botones de navegación y envío */}
                <div className="mt-6 space-y-3">
                  {/* Botón Siguiente - siempre visible en pasos 1-3, habilitado/deshabilitado según validaciones */}
                  {pasoActual < 4 && (
                    <Button
                      type="button"
                      size="lg"
                      onClick={avanzarPaso}
                      disabled={!canAdvance()}
                      className={`w-full py-3 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg transform ${
                        canAdvance()
                          ? 'bg-[#FC602E] hover:bg-[#e55525] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-center group">
                        Siguiente Paso
                        <svg 
                          className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                            canAdvance() ? 'group-hover:translate-x-1' : ''
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Button>
                  )}
                  
                  {/* Botón Enviar - solo visible en paso 4 */}
                  {pasoActual === 4 && (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formStatus.isSubmitting}
                      className={`w-full py-3 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg transform ${
                        formStatus.isSubmitting
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-[#FC602E] hover:bg-[#e55525] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center justify-center group">
                        {formStatus.isSubmitting ? (
                          <>
                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Enviar Cotización
                          </>
                        )}
                      </div>
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Panel lateral con información y ayuda */}

          </div>
        </div>
      </section>

      {/* Información rápida y cards principales */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tarjetas informativas horizontales en formato compacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Atención inmediata */}
            <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-200 flex items-center transform transition-all hover:scale-[1.01]">
              <div className="mr-3 text-green-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-green-800">Atención inmediata</h4>
                <p className="text-xs text-green-700 mb-2">Cotización directa por WhatsApp</p>
                <Button
                  onClick={handleWhatsAppImmediate}
                  className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-lg text-xs shadow-sm w-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Contactar ahora
                </Button>
              </div>
            </div>

            {/* Proceso de cotización simplificado */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between transform transition-all hover:scale-[1.01]">
              <h4 className="text-base font-bold text-gray-800 flex items-center mb-2">
                <svg className="w-5 h-5 mr-1 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Proceso de cotización
              </h4>
              <div className="space-y-2 mb-2">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-[#FC602E] text-white flex items-center justify-center flex-shrink-0 text-xs font-medium mr-2">1</div>
                  <p className="text-xs text-gray-700">Completa y envía el formulario</p>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-[#FC602E] text-white flex items-center justify-center flex-shrink-0 text-xs font-medium mr-2">2</div>
                  <p className="text-xs text-gray-700">Revisamos tu pedido</p>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-[#FC602E] text-white flex items-center justify-center flex-shrink-0 text-xs font-medium mr-2">3</div>
                  <p className="text-xs text-gray-700">Recibes tu cotización</p>
                </div>
              </div>
            </div>

            {/* Servicio de entrega */}
            <div className="bg-[#FC602E]/5 p-4 rounded-xl shadow-sm border border-[#FC602E]/20 flex flex-col transform transition-all hover:scale-[1.01]">
              <h4 className="text-base font-bold text-gray-800 flex items-center mb-2">
                <svg className="w-5 h-5 mr-1 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                Opciones de entrega
              </h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <svg className="h-4 w-4 text-[#FC602E] flex-shrink-0 mt-0.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-gray-700">Recojo en planta sin costo</p>
                </div>
                <div className="flex items-start">
                  <svg className="h-4 w-4 text-[#FC602E] flex-shrink-0 mt-0.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-gray-700">Entrega a domicilio regional</p>
                </div>
                <div className="flex items-start">
                  <svg className="h-4 w-4 text-[#FC602E] flex-shrink-0 mt-0.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-gray-700">Servicio de descarga disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantía de calidad */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Garantía de Calidad</h2>
            <div className="h-1 w-24 bg-[#FC602E] mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              En cada ladrillo que fabricamos está nuestro compromiso con la durabilidad de nuestros productos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-[#FC602E]/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Materiales de Primera</h3>
              <p className="text-gray-600 text-center">
                Utilizamos arcilla y arena de calidad para garantizar la resistencia y durabilidad de nuestros ladrillos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-[#FC602E]/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Equipo Experto</h3>
              <p className="text-gray-600 text-center">
                Contamos con personal con años de experiencia en la fabricación de productos cerámicos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-[#FC602E]/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FC602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Proceso Controlado</h3>
              <p className="text-gray-600 text-center">
                Estamos en constante mejora continua de nuestros procesos de fabricación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes Satisfechos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Clientes Satisfechos</h2>
            <div className="h-1 w-24 bg-[#FC602E] mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Empresas y constructores que confían en la calidad de nuestros productos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-28 hover:shadow-lg transition-all">
              <p className="text-lg font-bold text-gray-800">Ferretería Santa Rosa</p>
              <p className="text-md text-primary">Tarapoto</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-28 hover:shadow-lg transition-all">
              <p className="text-lg font-bold text-gray-800">Ferretería Imán</p>
              <p className="text-md text-primary">Picota</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-28 hover:shadow-lg transition-all">
               <p className="text-lg font-bold text-gray-800">Ferretería La Molina</p>
              <p className="text-md text-primary">Nueva Cajamarca</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-28 hover:shadow-lg transition-all">
              <span className="text-lg font-bold text-gray-800">Durians SAC</span>
              <p className="text-md text-primary">Yurimaguas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción final */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Prefiere hablar con un asesor?</h2>
            <p className="text-lg mb-8">
              Nuestro equipo de ventas está listo para atenderle y resolver todas sus dudas sobre productos y precios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                className="bg-[#FC602E] hover:bg-[#e55525] text-white py-3 px-8 rounded-lg flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 