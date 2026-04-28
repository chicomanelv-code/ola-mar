import { useEffect, useRef, useState } from 'react';
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
  const infoBoxRef = useRef<HTMLDivElement>(null);
  
  // Estado para la característica interactiva de la sección editorial
  const [activeFeature, setActiveFeature] = useState<{label: string, desc: string} | null>(null);

  useEffect(() => {
    // 1. Smooth Scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Custom Cursor
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
    
    // 3. Hero Animación
    const text = new SplitType('.hero-title-text', { types: 'chars' });
    
    // ---> AQUÍ ESTÁN LAS AURAS NUEVAS CON SCALE PARA QUE PULSEN <---
    gsap.to(".aura-1", { 
      x: 60, y: 40, scale: 1.2, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" 
    });
    gsap.to(".aura-2", { 
      x: -50, y: -30, scale: 0.9, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" 
    });

    tl.from(".nav-item", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".logo-hero", { y: 50, opacity: 0, scale: 0.5, duration: 1.5, ease: "expo.out" }, "-=0.5")
      .from(text.chars, { y: 100, opacity: 0, stagger: 0.02, duration: 1, ease: "power4.out" }, "-=1")
      .from(".hero-sub", { opacity: 0, y: 20, duration: 1 }, "-=0.5");

    // Interacción del Cursor
    const links = document.querySelectorAll('a, button, .interactive');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 4, backgroundColor: "rgba(74, 55, 40, 0.1)", border: "1px solid #4a3728" });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#4a3728", border: "none" });
      });
    });

    // 4. SECCIÓN PRODUCTO PINNED
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

    // 5. Animación del Video Seamless
    gsap.to(".video-reveal-container iframe", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".video-reveal-container",
        scrub: true
      }
    });

  }, { scope: container });

  // Animación del cuadro de información al hacer clic
  useGSAP(() => {
    if (activeFeature) {
      gsap.fromTo(infoBoxRef.current, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [activeFeature]);

  const categories = [
    { title: "Mokka", img: "/mokka-hero.jpg", subtitle: "Colección Signature" },
    { title: "Leggings", img: "/leggings-category.jpg", subtitle: "Tecnología Seamless" },
    { title: "Enterizos", img: "/enterizos-category.jpg", subtitle: "Compresión 360°" },
    { title: "Men", img: "/men-category.jpg", subtitle: "Línea Masculina" },
    { title: "Essentials", img: "/tops-category.jpg", subtitle: "Tops & Shorts" },
  ];

  const specs = [
    { id: 1, label: "Corte Ergonómico", desc: "Patronaje diseñado que se adapta al movimiento natural sin restricciones, garantizando soporte extremo.", top: "25%", left: "35%" },
    { id: 2, label: "Tecnología Seamless", desc: "Estructura sin costuras laterales para evitar roces y mejorar la estética durante el entrenamiento.", bottom: "35%", right: "30%" },
    { id: 3, label: "Compresión 360°", desc: "Nylon de alta densidad con Spandex para un soporte muscular óptimo y control de abdomen.", top: "50%", left: "25%" }
  ];

  return (
    <div ref={container} className="bg-[#f8f7f4] text-[#1a1a1a] font-['Outfit'] cursor-none overflow-hidden">
      
      {/* MOUSE CUSTOM */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-4 h-4 bg-[#4a3728] rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"></div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-[100] p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
        <div className="nav-item text-[10px] tracking-[0.4em] uppercase font-bold interactive">Studio — 2026</div>
        <div className="flex gap-8 nav-item text-[10px] tracking-[0.4em] uppercase font-bold">
          <a href="#" className="interactive hover:opacity-50 transition-opacity">Colección</a>
          <a href="https://wa.me/tu-numero" className="interactive border-b border-white/30 pb-1">Shop</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-[90vh] md:h-screen flex flex-col justify-center items-center relative px-4 text-center overflow-hidden">
        {/* Fondo de Auras - Opacidad y Desenfoque ajustados para visibilidad */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-0 z-0 opacity-100 blur-[80px] md:blur-[120px] pointer-events-none">
          <div className="aura-1 absolute top-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-[#4a3728]/25"></div>
          <div className="aura-2 absolute bottom-[20%] right-[10%] w-[60%] h-[60%] rounded-full bg-[#d4c7b8]/35"></div>
        </div>

        <div className="logo-hero w-20 md:w-32 mb-6 z-10">
          <img src="/logo-olamar.png" alt="Ola Mar Signature" className="w-full h-auto" />
        </div>
        
        <div className="overflow-hidden z-10 w-full">
          <h1 className="hero-title-text font-['Syne'] text-[13vw] md:text-[9rem] font-extrabold leading-none uppercase tracking-tighter text-[#4a3728] whitespace-nowrap">
            Ola Mar
          </h1>
        </div>
        
        <p className="hero-sub mt-6 text-[9px] md:text-xs tracking-[0.4em] uppercase font-light text-stone-400 z-10 bg-white/40 px-4 py-2 rounded-full backdrop-blur-md">
          Where Technical Precision Meets Fluid Design
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
               <img src={cat.img} alt={cat.title} className="w-full h-full object-cover grayscale-[10%]" />
               <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="slide-content relative h-full flex flex-col justify-center items-center text-white">
               <span className="text-[10px] tracking-[0.8em] uppercase mb-4 opacity-70">{cat.subtitle}</span>
               <h2 className="text-7xl md:text-[12rem] font-['Syne'] font-bold uppercase tracking-tighter leading-none">{cat.title}</h2>
               <button className="interactive mt-10 px-8 py-3 border border-white/30 rounded-full text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">Explorar</button>
            </div>
          </section>
        ))}
      </div>

      {/* SECCIÓN TECNOLOGÍA SEAMLESS (VIDEO RESTAURADO) */}
      <section className="py-40 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2 space-y-10">
            <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold">Innovación Textil</span>
            <h2 className="text-6xl md:text-8xl font-['Syne'] font-bold uppercase tracking-tighter leading-none">
              The Seamless <br/> <span className="text-[#4a3728]">Science.</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-md font-light">
              Eliminamos lo innecesario. Nuestra tecnología <b>Seamless</b> redefine el confort con una estructura adaptable de secado rápido y compresión inteligente. Sin costuras, sin distracciones.
            </p>
            <div className="grid grid-cols-2 gap-10 pt-8 border-t border-stone-100">
              <div className="interactive">
                <p className="text-xs font-bold uppercase mb-2">High Dry Tech</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">Secado Ultra Rápido</p>
              </div>
              <div className="interactive">
                <p className="text-xs font-bold uppercase mb-2">Zero Friction</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">Confort total 360°</p>
              </div>
            </div>
          </div>
          
          <div className="video-reveal-container interactive w-full md:w-1/2 aspect-video rounded-sm overflow-hidden shadow-2xl relative bg-stone-100">
            <iframe 
              className="absolute inset-0 w-full h-[120%] top-[-10%] pointer-events-none scale-105 grayscale hover:grayscale-0 transition-all duration-700"
              src="https://www.youtube.com/embed/cxySksdJJvs?autoplay=1&mute=1&loop=1&playlist=cxySksdJJvs&controls=0&showinfo=0&rel=0&modestbranding=1" 
              title="Seamless Tech Video"
              allow="autoplay; encrypted-media"
            ></iframe>
            <div className="absolute inset-0 bg-[#4a3728]/5 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN EDITORIAL INTERACTIVA */}
      <section className="editorial-section py-20 md:py-40 bg-[#f4f2ee] px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-24">
          
          {/* Imagen con Puntos Interactivos */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl bg-stone-300">
            <img src="/men-category.jpg" className="w-full h-full object-cover grayscale-[20%]" alt="Technical Look" />
            
            {specs.map((spec) => (
              <button 
                key={spec.id}
                onClick={() => setActiveFeature(spec)}
                style={{ top: spec.top, left: spec.left, bottom: spec.bottom, right: spec.right }}
                className="interactive absolute z-30 group"
              >
                <div className="w-6 h-6 bg-[#4a3728] rounded-full animate-ping absolute opacity-40 -translate-x-1 -translate-y-1"></div>
                <div className="w-4 h-4 bg-[#4a3728] rounded-full relative flex items-center justify-center border-2 border-white shadow-lg">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </button>
            ))}
          </div>

          {/* Información Dinámica */}
          <div className="w-full md:w-1/2 min-h-[250px] md:min-h-[400px] flex flex-col justify-center space-y-6 md:space-y-12">
            {!activeFeature ? (
              <div className="space-y-4 md:space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400">Interacción</span>
                <h2 className="font-['Syne'] text-3xl md:text-5xl font-extrabold uppercase tracking-tighter">Explora la <br/> <span className="text-[#4a3728]">Ingeniería.</span></h2>
                <p className="text-stone-400 text-xs md:text-sm italic">Selecciona un punto en la prenda para conocer los detalles técnicos.</p>
              </div>
            ) : (
              <div ref={infoBoxRef} className="space-y-4 md:space-y-8 bg-white p-5 md:p-10 shadow-2xl border-l-4 border-[#4a3728] w-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4a3728]">Detalle Técnico</span>
                <h3 className="font-['Syne'] text-2xl md:text-4xl font-extrabold uppercase tracking-tighter leading-none break-words">
                  {activeFeature.label}
                </h3>
                <p className="text-stone-500 text-xs md:text-base leading-relaxed font-light">{activeFeature.desc}</p>
                <button onClick={() => setActiveFeature(null)} className="interactive text-[9px] uppercase font-bold tracking-widest text-stone-400 hover:text-black transition-colors">Cerrar detalle</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] pt-24 pb-8 px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10 text-stone-500">
          <img src="/logo-olamar.png" alt="Logo" className="w-14 h-auto invert opacity-80" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 text-[9px] tracking-[0.2em] uppercase font-bold">
            <div className="flex flex-col gap-4">
              <span className="text-white">Social</span>
              <a href="#" className="interactive hover:text-white transition-colors">Instagram</a>
              <a href="#" className="interactive hover:text-white transition-colors">TikTok</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white">Legal</span>
              <a href="#" className="interactive hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="interactive hover:text-white transition-colors">Envíos</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white">Location</span>
              <p className="text-stone-600 font-medium normal-case">Cuenca, Ecuador</p>
            </div>
          </div>
        </div>
        
        {/* Texto de fondo - Ajustado para no ser invasivo */}
        <p className="text-[14vw] font-['Syne'] font-extrabold uppercase tracking-tighter text-stone-900/40 leading-none select-none text-center md:text-left">
          Ola Mar Studio
        </p>
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