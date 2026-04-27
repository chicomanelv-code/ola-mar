import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const main = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación Inicial (Hero)
    const tl = gsap.timeline();
    tl.from(".reveal", { y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" })
      .from(".hero-img", { scale: 1.5, opacity: 0, duration: 2, ease: "expo.out" }, "-=1");

    // Animaciones al hacer Scroll
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3
    });
  }, { scope: main });

  return (
    <div ref={main} className="bg-[#fdfcfb] text-[#2a2119] selection:bg-[#4a3728] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-8 mix-blend-difference text-white">
        <span className="text-xl font-black tracking-tighter uppercase">Ola Mar</span>
        <div className="hidden md:flex space-x-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          <a href="#coleccion" className="hover:opacity-50 transition-opacity">Colección</a>
          <a href="#tecnologia" className="hover:opacity-50 transition-opacity">Tecnología</a>
          <a href="https://wa.me/tu-numero" className="bg-white text-black px-4 py-2 rounded-full">WhatsApp Shop</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="z-10 text-center">
          <h1 className="reveal text-[15vw] md:text-[12rem] font-black uppercase leading-none tracking-tighter text-[#4a3728]">
            Ola Mar
          </h1>
          <p className="reveal mt-4 text-[10px] md:text-sm uppercase tracking-[0.8em] font-light text-stone-500">
            Performance & Luxury Gymwear
          </p>
        </div>
        
        {/* Imagen de Fondo / Hero */}
        <div className="hero-img absolute inset-0 w-full h-full z-0 opacity-20">
          <img 
            src="/hero-mokka.jpg" 
            alt="Ola Mar Collection" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SECCIÓN DE VALORES (LA DIFERENCIA) */}
      <section className="features-section py-32 px-10 grid md:grid-cols-3 gap-20 max-w-7xl mx-auto">
        <div className="feature-card space-y-4">
          <span className="text-[10px] font-bold text-stone-400">01</span>
          <h3 className="text-2xl font-bold uppercase tracking-tight">Compresión de Lujo</h3>
          <p className="text-sm text-stone-500 leading-relaxed">Tejidos italianos que moldean la figura con soporte extremo sin perder la comodidad.</p>
        </div>
        <div className="feature-card space-y-4">
          <span className="text-[10px] font-bold text-stone-400">02</span>
          <h3 className="text-2xl font-bold uppercase tracking-tight">Seamless Tech</h3>
          <p className="text-sm text-stone-500 leading-relaxed">Costuras invisibles diseñadas para evitar roces durante entrenamientos de alto impacto.</p>
        </div>
        <div className="feature-card space-y-4">
          <span className="text-[10px] font-bold text-stone-400">03</span>
          <h3 className="text-2xl font-bold uppercase tracking-tight">Paleta Terrosa</h3>
          <p className="text-sm text-stone-500 leading-relaxed">Inspirada en la naturaleza, diseñada para destacar en el gimnasio y en la ciudad.</p>
        </div>
      </section>

      {/* GALERÍA DE ANTICIPO */}
      <section id="coleccion" className="py-20 bg-stone-100">
        <div className="px-10 mb-10 flex justify-between items-end">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Colección <br/> 2026</h2>
          <p className="text-[10px] uppercase tracking-widest text-stone-400 max-w-[200px]">Próximamente disponible en toda la región.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          <div className="h-[70vh] bg-stone-300 overflow-hidden rounded-sm group">
            <img src="/mokka-back.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Mokka Set" />
          </div>
          <div className="h-[70vh] bg-stone-300 overflow-hidden rounded-sm group">
            <img src="/mokka-front.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Mokka Set" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-10 text-center space-y-8">
        <h2 className="text-2xl font-bold uppercase tracking-[0.5em]">Ola Mar</h2>
        <p className="text-xs text-stone-400">Diseñado en Cuenca, Ecuador. Para el mundo.</p>
        <div className="flex justify-center space-x-10 text-[10px] font-bold uppercase tracking-widest">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Privacidad</a>
        </div>
      </footer>

    </div>
  );
}

export default App;