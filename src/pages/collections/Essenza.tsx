import React from 'react';
import CollectionPageLayout from '../../components/collection/CollectionPageLayout';
import HeroSection from '../../components/collection/HeroSection';
import EditorialIntro from '../../components/collection/EditorialIntro';
import EditorialImageBlock from '../../components/collection/EditorialImageBlock';
import LookbookGrid from '../../components/collection/LookbookGrid';
import BookAppointmentCTA from '../../components/collection/BookAppointmentCTA';

// Placeholder immagini prese da assets esistenti del progetto
import heroImg from '../../assets/creazione-05-1024.jpg';
import block1Img from '../../assets/creazione-06-1024.jpg';
import block2Img from '../../assets/creazione-07-1024.jpg';
import block3Img from '../../assets/chi-siamo-1024.jpg';
import look1 from '../../assets/creazione-01-1024.jpg';
import look2 from '../../assets/creazione-02-1024.jpg';
import look3 from '../../assets/creazione-03-1024.jpg';
import look4 from '../../assets/creazione-04-1024.jpg';
import look5 from '../../assets/creazione-05-1024.jpg';
import look6 from '../../assets/creazione-06-1024.jpg';

export default function Essenza() {
  return (
    <CollectionPageLayout>
      {/* 1. HERO fullscreen */}
      <HeroSection title="Essenza" subtitle="Mini collezione a tiratura limitata" image={heroImg} />

      {/* 2. Sezione editoriale */}
      <EditorialIntro>
        <p>
          Essenza è un racconto visivo di forme pure, dettagli sottili e materia che respira. Una narrazione
          minimalista dove l’immagine rimane protagonista e il ritmo visivo lascia spazio alla contemplazione.
        </p>
        <p className="mt-4">
          Ogni pezzo nasce da una ricerca paziente, lavorato per sottrazione. Il risultato è un equilibrio
          naturale, quasi silenzioso, che invita a osservare senza fretta.
        </p>
      </EditorialIntro>

      {/* 3. Galleria fotografica editoriale (layout alternati + parallax) */}
      <EditorialImageBlock image={block1Img} title="Forme essenziali" text="Linee pulite, texture morbide, luce naturale." align="left" />
      <EditorialImageBlock image={block2Img} title="Materia e dettaglio" text="Una presenza discreta, visibile solo da vicino." align="right" />
      <EditorialImageBlock image={block3Img} align="full" />

      {/* 4. Lookbook minimal */}
      <LookbookGrid images={[look1, look2, look3, look4, look5, look6]} />

      {/* 5. CTA finale soft */}
      <BookAppointmentCTA text="Vuoi vedere Essenza dal vivo? Prenota un appuntamento e scopri la collezione in atelier." />
    </CollectionPageLayout>
  );
}