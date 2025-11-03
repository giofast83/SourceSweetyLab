import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <div>
      <Hero />
      <Gallery title="Le nostre creazioni" titleVariant="visible" subtleDivider />
      {/* Sezione recensioni sotto la galleria, con titolo aggiornato e scorrimento netto una alla volta */}
      <Testimonials title="Dicono di noi..." mode="slider" autoAdvance intervalMs={5000} />
    </div>
  );
}

export default Home;