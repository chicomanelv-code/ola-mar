import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-title", { y: 120, opacity: 0, duration: 1.2, ease: "power4.out" })
      .from(".hero-sub", { opacity: 0, duration: 1 }, "-=0.7")
      .from(".hero-img", { scale: 1.1, opacity: 0, duration: 1.8, ease: "expo.out" }, "-=1");
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen bg-[#fcfaf8]">
      <nav className="flex justify-between p-10 uppercase tracking-[0.2em] text-[10px] font-bold text-stone-400">
        <span className="text-stone-900">Ola Mar</span>
        <div className="space-x-8">
          <a href="#" className="hover:text-stone-900 transition-colors">Colección</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Contacto</a>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center pt-12 px-6">
        <div className="overflow-hidden">
          <h1 className="hero-title text-8xl md:text-[12rem] font-black tracking-tighter text-[#4a3728] uppercase leading-none">
            Mokka
          </h1>
        </div>
        <p className="hero-sub mt-6 text-stone-400 uppercase tracking-[0.5em] text-[11px] font-light">
          Performance & Luxury Gymwear
        </p>
        
        {/* Espacio para tu imagen Pro */}
        <div className="hero-img mt-16 w-full max-w-lg aspect-[3/4] bg-stone-200 rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
           <img 
             src="/mokka-hero.jpg" 
             alt="Ola Mar Mokka Set" 
             className="w-full h-full object-cover"
             onError={(e) => e.currentTarget.style.display = 'none'} 
           />
        </div>
      </section>
    </main>
  );
}
export default App;