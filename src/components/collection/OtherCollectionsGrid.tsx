import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

type GridItem = {
  title: string;
  description?: string;
  image: string;
  href: string;
};

type Props = {
  title?: string;
  items: GridItem[];
  align?: 'left' | 'center';
  background?: 'none' | 'cipria' | 'contactCard';
};

// Griglia statica di altre collezioni: niente slider, niente cursori, niente barra di scorrimento.
export default function OtherCollectionsGrid({ title = 'Altre collezioni', items, align = 'left', background = 'none' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const bgClass = background === 'cipria'
    ? 'bg-cipria-50'
    : background === 'contactCard'
      ? 'bg-gradient-to-br from-pink-50 to-amber-50'
      : '';
  return (
    <section ref={ref} className={`w-full py-12 md:py-18 ${bgClass} sl-fade-section ${inView ? 'sl-fade-in' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <div className={`${align === 'center' ? 'text-center' : 'text-left'} mb-6 md:mb-8`}>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 tracking-tight">{title}</h2>
          </div>
        )}

        {/* Griglia responsive: 1 colonna su mobile, 2 su tablet, 3 su desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className="group relative block overflow-hidden rounded-md border border-neutral-200 bg-white focus:outline-none"
              aria-label={`Apri collezione: ${item.title}`}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Overlay gradiente minimo per leggibilità */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-serif" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.7)' }}>{item.title}</h3>
                    {item.description && (
                      <p className="text-white/90 text-base" style={{ textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}