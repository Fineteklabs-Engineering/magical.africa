


import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/about.css';

const AboutSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="about-section">
      <h2>{t('about2.title')}</h2>

      <p>{t('about2.description')}</p>

      <button className="learn-more2" onClick={() => navigate('/about')}>
        {t('about2.learnMore')}
      </button>
    </section>
  );
};

export default AboutSection;
