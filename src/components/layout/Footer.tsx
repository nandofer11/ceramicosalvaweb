import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Column 1: Company Info */}
          <div className="space-y-3 text-white text-center md:text-left">
            <Link href="/" className="inline-block">
              <Image src="/images/logo_white.png" alt="Cerámicos Alva" width={100} height={100} />
            </Link>
            <p className="text-sm text-white">
              Empresa Riojana dedicada a la fabricación y venta de ladrillos de arcilla quemada.
            </p>
            <div className="pt-1">
              <p className="text-sm text-white">
                RUC: 20493861922
              </p>
            </div>
          </div>

          {/* En móviles: Menu y Productos en dos columnas */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {/* Column 2: Quick Links - Mobile */}
            <div>
              <h3 className="text-white font-bold mb-3">Menu</h3>
              <ul className="space-y-2 text-white">
                <li>
                  <Link
                    href="/"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/empresa"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Nuestra Empresa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cotizacion"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Solicitar cotización
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Products - Mobile */}
            <div>
              <h3 className="text-white font-bold mb-3">Productos</h3>
              <ul className="space-y-2 text-white">
                <li>
                  <Link
                    href="/productos#pandereta"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Pandereta rayas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos#techo"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Techo 12
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos#king-kong"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    King Kong 18 huecos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos#segunda"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Ladrillos de segunda
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Quick Links - Desktop */}
          <div className="hidden md:block">
            <h3 className="text-white font-bold mb-3">Menu</h3>
            <ul className="space-y-2 text-white">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/empresa"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Nuestra Empresa
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/cotizacion"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Solicitar cotización
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products - Desktop */}
          <div className="hidden md:block">
            <h3 className="text-white font-bold mb-3">Productos</h3>
            <ul className="space-y-2 text-white">
              <li>
                <Link
                  href="/productos#pandereta"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Pandereta rayas
                </Link>
              </li>
              <li>
                <Link
                  href="/productos#techo"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Techo 12
                </Link>
              </li>
              <li>
                <Link
                  href="/productos#king-kong"
                  className="text-sm hover:text-primary transition-colors"
                >
                  King Kong 18 huecos
                </Link>
              </li>
              <li>
                <Link
                  href="/productos#segunda"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Ladrillos de segunda
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-3">Contacto</h3>
            <div className="space-y-3 text-white">
              <p className="text-sm flex items-start">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Carrt. Fernando Belaunde T. Km. 08, Caserío &ldquo;Las Delicias&rdquo;, Rioja - San Martín</span>
              </p>
              <p className="text-sm flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ceramicosalva@gmail.com" className="hover:text-primary transition-colors">
                  ceramicosalva@gmail.com
                </a>
              </p>
              <p className="text-sm flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+51934298434" className="hover:text-primary transition-colors">
                  +51 934 298 434
                </a>
              </p>
              <p className="text-sm flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <a
                  href="https://www.facebook.com/CeramicosAlva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Cerámicos Alva
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-medium mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-white">
          <p className="text-sm text-center md:text-left">
            © {currentYear} Cerámicos Alva EIRL. Todos los derechos reservados.
          </p>
          <div className="mt-2 md:mt-0">
            <p className="text-sm text-white">
              Cerámicos Alva 💚
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 