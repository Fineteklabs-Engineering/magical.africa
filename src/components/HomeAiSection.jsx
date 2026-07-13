import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/homeAisection.css'

const FEATURES = [
  { id: 'speech', icon: 'fa-microphone' },
  { id: 'transcription', icon: 'fa-file-lines' },
  { id: 'recommendations', icon: 'fa-wand-magic-sparkles' },
]

const HomeAiSection = ({ imageSrc = '/images/woman-child.png' }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="has-section" ref={sectionRef}>
      <img className="has-image-bg" src={imageSrc} alt="" aria-hidden="true" />
      <div className="has-overlay" aria-hidden="true" />

      <div className="has-inner">

        <div className="has-header">
          <span className="has-eyebrow">
            <span className="has-eyebrow-dot" />
            {t('home.aiSection.eyebrow', 'AI-Powered Platform')}
          </span>
          <h2 className="has-heading">
            {t('home.aiSection.title', 'How we use AI to preserve African languages')}
          </h2>
        </div>

        <div className="has-cards-row">
          {FEATURES.map(({ id, icon }, i) => (
            <article
              key={id}
              className={[
                'has-card',
                `has-card--${i + 1}`,
                visible ? 'has-card--visible' : '',
                hovered === id ? 'has-card--hovered' : '',
              ].join(' ').trim()}
              style={{ transitionDelay: `${i * 160}ms` }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="has-card-icon">
                <i className={`fa-solid ${icon}`}></i>
              </span>
              <h3 className="has-card-title">
                {t(`home.aiSection.features.${id}.title`, id)}
              </h3>
              <p className="has-card-desc">
                {t(`home.aiSection.features.${id}.description`, '')}
              </p>
            </article>
          ))}
        </div>

        <div className="has-cta-row">
          <button className="has-btn has-btn--primary" onClick={() => navigate('/technology')}>
            {t('home.aiSection.ctaSeeAll', 'See all AI features')}
          </button>
          <button className="has-btn has-btn--ghost" onClick={() => navigate('/academy')}>
            {t('home.aiSection.ctaAcademy', 'Visit the Academy')}
          </button>
        </div>

      </div>
    </section>
  )
}

export default HomeAiSection