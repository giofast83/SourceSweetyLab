import Portfolio from '../components/Portfolio';

function PortfolioPage() {
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <Portfolio />
    </div>
  );
}

export default PortfolioPage;