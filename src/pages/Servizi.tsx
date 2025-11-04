import { usePageMeta } from '../utils/usePageMeta';
import Approach from '../components/Approach';
import Breadcrumbs from '../components/Breadcrumbs';

function Servizi() {
  usePageMeta(
    'Servizi | Abiti su misura SweetyLab',
    'Servizi SweetyLab: abiti e capi su misura per cerimonia, eventi e quotidiano. Sartoria artigianale, personalizzazione e consulenza dedicata.'
  );
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs currentLabel="Servizi" />
      </div>
      <Approach />
    </div>
  );
}

export default Servizi;