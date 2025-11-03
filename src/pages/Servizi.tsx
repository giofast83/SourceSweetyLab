import { useEffect } from 'react';
import Approach from '../components/Approach';

function Servizi() {
  useEffect(() => {
    document.title = 'Servizi | SweetyLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Consulenza personalizzata, creazione su misura e accompagnamento: scopri il nostro metodo per il tuo abito da sogno.');
    }
  }, []);
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <Approach />
    </div>
  );
}

export default Servizi;