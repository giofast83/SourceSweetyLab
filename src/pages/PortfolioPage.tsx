import { usePageMeta } from '../utils/usePageMeta';
import Portfolio from '../components/Portfolio';
import Breadcrumbs from '../components/Breadcrumbs';

function PortfolioPage() {
  usePageMeta(
    'Portfolio | Abiti su misura SweetyLab',
    'Le nostre creazioni su misura: abiti e capi per cerimonia, eventi e quotidiano. Scopri il portfolio SweetyLab.'
  );
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs currentLabel="Portfolio" />
      </div>
      <Portfolio />
    </div>
  );
}

export default PortfolioPage;