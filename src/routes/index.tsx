import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import products from '@/data/products'
import type { Product } from '@/data/products'
import { useCart } from '@/lib/cart'
import type { CartItem } from '@/lib/cart'

export const Route = createFileRoute('/')({
  component: OlaMarPage,
})

// ─── Magnetic Cursor ─────────────────────────────────────────────────────────
function MagneticCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    let rafId: number

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
        el.classList.add('cursor-visible')

        const target = e.target as HTMLElement
        if (target.closest('a, button, [data-magnetic]')) {
          el.classList.add('cursor-hover')
        } else {
          el.classList.remove('cursor-hover')
        }
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={ref} className="cursor-dot" aria-hidden />
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 nav-blur transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}
    >
      <nav
        className="max-w-[1400px] mx-auto px-6 md:px-10"
        style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '68px' }}
      >
        {/* Left: nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['Colección', 'Lo más popular', 'Esenciales', 'Sobre nosotros'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] tracking-wide text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Menú"
          >
            <span
              className={`block h-px w-6 bg-[var(--ink)] transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-[var(--ink)] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-[var(--ink)] transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>

        {/* Center: logo */}
        <div className="flex justify-center">
          <a
            href="/"
            className="font-serif text-2xl md:text-[1.6rem] tracking-tight text-[var(--ink)]"
            style={{ fontWeight: 600 }}
          >
            OlaMar.
          </a>
        </div>

        {/* Right: icons */}
        <div className="flex items-center justify-end gap-3 md:gap-4">
          {/* Search */}
          <button
            className="w-9 h-9 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            aria-label="Buscar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Account */}
          <button
            className="hidden md:flex w-9 h-9 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            aria-label="Cuenta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative w-9 h-9 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            aria-label="Carrito"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[var(--ink)] text-white text-[10px] font-medium">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}
        style={{ borderTop: menuOpen ? '1px solid var(--border)' : 'none' }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {['Colección', 'Lo más popular', 'Esenciales', 'Sobre nosotros'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[15px] text-[var(--ink)] py-1"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex overflow-hidden bg-[var(--paper)]">
      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-20 w-full md:w-1/2">
        <div className="mb-6">
          <span
            className="text-[11px] tracking-[0.25em] text-[var(--ink-soft)] uppercase"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          >
            Nueva Colección · 2025
          </span>
        </div>

        <h1
          className="font-serif leading-[0.95] text-[var(--ink)] mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 500,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
          }}
        >
          Muévete<br />
          <span style={{ fontStyle: 'normal', fontWeight: 700 }}>sin límites.</span>
        </h1>

        <p
          className="text-[var(--ink-soft)] mb-10 max-w-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '15px' }}
        >
          Ropa deportiva de lujo diseñada en Cuenca, Ecuador — para quienes exigen lo mejor de su cuerpo y su vestuario.
        </p>

        <a
          href="#popular"
          className="btn-outline-fill w-fit px-8 py-4 text-[12px] tracking-[0.15em] uppercase"
        >
          <span>Explorar Colección</span>
        </a>
      </div>

      {/* Right image */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-[52%]">
        <div className="h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1000&h=1400&fit=crop&q=80"
            alt="OlaMar — Ropa Deportiva de Lujo"
            className="h-full w-full object-cover"
            style={{ transform: 'scale(1.05)' }}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = '/placeholder.png'
            }}
          />
        </div>
        {/* Gradient fade left edge */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--paper), transparent)',
          }}
        />
      </div>

      {/* Mobile: full bg image with overlay */}
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&h=1200&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = '/placeholder.png'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(250,250,248,0.97) 0%, rgba(250,250,248,0.7) 50%, rgba(250,250,248,0.2) 100%)',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 md:left-auto md:right-[52%] md:mr-10 -translate-x-1/2 md:translate-x-0 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 300 }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-[var(--ink)] animate-bounce" />
      </div>
    </section>
  )
}

// ─── Trending Categories ──────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Leggings',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Tops',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Bras',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Shorts',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Sets',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&h=300&fit=crop&q=80',
  },
]

