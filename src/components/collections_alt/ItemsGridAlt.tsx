import { Link } from 'react-router-dom';
import { useState } from 'react';
import imgA from '../../assets/creazione-01-1024.jpg';
import imgB from '../../assets/creazione-03-1024.jpg';
import imgC from '../../assets/creazione-05-1024.jpg';
import imgD from '../../assets/creazione-06-1024.jpg';
import imgE from '../../assets/creazione-07-1024.jpg';
import imgF from '../../assets/creazione-09-1024.jpg';

type Item = {
  images: string[];
  name: string;
  badge?: string;
  price?: string;
  href?: string;
};

const items: Item[] = [
  { images: [imgA, imgB, imgC, imgD], name: 'Abito Atelier', badge: 'Serie limitata', price: 'Su richiesta', href: '/collezione/aurora' },
  { images: [imgB, imgC, imgE, imgF], name: 'Nuance di Atelier', badge: 'Novità', price: 'Su richiesta' },
  { images: [imgC, imgD, imgA, imgF], name: 'Linea Minimal', badge: 'Best seller', price: 'Su richiesta' },
  { images: [imgD, imgA, imgE, imgC], name: 'Vintage Perle', badge: 'Artigianale', price: 'Su richiesta' },
  { images: [imgE, imgF, imgB, imgA], name: 'Sartorial Contemporary', badge: 'Made in Italy', price: 'Su richiesta' },
  { images: [imgF, imgE, imgD, imgC], name: 'Texture Pregiate', badge: 'Responsabile', price: 'Su richiesta' },
];

function ItemCard({ item }: { item: Item }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = item.images[activeIdx] ?? item.images[0];
  return (
    <article className="group border border-gray-100 bg-transparent shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow">
      <Link to={item.href ?? '/collezione'} className="relative aspect-[16/9] w-full overflow-hidden bg-[#f6f1f2] block">
        <img
          src={activeImage}
          alt={`${item.name} - immagine ${activeIdx + 1}`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Full-image dark overlay on hover for better text readability */}
        <div className="absolute inset-0 z-10 bg-neutral-900 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        {item.badge && (
          <span className="absolute top-3 left-3 z-30 inline-flex items-center text-[11px] uppercase tracking-wide text-neutral-700 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-0.5">
            {item.badge}
          </span>
        )}
        {/* Overlay info inside the photo */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="relative px-2 py-2 md:px-3 md:py-3">
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent"></div>
            <div className="relative z-30 flex items-center justify-start gap-3">
              <div>
                <h3 className="font-serif text-white text-sm md:text-base leading-tight">{item.name}</h3>
                <div className="mt-0.5 text-[11px] md:text-sm text-white/85">{item.price || 'Su richiesta'}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* Thumbnails sotto la foto: clic per cambiare l'immagine principale */}
      <div className="px-3 md:px-4 py-1 flex items-center gap-1 border-t border-gray-100 bg-white/40">
        {item.images.slice(0, 4).map((thumb, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            aria-label={`Vedi immagine ${i + 1} di ${item.name}`}
            className={`relative w-7 h-7 md:w-8 md:h-8 rounded-sm overflow-hidden border ${activeIdx === i ? 'border-[#E8BFC7] ring-1 ring-[#E8BFC7]' : 'border-gray-200'} hover:border-[#E8BFC7] transition-colors`}
          >
            <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </article>
  );
}

export default function ItemsGridAlt() {
  return (
    <section className="py-12 md:py-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {items.slice(0, 4).map((it, idx) => (
            <ItemCard key={idx} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}