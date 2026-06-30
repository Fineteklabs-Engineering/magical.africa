import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../styles/creators-section.css';

const featuredCreators = [
  { id: 1, name: 'Gloria Machoka', category: 'Art', tribe: 'Kisii', image: '/images/artisan-gloria.jpeg' },
  { id: 2, name: 'Kofi Mensah', category: 'Woodwork', tribe: 'Ashanti', image: '/images/African2.jpg' },
  { id: 3, name: 'Naledi Dlamini', category: 'Pottery', tribe: 'Zulu', image: '/images/lorna2.jpeg' },
  { id: 4, name: 'Tariq Osei', category: 'Fashion', tribe: 'Fante', image: '/images/Edwait.jpeg' },
];

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

const CreatorsSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const handleNavigation = (path) => navigate(path);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cards = entry.target.querySelectorAll('.creator-mini-card');
          if (entry.isIntersecting) {
            cards.forEach((card, index) => {
              setTimeout(() => card.classList.add('creator-mini-visible'), index * 150);
            });
          } else {
            cards.forEach((card) => card.classList.remove('creator-mini-visible'));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="creators-cta-section">
      <div className="creators-cta-content">
        <div className="creators-cta-text">
          <h2>{t('creatorsSection.title', 'African Creators')}</h2>
          <p>
            {t(
              'creatorsSection.description',
              'Magical Africa is home to artisans, weavers, carvers, and fashion designers sharing their craft and culture with the world. Every creator brings their community\'s story to life through what they make. If you create with your hands and carry tradition forward, there\'s a place for you here.'
            )}
          </p>
          <button className="creators-cta-btn" onClick={() => handleNavigation('/join')}>
            {t('creatorsSection.cta', 'Want to be a Creator? Sign Up')}
          </button>
        </div>

        <div className="creators-mini-row" ref={sectionRef}>
          {featuredCreators.map((creator) => (
            <div
              key={creator.id}
              className="creator-mini-card"
              onClick={() => handleNavigation(`/creator/${toSlug(creator.name)}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigation(`/creator/${toSlug(creator.name)}`)}
            >
              <img src={creator.image} alt={creator.name} />
              <div className="creator-mini-info">
                <h4>{creator.name}</h4>
                <span>{creator.category}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="creators-view-all-link" onClick={() => handleNavigation('/creators')}>
          {t('creatorsSection.viewAll', 'View All Creators')}
        </button>
      </div>
    </section>
  );
};

export default CreatorsSection;