import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import '../styles/services.css';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      title: t('services.learnLanguage.title'),
      description: t('services.learnLanguage.description'),
      image: "/images/Learn-Language3.jpg",
      action: () => navigate('/academy')
    },
    {
      title: t('services.exploreIdentity.title'),
      description: t('services.exploreIdentity.description'),
      image: "/images/explore-identity2.jpg",
      action: () => navigate('/tribes')
    },
    {
      title: t('services.streamFolklore.title'),
      description: t('services.streamFolklore.description'),
      image: "/images/Rabbit.jpeg",
      action: () => navigate('/tribes')
    },
    {
      title: t('services.exploreCourses.title'),
      description: t('services.exploreCourses.description'),
      image: "/images/artisans-image.webp",
      action: () => navigate('/academy')
     
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [services.length]);

  const service = services[currentIndex];

  return (
    <section className="services">
      <div className="services-heading">
        <h2>{t('services.heading')}</h2>
      </div>

      <div className="service-section">
        <div className="i">
          <i className="fa-solid fa-chevron-left" id="prev" onClick={handlePrev}></i>
        </div>

        <div className="service-wrap">
          <div className="wrap1">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <button className="learn-more" onClick={service.action}>
              {t('services.learnMore')}
            </button>
          </div>

          <div
            className="wrap2"
            style={{ backgroundImage: `url(${service.image})` }}
          ></div>
        </div>

        <div className="i">
          <i className="fa-solid fa-chevron-right" id="next" onClick={handleNext}></i>
        </div>
      </div>

      <div className="show-all">
        <hr />
        <button className="show-btn">
          <span>{t('services.viewAll')}</span>
        </button>
      </div>
    </section>
  );
};

export default Services;