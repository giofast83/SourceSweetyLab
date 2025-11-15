import imgAtelier from '../../assets/atelier-in-azione-1024.jpg';
import { useInView } from '../../utils/useInView';
import { Link } from 'react-router-dom';

export default function StoryLabAlt() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section ref={ref} className="pt-8 md:pt-10 pb-0 mb-20">
      <div className="relative w-full group">
        <div className={`relative w-full h-[48vh] md:h-[56vh] transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={imgAtelier}
            alt="Il nostro laboratorio in azione"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay scuro su hover per migliorare leggibilità */}
          <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors duration-300" />
          {/* Gradiente dal basso per testo */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/25 to-transparent" />
          {/* Testo dentro l'immagine */}
          <div className="relative z-10 flex h-full items-end">
            <div className="w-full px-6 md:px-12 pb-6 md:pb-10">
              <h3 className="font-serif text-white text-2xl md:text-3xl leading-tight">Storia, filosofia, laboratorio</h3>
              <div className="w-20 h-[1px] bg-[#E8BFC7] mt-3 mb-4" aria-hidden="true" />
              <p className="font-sans text-white/90 max-w-3xl">
                Artigianalità come gesto quotidiano: capi pensati, tagliati e cuciti nel nostro atelier. La sostenibilità è il nostro metodo: filiere selezionate, qualità e durata nel tempo. Made in Italy come valore che unisce persone, territorio e cultura del fare.
              </p>
              <div className="mt-5">
                <Link
                  to="/chi-siamo"
                  className="inline-flex items-center justify-center px-4 py-2 border border-[#E8BFC7] text-white bg-transparent hover:bg-[#F6D4D8]/60 rounded-full text-sm tracking-wide transition-colors duration-200"
                >
                  Scopri
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}