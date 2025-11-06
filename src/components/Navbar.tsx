import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    <nav className="bg-cipria-50/80 backdrop-blur-md shadow-lg border-b border-cipria-200/40 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo originale */}
          <Link to="/" className="flex items-center group transition-all duration-300">
            <img src={logoSweetyLab} alt="SweetyLab" className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-cipria-500 to-cipria-600 shadow-lg shadow-cipria-500/25'
                    : 'text-gray-700 hover:text-cipria-600 hover:bg-cipria-50/80 hover:shadow-md'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cipria-500 to-cipria-600 rounded-full animate-pulse opacity-20"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-cipria-600 focus:outline-none focus:text-cipria-600 transition-all duration-300 hover:bg-cipria-50/80 rounded-full hover:scale-110"
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
          <div className="px-2 pt-2 pb-3 space-y-2 bg-cipria-50/90 backdrop-blur-sm border-t border-cipria-100 rounded-b-2xl shadow-xl">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-cipria-500 to-cipria-600 shadow-lg shadow-cipria-500/25'
                    : 'text-gray-700 hover:text-cipria-600 hover:bg-cipria-50/80 hover:shadow-md'
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
