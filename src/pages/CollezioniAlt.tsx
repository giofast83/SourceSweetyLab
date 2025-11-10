import HeroMinimal from '../components/collections_alt/HeroMinimal';
import CollectionBlock from '../components/collections_alt/CollectionBlock';
import PhilosophyMini from '../components/collections_alt/PhilosophyMini';
import CtaSoft from '../components/collections_alt/CtaSoft';

import img1 from '../assets/creazione-01-1024.jpg';
import img2 from '../assets/creazione-03-1024.jpg';
import img3 from '../assets/creazione-05-1024.jpg';
import img4 from '../assets/dettagli-artigianali-1024.jpg';

export default function CollezioniAlt() {
  const collections = [
    {
      image: img1,
      title: 'Linea Aurora',
      subtitle: 'Tessuti che respirano luce',
      description: 'Tagli essenziali e dettagli sartoriali per una eleganza quotidiana. Materiali selezionati con cura e filiera responsabile.',
      href: '/collections/aurora',
    },
    {
      image: img2,
      title: 'Nuance di Atelier',
      subtitle: 'La poesia del gesto',
      description: 'Capi realizzati in piccole serie, con finiture a mano e una ricerca sui volumi che valorizza ogni silhouette.',
      href: '/collections/nuance-atelier',
      reversed: true,
    },
    {
      image: img3,
      title: 'Terra & Seta',
      subtitle: 'Materia viva, bellezza autentica',
      description: 'Un incontro tra texture naturali e lucentezza sottile. Pensata per durare nel tempo, oltre le stagioni.',
      href: '/collections/terra-seta',
    },
    {
      image: img4,
      title: 'Dettagli d’Atelier',
      subtitle: 'Intrecci, impunture, cura',
      description: 'Una celebrazione dei particolari che rendono ogni capo unico: dal bottone al punto, dalla fodera alla rifinitura.',
      href: '/collections/dettagli-atelier',
      reversed: true,
    },
  ];

  return (
    <main className="bg-white">
      <HeroMinimal
        image={img4}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-[700px] px-6 text-center">
          <p className="font-sans text-[#4a3b3d]">
            Mini collezioni in tiratura limitata, pensate e realizzate nel nostro laboratorio. Ricerca dei materiali, attenzione al comfort e una sartorialità che racconta storie di persone, corpi e identità. Un approccio sostenibile che privilegia qualità, durata e cura.
          </p>
        </div>
      </section>

      {collections.map((c, idx) => (
        <CollectionBlock
          key={c.title}
          image={c.image}
          title={c.title}
          subtitle={c.subtitle}
          description={c.description}
          href={c.href}
          reversed={Boolean(c.reversed)}
        />
      ))}

      <PhilosophyMini />
      <CtaSoft />
    </main>
  );
}