import { useEffect } from 'react';
import Portfolio from '../components/Portfolio';

function PortfolioPage() {
  useEffect(() => {
    document.title = 'Portfolio | SweetyLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Le nostre creazioni: abiti da sposa unici, realizzati su misura. Scopri il portfolio SweetyLab.');
    }
  }, []);
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <Portfolio />
    </div>
  );
}

export default PortfolioPage;