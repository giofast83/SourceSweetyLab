import { useEffect } from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';

function Home() {
  useEffect(() => {
    document.title = 'Abiti da sposa su misura | SweetyLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Atelier SweetyLab: abiti da sposa su misura. Creiamo il tuo sogno con passione e professionalità. Scopri le nostre creazioni e prenota una consulenza.');
    } else {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      m.setAttribute('content', 'Atelier SweetyLab: abiti da sposa su misura. Creiamo il tuo sogno con passione e professionalità. Scopri le nostre creazioni e prenota una consulenza.');
      document.head.appendChild(m);
    }
  }, []);
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