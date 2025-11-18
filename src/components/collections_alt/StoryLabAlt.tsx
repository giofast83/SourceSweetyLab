import imgAtelier from '../../assets/atelier-in-azione-1024.jpg';
import { useInView } from '../../utils/useInView';
import { Link } from 'react-router-dom';

export default function StoryLabAlt() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section ref={ref} className="pt-8 md:pt-10 pb-0 mb-20">
      <div className="relative w-full">
        {/* Wrapper con stesse dimensioni e bordi dello slideshow Aurora (oc-slide) */}
        <div
          className={`relative w-full max-w-[1280px] mx-auto h-[230px] md:h-[300px] lg:h-[340px] rounded-[18px] md:rounded-[20px] lg:rounded-[22px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={imgAtelier}
            alt="Il nostro laboratorio in azione"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay gradiente come oc-gradient-blush dello slideshow Aurora */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(17, 17, 17, 0.72) 0%, rgba(17, 17, 17, 0.50) 40%, rgba(17, 17, 17, 0.24) 70%, rgba(17, 17, 17, 0.10) 100%)',
            }}
          />

          {/* Testo posizionato in basso a sinistra, dentro l'immagine */}
          <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 z-10">
            <h3 className={`font-serif text-white text-2xl md:text-3xl leading-tight ${inView ? 'sl-fade-up-blur-title' : ''}`}>Storia, filosofia, laboratorio</h3>
            <div className={`w-20 h-[1px] bg-[#E8BFC7] mt-3 mb-4 ${inView ? 'sl-fade-up-blur-subtitle' : ''}`} aria-hidden="true" />
            <p className={`font-sans text-white/90 max-w-xl md:max-w-2xl ${inView ? 'sl-fade-up-blur-subtitle' : ''}`}>
              Artigianalità come gesto quotidiano: capi pensati, tagliati e cuciti nel nostro atelier. La sostenibilità è il nostro metodo: filiere selezionate, qualità e durata nel tempo. Made in Italy come valore che unisce persone, territorio e cultura del fare.
            </p>
            <div className="mt-5">
              <Link
                to="/chi-siamo"
                className={`inline-flex items-center justify-center px-4 py-2 border border-[#E8BFC7] text-white bg-transparent hover:bg-[#F6D4D8]/60 rounded-full text-sm tracking-wide transition-colors duration-200 ${inView ? 'sl-fade-up-blur-cta' : ''}`}
              >
                Scopri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}