import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useAcademyNavigation from '../hooks/useAcademyNavigation'
import '../styles/technology.css'
import PageSeo from '../components/PageSeo'
import { SEO_CONTENT } from '../utils/seoContent'


const aiFeatureIds = ['speech', 'transcription', 'indexing', 'recommendations', 'regeneration', 'tools']
const aiFeatureAccents = ['red', 'orange', 'sage', 'orange', 'sage', 'red']
const aiFeatureIcons = {
  speech: 'fa-microphone',
  transcription: 'fa-file-lines',
  indexing: 'fa-database',
  recommendations: 'fa-wand-magic-sparkles',
  regeneration: 'fa-arrows-rotate',
  tools: 'fa-toolbox'
}

const aiFeatureImages = {
  speech: '/images/african-family.png',
  transcription: '/images/African-storytelling2.jpg',
  indexing: '/images/cultural-event.webp',
  recommendations: '/images/Oromo2.jpg',
  regeneration: '/images/Rabbit.jpeg',
  tools: '/images/Ai-image.png'
}

const collagePositions = ['tall-left', 'bottom-1', 'bottom-2', 'bottom-3', 'bottom-4', 'tall-right']

const pillarIds = ['ethical', 'panAfrican', 'sovereignty', 'scalable']
const pillarIcons = {
  ethical: 'fa-shield-alt',
  panAfrican: 'fa-globe-africa',
  sovereignty: 'fa-lock',
  scalable: 'fa-chart-line'
}
const pillarAccents = ['red', 'orange', 'sage', 'orange']

const stepIds = ['capture', 'transcribe', 'index', 'deliver']

