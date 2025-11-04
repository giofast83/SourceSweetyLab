import { usePageMeta } from '../utils/usePageMeta';
import Contact from '../components/Contact';

function Contatti() {
  usePageMeta(
    'Contatti | Abiti su misura SweetyLab',
    'Prenota la tua consulenza e contatta SweetyLab: ti accompagniamo nella creazione del tuo abito o capo su misura.'
  );
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <Contact />
    </div>
  );
}

export default Contatti;