import { useEffect } from 'react';
import Contact from '../components/Contact';

function Contatti() {
  useEffect(() => {
    document.title = 'Contatti | SweetyLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Prenota la tua consulenza e contatta SweetyLab: ti accompagniamo nella creazione del tuo abito da sposa su misura.');
    }
  }, []);
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <Contact />
    </div>
  );
}

export default Contatti;