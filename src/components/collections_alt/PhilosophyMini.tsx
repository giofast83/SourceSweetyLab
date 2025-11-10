import { useInView } from '../../utils/useInView';

export default function PhilosophyMini() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const items = [
    {
      title: 'Artigianalità',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B4A4E" strokeWidth="1.5">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
        </svg>
      ),
    },
    {
      title: 'Made in Italy',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B4A4E" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="1" />
          <path d="M9 6v12M15 6v12" />
        </svg>
      ),
    },
    {
      title: 'Inclusività',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B4A4E" strokeWidth="1.5">
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21a7 7 0 0114 0" />
        </svg>
      ),
    },
    {
      title: 'Sostenibilità',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B4A4E" strokeWidth="1.5">
          <path d="M12 2v5" />
          <path d="M5 9c2 0 3-3 7-3s5 3 7 3c0 7-7 11-7 11S5 16 5 9z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-14 bg-white">
      <div className={`mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 items-start transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center text-center">
            <div className="mb-3">{it.icon}</div>
            <div className="font-sans text-sm text-[#4a3b3d]">{it.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}