import Link from 'next/link';
import Image from 'next/image';
import StripeBar from '../ui/StripeBar';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* Textura de fondo */}
      {/* <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden /> */}
      <StripeBar className="absolute top-0 left-0 right-0 h-2" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Información de la empresa */}
          <div className="col-span-2 lg:col-span-1 space-y-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo_white.png"
                alt="Cerámicos Alva"
                width={140}
                height={60}
                className="w-auto h-10"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Empresa Riojana dedicada a la fabricación y venta de ladrillos de arcilla quemada.
            </p>
            <p className="text-sm font-display uppercase tracking-widest text-white/50">
              RUC · 20493861922
            </p>
          </div>

          {/* Columna 2: Menú */}
          <div>
            <h3 className="font-display uppercase tracking-widest text-white text-sm font-semibold mb-4">
              Menú
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="hover:text-primary transition-colors">
                  Nuestra Empresa
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-primary transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/cotizacion" className="hover:text-primary transition-colors">
                  Solicitar cotización
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Productos */}
          <div>
            <h3 className="font-display uppercase tracking-widest text-white text-sm font-semibold mb-4">
              Productos
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/productos#pandereta" className="hover:text-primary transition-colors">
                  Pandereta rayas
                </Link>
              </li>
              <li>
                <Link href="/productos#king-kong" className="hover:text-primary transition-colors">
                  King Kong 18 huecos
                </Link>
              </li>
              <li>
                <Link href="/productos#techo-12" className="hover:text-primary transition-colors">
                  Techo 12
                </Link>
              </li>
              <li>
                <Link href="/productos#techo-15" className="hover:text-primary transition-colors">
                  Techo 15
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-display uppercase tracking-widest text-white text-sm font-semibold mb-4">
              Contacto
            </h3>
            <div className="space-y-3.5 text-sm text-white/70">
              <p className="flex items-start">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Carrt. Fernando Belaunde T. Km. 08, Caserío &ldquo;Las Delicias&rdquo;, Rioja - San Martín</span>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ceramicosalva@gmail.com" className="hover:text-primary transition-colors">
                  ceramicosalva@gmail.com
                </a>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+51970584592" className="hover:text-primary transition-colors">
                  +51 970 584 592
                </a>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <a
                  href="https://instagram.com/ceramicosalva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @ceramicosalva
                </a>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <a
                  href="https://tiktok.com/@ceramicosalva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @ceramicosalva
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Fila inferior */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/60 text-center md:text-left">
            © {currentYear} Cerámicos Alva EIRL. Todos los derechos reservados.
          </p>
          <p className="text-sm text-white/60">
            Cerámicos Alva 💚
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;