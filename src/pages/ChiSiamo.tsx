import About from '../components/About';

function ChiSiamo() {
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <About />
    </div>
  );
}

export default ChiSiamo;