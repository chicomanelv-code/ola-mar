import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState, useCallback } from "react";
import { p as products } from "./products-BvvSTCBQ.js";
import { u as useCart } from "./router-Cqw0Xr_O.js";
import "@tanstack/react-router";
function MagneticCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    let rafId;
    const move = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.classList.add("cursor-visible");
        const target = e.target;
        if (target.closest("a, button, [data-magnetic]")) {
          el.classList.add("cursor-hover");
        } else {
          el.classList.remove("cursor-hover");
        }
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { ref, className: "cursor-dot", "aria-hidden": true });
}
function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
function Navbar() {
  const {
    count,
    openCart
  } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: `fixed top-0 left-0 right-0 z-30 nav-blur transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`, children: [
    /* @__PURE__ */ jsxs("nav", { className: "max-w-[1400px] mx-auto px-6 md:px-10", style: {
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      height: "68px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-8", children: ["Colección", "Lo más popular", "Esenciales", "Sobre nosotros"].map((link) => /* @__PURE__ */ jsx("a", { href: "#", className: "text-[13px] tracking-wide text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors duration-200", style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 300
      }, children: link }, link)) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex items-center", children: /* @__PURE__ */ jsxs("button", { onClick: () => setMenuOpen(!menuOpen), className: "w-9 h-9 flex flex-col items-center justify-center gap-[5px]", "aria-label": "Menú", children: [
        /* @__PURE__ */ jsx("span", { className: `block h-px w-6 bg-[var(--ink)] transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}` }),
        /* @__PURE__ */ jsx("span", { className: `block h-px w-6 bg-[var(--ink)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}` }),
        /* @__PURE__ */ jsx("span", { className: `block h-px w-6 bg-[var(--ink)] transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}` })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("a", { href: "/", className: "font-serif text-2xl md:text-[1.6rem] tracking-tight text-[var(--ink)]", style: {
        fontWeight: 600
      }, children: "OlaMar." }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 md:gap-4", children: [
        /* @__PURE__ */ jsx("button", { className: "w-9 h-9 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors", "aria-label": "Buscar", children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
          /* @__PURE__ */ jsx("path", { d: "m21 21-4.35-4.35" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "hidden md:flex w-9 h-9 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors", "aria-label": "Cuenta", children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
        ] }) }),
        /* @__PURE__ */ jsxs("button", { onClick: openCart, className: "relative w-9 h-9 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors", "aria-label": "Carrito", children: [
          /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
            /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
            /* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
          ] }),
          count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[var(--ink)] text-white text-[10px] font-medium", children: count > 9 ? "9+" : count })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-64" : "max-h-0"}`, style: {
      borderTop: menuOpen ? "1px solid var(--border)" : "none"
    }, children: /* @__PURE__ */ jsx("div", { className: "px-6 py-4 flex flex-col gap-4", children: ["Colección", "Lo más popular", "Esenciales", "Sobre nosotros"].map((link) => /* @__PURE__ */ jsx("a", { href: "#", className: "text-[15px] text-[var(--ink)] py-1", style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 300
    }, onClick: () => setMenuOpen(false), children: link }, link)) }) })
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-screen min-h-[600px] flex overflow-hidden bg-[var(--paper)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-20 w-full md:w-1/2", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] tracking-[0.25em] text-[var(--ink-soft)] uppercase", style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 300
      }, children: "Nueva Colección · 2025" }) }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif leading-[0.95] text-[var(--ink)] mb-6", style: {
        fontSize: "clamp(3.5rem, 8vw, 7rem)",
        fontWeight: 500,
        fontStyle: "italic",
        letterSpacing: "-0.02em"
      }, children: [
        "Muévete",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { style: {
          fontStyle: "normal",
          fontWeight: 700
        }, children: "sin límites." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[var(--ink-soft)] mb-10 max-w-sm leading-relaxed", style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 300,
        fontSize: "15px"
      }, children: "Ropa deportiva de lujo diseñada en Cuenca, Ecuador — para quienes exigen lo mejor de su cuerpo y su vestuario." }),
      /* @__PURE__ */ jsx("a", { href: "#popular", className: "btn-outline-fill w-fit px-8 py-4 text-[12px] tracking-[0.15em] uppercase", children: /* @__PURE__ */ jsx("span", { children: "Explorar Colección" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:block absolute right-0 top-0 h-full w-[52%]", children: [
      /* @__PURE__ */ jsx("div", { className: "h-full overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1000&h=1400&fit=crop&q=80", alt: "OlaMar — Ropa Deportiva de Lujo", className: "h-full w-full object-cover", style: {
        transform: "scale(1.05)"
      }, onError: (e) => {
        e.target.src = "/placeholder.png";
      } }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 w-32 pointer-events-none", style: {
        background: "linear-gradient(to right, var(--paper), transparent)"
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&h=1200&fit=crop&q=80", alt: "", className: "w-full h-full object-cover", onError: (e) => {
        e.target.src = "/placeholder.png";
      } }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
        background: "linear-gradient(to top, rgba(250,250,248,0.97) 0%, rgba(250,250,248,0.7) 50%, rgba(250,250,248,0.2) 100%)"
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 left-1/2 md:left-auto md:right-[52%] md:mr-10 -translate-x-1/2 md:translate-x-0 flex flex-col items-center gap-2 opacity-50", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase", style: {
        fontWeight: 300
      }, children: "Scroll" }),
      /* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-[var(--ink)] animate-bounce" })
    ] })
  ] });
}
const CATEGORIES = [{
  label: "Leggings",
  image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=300&h=300&fit=crop&q=80"
}, {
  label: "Tops",
  image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop&q=80"
}, {
  label: "Bras",
  image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&h=300&fit=crop&q=80"
}, {
  label: "Shorts",
  image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop&q=80"
}, {
  label: "Sets",
  image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&h=300&fit=crop&q=80"
}];
function TrendingCategories() {
  return /* @__PURE__ */ jsxs("section", { className: "py-20 px-6 md:px-10 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsx("p", { className: "reveal text-[11px] tracking-[0.25em] uppercase text-[var(--ink-soft)] mb-10", style: {
      fontWeight: 300
    }, children: "Categorías Tendencia" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxs("a", { href: "#", className: `reveal reveal-delay-${i + 1} flex flex-col items-center gap-3 group`, children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden", style: {
        background: "var(--muted)"
      }, children: /* @__PURE__ */ jsx("img", { src: cat.image, alt: cat.label, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110", onError: (e) => {
        e.target.src = "/placeholder.png";
      } }) }),
      /* @__PURE__ */ jsx("span", { className: "text-[12px] tracking-wide text-[var(--ink)] group-hover:text-[var(--ink-soft)] transition-colors", style: {
        fontWeight: 300
      }, children: cat.label })
    ] }, cat.label)) })
  ] });
}
function ProductCard({
  product,
  delay
}) {
  const {
    addItem
  } = useCart();
  const sizes = product.sizes;
  const defaultSize = sizes.includes("M") ? "M" : sizes[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const handleAdd = useCallback((e) => {
    e.preventDefault();
    addItem(product, selectedSize);
  }, [addItem, product, selectedSize]);
  return /* @__PURE__ */ jsx("div", { className: `reveal${delay ? ` reveal-delay-${delay}` : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "product-card-wrap group relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", style: {
      aspectRatio: "4/5",
      background: "var(--muted)"
    }, children: [
      /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "product-card-img w-full h-full object-cover", onError: (e) => {
        e.target.src = "/placeholder.png";
      } }),
      /* @__PURE__ */ jsxs("div", { className: "product-card-overlay absolute bottom-0 left-0 right-0 p-4", style: {
        background: "rgba(250,250,248,0.96)",
        backdropFilter: "blur(4px)"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: sizes.map((size) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedSize(size), className: "text-[11px] font-medium px-2 py-1 border transition-colors duration-150", style: {
          background: selectedSize === size ? "var(--ink)" : "transparent",
          color: selectedSize === size ? "#fff" : "var(--ink)",
          borderColor: selectedSize === size ? "var(--ink)" : "var(--border)"
        }, children: size }, size)) }),
        /* @__PURE__ */ jsx("button", { onClick: handleAdd, className: "w-full py-2.5 text-[12px] tracking-[0.1em] uppercase font-medium transition-colors duration-200", style: {
          background: "var(--ink)",
          color: "#fff"
        }, onMouseEnter: (e) => e.currentTarget.style.background = "#333", onMouseLeave: (e) => e.currentTarget.style.background = "var(--ink)", children: "Añadir al carrito" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-0.5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-[15px] text-[var(--ink)] leading-snug", style: {
        fontWeight: 400
      }, children: product.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[var(--ink-soft)]", style: {
        fontWeight: 300
      }, children: [
        "$",
        product.price
      ] })
    ] })
  ] }) });
}
function ProductGrid({
  id,
  title,
  subtitle,
  items
}) {
  return /* @__PURE__ */ jsxs("section", { id, className: "py-16 md:py-24 px-6 md:px-10 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10 md:mb-14", children: [
      /* @__PURE__ */ jsx("h2", { className: "reveal font-serif text-[var(--ink)] leading-tight", style: {
        fontSize: "clamp(2rem, 4vw, 3.25rem)",
        fontWeight: 500,
        fontStyle: "italic"
      }, children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "reveal reveal-delay-1 mt-3 text-[14px] text-[var(--ink-soft)] max-w-md", style: {
        fontWeight: 300
      }, children: subtitle })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: items.map((product, i) => /* @__PURE__ */ jsx(ProductCard, { product, delay: i % 4 + 1 }, product.id)) })
  ] });
}
function CartItemRow({
  item
}) {
  const {
    removeItem,
    updateQuantity
  } = useCart();
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-24 flex-shrink-0 overflow-hidden", style: {
      background: "var(--muted)"
    }, children: /* @__PURE__ */ jsx("img", { src: item.product.image, alt: item.product.name, className: "w-full h-full object-cover", onError: (e) => {
      e.target.src = "/placeholder.png";
    } }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-[14px] text-[var(--ink)] leading-tight mb-0.5", style: {
        fontWeight: 400
      }, children: item.product.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-[12px] text-[var(--ink-soft)] mb-3", style: {
        fontWeight: 300
      }, children: [
        "Talla ",
        item.size
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-[var(--border)]", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => updateQuantity(item.product.id, item.size, -1), className: "w-8 h-8 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--muted)] transition-colors text-lg", "aria-label": "Reducir cantidad", children: "−" }),
          /* @__PURE__ */ jsx("span", { className: "w-8 text-center text-[13px]", style: {
            fontWeight: 400
          }, children: item.quantity }),
          /* @__PURE__ */ jsx("button", { onClick: () => updateQuantity(item.product.id, item.size, 1), className: "w-8 h-8 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--muted)] transition-colors", "aria-label": "Aumentar cantidad", children: "+" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-[14px] font-medium text-[var(--ink)]", children: [
            "$",
            item.product.price * item.quantity
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => removeItem(item.product.id, item.size), className: "text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors", "aria-label": "Eliminar", children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" }) }) })
        ] })
      ] })
    ] })
  ] });
}
function CartDrawer() {
  const {
    state,
    closeCart,
    total,
    count
  } = useCart();
  const handleWhatsApp = () => {
    const lines = state.items.map((item) => `• ${item.product.name} × ${item.quantity} (Talla ${item.size}) — $${item.product.price * item.quantity}`).join("\n");
    const message = `🛍️ *Pedido OlaMar*

${lines}

*Total: $${total}*

_Desde Cuenca, Ecuador 🇪🇨_`;
    window.open(`https://wa.me/593987336646?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40 transition-all duration-500", style: {
      background: "rgba(13,13,13,0.35)",
      backdropFilter: "blur(4px)",
      pointerEvents: state.isOpen ? "auto" : "none",
      opacity: state.isOpen ? 1 : 0
    }, onClick: closeCart, "aria-hidden": true }),
    /* @__PURE__ */ jsxs("aside", { className: `cart-drawer ${state.isOpen ? "cart-open" : "cart-closed"} fixed top-0 right-0 h-full z-50 flex flex-col`, style: {
      width: "min(440px, 100vw)",
      background: "var(--paper)",
      borderLeft: "1px solid var(--border)"
    }, role: "dialog", "aria-label": "Carrito de compras", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-5", style: {
        borderBottom: "1px solid var(--border)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl", style: {
            fontWeight: 500
          }, children: "Tu bolsa" }),
          count > 0 && /* @__PURE__ */ jsxs("p", { className: "text-[12px] text-[var(--ink-soft)] mt-0.5", style: {
            fontWeight: 300
          }, children: [
            count,
            " ",
            count === 1 ? "artículo" : "artículos"
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: closeCart, className: "w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors", "aria-label": "Cerrar carrito", children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar py-6 px-6", children: state.items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center py-16", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mb-4", style: {
          background: "var(--muted)"
        }, children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [
          /* @__PURE__ */ jsx("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
          /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
          /* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "font-serif text-lg text-[var(--ink)] mb-2", style: {
          fontStyle: "italic"
        }, children: "Tu bolsa está vacía" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[var(--ink-soft)]", style: {
          fontWeight: 300
        }, children: "Añade artículos de nuestra colección" }),
        /* @__PURE__ */ jsx("button", { onClick: closeCart, className: "mt-6 btn-outline-fill px-6 py-3 text-[12px] tracking-[0.1em] uppercase", children: /* @__PURE__ */ jsx("span", { children: "Ver Colección" }) })
      ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: state.items.map((item) => /* @__PURE__ */ jsx(CartItemRow, { item }, `${item.product.id}-${item.size}`)) }) }),
      state.items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-6 space-y-4", style: {
        borderTop: "1px solid var(--border)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] text-[var(--ink-soft)]", style: {
            fontWeight: 300
          }, children: "Subtotal" }),
          /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl text-[var(--ink)]", style: {
            fontWeight: 400
          }, children: [
            "$",
            total
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleWhatsApp, className: "w-full py-4 text-[12px] tracking-[0.15em] uppercase font-medium text-white transition-colors duration-200", style: {
          background: "#25D366"
        }, onMouseEnter: (e) => e.currentTarget.style.background = "#1ebe5d", onMouseLeave: (e) => e.currentTarget.style.background = "#25D366", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
          "Proceder al Pago"
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-[11px] text-[var(--ink-soft)]", style: {
          fontWeight: 300
        }, children: "Pago por WhatsApp · Envío a todo Ecuador" })
      ] })
    ] })
  ] });
}
function WhatsAppButton() {
  return /* @__PURE__ */ jsx("a", { href: "https://wa.me/593987336646", target: "_blank", rel: "noopener noreferrer", className: "fixed bottom-8 left-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110", style: {
    background: "#25D366"
  }, "aria-label": "Contáctanos por WhatsApp", "data-magnetic": true, children: /* @__PURE__ */ jsx("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }) });
}
function Marquee() {
  const items = ["OlaMar.", "Cuenca, Ecuador", "Lujo en Movimiento", "Since 2025"];
  const repeated = [...items, ...items, ...items, ...items];
  return /* @__PURE__ */ jsxs("div", { className: "py-5 overflow-hidden border-y", style: {
    borderColor: "var(--border)"
  }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee 18s linear infinite;
          display: flex;
          white-space: nowrap;
          width: max-content;
        }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "marquee-inner", children: repeated.map((item, i) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-6 px-8 text-[13px] tracking-[0.15em] uppercase", style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 300,
      color: "var(--ink-soft)"
    }, children: [
      item,
      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[var(--border)] inline-block" })
    ] }, i)) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "py-16 px-6 md:px-10 mt-10", style: {
    borderTop: "1px solid var(--border)"
  }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl text-[var(--ink)] mb-3", style: {
          fontWeight: 600
        }, children: "OlaMar." }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[var(--ink-soft)] leading-relaxed", style: {
          fontWeight: 300
        }, children: "Ropa deportiva de lujo desde Cuenca, Ecuador." })
      ] }),
      [{
        title: "Tienda",
        links: ["Nueva Colección", "Leggings", "Tops & Bras", "Sets", "Sale"]
      }, {
        title: "Información",
        links: ["Sobre Nosotros", "Sostenibilidad", "Tallas & Guía", "Cuidado de Prendas"]
      }, {
        title: "Ayuda",
        links: ["Envíos", "Devoluciones", "Contacto", "WhatsApp"]
      }].map((col) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] tracking-[0.2em] uppercase text-[var(--ink)] mb-4", style: {
          fontWeight: 500
        }, children: col.title }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: col.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-[13px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors", style: {
          fontWeight: 300
        }, children: link }) }, link)) })
      ] }, col.title))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 pt-8", style: {
      borderTop: "1px solid var(--border)"
    }, children: [
      /* @__PURE__ */ jsx("p", { className: "text-[12px] text-[var(--ink-soft)]", style: {
        fontWeight: 300
      }, children: "© 2025 OlaMar. Todos los derechos reservados. Cuenca, Ecuador." }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-5", children: ["Instagram", "TikTok", "Pinterest"].map((social) => /* @__PURE__ */ jsx("a", { href: "#", className: "text-[12px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors tracking-wide", style: {
        fontWeight: 300
      }, children: social }, social)) })
    ] })
  ] }) });
}
function OlaMarPage() {
  useReveal();
  const popularProducts = products.filter((p) => p.category === "popular");
  const essentialProducts = products.filter((p) => p.category === "essential");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MagneticCursor, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(Marquee, {}),
      /* @__PURE__ */ jsx(TrendingCategories, {}),
      /* @__PURE__ */ jsx("div", { style: {
        background: "#fff"
      }, children: /* @__PURE__ */ jsx(ProductGrid, { id: "popular", title: "Lo más popular.", subtitle: "Las piezas que definen la temporada — para quienes no se conforman con menos.", items: popularProducts }) }),
      /* @__PURE__ */ jsx("div", { style: {
        background: "var(--muted)"
      }, children: /* @__PURE__ */ jsx(ProductGrid, { id: "esenciales", title: "Los esenciales.", subtitle: "Básicos de alta performance que no pasan de moda. La base de todo armario deportivo.", items: essentialProducts }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(CartDrawer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] });
}
export {
  OlaMarPage as component
};
