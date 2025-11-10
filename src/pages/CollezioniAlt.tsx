import HeroMinimal from '../components/collections_alt/HeroMinimal';
import PhilosophyMini from '../components/collections_alt/PhilosophyMini';
import CtaSoft from '../components/collections_alt/CtaSoft';
import ItemsGridAlt from '../components/collections_alt/ItemsGridAlt';
import TailorServiceAlt from '../components/collections_alt/TailorServiceAlt';
import StoryLabAlt from '../components/collections_alt/StoryLabAlt';

import heroImage from '../assets/creazione-08-1024.jpg';

export default function CollezioniAlt() {

  return (
    <main className="min-h-screen bg-paper">
      <HeroMinimal
        image={heroImage}
        title="Collezioni"
        subtitle="Mini collezioni artigianali, pezzi unici Made in Italy"
        microcopy=""
        ctaHref="/collezione"
        ctaLabel="Esplora la Collezione"
        align="left"
      />



      {/* Griglia capi 2-3 colonne con hover info */}
      <ItemsGridAlt />



      {/* Servizio su misura */}
      <TailorServiceAlt />

      {/* Artigianalità / Made in Italy / Inclusività / Sostenibilità */}
      <PhilosophyMini />

      {/* Storia / Filosofia / Laboratorio */}
      <StoryLabAlt />
      <CtaSoft />
    </main>
  );
}