import { usePageMeta } from '../utils/usePageMeta';
import About from '../components/About';

function ChiSiamo() {
  usePageMeta(
    'Chi siamo | Abiti su misura SweetyLab',
    'Conosci Eleonora e Veronica: esperienza, passione e cura artigianale per abiti e capi su misura per ogni occasione.'
  );
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <About />
    </div>
  );
}

export default ChiSiamo;