import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/homeAisection.css'

const FEATURES = [
  {
    id: 'speech',
    iconColor: 'orange',
    stat: '50+',
    statUnit: 'Languages supported',
  },
  {
    id: 'transcription',
    iconColor: 'green',
    stat: '95%',
    statUnit: 'Transcription accuracy',
  },
  {
    id: 'recommendations',
    iconColor: 'orange',
    stat: '3×',
    statUnit: 'Faster learning outcomes',
  },
]

/* ── Inline SVG icons ── */
const Icon = ({ id, size = 20 }) => {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    width: size,
    height: size,
  }
  switch (id) {
    case 'speech':
      return (
        <svg {...props}>
          <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      )
    case 'transcription':
      return (
        <svg {...props}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <path d="M7 8h.01M10 8h7M7 12h10" />
        </svg>
      )
    case 'recommendations':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    default:
      return null
  }
}

/* ── Main component ── */
const HomeAiSection = ({ imageSrc = '/images/woman-child.png',  mobileImageSrc = '/images/woman-child-mobile.png' }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)

   useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
  const node = sectionRef.current
  if (!node) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      setVisible(entry.isIntersecting)
      // no disconnect — this lets it replay every time you scroll back into view
    },
    { threshold: 0.25 }
  )

  observer.observe(node)
  return () => observer.disconnect()
}, [])

 const bgSrc = isMobile && mobileImageSrc ? mobileImageSrc : imageSrc

  return (
    <section className="has-section" ref={sectionRef}>
      {bgSrc ? (
        <img
          className="has-image-bg"
          src={bgSrc}
          alt=""
          aria-hidden="true"
        />
      ) : (
        <div className="has-video-fallback" aria-hidden="true" />
      )}

      <div className="has-overlay" aria-hidden="true" />

      <div className="has-inner">

        {/* ── Header ── */}
        <span className="has-eyebrow">
          <span className="has-eyebrow-dot" />
          {t('home.aiSection.eyebrow', 'AI-Powered Platform')}
        </span>

        <h2 className="has-heading">
          {t('home.aiSection.title1', 'How We Use AI')}<br />
          <span>{t('home.aiSection.title2', 'to Preserve African Languages')}</span>
        </h2>

        {/* ── Feature cards ── */}
        <div className="has-carousel">
          <div className="has-cards">
          {FEATURES.map(({ id, iconColor, stat, statUnit }, i) => (
  <article
    key={id}
    className={`has-card ${visible ? 'has-card--visible' : ''}`}
    style={{ transitionDelay: `${(FEATURES.length - 1 - i) * 450}ms` }}
  >
                <div className={`has-card-icon has-card-icon--${iconColor}`}>
                  <Icon id={id} />
                </div>
                <h3 className="has-card-title">
                  {t(`home.aiSection.features.${id}.title`, id)}
                </h3>
                <p className="has-card-desc">
                  {t(`home.aiSection.features.${id}.description`, '')}
                </p>
                <div className={`has-card-stat has-card-stat--${iconColor}`}>
                  <strong>{stat}</strong>
                  <span>{statUnit}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── CTAs ── */}
        <div className="has-cta-row">
          <button
            className="has-btn has-btn--primary"
            onClick={() => navigate('/technology')}
          >
            {t('home.aiSection.ctaSeeAll', 'See all AI features')}
          </button>
          <button
            className="has-btn has-btn--ghost"
            onClick={() => navigate('/academy')}
          >
            {t('home.aiSection.ctaAcademy', 'Explore the Academy')}
          </button>
        </div>

      </div>
    </section>
  )
}

export default HomeAiSection