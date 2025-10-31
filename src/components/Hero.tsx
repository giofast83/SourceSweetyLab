import { Calendar, Sparkles } from 'lucide-react';
import heroBg from '../assets/pexels-zvolskiy-1676133.jpg';

function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 bg-white/50 z-5"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-12 h-12 text-pink-500" strokeWidth={1.5} />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl text-gray-800 mb-6 leading-tight">
          Il tuo abito da sogno,<br />
          <span className="text-pink-700">creato su misura per te</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Eleonora e Veronica ti guidano con cura e professionalità in ogni dettaglio del tuo giorno speciale.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToContact}
            className="group px-8 py-4 bg-pink-600 text-white rounded-full text-lg font-medium hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Prenota la tua consulenza
          </button>

          <button
            onClick={scrollToPortfolio}
            className="px-8 py-4 bg-white text-gray-700 rounded-full text-lg font-medium hover:bg-gray-50 transition-all border-2 border-gray-200"
          >
            Scopri il nostro portfolio
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