function TrendingCategories() {
  return (
    <section className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto">
      <p
        className="reveal text-[11px] tracking-[0.25em] uppercase text-[var(--ink-soft)] mb-10"
        style={{ fontWeight: 300 }}
      >
        Categorías Tendencia
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {CATEGORIES.map((cat, i) => (
          <a
            key={cat.label}
            href="#"
            className={`reveal reveal-delay-${i + 1} flex flex-col items-center gap-3 group`}
          >
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden"
              style={{ background: 'var(--muted)' }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = '/placeholder.png'
                }}
              />
            </div>
            <span
              className="text-[12px] tracking-wide text-[var(--ink)] group-hover:text-[var(--ink-soft)] transition-colors"
              style={{ fontWeight: 300 }}
            >
              {cat.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, delay }: { product: Product; delay?: number }) {
  const { addItem } = useCart()
  const sizes = product.sizes
  const defaultSize = sizes.includes('M') ? 'M' : sizes[0]
  const [selectedSize, setSelectedSize] = useState(defaultSize)

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      addItem(product, selectedSize)
    },
    [addItem, product, selectedSize]
  )

  return (
    <div className={`reveal${delay ? ` reveal-delay-${delay}` : ''}`}>
      <div className="product-card-wrap group relative">
        {/* Image wrapper */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '4/5', background: 'var(--muted)' }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-card-img w-full h-full object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = '/placeholder.png'
            }}
          />

          {/* Hover overlay panel */}
          <div
            className="product-card-overlay absolute bottom-0 left-0 right-0 p-4"
            style={{ background: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(4px)' }}
          >
            {/* Sizes */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="text-[11px] font-medium px-2 py-1 border transition-colors duration-150"
                  style={{
                    background: selectedSize === size ? 'var(--ink)' : 'transparent',
                    color: selectedSize === size ? '#fff' : 'var(--ink)',
                    borderColor: selectedSize === size ? 'var(--ink)' : 'var(--border)',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleAdd}
              className="w-full py-2.5 text-[12px] tracking-[0.1em] uppercase font-medium transition-colors duration-200"
              style={{ background: 'var(--ink)', color: '#fff' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = '#333')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = 'var(--ink)')
              }
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="mt-3 space-y-0.5">
          <p
            className="font-serif text-[15px] text-[var(--ink)] leading-snug"
            style={{ fontWeight: 400 }}
          >
            {product.name}
          </p>
          <p
            className="text-[13px] text-[var(--ink-soft)]"
            style={{ fontWeight: 300 }}
          >
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Product Grid ─────────────────────────────────────────────────────────────
function ProductGrid({
  id,
  title,
  subtitle,
  items,
}: {
  id?: string
  title: string
  subtitle?: string
  items: Product[]
}) {
  return (
    <section id={id} className="py-16 md:py-24 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="mb-10 md:mb-14">
        <h2
          className="reveal font-serif text-[var(--ink)] leading-tight"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 500,
            fontStyle: 'italic',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="reveal reveal-delay-1 mt-3 text-[14px] text-[var(--ink-soft)] max-w-md"
            style={{ fontWeight: 300 }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────
function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex gap-4">
      <div
        className="w-20 h-24 flex-shrink-0 overflow-hidden"
        style={{ background: 'var(--muted)' }}
      >
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = '/placeholder.png'
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="font-serif text-[14px] text-[var(--ink)] leading-tight mb-0.5"
          style={{ fontWeight: 400 }}
        >
          {item.product.name}
        </p>
        <p className="text-[12px] text-[var(--ink-soft)] mb-3" style={{ fontWeight: 300 }}>
          Talla {item.size}
        </p>

        <div className="flex items-center justify-between">
          {/* Qty controls */}
          <div className="flex items-center border border-[var(--border)]">
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.size, -1)
              }
              className="w-8 h-8 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--muted)] transition-colors text-lg"
              aria-label="Reducir cantidad"
            >
              −
            </button>
            <span
              className="w-8 text-center text-[13px]"
              style={{ fontWeight: 400 }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.product.id, item.size, 1)
              }
              className="w-8 h-8 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--muted)] transition-colors"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-[var(--ink)]">
              ${item.product.price * item.quantity}
            </span>
            <button
              onClick={() => removeItem(item.product.id, item.size)}
              className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              aria-label="Eliminar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer() {
  const { state, closeCart, total, count } = useCart()

  const handleWhatsApp = () => {
    const lines = state.items
      .map(
        (item) =>
          `• ${item.product.name} × ${item.quantity} (Talla ${item.size}) — $${item.product.price * item.quantity}`
      )
      .join('\n')

    const message =
      `🛍️ *Pedido OlaMar*\n\n${lines}\n\n*Total: $${total}*\n\n_Desde Cuenca, Ecuador 🇪🇨_`

    window.open(
      `https://wa.me/593987336646?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-all duration-500"
        style={{
          background: 'rgba(13,13,13,0.35)',
          backdropFilter: 'blur(4px)',
          pointerEvents: state.isOpen ? 'auto' : 'none',
          opacity: state.isOpen ? 1 : 0,
        }}
        onClick={closeCart}
        aria-hidden
      />

      {/* Drawer panel */}
      <aside
        className={`cart-drawer ${state.isOpen ? 'cart-open' : 'cart-closed'} fixed top-0 right-0 h-full z-50 flex flex-col`}
        style={{
          width: 'min(440px, 100vw)',
          background: 'var(--paper)',
          borderLeft: '1px solid var(--border)',
        }}
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <h2 className="font-serif text-xl" style={{ fontWeight: 500 }}>
              Tu bolsa
            </h2>
            {count > 0 && (
              <p className="text-[12px] text-[var(--ink-soft)] mt-0.5" style={{ fontWeight: 300 }}>
                {count} {count === 1 ? 'artículo' : 'artículos'}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-6">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--muted)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="font-serif text-lg text-[var(--ink)] mb-2" style={{ fontStyle: 'italic' }}>
                Tu bolsa está vacía
              </p>
              <p className="text-[13px] text-[var(--ink-soft)]" style={{ fontWeight: 300 }}>
                Añade artículos de nuestra colección
              </p>
              <button
                onClick={closeCart}
                className="mt-6 btn-outline-fill px-6 py-3 text-[12px] tracking-[0.1em] uppercase"
              >
                <span>Ver Colección</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <CartItemRow
                  key={`${item.product.id}-${item.size}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div
            className="px-6 py-6 space-y-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex justify-between items-baseline">
              <span
                className="text-[13px] text-[var(--ink-soft)]"
                style={{ fontWeight: 300 }}
              >
                Subtotal
              </span>
              <span
                className="font-serif text-xl text-[var(--ink)]"
                style={{ fontWeight: 400 }}
              >
                ${total}
              </span>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-4 text-[12px] tracking-[0.15em] uppercase font-medium text-white transition-colors duration-200"
              style={{ background: '#25D366' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = '#1ebe5d')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = '#25D366')
              }
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Proceder al Pago
              </span>
            </button>

            <p
              className="text-center text-[11px] text-[var(--ink-soft)]"
              style={{ fontWeight: 300 }}
            >
              Pago por WhatsApp · Envío a todo Ecuador
            </p>
          </div>
        )}
      </aside>
    </>
  )
}

// ─── Floating WhatsApp Button ─────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/593987336646"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
      style={{ background: '#25D366' }}
      aria-label="Contáctanos por WhatsApp"
      data-magnetic
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

// ─── Brand Marquee ────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['OlaMar.', 'Cuenca, Ecuador', 'Lujo en Movimiento', 'Since 2025']
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div
      className="py-5 overflow-hidden border-y"
      style={{ borderColor: 'var(--border)' }}
    >
      <style>{`
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
      `}</style>
      <div className="marquee-inner">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-8 text-[13px] tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, color: 'var(--ink-soft)' }}
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-16 px-6 md:px-10 mt-10"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <p
              className="font-serif text-2xl text-[var(--ink)] mb-3"
              style={{ fontWeight: 600 }}
            >
              OlaMar.
            </p>
            <p
              className="text-[13px] text-[var(--ink-soft)] leading-relaxed"
              style={{ fontWeight: 300 }}
            >
              Ropa deportiva de lujo desde Cuenca, Ecuador.
            </p>
          </div>

          {[
            {
              title: 'Tienda',
              links: ['Nueva Colección', 'Leggings', 'Tops & Bras', 'Sets', 'Sale'],
            },
            {
              title: 'Información',
              links: ['Sobre Nosotros', 'Sostenibilidad', 'Tallas & Guía', 'Cuidado de Prendas'],
            },
            {
              title: 'Ayuda',
              links: ['Envíos', 'Devoluciones', 'Contacto', 'WhatsApp'],
            },
          ].map((col) => (
            <div key={col.title}>
              <p
                className="text-[11px] tracking-[0.2em] uppercase text-[var(--ink)] mb-4"
                style={{ fontWeight: 500 }}
              >
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                      style={{ fontWeight: 300 }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p
            className="text-[12px] text-[var(--ink-soft)]"
            style={{ fontWeight: 300 }}
          >
            © 2025 OlaMar. Todos los derechos reservados. Cuenca, Ecuador.
          </p>
          <div className="flex gap-5">
            {['Instagram', 'TikTok', 'Pinterest'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[12px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors tracking-wide"
                style={{ fontWeight: 300 }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function OlaMarPage() {
  useReveal()

  const popularProducts = products.filter((p) => p.category === 'popular')
  const essentialProducts = products.filter((p) => p.category === 'essential')

  return (
    <>
      <MagneticCursor />
      <Navbar />

      <main>
        <HeroSection />
        <Marquee />
        <TrendingCategories />

        <div style={{ background: '#fff' }}>
          <ProductGrid
            id="popular"
            title="Lo más popular."
            subtitle="Las piezas que definen la temporada — para quienes no se conforman con menos."
            items={popularProducts}
          />
        </div>

        <div style={{ background: 'var(--muted)' }}>
          <ProductGrid
            id="esenciales"
            title="Los esenciales."
            subtitle="Básicos de alta performance que no pasan de moda. La base de todo armario deportivo."
            items={essentialProducts}
          />
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  )
}
