import { useInView } from '../../utils/useInView';

export default function PhilosophyMini() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const items = [
    {
      title: 'Artigianalità',
      description: 'Capi realizzati a mano con cura e precisione nel nostro atelier.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
        </svg>
      ),
    },
    {
      title: 'Made in Italy',
      description: 'Progettati e confezionati in Italia, con filiere selezionate e qualità autentica.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="1" />
          <path d="M9 6v12M15 6v12" />
        </svg>
      ),
    },
    {
      title: 'Inclusività',
      description: 'Abiti pensati per valorizzare ogni corpo e identità, senza compromessi.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21a7 7 0 0114 0" />
        </svg>
      ),
    },
    {
      title: 'Sostenibilità',
      description: 'Materiali responsabili e attenzione al ciclo di vita, per capi che durano.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v5" />
          <path d="M5 9c2 0 3-3 7-3s5 3 7 3c0 7-7 11-7 11S5 16 5 9z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-24">
      <div className={`mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-4 gap-8 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        {items.map((it) => (
          <article
            key={it.title}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 min-h-[14rem] md:min-h-[16rem]"
          >
            <div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center md:mb-6 text-pink-600 shrink-0 md:mx-auto">
                {it.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-800 mb-1 text-left md:text-center">
                  {it.title}
                </h4>
                {it.description && (
                  <p className="text-gray-600 leading-relaxed text-sm mt-2 text-left md:text-center">
                    {it.description}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}