const Technology = () => {
  const { t } = useTranslation()
  const [visibleCards, setVisibleCards] = useState(new Set())
  const cardRefs = useRef([])
  const pillarsRef = useRef(null)
  const [pillarsVisible, setPillarsVisible] = useState(false)
  const goToAcademy = useAcademyNavigation()
        const navigate = useNavigate(); 
        const handleNavigation = (path) => {
          navigate(path);
        };

  useEffect(() => {
    const observers = []

    cardRefs.current.forEach((ref, i) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, i]))
            }, i * 100)
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(ref)
      observers.push(obs)
    })

    const pillarsObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPillarsVisible(true) },
      { threshold: 0.2 }
    )
    if (pillarsRef.current) pillarsObs.observe(pillarsRef.current)
    observers.push(pillarsObs)

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  return (
    <>
      <PageSeo {...SEO_CONTENT.technology} />

      <Navbar />

      {/* ── HERO ── */}
      <section
        className='tech-hero'
        style={{ backgroundImage: 'url(/images/AI-woman.png)' }}
      >
        <div className='tech-hero-overlay' />

        <div className='tech-hero-content'>
          <span className='tech-eyebrow'>
            <i className='fa-solid fa-microchip'></i>
            {t('technology.hero.eyebrow')}
          </span>
          <h1>
            {t('technology.hero.title1')}<br />
            <span>{t('technology.hero.title2')}</span>
          </h1>
          <p className='tech-hero-sub'>
            {t('technology.hero.subtitle')}
          </p>
        </div>

        {/* Floating stat cards */}
        <div className='tech-hero-floats'>
          <div className='tech-float-card tech-float-card--red'>
            <div className='tech-float-top'>
              <span>{t('technology.hero.stat1Label')}</span>
              <span className='tech-float-icon tech-float-icon--red'>
                <i className='fa-solid fa-language'></i>
              </span>
            </div>
            <strong>{t('technology.hero.stat1Value')}</strong>
            <span className='tech-float-bar tech-float-bar--red' />
          </div>

          <div className='tech-float-card tech-float-card--sage'>
            <div className='tech-float-top'>
              <span>{t('technology.hero.stat2Label')}</span>
              <span className='tech-float-icon tech-float-icon--sage'>
                <i className='fa-solid fa-database'></i>
              </span>
            </div>
            <strong>{t('technology.hero.stat2Value')}</strong>
            <span className='tech-float-bar tech-float-bar--sage' />
          </div>

          <div className='tech-float-card tech-float-card--orange'>
            <div className='tech-float-top'>
              <span>{t('technology.hero.stat3Label')}</span>
              <span className='tech-float-icon tech-float-icon--orange'>
                <i className='fa-solid fa-earth-africa'></i>
              </span>
            </div>
            <strong>{t('technology.hero.stat3Value')}</strong>
            <span className='tech-float-bar tech-float-bar--orange' />
          </div>
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section className='tech-intro-strip'>
        <div className='tech-intro-inner'>
          <div className='tech-intro-text'>
            <h2>{t('technology.intro.title')}</h2>
            <p>{t('technology.intro.description')}</p>
          </div>
          <div className='tech-intro-quote'>
            <blockquote>
             <p>"{t('technology.intro.quote')}"</p>
  Magical Africa
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── AI CAPABILITIES — beige photo collage ── */}
      <section className='tech-features-section tech-features-section--collage'>
        <div className='tech-collage-wrap'>

          <div className='tech-collage-photos'>
            {aiFeatureIds.map((id, i) => (
              <div
                key={id}
                ref={el => (cardRefs.current[i] = el)}
                className={`tech-collage-card tech-collage-card--${collagePositions[i]} ${visibleCards.has(i) ? 'is-visible' : ''}`}
                style={{ backgroundImage: `url(${aiFeatureImages[id]})` }}
              >
                <span className={`tech-collage-card-overlay tech-collage-card-overlay--${aiFeatureAccents[i]}`} />
                <div className='tech-collage-card-content'>
                  <span className='tech-collage-card-icon'>
                    <i className={`fa-solid ${aiFeatureIcons[id]}`}></i>
                  </span>
                  <h3>{t(`technology.features.items.${id}.title`)}</h3>
                  <span className='tech-collage-card-stat'>
                    {t(`technology.features.items.${id}.stat`)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='tech-collage-center'>
            <span className='tech-eyebrow tech-eyebrow--dark'>
              <i className='fa-solid fa-microchip'></i>
              {t('technology.features.sectionTitle')}
            </span>
            <h2 className='tech-collage-heading'>
              {t('technology.features.sectionSubtitle')}
            </h2>
            <button className='tech-cta-btn tech-cta-btn--primary' onClick={goToAcademy}>
              Visit the Academy <i className='fa-solid fa-arrow-up-right'></i>
            </button>
          </div>

        </div>
      </section>

      {/* ── AI PILLARS ── */}
      <section
        className='tech-pillars-section'
        style={{ backgroundImage: 'url(/images/African-landscape-latest.jpg)' }}
        ref={pillarsRef}
      >
        <div className='tech-pillars-overlay' />
        <div className='tech-pillars-content'>
          <div className='tech-section-heading light'>
            <span className='tech-section-line light' />
            <h2>{t('technology.pillars.sectionTitle')}</h2>
            <span className='tech-section-line light' />
          </div>
          <div className={`tech-pillars-grid ${pillarsVisible ? 'is-visible' : ''}`}>
            {pillarIds.map((id, i) => (
              <div key={id} className={`tech-pillar tech-pillar--${pillarAccents[i]}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className={`tech-pillar-icon tech-pillar-icon--${pillarAccents[i]}`}>
                  <i className={`fa-solid ${pillarIcons[id]}`}></i>
                </div>
                <h3>{t(`technology.pillars.items.${id}.label`)}</h3>
                <p>{t(`technology.pillars.items.${id}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — staggered numbered cards, no heading dividers ── */}
      <section className='tech-how-section'>
        <div className='tech-section-heading tech-section-heading--plain'>
          <h2>{t('technology.howItWorks.sectionTitle')}</h2>
        </div>
        <div className='tech-how-grid'>
          {stepIds.map((id, i) => (
            <div key={id} className={`tech-how-card tech-how-card--pos-${i % 2}`}>
              <span className='tech-how-number'>{t(`technology.howItWorks.steps.${id}.step`)}</span>
              <h3>{t(`technology.howItWorks.steps.${id}.title`)}</h3>
              <p>{t(`technology.howItWorks.steps.${id}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA — JOIN THE MOVEMENT ── */}
      <section
        className='tech-cta'
        style={{ backgroundImage: 'url(/images/learn-language-kids.jpg)' }}
      >
        <div className='tech-cta-overlay' />
        <div className='tech-cta-content'>
          <div className='tech-section-heading light'>
            <span className='tech-section-line light' />
            <h2>{t('technology.cta.sectionTitle')}</h2>
            <span className='tech-section-line light' />
          </div>
          <p>{t('technology.cta.description')}</p>
          <div className='tech-cta-btns'>
            <a className='tech-cta-btn tech-cta-btn--primary' 
            onClick={()=> navigate('/academy')}
            >
              {t('technology.cta.exploreBtn')}
            </a>
            <a className='tech-cta-btn tech-cta-btn--secondary' onClick={goToAcademy}>
              {t('technology.cta.startBtn')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Technology