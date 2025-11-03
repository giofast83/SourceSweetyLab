import { useEffect } from 'react';
import About from '../components/About';

function ChiSiamo() {
  useEffect(() => {
    document.title = 'Chi siamo | SweetyLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Conosci Eleonora e Veronica: esperienza, passione e cura artigianale per abiti da sposa su misura.');
    }
  }, []);
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <About />
    </div>
  );
}

export default ChiSiamo;