import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png" 
            alt="Fábrica de ladrillos Cerámicos Alva"
            fill
            priority
            className="object-cover object-center"
            // style={{ 
            //   filter: "brightness(1)" 
            // }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
             Contribuyendo al desarrollo de San Martín
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Empresa Riojana dedicada a la fabricación y venta de ladrillos de arcilla quemada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Link href="/productos">Ver productos</Link>
              </Button>
              <Button variant="filled" color="secondary" size="lg">
                <Link href="/cotizacion">Solicitar cotización</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Principales Productos</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Ofrecemos ladrillos de arcilla de primera y segunda calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Producto 1 */}
            <div className="rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-64">
                <Image 
                  src="/images/pandereta.png"
                  alt="Ladrillo Pandereta rayas"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-primary font-semibold mb-2">Pandereta rayas</h3>
                <p className="text-gray-dark mb-4">
                  Ideal para muros divisorios o tabiquería. Ofrece excelente aislamiento acústico y térmico.
                </p>
                <Link 
                  href="/productos#pandereta" 
                  className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                >
                  Ver detalles
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-64">
                <Image 
                  src="/images/techo12.png"
                  alt="Ladrillo Techo 12"
                  width={180}
                  height={180}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-primary font-semibold mb-2">Techo 12</h3>
                <p className="text-gray-dark mb-4">
                  Diseñado específicamente para losas aligeradas. Ofrece alta resistencia y menor peso en la estructura.
                </p>
                <Link 
                  href="/productos#techo" 
                  className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                >
                  Ver detalles
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-64">
                <Image 
                  src="/images/kingkong.png"
                  alt="Ladrillo King Kong 18 huecos"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-primary font-semibold mb-2">King Kong 18 huecos</h3>
                <p className="text-gray-dark mb-4">
                  Perfecto para muros portantes. Alta resistencia sísmica y durabilidad para construcciones seguras.
                </p>
                <Link 
                  href="/productos#king-kong" 
                  className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                >
                  Ver detalles
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button>
              <Link href="/productos">Ver todos los productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">¿Por qué elegir Cerámicos Alva?</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Somos una empresa con varios años de experiencia, comprometida con entregar productos de calidad y con la satisfacción de nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Razón 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-dark font-semibold mb-2">Calidad garantizada</h3>
              <p className="text-gray-dark">
                Contamos con maquinaria industrial para ofrecer productos de calidad y durabilidad.
              </p>
            </div>

            {/* Razón 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-dark font-semibold mb-2">Entrega puntual</h3>
              <p className="text-gray-dark">
                Respetamos los plazos de contrato para que tu proyecto avance sin retrasos.
              </p>
            </div>

            {/* Razón 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-dark font-semibold mb-2">Experiencia regional</h3>
              <p className="text-gray-dark">
                Más de 20 años construyendo junto a las principales ciudades de la región San Martín.
              </p>
            </div>

            {/* Razón 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-dark font-semibold mb-2">Servicios integrales</h3>
              <p className="text-gray-dark">
                Ofrecemos transporte y descarga directamente en el lugar de tu obra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu proyecto?</h2>
            <p className="text-lg mb-8">
              Estamos preparados para asesorarte y ofrecerte los mejores productos para tu construcción.
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

      {/* Zonas de cobertura */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Zonas de Cobertura</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              Atendemos a las principales ciudades de la región San Martín
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Rioja', 'Moyobamba', 'Nueva Cajamarca', 'Soritor', 'Tarapoto', 'Juanjuí'].map((city) => (
              <div key={city} className="bg-gray-light p-4 rounded-lg text-center">
                <span className="text-lg font-medium">{city}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-dark">
              ¿Necesitas entrega en otra localidad? <Link href="/contacto" className="text-primary hover:text-primary-dark">Contáctanos</Link> para consultar disponibilidad.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
