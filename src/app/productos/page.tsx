import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

const products = [
  {
    id: 'pandereta',
    name: 'Pandereta rayas',
    image: '/images/pandereta.png',
    description: 'Ideal para muros divisorios no portantes y tabiquería. Ofrece excelente aislamiento acústico y térmico.',
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
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/slider2.png"
            alt="Productos de Cerámicos Alva"
            fill
            priority
            className="object-cover object-center"
            style={{ 
              filter: "brightness(0.7)" 
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestros Productos</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Ofrecemos ladrillos de arcilla de la más alta calidad para satisfacer las necesidades de su proyecto.
          </p>
        </div>
      </section>

      {/* Productos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Catálogo de Productos</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Conoce nuestra línea completa de ladrillos de arcilla fabricados con tecnología moderna y los más altos estándares de calidad.
            </p>
          </div>

          <div className="space-y-16">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                id={product.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Imagen del producto */}
                <div className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Detalles del producto */}
                <div className={`flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{product.name}</h3>
                  <p className="text-gray-dark mb-6">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Características:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-dark">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Aplicaciones:</h4>
                    <ul className="space-y-2">
                      {product.applications.map((application, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-secondary flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="text-gray-dark">{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button>
                    <Link href="/cotizacion">Solicitar cotización</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Beneficios de nuestros productos</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Nuestros ladrillos de arcilla ofrecen ventajas significativas para su proyecto de construcción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Beneficio 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Alta resistencia</h3>
              <p className="text-gray-dark">
                Nuestros ladrillos son altamente resistentes a la compresión, garantizando la seguridad estructural de su construcción.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Aislamiento térmico</h3>
              <p className="text-gray-dark">
                Proporcionan un excelente aislamiento térmico, manteniendo los ambientes frescos en verano y cálidos en invierno.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Aislamiento acústico</h3>
              <p className="text-gray-dark">
                Reducen la transmisión de ruido, creando espacios más tranquilos y confortables para vivir o trabajar.
              </p>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Durabilidad</h3>
              <p className="text-gray-dark">
                Son altamente resistentes al paso del tiempo, manteniendo sus propiedades estructurales durante décadas.
              </p>
            </div>

            {/* Beneficio 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Económicos</h3>
              <p className="text-gray-dark">
                Ofrecen una excelente relación calidad-precio, reduciendo los costos de construcción a largo plazo.
              </p>
            </div>

            {/* Beneficio 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Resistentes al fuego</h3>
              <p className="text-gray-dark">
                Al ser fabricados con arcilla y sometidos a altas temperaturas, ofrecen una excelente resistencia al fuego.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita asesoría sobre qué producto es mejor para su proyecto?</h2>
            <p className="text-lg mb-8">
              Nuestro equipo está preparado para ayudarle a elegir el ladrillo adecuado según las necesidades específicas de su construcción.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button color="secondary" size="lg">
                <Link href="/contacto">Contáctanos</Link>
              </Button>
              <Button variant="outline" color="secondary" size="lg">
                <Link href="/cotizacion">Solicitar cotización</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 