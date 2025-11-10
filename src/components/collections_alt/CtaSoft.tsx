import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

export default function CtaSoft() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <section ref={ref} className="py-0">
      <div className={`mx-auto max-w-3xl px-6 text-center transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-serif text-xl md:text-2xl text-[#6B4A4E]">
          Vuoi provare un capo o scoprire le prossime collezioni?
        </p>
        <div className="mt-6">
          <Link
            to="/contatti"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#E8BFC7] text-[#6B4A4E] bg-[#F6D4D8] hover:bg-[#F3C9CF] rounded-none text-sm tracking-wide transition-colors duration-200"
          >
            Prenota una consulenza
          </Link>
        </div>
      </div>
    </section>
  );
}