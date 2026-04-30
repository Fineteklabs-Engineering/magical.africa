import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/homeAiSection.css'

/* ── Slide definitions ── */
const SLIDES = [
  {
    type: 'grid',
    id: 'main-features',
  },
  {
    type: 'story',
    id: 'story-regeneration',
  },
]

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
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M9 9h6M9 13h4" />
        </svg>
      )
    case 'wand':
      return (
        <svg {...props}>
          <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M12.2 6.2 11 5M12.2 11.8 11 13" />
          <path d="M2 20h.01M5 17l10-10 4 4-10 10-4-4z" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...props}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    case 'child':
      return (
        <svg {...props}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a9 9 0 0 1 13 0" />
        </svg>
      )
    default:
      return null
  }
}

/* ── Story step card ── */
const StoryStep = ({ icon, color, label, desc }) => (
  <div className="has-story-step">
    <div className={`has-story-step-icon has-story-step-icon--${color}`}>
      <Icon id={icon} size={18} />
    </div>
    <div>
      <p className="has-story-step-label">{label}</p>
      <p className="has-story-step-desc">{desc}</p>
    </div>
  </div>
)

/* ── Main component ── */
const HomeAiSection = ({ videoSrc = '/images/child.mp4' }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setSlide(index)
      setAnimating(false)
    }, 320)
  }, [animating])

  /* Auto-advance every 6 seconds */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlide(prev => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleDot = (i) => {
    clearInterval(timerRef.current)
    goTo(i)
    timerRef.current = setInterval(() => {
      setSlide(prev => (prev + 1) % SLIDES.length)
    }, 6000)
  }

  return (
    <section className="has-section">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="has-video-bg"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
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

        <p className="has-sub">
          {t(
            'home.aiSection.subtitle',
            'Magical Africa combines cutting-edge artificial intelligence with deep Pan-African cultural knowledge — making indigenous languages learnable, searchable, and alive.',
          )}
        </p>

        {/* ── Carousel viewport ── */}
        <div className="has-carousel">
          <div className={`has-carousel-track ${animating ? 'has-carousel-track--exit' : 'has-carousel-track--enter'}`}>

            {/* ── SLIDE 0: three feature cards ── */}
            {slide === 0 && (
              <div className="has-cards">
                {FEATURES.map(({ id, iconColor, stat, statUnit }) => (
                  <article key={id} className="has-card">
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
            )}

            {/* ── SLIDE 1: story regeneration ── */}
            {slide === 1 && (
              <div className="has-story-slide">

                {/* left: explanation */}
                <div className="has-story-left">
                  <span className="has-card-badge">New · AI Story Engine</span>

                  <h3 className="has-story-title">
                    {t('home.aiSection.features.storyRegeneration.title', 'AI Children\'s Story Regeneration')}
                  </h3>

                  <p className="has-story-body">
                    {t(
                      'home.aiSection.features.storyRegeneration.description',
                      'Our AI retells beloved African folk tales at exactly the right level for each child — adapting vocabulary, sentence length, and language so kids learn naturally through stories they already love.',
                    )}
                  </p>

                  <div className="has-story-stats">
                    <div className="has-card-stat has-card-stat--orange">
                      <strong>6</strong>
                      <span>Reading difficulty levels</span>
                    </div>
                    <div className="has-card-stat has-card-stat--green">
                      <strong>100+</strong>
                      <span>Pan-African folk tales</span>
                    </div>
                  </div>
                </div>

                {/* right: how it works steps */}
                <div className="has-story-right">
                  <p className="has-story-steps-label">How it works</p>

                  <StoryStep
                    icon="book"
                    color="orange"
                    label="Original folk tale selected"
                    desc="A traditional African story is chosen from our curated archive of 100+ tales spanning the continent."
                  />
                  <div className="has-story-connector" />

                  <StoryStep
                    icon="wand"
                    color="green"
                    label="AI adapts level + language"
                    desc="The story is regenerated in the child's target language at the correct reading level vocabulary, grammar, and sentence length all tailored automatically."
                  />
                  <div className="has-story-connector" />

                  <StoryStep
                    icon="layers"
                    color="orange"
                    label="Audio narration generated"
                    desc="A native-speaker voice synthesis reads the story aloud, helping children connect written words to natural pronunciation."
                  />
                  <div className="has-story-connector" />

                  <StoryStep
                    icon="child"
                    color="green"
                    label="Child reads, listens & learns"
                    desc="The child follows along, tapping words to hear them spoken, building vocabulary through a story they genuinely enjoy."
                  />
                </div>

              </div>
            )}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="has-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`has-dot ${i === slide ? 'has-dot--active' : ''}`}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
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