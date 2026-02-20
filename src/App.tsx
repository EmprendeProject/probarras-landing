import { useState, useEffect, useRef, useCallback } from 'react'
import fotoPrincipal from './assets/images/fotos de la barra web/principal.png'
import fotoBarra1 from './assets/images/fotos de la barra web/barra1.png'
import fotoBarra3 from './assets/images/fotos de la barra web/barra3.png'
import fotoBarra4 from './assets/images/fotos de la barra web/barra4.png'
import fotoBarra5 from './assets/images/fotos de la barra web/barra5.png'
import probarrasLogo from './assets/images/probarras logo.png'
import logoTexto from './assets/images/probarras logo texto.png'
import './App.css'

/* ---- Hero photos ---- */
const heroPhotos = [
  { src: fotoPrincipal, alt: 'Pro Barras Rig - Vista principal' },
  { src: fotoBarra1, alt: 'Pro Barras Rig - Vista 1' },
  { src: fotoBarra3, alt: 'Pro Barras Rig - Vista 2' },
  { src: fotoBarra4, alt: 'Pro Barras Rig - Vista 3' },
  { src: fotoBarra5, alt: 'Pro Barras Rig - Vista 4' },
]

/* ---- Gallery photos ---- */
const galleryPhotos = [
  { src: fotoPrincipal, alt: 'Pro Barras Rig - Vista principal' },
  { src: fotoBarra1, alt: 'Pro Barras Rig - Vista 1' },
  { src: fotoBarra3, alt: 'Pro Barras Rig - Vista 2' },
  { src: fotoBarra4, alt: 'Pro Barras Rig - Vista 3' },
  { src: fotoBarra5, alt: 'Pro Barras Rig - Vista 4' },
]

import accBarra1 from './assets/images/accesorios pb/barra1.png'
import accGanchos from './assets/images/accesorios pb/ganchos.png'
import accMulti from './assets/images/accesorios pb/multiagarre.png'
import accMulti2 from './assets/images/accesorios pb/multiagarre2.png'
import accParalelas from './assets/images/accesorios pb/paralelas.png'
import accPorta from './assets/images/accesorios pb/porta barra.png'

const accessories = [
  {
    name: 'Barra Multi-Grip',
    description: 'Barra de dominadas con múltiples agarres para variedad de ejercicios.',
    photo: accMulti,
  },
  {
    name: 'Estación de Fondos',
    description: 'Barras paralelas para fondos, tríceps y abdominales.',
    photo: accParalelas,
  },
  {
    name: 'Sistema de Poleas',
    description: 'Polea alta y baja para jalones, remos y extensiones de cable.',
    photo: accMulti2,
  },
  {
    name: 'J-Hooks',
    description: 'Ganchos de acero reforzado para soporte seguro de la barra.',
    photo: accGanchos,
  },
  {
    name: 'Safety Arms',
    description: 'Brazos de seguridad ajustables para entrenar sin spotter.',
    photo: accBarra1,
  },
  {
    name: 'Porta Barra',
    description: 'Soporte vertical para almacenar tu barra olímpica con seguridad.',
    photo: accPorta,
  },
]

function App() {
  // Hero carousel state
  const [heroIdx, setHeroIdx] = useState(0)
  const heroTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const heroTotal = heroPhotos.length

  const heroGoTo = useCallback(
    (i: number) => setHeroIdx(((i % heroTotal) + heroTotal) % heroTotal),
    [heroTotal],
  )
  const heroNext = useCallback(() => heroGoTo(heroIdx + 1), [heroIdx, heroGoTo])

  useEffect(() => {
    heroTimeout.current = setTimeout(heroNext, 5000)
    return () => { if (heroTimeout.current) clearTimeout(heroTimeout.current) }
  }, [heroIdx, heroNext])

  // Gallery carousel state
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = galleryPhotos.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 4000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [current, next])

  return (
    <div className="sales-page">
      {/* Ambient glow effects */}
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      {/* Header / Nav */}
      <header className="sales-header">
        <img src={logoTexto} alt="Pro Barras" className="header-logo" />
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-badge">EQUIPAMIENTO PROFESIONAL</div>
        <h1 className="hero-title">
          Lleva tu <span className="highlight">gimnasio</span> al
          <br />
          siguiente nivel
        </h1>
        <p className="hero-subtitle">
          Racks, barras y accesorios de acero de alta resistencia.
          <br />
          Diseñados para durar. Hechos en Venezuela.
        </p>

        {/* Hero Image Carousel */}
        <div className="hero-image-wrapper">
          <div className="image-glow" />
          <div className="hero-carousel-track" style={{ transform: `translateX(-${heroIdx * 100}%)` }}>
            {heroPhotos.map((photo, i) => (
              <div className="hero-slide" key={i}>
                <img src={photo.src} alt={photo.alt} className="hero-image" />
                <div className="hero-slide-gradient" />
              </div>
            ))}
          </div>
          {/* Hero dots */}
          <div className="hero-dots">
            {heroPhotos.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === heroIdx ? 'active' : ''}`}
                onClick={() => heroGoTo(i)}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://wa.me/584241234567"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          <span className="cta-icon">💬</span>
          Comprar ahora
          <span className="cta-arrow">→</span>
        </a>
        <p className="cta-hint">Escríbenos por WhatsApp y recibe asesoría personalizada</p>
      </main>

      {/* Accessories Section */}
      <section className="accessories-section">
        <div className="section-header">
          <div className="section-badge">PERSONALIZA TU RIG</div>
          <h2 className="section-title">
            Piezas y <span className="highlight">accesorios</span>
          </h2>
          <p className="section-subtitle">
            Potencia tu rig con estos complementos de acero de alta resistencia.
            Cada pieza se acopla perfectamente a tu rack.
          </p>
        </div>

        <div className="accessories-grid">
          {accessories.map((item, index) => (
            <div
              className="accessory-card"
              key={item.name}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="accessory-photo-wrapper">
                <img src={item.photo} alt={item.name} className="accessory-photo" />
              </div>
              <h3 className="accessory-name">{item.name}</h3>
              <p className="accessory-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Carousel */}
      <section className="gallery-section">
        <div className="section-header">
          <div className="section-badge">GALERÍA</div>
          <h2 className="section-title">
            Conoce el <span className="highlight">producto</span>
          </h2>
          <p className="section-subtitle">
            Explora cada detalle de nuestro rig y sus acabados profesionales.
          </p>
        </div>

        <div className="gallery-carousel">
          <button className="gallery-arrow gallery-arrow-left" onClick={prev} aria-label="Anterior">
            ‹
          </button>

          <div className="gallery-track-wrapper">
            <div
              className="gallery-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {galleryPhotos.map((photo, i) => (
                <div className="gallery-slide" key={i}>
                  <img src={photo.src} alt={photo.alt} />
                </div>
              ))}
            </div>
          </div>

          <button className="gallery-arrow gallery-arrow-right" onClick={next} aria-label="Siguiente">
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="gallery-dots">
          {galleryPhotos.map((_, i) => (
            <button
              key={i}
              className={`gallery-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bottom-cta-section">
        <h2 className="bottom-cta-title">¿Listo para equipar tu espacio?</h2>
        <a
          href="https://wa.me/584241234567"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button bottom-cta-btn"
        >
          <span className="cta-icon">💬</span>
          Comprar ahora
          <span className="cta-arrow">→</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="sales-footer">
        <img src={probarrasLogo} alt="Pro Barras" className="footer-logo" />
        <p>© 2026 Pro Barras — Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App
