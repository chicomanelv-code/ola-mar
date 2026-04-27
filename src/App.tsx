import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    // SECCIÓN PINNED: Aquí ocurre la magia
    const section = triggerRef.current;
    const slides = gsap.utils.toArray<HTMLElement>('.product-slide');
    
    // Creamos la línea de tiempo que se amarra al scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${slides.length * 100}%`, // Se queda pegada según cuántas categorías hay
        pin: true,
        scrub: 1, // Suavizado de 1 segundo para la respuesta del mouse
        anticipatePin: 1,
      }
    });

    // Animamos las slides: Mientras una sale, la otra entra
    slides.forEach((slide, i) => {
      if (i === 0) return; // La primera ya está ahí

      tl.from(slide, {
        yPercent: 100,
        ease: "none",
      }, i) // El índice controla el orden
      .from(slide.querySelector('.slide-content'), {
        y: 100,
        opacity: 0,
        duration: 0.5
      }, i + 0.2);
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
    <div ref={container} className="bg-[#f8f7f4] text-[#1a1a1a] font-['Outfit'] overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-[100] p-10 flex justify-between items-center mix-blend-difference text-white">
        <span className="font-['Syne'] font-extrabold text-2xl uppercase tracking-tighter">Ola Mar</span>
        <div className="flex gap-10 text-[10px] tracking-[0.4em] uppercase font-bold">
           <a href="https://wa.me/tu-numero">WhatsApp Shop</a>
        </div>
      </nav>

      {/* HERO (Ya lo tienes configurado) */}
      <section className="h-screen flex flex-col justify-center items-center px-6">
        <h1 className="font-['Syne'] text-[15vw] font-extrabold uppercase leading-none tracking-tighter text-[#4a3728]">
          Ola Mar
        </h1>
      </section>

      {/* SECCIÓN PRODUCTO PINNED */}
      <div ref={triggerRef} className="relative h-screen w-full">
        {categories.map((cat, index) => (
          <section 
            key={index} 
            className={`product-slide absolute inset-0 w-full h-full overflow-hidden ${index === 0 ? 'z-10' : 'z-20'}`}
          >
            {/* Imagen de fondo con Parallax suave */}
            <div className="absolute inset-0 w-full h-full bg-stone-200">
               <img 
                 src={cat.img} 
                 alt={cat.title} 
                 className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Contenido de la Categoría */}
            <div className="slide-content relative h-full flex flex-col justify-center items-center text-white">
               <span className="text-[10px] tracking-[0.8em] uppercase mb-4 opacity-70">
                 {cat.subtitle}
               </span>
               <h2 className="text-8xl md:text-[14rem] font-['Syne'] font-bold uppercase tracking-tighter leading-none">
                 {cat.title}
               </h2>
               <button className="mt-10 px-8 py-3 border border-white/30 rounded-full text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
                 Ver Catálogo
               </button>
            </div>
          </section>
        ))}
      </div>

      {/* SIGUIENTE SECCIÓN (Aparecerá solo después de recorrer todas las categorías) */}
      <section className="py-40 px-10 bg-[#1a1a1a] text-white">
         <h2 className="text-6xl font-['Syne'] font-bold text-center">Diseño de Cuenca <br/> para el Mundo.</h2>
      </section>

    </div>
  );
}

export default App;