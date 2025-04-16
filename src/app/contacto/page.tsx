import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

export default function ContactoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
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
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contacto</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Estamos aquí para ayudarte. Contáctanos para resolver tus dudas o solicitar una cotización.
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario de Contacto */}
            <div className="bg-gray-light p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1">
                      Nombre
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
                      Apellido
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
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Correo Electrónico
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
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Teléfono de contacto"
                  />
                </div>
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-foreground mb-1">
                    Asunto
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Seleccione un asunto</option>
                    <option value="informacion">Información de productos</option>
                    <option value="cotizacion">Solicitud de cotización</option>
                    <option value="distribucion">Distribución y ventas</option>
                    <option value="otro">Otro asunto</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-foreground mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  ></textarea>
                </div>
                <Button type="submit" fullWidth>
                  Enviar mensaje
                </Button>
              </form>
            </div>

            {/* Información de Contacto */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-dark mb-6">Información de contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1">Dirección</h3>
                      <p className="text-gray-dark">
                        Carretera Fernando Belaúnde Terry Km. 08<br />
                        Caserío "Las Delicias"<br />
                        Rioja, San Martín - Perú
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1">Teléfonos</h3>
                      <p className="text-gray-dark">
                        WhatsApp: +51 970 584 592
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1">Correo Electrónico</h3>
                      <p className="text-gray-dark">
                      ceramicosalva@gmail.com<br />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1">Horario de Atención</h3>
                      <p className="text-gray-dark">
                        Lunes a Sábados: 8:00 AM - 5:00 PM<br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-dark mb-3">Síguenos en redes sociales</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/CeramicosAlva/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/ceramicosalva/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-10 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Encuéntranos</h2>
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.787124433171!2d-77.22367672463902!3d-6.023933259156747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6d9c0482e2441%3A0x894b3539fe49736f!2sCer%C3%A1micos%20Alva%20EIRL!5e0!3m2!1ses!2spe!4v1744829204099!5m2!1ses!2spe" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre nuestros productos y servicios.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-light p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Hacen envíos a otras regiones del Perú?</h3>
              <p className="text-gray-dark">
                Actualmente nuestro servicio de entrega está disponible exclusivamente en la región San Martín. Sin embargo, podemos coordinar envíos especiales para grandes volúmenes a otras localidades. Contáctanos para más información.
              </p>
            </div>

            <div className="bg-gray-light p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Cuánto tiempo toma recibir una cotización?</h3>
              <p className="text-gray-dark">
                Procesamos todas las solicitudes de cotización en un plazo máximo de 24 horas hábiles. Para consultas urgentes, te recomendamos contactarnos directamente por teléfono.
              </p>
            </div>

            <div className="bg-gray-light p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Ofrecen descuentos para compras al por mayor?</h3>
              <p className="text-gray-dark">
                Sí, contamos con precios especiales para compras en volumen y para proyectos de construcción. El descuento varía según la cantidad y el tipo de productos solicitados.
              </p>
            </div>

            <div className="bg-gray-light p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">¿Tienen servicio de transporte?</h3>
              <p className="text-gray-dark">
                Sí, contamos con servicio de transporte propio para entregas dentro de la región San Martín. El costo del servicio depende de la distancia y el volumen de la compra.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-dark mb-4">
              ¿No encuentras la respuesta que buscas?
            </p>
            <Button>
              <Link href="/cotizacion">Solicitar información</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu proyecto?</h2>
            <p className="text-lg mb-8">
              Nuestro equipo está preparado para asesorarte y ofrecerte los mejores productos para tu construcción.
            </p>
            <Button color="secondary" size="lg">
              <Link href="/cotizacion">Solicitar cotización</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 