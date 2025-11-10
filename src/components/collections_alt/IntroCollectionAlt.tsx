import { useInView } from '../../utils/useInView';

export default function IntroCollectionAlt() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section className="py-14 md:py-18 bg-white">
      <div
        ref={ref}
        className={`mx-auto max-w-[800px] px-6 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <h2 className="font-serif text-3xl md:text-4xl text-[#6B4A4E] tracking-tight">
          La Collezione
        </h2>
        <div className="w-20 h-[1px] bg-[#E8BFC7] mx-auto mt-4 mb-6" aria-hidden="true"></div>
        <p className="font-sans text-[#4a3b3d]">
          Scopri la nostra filosofia, artigianalità e Made in Italy in ogni capo.
        </p>
      </div>
    </section>
  );
}