import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../styles/culture-card.css';
import useAcademyNavigation from "../hooks/useAcademyNavigation";

const SLIDES_COUNT = 3;
const AUTO_ROTATE_INTERVAL = 8000;

const CultureCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [proverbLang, setProverbLang] = useState('eng');
  const { t } = useTranslation();
  const goToAcademy = useAcademyNavigation();
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const cardRef = useRef(null);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES_COUNT);
    }, AUTO_ROTATE_INTERVAL);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const handleDotClick = (i) => {
    setActiveIndex(i);
    stopAutoRotate();
    startAutoRotate();
  };

  const proverbContent = {
    eng: {
      proverb: "Curiosity killed the cat",
      explanation: "An expression suggesting that curiosity, when unchecked, can lead one into risky or dangerous situations.",
      teaching: "Some questions or actions can lead to trouble."
    },
    kisw: {
      proverb: "Udadisi uliua paka",
      explanation: "Msemo unaonyesha kwamba udadisi, unapokuwa haujauzuiwa, unaweza kusababisha mtu kuingia katika hali hatari.",
      teaching: "Maswali au vitendo fulani vinaweza kusababisha matatizo."
    }
  };

  return (
    <div
      className="culture-card"
      ref={cardRef}
      onMouseEnter={stopAutoRotate}
      onMouseLeave={startAutoRotate}
    >

      {/* SLIDER */}
      <div
        className="slider"
        style={{ transform: `translateX(-${activeIndex * (100 / 3)}%)` }}
      >

        {/* SECTION 1 — Proverbs */}
        <div className='slide'>
          <h1><i className="fa-solid fa-lightbulb"></i>{t('cultureCard.phrases.title')}</h1>

          <div className='phrase'>
            <p>
              <p className='phrase-head'>
                <i className="fa-solid fa-check"></i>{t('cultureCard.phrases.proverbLabel')}
                <div className='phrase-language'>
                  <button
                    className={proverbLang === 'eng' ? 'active' : ''}
                    onClick={() => setProverbLang('eng')}
                  >
                    Eng
                  </button>
                  <button
                    className={proverbLang === 'kisw' ? 'active' : ''}
                    onClick={() => setProverbLang('kisw')}
                  >
                    Kisw
                  </button>
                </div>
              </p>
              <span className='proverb-itself'>
                {proverbContent[proverbLang].proverb}
              </span>
            </p>

            <p>
              <p className='phrase-head'>
                <i className="fa-solid fa-check"></i>{t('cultureCard.phrases.descriptionLabel')}
              </p>
              <span className='provern-explanation'>
                {proverbContent[proverbLang].explanation}
              </span>
            </p>

            <p>
              <p className='phrase-head'>
                <i className="fa-solid fa-check"></i>{t('cultureCard.phrases.teachingLabel')}
              </p>
              <span className='proverb-teaching'>
                {proverbContent[proverbLang].teaching}
              </span>
            </p>
          </div>

          <button className='get-more' onClick={goToAcademy}>{t('cultureCard.phrases.learnMore')}</button>
        </div>

        {/* SECTION 2 — Academy */}
        <div className='slide'>
          <h1><i className="fa-solid fa-graduation-cap"></i> Our Courses</h1>

          <p className='academy-intro'>
            Discover hands-on African craft courses taught by master artisans — learn at your own pace, from anywhere.
          </p>

          <div className='academy-course-tag'>
            <span>Pottery</span>
            <span>Cooking</span>
            <span>Woodwork</span>
            <span>Drumming</span>
          </div>

          <p className='academy-video-label'>
            <i className="fa-solid fa-circle-play"></i> Featured lesson
          </p>

          <div className='academy-video-wrapper'>
            <video
              className='academy-video'
              autoPlay
              muted
              loop
              playsInline
              poster="/images/pottery-thumb.jpg"
            >
              <source src="/images/pottery-video.mp4" type="video/mp4" />
            </video>
            <div className='academy-video-overlay'>
              <span className='academy-video-title'>The Art of African Pottery</span>
            </div>
          </div>

          <button className='academy-cta2' onClick={goToAcademy}>
            Try it now <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* SECTION 3 — Events */}
        <div className='slide'>
          <h1><i className="fa-solid fa-masks-theater"></i>{t('cultureCard.events.title')}</h1>

          <p className='event-text'>{t('cultureCard.events.intro')}</p>

          <div className='event'>
            <span className='event-head'> 🎪 <p>{t('cultureCard.events.festivalTitle')}</p></span>

            <span className='date-span'>📅 <p>{t('cultureCard.events.festivalDate')}</p></span>

            <p className='event-description'>{t('cultureCard.events.festivalDescription')}</p>

            <div className='event-buttons'>
              <div className='event-type'>
                <button>{t('cultureCard.events.categories.music')}</button>
                <button>{t('cultureCard.events.categories.dance')}</button>
                <button>{t('cultureCard.events.categories.food')}</button>
              </div>

              <button className='book-event'>{t('cultureCard.events.bookNow')}</button>
            </div>
          </div>
          <p className='see-more' onClick={() => handleNavigation('/events')}>
            {t('cultureCard.events.seeMore')} <i className="fa-solid fa-arrow-right"></i>
          </p>
        </div>

      </div>

      {/* DOTS */}
      <div className="nav-dots">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`nav-dot ${activeIndex === i ? 'active' : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>

    </div>
  );
};

export default React.memo(CultureCard);