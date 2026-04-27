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
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animación del Logo y Títulos al entrar
    tl.from(".nav-item", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".logo-main", { scale: 0.8, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.5")
      .from(".split-text .char", { y: 100, stagger: 0.01, duration: 1, ease: "power4.out" }, "-=1");

    // Parallax suave en secciones de imagen
    gsap.to(".parallax-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-container",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#f8f7f4] text-[#1a1a1a] font-['Outfit'] overflow-hidden">
      
      {/* NAVBAR DIVIDIDA (AWWWARDS STYLE) */}
      <nav className="fixed w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white md:text-black md:mix-blend-normal">
        <div className="hidden md:flex gap-10 nav-item text-[9px] tracking-[0.3em] uppercase font-bold">
          <a href="#" className="hover:opacity-50 transition-opacity">Shop</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Colección</a>
        </div>
        
        <div className="logo-main w-12 md:w-16">
          <img src="/logo-olamar.png" alt="Ola Mar Logo" className="w-full h-auto" />
        </div>

        <div className="flex gap-6 md:gap-10 nav-item text-[9px] tracking-[0.3em] uppercase font-bold">
          <a href="#" className="hover:opacity-50 transition-opacity">Story</a>
          <a href="https://wa.me/tu-numero" className="border-b border-current pb-1">WhatsApp</a>
        </div>
      </nav>

      {/* HERO: MINIMALISMO PURO */}
      <section className="h-screen flex flex-col justify-center items-center px-6">
        <div className="overflow-hidden mb-4">
          <h1 className="split-text font-['Syne'] text-[18vw] font-extrabold leading-[0.8] uppercase tracking-tighter text-[#4a3728]">
            Ola Mar
          </h1>
        </div>
        <p className="split-text text-[10px] md:text-xs tracking-[0.6em] uppercase font-light text-stone-400">
          Equilibrio entre rendimiento y estética
        </p>
      </section>

      {/* SECCIÓN DE IMAGEN DE IMPACTO (MOKKA) */}
      <section className="parallax-container relative h-[120vh] w-full overflow-hidden bg-stone-200">
        <img 
          src="/mokka-hero.jpg" 
          className="parallax-bg absolute top-[-10%] left-0 w-full h-[140%] object-cover" 
          alt="Mokka Set Luxury"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-20 left-10 text-white">
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-70">New Arrival</span>
          <h2 className="text-6xl font-['Syne'] font-bold uppercase tracking-tighter">Mokka 26'</h2>
        </div>
      </section>

      {/* FILOSOFÍA DE MARCA */}
      <section className="py-40 px-10 max-w-5xl mx-auto text-center">
        <img src="/logo-olamar.png" className="w-8 mx-auto mb-10 opacity-20" alt="Icon" />
        <h2 className="text-4xl md:text-6xl font-['Syne'] font-bold leading-tight tracking-tight">
          No solo creamos ropa, diseñamos la confianza para <span className="text-[#4a3728]">conquistar</span> cada entrenamiento.
        </h2>
      </section>

      {/* FOOTER BRUTALISTA */}
      <footer className="bg-[#1a1a1a] text-[#f8f7f4] pt-40 pb-10 px-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-20 mb-10">
          <div>
            <img src="/logo-olamar.png" className="w-20 invert mb-10" alt="Logo" />
            <p className="text-4xl md:text-7xl font-['Syne'] font-extrabold uppercase tracking-tighter">
              Ready to <br/> move?
            </p>
          </div>
          <div className="mt-10 md:mt-0 text-right">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 opacity-50">Contacto</p>
            <p className="text-xl">hola@olamar.com.ec</p>
            <p className="text-xl">Cuenca, Ecuador</p>
          </div>
        </div>
        <div className="flex justify-between text-[9px] tracking-[0.4em] uppercase opacity-40">
          <span>© 2026 Ola Mar Studio</span>
          <span>Desarrollado con precisión</span>
        </div>
      </footer>

    </div>
  );
}

export default App;