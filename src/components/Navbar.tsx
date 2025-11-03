import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const onHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contatti', href: '/contatti' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`${onHome && !hasScrolled
        ? 'bg-transparent backdrop-blur-0 shadow-none border-transparent'
        : 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20'
      } fixed w-full top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`flex justify-between items-center h-20 ${onHome && !hasScrolled ? 'md:opacity-0 md:pointer-events-none' : 'md:opacity-100 md:pointer-events-auto'}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className={`${onHome && !hasScrolled ? 'hidden md:flex' : 'flex'} items-center gap-1 sm:gap-2 group transition-all duration-300 hover:scale-105`}
          >
            <img
              src={logoSweetyLab}
              alt="SweetyLab Logo"
              className="h-16 w-auto object-contain"
              style={{ filter: 'invert(18%) sepia(71%) saturate(4571%) hue-rotate(313deg) brightness(95%) contrast(98%)' }}
            />
          </Link>

          {/* Desktop Menu (sempre visibile su desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-500/25'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 hover:shadow-md'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full animate-pulse opacity-20"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Burger menu: visibile solo su mobile, posizionato a destra */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-pink-600 hover:text-pink-700 focus:outline-none focus:text-pink-700 transition-all duration-300 hover:bg-pink-50/80 rounded-full hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-2 bg-white/90 backdrop-blur-sm border-t border-pink-100 rounded-2xl shadow-xl">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-500/25'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 hover:shadow-md'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMenuOpen ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;