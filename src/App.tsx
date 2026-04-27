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
    
    // Animación de entrada: El logo aparece primero, luego el nombre
    tl.from(".nav-item", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".logo-hero", { 
        y: 50, 
        opacity: 0, 
        scale: 0.5, 
        duration: 1.5, 
        ease: "expo.out" 
      })
      .from(".hero-title-text", { 
        y: 100, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=1")
      .from(".hero-sub", { 
        opacity: 0, 
        duration: 1 
      }, "-=0.5");

    // Parallax en la sección de imagen
    gsap.to(".parallax-bg", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-container",
        scrub: true,
        start: "top bottom",
        end: "bottom top"
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#f8f7f4] text-[#1a1a1a] font-['Outfit'] overflow-hidden">
      
      {/* NAVEGACIÓN MODERNA */}
      <nav className="fixed w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
        <div className="nav-item text-[10px] tracking-[0.4em] uppercase font-bold">
          <span className="hidden md:inline">Studio — 2026</span>
          <span className="md:hidden">Ola Mar</span>
        </div>
        <div className="flex gap-8 nav-item text-[10px] tracking-[0.4em] uppercase font-bold">
          <a href="#" className="hover:opacity-50 transition-opacity">Colección</a>
          <a href="https://wa.me/tu-numero" className="border-b border-white/30 pb-1">Shop</a>
        </div>
      </nav>

      {/* HERO SECTION: INTEGRACIÓN DE LOGO + TEXTO */}
      <section className="h-screen flex flex-col justify-center items-center relative px-6 text-center">
        {/* El Logo como centro de atención */}
        <div className="logo-hero w-24 md:w-32 mb-8">
          <img src="/logo-olamar.png" alt="Ola Mar Signature" className="w-full h-auto" />
        </div>
        
        {/* Texto con jerarquía ajustada */}
        <div className="overflow-hidden">
          <h1 className="hero-title-text font-['Syne'] text-[12vw] md:text-[9rem] font-extrabold leading-[0.8] uppercase tracking-tighter text-[#4a3728]">
            Ola Mar
          </h1>
        </div>
        
        <p className="hero-sub mt-8 text-[10px] md:text-xs tracking-[0.8em] uppercase font-light text-stone-400">
          Performance & Luxury Aesthetics
        </p>

        {/* Indicador de scroll minimalista */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="w-[1px] h-12 bg-stone-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#4a3728] animate-scroll-line"></div>
            </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTO: PARALLAX Y LIMPIEZA */}
      <section className="parallax-container relative h-[110vh] md:h-[130vh] w-full overflow-hidden bg-stone-100">
        <img 
          src="/mokka-hero.jpg" 
          className="parallax-bg absolute top-[-15%] left-0 w-full h-[130%] object-cover" 
          alt="Mokka Performance Set"
        />
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white mix-blend-overlay">
             <h2 className="text-8xl md:text-[15rem] font-['Syne'] font-bold uppercase tracking-tighter opacity-20">Mokka</h2>
        </div>
      </section>

      {/* FILOSOFÍA Y LOGO SECUNDARIO */}
      <section className="py-40 px-10 max-w-4xl mx-auto text-center border-b border-stone-200">
        <img src="/logo-olamar.png" className="w-10 mx-auto mb-16 opacity-30" alt="Icon" />
        <h2 className="text-3xl md:text-5xl font-['Syne'] font-bold leading-tight tracking-tight text-[#2a2119]">
          Elevamos el estándar del <span className="italic">activewear</span> a través de un diseño consciente y tecnología de compresión superior.
        </h2>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-32 pb-10 px-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="w-16">
            <img src="/logo-olamar.png" alt="Logo" className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400">
            <div className="flex flex-col gap-4">
                <span className="text-black">Social</span>
                <a href="#">Instagram</a>
                <a href="#">TikTok</a>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-black">Info</span>
                <a href="#">Términos</a>
                <a href="#">Envíos</a>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-black">Local</span>
                <p className="normal-case font-medium">Cuenca, Ecuador</p>
            </div>
          </div>
        </div>
        <p className="text-[10vw] font-['Syne'] font-extrabold uppercase tracking-tighter text-stone-100 leading-none">Ola Mar Studio</p>
      </footer>

      {/* CSS extra para la animación del indicador de scroll */}
      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default App;