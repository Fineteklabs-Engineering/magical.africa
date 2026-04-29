import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import '../styles/culture-page.css'
import { useNavigate } from 'react-router-dom';

/* ── African-inspired SVG icons ── */

const DrumIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-icon">
    <ellipse cx="24" cy="12" rx="16" ry="6" stroke="rgb(210,123,53)" strokeWidth="2" fill="rgba(210,123,53,0.1)"/>
    <ellipse cx="24" cy="36" rx="16" ry="6" stroke="rgb(181,161,145)" strokeWidth="2" fill="rgba(181,161,145,0.1)"/>
    <line x1="8" y1="12" x2="8" y2="36" stroke="rgb(210,123,53)" strokeWidth="2"/>
    <line x1="40" y1="12" x2="40" y2="36" stroke="rgb(210,123,53)" strokeWidth="2"/>
    <line x1="8" y1="12" x2="18" y2="36" stroke="rgb(181,161,145)" strokeWidth="1.5" strokeDasharray="3 2"/>
    <line x1="40" y1="12" x2="30" y2="36" stroke="rgb(181,161,145)" strokeWidth="1.5" strokeDasharray="3 2"/>
    <line x1="24" y1="12" x2="24" y2="36" stroke="rgb(181,161,145)" strokeWidth="1.5" strokeDasharray="3 2"/>
    <circle cx="8" cy="12" r="2" fill="rgb(210,123,53)"/>
    <circle cx="40" cy="12" r="2" fill="rgb(210,123,53)"/>
    <circle cx="8" cy="36" r="2" fill="rgb(210,123,53)"/>
    <circle cx="40" cy="36" r="2" fill="rgb(210,123,53)"/>
  </svg>
);

const CookingPotIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-icon">
    <path d="M10 20 Q10 38 24 38 Q38 38 38 20 Z" fill="rgba(20,90,52,0.3)" stroke="#145a34" strokeWidth="2"/>
    <rect x="8" y="17" width="32" height="5" rx="2.5" fill="rgba(20,90,52,0.5)" stroke="#145a34" strokeWidth="1.5"/>
    <rect x="3" y="19" width="6" height="3" rx="1.5" fill="#145a34"/>
    <rect x="39" y="19" width="6" height="3" rx="1.5" fill="#145a34"/>
    <path d="M18 10 Q18 6 22 8 Q22 4 26 6 Q26 2 30 4" stroke="rgb(210,123,53)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M16 30 Q20 28 24 30 Q28 32 32 30" stroke="rgb(181,161,145)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    {/* kente-style band */}
    <rect x="10" y="26" width="28" height="4" fill="none" stroke="rgb(210,123,53)" strokeWidth="0.8" strokeDasharray="4 3"/>
  </svg>
);

const AdinkraIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-icon">
    {/* Gye Nyame / Adinkra-inspired symbol */}
    <circle cx="24" cy="24" r="18" stroke="rgb(210,123,53)" strokeWidth="1.5" fill="rgba(210,123,53,0.05)"/>
    <circle cx="24" cy="24" r="10" stroke="rgb(181,161,145)" strokeWidth="1.5" fill="none"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke="rgb(210,123,53)" strokeWidth="1.5"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke="rgb(210,123,53)" strokeWidth="1.5"/>
    <line x1="11" y1="11" x2="37" y2="37" stroke="rgb(181,161,145)" strokeWidth="1" strokeDasharray="2 3"/>
    <line x1="37" y1="11" x2="11" y2="37" stroke="rgb(181,161,145)" strokeWidth="1" strokeDasharray="2 3"/>
    <circle cx="24" cy="24" r="3.5" fill="rgb(210,123,53)"/>
    <circle cx="24" cy="10" r="2" fill="rgb(181,161,145)"/>
    <circle cx="24" cy="38" r="2" fill="rgb(181,161,145)"/>
    <circle cx="10" cy="24" r="2" fill="rgb(181,161,145)"/>
    <circle cx="38" cy="24" r="2" fill="rgb(181,161,145)"/>
  </svg>
);

const Culture = () => {
  const { t } = useTranslation();
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cards = entry.target.querySelectorAll('.culture-section2-a, .culture-section2-b, .culture-section2-c');
          if (entry.isIntersecting) {
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('card-visible');
              }, index * 200);
            });
          } else {
            cards.forEach((card) => card.classList.remove('card-visible'));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='culture-section'>

        {/* decorative kente stripe top */}
        <div className="kente-stripe" />

        <div className='culture-section1'>
          <div className='culture-section-heading'>
            <hr />
            <h3>{t('culture.tagline')}</h3>
          </div>

          <h1>{t('culture.titleStart')} <span>{t('culture.titleAccent')}</span> {t('culture.titleEnd')}</h1>
          <p>{t('culture.description')}</p>
        </div>

        <div className='culture-section2' ref={cardsRef}>

          {/* Card A - Music */}
          <div className='culture-section2-a'>
            <div className='card-icon-wrap card-icon-wrap--a'>
              <DrumIcon />
            </div>
            <h2>
              <span className='card-title-accent'>{t('culture.music.titleAccent')}</span>{' '}
              {t('culture.music.titleRest')}
            </h2>
            <div className='card-divider card-divider-orange' />
            <div className='festivals-list'>
              <div className='festivals-info'>
                <h4>{t('culture.music.festival1.name')}</h4>
                <p>📍 {t('culture.music.festival1.location')}</p>
                <hr />
              </div>
              <div className='festivals-info'>
                <h4>{t('culture.music.festival2.name')}</h4>
                <p>📍 {t('culture.music.festival2.location')}</p>
                <hr />
              </div>
             
            </div>
          </div>

          {/* Card B - Food */}
          <div className='culture-section2-b'>
            <div className='card-icon-wrap card-icon-wrap--b'>
              <CookingPotIcon />
            </div>
            <h2>
              {t('culture.food.titleStart')}{' '}
              <span className='card-title-block'>{t('culture.food.titleAccent')}</span>
            </h2>
            <div className='card-divider card-divider-dark' />
            <div className='festivals-list'>
              <div className='festivals-info2'>
                <h4>{t('culture.food.festival1.name')}</h4>
                <p>📍 {t('culture.food.festival1.location')}</p>
                <hr />
              </div>
              <div className='festivals-info2'>
                <h4>{t('culture.food.festival2.name')}</h4>
                <p>📍 {t('culture.food.festival2.location')}</p>
                <hr />
              </div>
             
            </div>
          </div>

          {/* Card C - Art */}
          <div className='culture-section2-c'>
            <div className='card-icon-wrap card-icon-wrap--c'>
              <AdinkraIcon />
            </div>
            <h2>
              {t('culture.art.titleStart')}{' '}
              <span className='card-title-accent'>{t('culture.art.titleAccent')}</span>
            </h2>
            <div className='card-divider card-divider-orange' />
            <div className='festivals-list'>
              <div className='festivals-info'>
                <h4>{t('culture.art.festival1.name')}</h4>
                <p>📍 {t('culture.art.festival1.location')}</p>
                <hr className='art-hr' />
              </div>
              <div className='festivals-info'>
                <h4>{t('culture.art.festival2.name')}</h4>
                <p>📍 {t('culture.art.festival2.location')}</p>
                <hr className='art-hr' />
              </div>
              
            </div>
          </div>

        </div>

        <div className='culture-page-button' onClick={() => handleNavigation('/events')}>
          <button>{t('culture.learnMore')}</button>
        </div>

        {/* decorative kente stripe bottom */}
        <div className="kente-stripe kente-stripe--bottom" />

      </div>
    </>
  );
};

export default Culture;