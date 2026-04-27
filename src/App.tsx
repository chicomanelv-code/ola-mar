import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Smooth Scroll (Lenis) - El alma de un sitio Awwwards
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    // 2. Animación de Texto (Split Type)
    const text = new SplitType('.split-text', { types: 'chars' });
    
    gsap.from(text.chars, {
      y: 100,
      stagger: 0.02,
      duration: 1.5,
      ease: "power4.out",
    });

    // 3. Efecto Parallax en Imágenes
    gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((layer) => {
      const depth = 0.2;
      const movement = -(layer.offsetHeight * depth);
      gsap.to(layer, {
        y: movement,
        ease: "none",
        scrollTrigger: {
          trigger: layer,
          scrub: true
        }
      });
    });

    // 4. Revelación de secciones
    gsap.from(".reveal-box", {
      width: 0,
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: ".reveal-box",
        start: "top 80%"
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#0f0f0f] text-[#e5e5e5] font-['Outfit'] overflow-hidden">
      
      {/* CURSOR CUSTOM (Opcional, muy Awwwards) */}
      <div className="fixed top-0 left-0 w-4 h-4 bg-[#4a3728] rounded-full pointer-events-none z-[999] mix-blend-difference" id="cursor"></div>

      {/* NAV MINIMALISTA */}
      <nav className="fixed w-full z-50 p-10 flex justify-between items-center mix-blend-difference">
        <span className="font-['Syne'] font-extrabold text-2xl tracking-tighter uppercase">Ola Mar</span>
        <div className="flex gap-10 text-[10px] tracking-[0.4em] uppercase font-bold">
          <a href="#" className="hover:line-through">Colección</a>
          <a href="#" className="hover:line-through">Studio</a>
          <a href="#" className="hover:line-through">Shop</a>
        </div>
      </nav>

      {/* HERO: BRUTALISMO MODERNO */}
      <section className="h-screen flex flex-col justify-center items-center relative">
        <div className="overflow-hidden">
          <h1 className="split-text font-['Syne'] text-[18vw] font-extrabold leading-[0.8] uppercase tracking-tighter">
            Ola Mar
          </h1>
        </div>
        <div className="absolute bottom-20 right-10 flex flex-col items-end">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#4a3728] font-bold">Performance & Style</p>
          <div className="w-20 h-[1px] bg-[#4a3728] mt-2"></div>
        </div>
      </section>

      {/* SECCIÓN TRANSICIÓN: TEXTO GRANDE */}
      <section className="py-60 px-10">
        <h2 className="text-5xl md:text-8xl font-['Syne'] font-bold max-w-5xl leading-tight">
          Diseñado para el <span className="italic text-[#4a3728]">movimiento</span>. 
          Creado para la <span className="font-light opacity-50 underline">distinción</span>.
        </h2>
      </section>

      {/* GRID DINÁMICO DE PRODUCTOS */}
      <section className="min-h-screen px-4 flex flex-col md:flex-row gap-4 mb-20">
        <div className="flex-1 h-[120vh] relative overflow-hidden group">
          <div className="reveal-box absolute inset-0 bg-[#4a3728] z-10"></div>
          <img 
            src="/mokka-back.jpg" 
            className="parallax-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
          <div className="absolute bottom-10 left-10 z-20">
            <p className="font-['Syne'] text-4xl font-bold uppercase">Mokka Set</p>
            <p className="text-xs tracking-widest opacity-50">COMPRESSION TECH 2026</p>
          </div>
        </div>

        <div className="flex-1 md:mt-40 h-[100vh] relative overflow-hidden">
          <img 
            src="/mokka-front.jpg" 
            className="parallax-img w-full h-full object-cover" 
          />
          <div className="absolute top-10 right-10 text-right">
            <span className="text-[10px] border border-white/20 px-4 py-2 rounded-full">EDICIÓN LIMITADA</span>
          </div>
        </div>
      </section>

      {/* FOOTER EXPERIMENTAL */}
      <footer className="h-screen flex flex-col justify-between p-10 bg-[#4a3728] text-white">
        <div className="flex justify-between items-start">
          <p className="text-xs uppercase tracking-widest">Ola Mar Studio <br/> Cuenca, Ecuador</p>
          <p className="text-9xl font-['Syne'] font-bold">26'</p>
        </div>
        <div className="text-center pb-10">
          <p className="text-[15vw] font-['Syne'] font-bold tracking-tighter uppercase leading-none">Únete</p>
          <div className="flex justify-center gap-10 mt-10 text-xs font-bold uppercase tracking-widest">
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;