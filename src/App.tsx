import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de entrada
    const tl = gsap.timeline();
    
    tl.from(".hero-title", { 
      y: 100, 
      opacity: 0, 
      duration: 1, 
      ease: "power4.out" 
    })
    .from(".hero-sub", { 
      opacity: 0, 
      duration: 1 
    }, "-=0.5")
    .from(".hero-img", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out"
    }, "-=1");

  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen">
      {/* Header Minimalista */}
      <nav className="flex justify-between p-8 uppercase tracking-widest text-xs font-medium">
        <span>Ola Mar</span>
        <div className="space-x-6">
          <a href="#">Colección</a>
          <a href="#">Contacto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 px-6">
        <div className="overflow-hidden">
          <h1 className="hero-title text-7xl md:text-9xl font-bold tracking-tighter text-mokka uppercase">
            Mokka
          </h1>
        </div>
        <p className="hero-sub mt-4 text-stone-500 uppercase tracking-[0.3em] text-sm">
          Performance & Luxury Gymwear
        </p>
        
        {/* Aquí iría una de las fotos pro que generamos */}
        <div className="hero-img mt-16 w-full max-w-2xl aspect-[3/4] bg-stone-200 rounded-sm overflow-hidden shadow-2xl">
           <div className="w-full h-full flex items-center justify-center text-stone-400 italic">
             [ Tu Foto Pro de Ola Mar Aquí ]
           </div>
        </div>
      </section>
    </main>
  );
}

export default App;