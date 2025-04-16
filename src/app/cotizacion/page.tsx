import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

export default function CotizacionPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fachada.jpg"
            alt="Solicitar cotización - Cerámicos Alva"
            fill
            priority
            className="object-cover object-center"
            style={{ 
              filter: "brightness(0.7)" 
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Solicitar Cotización</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Obtén un presupuesto personalizado para tus proyectos de construcción con nuestros ladrillos de arcilla.
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulario de Cotización */}
            <div className="lg:col-span-2 bg-gray-light p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Solicitud de Cotización</h2>
              <form className="space-y-6">
                {/* Información Personal */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Información Personal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1">
                        Nombre <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="apellido" className="block text-sm font-medium text-foreground mb-1">
                        Apellido <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tu apellido"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Información de Contacto</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Correo Electrónico <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="tu@ejemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1">
                        Teléfono <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Teléfono de contacto"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Información de la Empresa */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Información de la Empresa (opcional)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-foreground mb-1">
                        Nombre de la Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <label htmlFor="ruc" className="block text-sm font-medium text-foreground mb-1">
                        RUC
                      </label>
                      <input
                        type="text"
                        id="ruc"
                        name="ruc"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Número de RUC"
                      />
                    </div>
                  </div>
                </div>

                {/* Información del Proyecto */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Información del Proyecto</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="tipo_proyecto" className="block text-sm font-medium text-foreground mb-1">
                        Tipo de Proyecto <span className="text-danger">*</span>
                      </label>
                      <select
                        id="tipo_proyecto"
                        name="tipo_proyecto"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Seleccione el tipo de proyecto</option>
                        <option value="vivienda">Vivienda unifamiliar</option>
                        <option value="edificio">Edificio multifamiliar</option>
                        <option value="comercial">Local comercial</option>
                        <option value="industrial">Construcción industrial</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ubicacion" className="block text-sm font-medium text-foreground mb-1">
                        Ubicación del Proyecto <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="ubicacion"
                        name="ubicacion"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ciudad o distrito donde se realizará la obra"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="fecha_inicio" className="block text-sm font-medium text-foreground mb-1">
                        Fecha estimada de inicio
                      </label>
                      <input
                        type="date"
                        id="fecha_inicio"
                        name="fecha_inicio"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Productos de Interés <span className="text-danger">*</span></h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="pandereta"
                        name="productos"
                        value="pandereta"
                        className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      />
                      <label htmlFor="pandereta" className="ml-2 block text-sm text-foreground">
                        Pandereta rayas
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="techo12"
                        name="productos"
                        value="techo12"
                        className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      />
                      <label htmlFor="techo12" className="ml-2 block text-sm text-foreground">
                        Techo 12
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="king_kong"
                        name="productos"
                        value="king_kong"
                        className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      />
                      <label htmlFor="king_kong" className="ml-2 block text-sm text-foreground">
                        King Kong 18 huecos
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="segunda"
                        name="productos"
                        value="segunda"
                        className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      />
                      <label htmlFor="segunda" className="ml-2 block text-sm text-foreground">
                        Ladrillos de segunda
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cantidades */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Cantidades Estimadas <span className="text-danger">*</span></h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cantidad_millares" className="block text-sm font-medium text-foreground mb-1">
                        Cantidad (en millares)
                      </label>
                      <input
                        type="number"
                        id="cantidad_millares"
                        name="cantidad_millares"
                        min="1"
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ej: 5 millares"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="detalles_adicionales" className="block text-sm font-medium text-foreground mb-1">
                        Detalles adicionales sobre cantidades
                      </label>
                      <textarea
                        id="detalles_adicionales"
                        name="detalles_adicionales"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Especifique cantidades por tipo de producto si es necesario"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Servicios adicionales */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Servicios Adicionales</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transporte"
                        name="servicios"
                        value="transporte"
                        className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      />
                      <label htmlFor="transporte" className="ml-2 block text-sm text-foreground">
                        Transporte al lugar de la obra
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="descarga"
                        name="servicios"
                        value="descarga"
                        className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      />
                      <label htmlFor="descarga" className="ml-2 block text-sm text-foreground">
                        Servicio de descarga
                      </label>
                    </div>
                  </div>
                </div>

                {/* Comentarios */}
                <div>
                  <label htmlFor="comentarios" className="block text-sm font-medium text-foreground mb-1">
                    Comentarios o Información Adicional
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="¿Hay algo más que debamos saber sobre tu proyecto?"
                  ></textarea>
                </div>

                {/* Términos y condiciones */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terminos"
                      name="terminos"
                      type="checkbox"
                      className="h-4 w-4 text-primary border-gray-medium rounded focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terminos" className="text-foreground">
                      Acepto que Cerámicos Alva utilice mis datos para procesar esta solicitud y contactarme. <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Button type="submit" color="primary" size="lg" fullWidth>
                    Enviar Solicitud de Cotización
                  </Button>
                </div>
              </form>
            </div>

            {/* Información del Proceso */}
            <div className="space-y-8">
              <div className="bg-gray-light p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Proceso de Cotización</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                      1
                    </div>
                    <div>
                      <p className="text-gray-dark">
                        <span className="font-medium text-foreground">Envío del formulario:</span> Complete y envíe el formulario con todos los detalles de su proyecto.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                      2
                    </div>
                    <div>
                      <p className="text-gray-dark">
                        <span className="font-medium text-foreground">Análisis de requerimientos:</span> Nuestro equipo analizará sus necesidades específicas.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                      3
                    </div>
                    <div>
                      <p className="text-gray-dark">
                        <span className="font-medium text-foreground">Elaboración de cotización:</span> Preparamos un presupuesto detallado según sus requerimientos.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                      4
                    </div>
                    <div>
                      <p className="text-gray-dark">
                        <span className="font-medium text-foreground">Envío y seguimiento:</span> Recibirá su cotización en un plazo máximo de 24 horas hábiles.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Información de Contacto Directo */}
              <div className="bg-primary/10 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-dark">Contacto Directo</h3>
                <p className="text-gray-dark mb-4">
                  Si prefiere una atención más personalizada, puede contactarnos directamente a través de:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-dark font-medium">951 875 432</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:ventas@ceramicosalva.com" className="text-gray-dark font-medium hover:text-primary">
                    ceramicosalva@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-dark font-medium">
                      Carrt. Fernando Belaunde T. Km. 08, <br />Caserío "Las Delicias", <br />Rioja - San Martín
                    </span>
                  </div>
                </div>
              </div>

              {/* Preguntas Frecuentes */}
              <div className="bg-gray-light p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Preguntas Frecuentes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-foreground font-medium mb-1">¿Cuánto tiempo tarda en llegar mi cotización?</h4>
                    <p className="text-gray-dark">Todas las solicitudes son procesadas en un plazo máximo de 24 horas hábiles.</p>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">¿Ofrecen descuentos por volumen?</h4>
                    <p className="text-gray-dark">Sí, contamos con precios especiales para compras al por mayor.</p>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">¿Cuál es el pedido mínimo?</h4>
                    <p className="text-gray-dark">Aceptamos pedidos desde 1 millar. Para cantidades menores, consúltenos directamente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes Satisfechos */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Clientes Satisfechos</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Empresas y constructores que confían en la calidad de nuestros productos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
              <span className="text-lg font-bold text-gray-dark">Constructora Pérez</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
              <span className="text-lg font-bold text-gray-dark">Inmobiliaria San Martín</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
              <span className="text-lg font-bold text-gray-dark">Constructora Rioja</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
              <span className="text-lg font-bold text-gray-dark">Grupo Constructor Amazonas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción final */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Prefiere hablar con un asesor?</h2>
            <p className="text-lg mb-8">
              Nuestro equipo de ventas está listo para atenderle y resolver todas sus dudas.
            </p>
            <Button color="secondary" size="lg">
              <Link href="/contacto">Contáctanos directamente</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 