import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/preparativi-sposa-1024.jpg';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

function Hero() {
  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToContact = () => {
    navigate('/contatti');
  };

  const goToPortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Immagine con effetto Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover animate-ken-burns"
        />
      </div>
      
      <div className="absolute inset-0 bg-white/50 z-5"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-4 md:space-y-6 -mt-4 md:mt-0">
        {/* Logo in alto, senza eccessivo spazio */}
        <div className="flex justify-center">
          {/* Manteniamo spazio fisso per evitare salto del titolo */}
          <div className="h-24 flex items-center justify-center">
            <img
              src={logoSweetyLab}
              alt="SweetyLab Logo"
              className={`h-24 w-auto object-contain drop-shadow-md transition-all duration-300 ${hasScrolled ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              // Approssimazione colore rosa simile al titolo (pink-700)
              style={{ filter: 'invert(18%) sepia(71%) saturate(4571%) hue-rotate(313deg) brightness(95%) contrast(98%)' }}
            />
          </div>
        </div>
        {/* Titolo e descrizione */}
        <div className="mt-0">
          <h1 className="font-serif h1-responsive md:text-7xl text-gray-800 mb-6 leading-tight tracking-tight max-w-[24ch] mx-auto md:max-w-none">
            <span className="block">Il tuo abito da sogno,</span>
            <span className="block text-pink-700">creato su misura per te</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-4 md:mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Eleonora e Veronica ti guidano con cura e professionalità in ogni dettaglio del tuo giorno speciale.
          </p>
        </div>

        {/* CTA, immediatamente sotto la descrizione */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={goToContact}
            className="group px-8 py-4 bg-pink-600 text-white rounded-full text-lg font-medium hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Prenota la tua consulenza
          </button>

          <button
            onClick={goToPortfolio}
            className="px-8 py-4 bg-white text-gray-700 rounded-full text-lg font-medium hover:bg-gray-50 transition-all border-2 border-gray-200"
          >
            Scopri il nostro portfolio
          </button>
        </div>
      </div>

      {/* Indicatore di scroll (mouse) visibile solo su desktop */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-soft-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
