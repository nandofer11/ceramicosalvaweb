'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Empresa', path: '/empresa' },
    { name: 'Productos', path: '/productos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <span className="text-xl md:text-2xl font-bold text-primary">Cerámicos Alva</span> */}
            <Image src="/images/logo_color.png" alt="Cerámicos Alva" width={120} height={120} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`relative font-medium text-sm transition-colors
                  group
                  ${pathname === item.path 
                    ? 'text-primary font-semibold' 
                    : 'text-secondary hover:text-primary-dark'
                  }`}
              >
                {item.name}
                <span 
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 
                    ${pathname === item.path ? 'w-full' : 'group-hover:w-full'}`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm">
              <Link href="/cotizacion">Solicitar cotización</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 bg-background
          ${isMenuOpen ? 'max-h-96 border-b border-gray-medium shadow-lg' : 'max-h-0'}
        `}
      >
        <div className="container mx-auto px-4 py-3 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block py-3 px-2 rounded-md ${
                pathname === item.path
                  ? 'bg-primary-light/10 text-primary font-medium'
                  : 'text-foreground hover:bg-gray-light'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 pb-3">
            <Button variant="filled" fullWidth>
              <Link href="/cotizacion">Solicitar cotización</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 