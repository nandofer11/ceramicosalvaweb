import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

export default function EmpresaPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/empresa-hero.jpg"
            alt="Fábrica de Cerámicos Alva"
            fill
            priority
            className="object-cover object-center"
            style={{ 
              filter: "brightness(0.7)" 
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestra Empresa</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Conozca más sobre Cerámicos Alva, nuestra historia, misión, visión y compromiso con la calidad.
          </p>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Quiénes Somos</h2>
              <p className="text-gray-dark mb-4">
                <span className="font-semibold text-foreground">Cerámicos Alva EIRL</span> es una empresa riojana dedicada a la fabricación y venta de ladrillos de arcilla, comprometida con ofrecer productos de calidad para el sector construcción en la región San Martín.
              </p>
              <p className="text-gray-dark mb-4">
                Fundada en el año 2008, hemos crecido constantemente gracias a la confianza de nuestros clientes y a la calidad de nuestros productos. Nuestra planta de producción está ubicada en el Caserío "Las Delicias", en el kilómetro 8 de la Carretera Fernando Belaunde Terry, en Rioja, San Martín.
              </p>
              <p className="text-gray-dark">
                Contamos con tecnología adecuada y personal capacitado para garantizar la producción de ladrillos que cumplen con los estándares de calidad exigidos por la industria de la construcción.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/empresa-quienes-somos.jpg"
                alt="Instalaciones de Cerámicos Alva"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Nuestra Misión</h3>
              <p className="text-gray-dark">
                Fabricar y comercializar productos de arcilla de alta calidad que satisfagan las necesidades del sector construcción en la región San Martín, brindando soluciones confiables, sostenibles y económicas a nuestros clientes, y contribuyendo al desarrollo de nuestra comunidad.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Nuestra Visión</h3>
              <p className="text-gray-dark">
                Ser reconocidos como la empresa líder en la fabricación y comercialización de ladrillos de arcilla en la región San Martín, distinguiéndonos por la calidad de nuestros productos, la innovación en nuestros procesos y nuestro compromiso con el desarrollo sostenible y el medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Valores</h2>
            <p className="text-lg text-gray-dark max-w-3xl mx-auto">
              En Cerámicos Alva nos guiamos por valores fundamentales que definen nuestra cultura organizacional y nuestra forma de trabajar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Valor 1 */}
            <div className="p-6 bg-gray-light rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad</h3>
              <p className="text-gray-dark">
                Nos esforzamos por ofrecer productos de la más alta calidad, controlando rigurosamente cada etapa de nuestro proceso productivo.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="p-6 bg-gray-light rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsabilidad</h3>
              <p className="text-gray-dark">
                Asumimos nuestros compromisos con seriedad, cumpliendo con los plazos de entrega y especificaciones acordadas con nuestros clientes.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="p-6 bg-gray-light rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integridad</h3>
              <p className="text-gray-dark">
                Actuamos con honestidad, transparencia y ética en todas nuestras operaciones y relaciones comerciales.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="p-6 bg-gray-light rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compromiso ambiental</h3>
              <p className="text-gray-dark">
                Buscamos implementar prácticas sostenibles en nuestros procesos para minimizar el impacto ambiental y contribuir a la conservación de los recursos naturales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Nuestra Historia</h2>
          
          <div className="relative">
            {/* Línea de tiempo vertical */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary"></div>
            
            <div className="space-y-12">
              {/* Evento 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-foreground mb-2">2008</h3>
                  <p className="text-gray-dark">
                    Fundación de Cerámicos Alva como un pequeño emprendimiento familiar en Rioja, San Martín.
                  </p>
                </div>
                <div className="relative hidden md:block z-10 w-10 h-10 rounded-full bg-primary border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <div className="bg-white p-4 rounded-lg shadow-md md:invisible md:h-0 md:p-0 md:shadow-none">
                    <h3 className="text-xl font-semibold text-foreground mb-2 md:hidden">2008</h3>
                    <div className="aspect-w-16 aspect-h-9 md:hidden">
                      <Image 
                        src="/images/historia-2008.jpg"
                        alt="Fundación de Cerámicos Alva en 2008"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Evento 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 md:invisible md:h-0">
                  <div className="bg-white p-4 rounded-lg shadow-md md:p-0 md:shadow-none">
                    <h3 className="text-xl font-semibold text-foreground mb-2 md:hidden">2012</h3>
                    <div className="aspect-w-16 aspect-h-9 md:hidden">
                      <Image 
                        src="/images/historia-2012.jpg"
                        alt="Expansión de planta en 2012"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block z-10 w-10 h-10 rounded-full bg-primary border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <h3 className="text-xl font-semibold text-foreground mb-2">2012</h3>
                  <p className="text-gray-dark">
                    Expansión de la planta de producción y adquisición de nueva maquinaria para aumentar la capacidad productiva.
                  </p>
                </div>
              </div>

              {/* Evento 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-foreground mb-2">2015</h3>
                  <p className="text-gray-dark">
                    Incorporación de nuevos productos a nuestra línea de producción, incluyendo el King Kong 18 huecos.
                  </p>
                </div>
                <div className="relative hidden md:block z-10 w-10 h-10 rounded-full bg-primary border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <div className="bg-white p-4 rounded-lg shadow-md md:invisible md:h-0 md:p-0 md:shadow-none">
                    <h3 className="text-xl font-semibold text-foreground mb-2 md:hidden">2015</h3>
                    <div className="aspect-w-16 aspect-h-9 md:hidden">
                      <Image 
                        src="/images/historia-2015.jpg"
                        alt="Nuevos productos en 2015"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Evento 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 md:invisible md:h-0">
                  <div className="bg-white p-4 rounded-lg shadow-md md:p-0 md:shadow-none">
                    <h3 className="text-xl font-semibold text-foreground mb-2 md:hidden">2019</h3>
                    <div className="aspect-w-16 aspect-h-9 md:hidden">
                      <Image 
                        src="/images/historia-2019.jpg"
                        alt="Servicio de transporte en 2019"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block z-10 w-10 h-10 rounded-full bg-primary border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <h3 className="text-xl font-semibold text-foreground mb-2">2019</h3>
                  <p className="text-gray-dark">
                    Implementación del servicio de transporte y descarga para ofrecer una solución integral a nuestros clientes.
                  </p>
                </div>
              </div>

              {/* Evento 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-foreground mb-2">2023</h3>
                  <p className="text-gray-dark">
                    Ampliación de las zonas de cobertura para atender a más ciudades de la región San Martín.
                  </p>
                </div>
                <div className="relative hidden md:block z-10 w-10 h-10 rounded-full bg-primary border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <div className="bg-white p-4 rounded-lg shadow-md md:invisible md:h-0 md:p-0 md:shadow-none">
                    <h3 className="text-xl font-semibold text-foreground mb-2 md:hidden">2023</h3>
                    <div className="aspect-w-16 aspect-h-9 md:hidden">
                      <Image 
                        src="/images/historia-2023.jpg"
                        alt="Ampliación de cobertura en 2023"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Evento Actual */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 md:invisible md:h-0">
                  <div className="bg-white p-4 rounded-lg shadow-md md:p-0 md:shadow-none">
                    <h3 className="text-xl font-semibold text-foreground mb-2 md:hidden">Hoy</h3>
                    <div className="aspect-w-16 aspect-h-9 md:hidden">
                      <Image 
                        src="/images/historia-hoy.jpg"
                        alt="Cerámicos Alva hoy"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block z-10 w-10 h-10 rounded-full bg-secondary border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">!</span>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Hoy</h3>
                  <p className="text-gray-dark">
                    Seguimos creciendo y mejorando continuamente para ofrecer los mejores productos y servicios a nuestros clientes en toda la región.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 