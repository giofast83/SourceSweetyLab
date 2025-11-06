import Approach from '../components/Approach';
import Testimonials from '../components/Testimonials';

function Servizi() {
  return (
    <div className="pt-16 bg-gradient-to-br from-pink-50 via-white to-amber-50 min-h-screen"> {/* Padding top per compensare la navbar fissa */}
      <Approach />
      <Testimonials />
    </div>
  );
}

export default Servizi;