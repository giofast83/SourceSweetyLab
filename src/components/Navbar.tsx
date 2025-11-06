import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

  function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBar, setShowBar] = useState(false); // nascosta al caricamento
  const [scrolled, setScrolled] = useState(false);
  const lastYRef = useRef(0);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contatti', href: '/contatti' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const isLanding = location.pathname === '/' || location.pathname === '/landing';

  // Scroll behavior: hide on fast downward scroll, show on upward; add bg when scrolled
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastYRef.current;
      // Manteniamo lo stato per eventuali usi futuri
      setScrolled(y > 40);
      // Richiesta: al load nascosta; quando si inizia a scrollare rapidamente, compare
      if (y < 10) {
        setShowBar(false);
      } else if (Math.abs(delta) > 25) {
        setShowBar(true);
      }
      lastYRef.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Blocca lo scroll del body quando il menu è aperto
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original || '';
    }
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-transform duration-300 ease-out ${showBar ? 'translate-y-0' : '-translate-y-full'}`}
        aria-label="Main Navigation"
      >
        <div className="bg-cipria-50/80">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo monocromatico, piccolo */}
              <Link to="/" className="flex items-center transition-all duration-300">
                <img
                  src={logoSweetyLab}
                  alt="SweetyLab"
                  className="h-12 md:h-16 w-auto filter grayscale contrast-90 brightness-95"
                />
              </Link>

              {/* Pulsante MENU (desktop + mobile) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="uppercase tracking-[0.25em] text-sm md:text-base text-[#1A1A1A] hover:opacity-70 transition-opacity"
                aria-haspopup="dialog"
                aria-expanded={isMenuOpen}
                aria-controls="menu-overlay"
              >
                MENU
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay full-screen MENU (render fuori dal nav per evitare clipping da transform) */}
      {isMenuOpen && (
        <div
          id="menu-overlay"
          className="fixed inset-0 z-[60] bg-[#F6E7E4] overlay-appear"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute top-0 left-0 right-0 h-16 md:h-20 flex items-center justify-end px-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="uppercase tracking-[0.25em] text-sm text-[#1A1A1A] hover:opacity-70 transition-opacity"
              aria-label="Chiudi menu"
            >
              CHIUDI
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-center text-center px-6">
            <ul className="space-y-6 md:space-y-8">
              {navigation.map((item, i) => (
                <li key={item.name} className="menu-item-appear" style={{ animationDelay: `${i * 120}ms` }}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-[#1A1A1A] uppercase tracking-[0.25em] font-serif text-2xl md:text-3xl lg:text-4xl hover:underline decoration-[#1A1A1A] decoration-[0.5px] underline-offset-8 transition-colors ${
                      isActive(item.href) ? 'opacity-60' : 'opacity-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;