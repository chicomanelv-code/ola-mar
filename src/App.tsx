import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Smooth Scroll (Lenis)
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Lógica del Mouse Pro
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // 3. Animación del Hero
    const text = new SplitType('.hero-title-text', { types: 'chars' });
    tl.from(".nav-item", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".logo-hero", { y: 50, opacity: 0, scale: 0.5, duration: 1.5, ease: "expo.out" }, "-=0.5")
      .from(text.chars, { y: 100, opacity: 0, stagger: 0.02, duration: 1, ease: "power4.out" }, "-=1")
      .from(".hero-sub", { opacity: 0, duration: 1 }, "-=0.5");

    // 4. Interacción del Cursor con Menús
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 4, backgroundColor: "rgba(74, 55, 40, 0.1)", border: "1px solid #4a3728" });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#4a3728", border: "none" });
      });
    });

    // 5. SECCIÓN PRODUCTO PINNED
    const section = triggerRef.current;
    const slides = gsap.utils.toArray<HTMLElement>('.product-slide');
    const productTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${slides.length * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    slides.forEach((slide, i) => {
      if (i === 0) return;
      productTl.from(slide, { yPercent: 100, ease: "none" }, i)
               .from(slide.querySelector('.slide-content'), { y: 100, opacity: 0, duration: 0.5 }, i + 0.2);
    });

  }, { scope: container });

  const categories = [
    { title: "Mokka", img: "/mokka-hero.jpg", subtitle: "Colección Signature" },
    { title: "Leggings", img: "/leggings-category.jpg", subtitle: "Tecnología Seamless" },
    { title: "Enterizos", img: "/enterizos-category.jpg", subtitle: "Compresión 360°" },
    { title: "Men", img: "/men-category.jpg", subtitle: "Línea Masculina" },
    { title: "Essentials", img: "/tops-category.jpg", subtitle: "Tops & Shorts" },
  ];

  return (
    <div ref={container} className="bg-[#f8f7f4] text-[#1a1a1a] font-['Outfit'] cursor-none overflow-hidden">
      
      {/* MOUSE CUSTOM (EL PUNTERO PRO) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-[#4a3728] rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      ></div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-[100] p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
        <div className="nav-item text-[10px] tracking-[0.4em] uppercase font-bold">Studio — 2026</div>
        <div className="flex gap-8 nav-item text-[10px] tracking-[0.4em] uppercase font-bold">
          <a href="#" className="hover:opacity-50 transition-opacity">Colección</a>
          <a href="https://wa.me/tu-numero" className="border-b border-white/30 pb-1">Shop</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center relative px-6 text-center">
        <div className="logo-hero w-24 md:w-32 mb-8">
          <img src="/logo-olamar.png" alt="Ola Mar Signature" className="w-full h-auto" />
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-title-text font-['Syne'] text-[12vw] md:text-[9rem] font-extrabold leading-[0.8] uppercase tracking-tighter text-[#4a3728]">
            Ola Mar
          </h1>
        </div>
        <p className="hero-sub mt-8 text-[10px] md:text-xs tracking-[0.8em] uppercase font-light text-stone-400">
          Performance & Luxury Aesthetics
        </p>
      </section>

      {/* SECCIÓN PRODUCTO PINNED */}
      <div ref={triggerRef} className="relative h-screen w-full">
        {categories.map((cat, index) => (
          <section 
            key={index} 
            className={`product-slide absolute inset-0 w-full h-full overflow-hidden ${index === 0 ? 'z-10' : 'z-20'}`}
          >
            <div className="absolute inset-0 w-full h-full bg-stone-200">
               <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="slide-content relative h-full flex flex-col justify-center items-center text-white">
               <span className="text-[10px] tracking-[0.8em] uppercase mb-4 opacity-70">{cat.subtitle}</span>
               <h2 className="text-7xl md:text-[12rem] font-['Syne'] font-bold uppercase tracking-tighter leading-none">{cat.title}</h2>
               <button className="mt-10 px-8 py-3 border border-white/30 rounded-full text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">Explorar</button>
            </div>
          </section>
        ))}
      </div>

      {/* SECCIÓN TECNOLOGÍA SEAMLESS (EL VIDEO) */}
      <section className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold">Innovación Textil</span>
            <h2 className="text-5xl md:text-7xl font-['Syne'] font-bold uppercase tracking-tighter leading-none">
              La ciencia del <br/> <span className="text-[#4a3728]">ajuste perfecto.</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-md">
              Nuestra tecnología <b>Seamless</b> elimina las costuras que causan roces, ofreciendo una textura tan suave que olvidarás que la llevas puesta. Control de abdomen, secado rápido y compresión estratégica.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-stone-100">
              <div>
                <p className="text-xs font-bold uppercase mb-2">Secado Rápido</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">Frescura garantizada</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-2">Sin Costuras</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">Confort 360°</p>
              </div>
            </div>
          </div>
          
          {/* VIDEO CONTAINER */}
          <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl bg-stone-100 relative group">
            <iframe 
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              src="https://www.youtube.com/embed/cxySksdJJvs?autoplay=0&controls=1&rel=0" 
              title="Tecnología Seamless Ola Mar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] pt-32 pb-10 px-10 text-stone-500">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <img src="/logo-olamar.png" alt="Logo" className="w-16 h-auto invert" />
          <div className="grid grid-cols-2 gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            <div className="flex flex-col gap-4"><span className="text-white">Social</span><a href="#">Instagram</a></div>
            <div className="flex flex-col gap-4"><span className="text-white">Location</span><p>Cuenca, Ecuador</p></div>
          </div>
        </div>
        <p className="text-[10vw] font-['Syne'] font-extrabold uppercase tracking-tighter text-stone-900 leading-none">Ola Mar Studio</p>
      </footer>

      <style>{`
        @keyframes scroll-line { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .animate-scroll-line { animation: scroll-line 2s infinite ease-in-out; }
        body { cursor: none; }
        @media (max-width: 768px) { body { cursor: auto; } }
      `}</style>
    </div>
  );
}

export default App;