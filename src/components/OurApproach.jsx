import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/our-approach.css';

const STAGES = [
  {
    id: 'communities',
    color: 'red',
    fallbackTitle: 'Communities',
    fallbackDesc: 'We work with elders, artists, and educators who carry cultural knowledge.',
  },
  {
    id: 'preserve',
    color: 'orange',
    fallbackTitle: 'Preserve',
    fallbackDesc: 'Documenting languages, oral traditions, and practices before they are lost.',
  },
  {
    id: 'build',
    color: 'sage',
    fallbackTitle: 'Build',
    fallbackDesc: 'Turning that knowledge into AI models that understand African contexts.',
  },
  {
    id: 'share',
    color: 'black',
    fallbackTitle: 'Share',
    fallbackDesc: 'Creating education and opportunity that flows back to communities.',
  },
];

const IMAGES = [
  '/images/cultural-event.webp',
  '/images/Women-weaving.png',
  '/images/cultural-event.png',
  '/images/weaving-baskets.webp',
  
];

const OurApproach = ({ images = IMAGES, intervalMs = 4000 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Trigger once the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Cycle images only while the section is visible
 useEffect(() => {
  if (!visible || images.length < 2) return;

  const id = setInterval(() => {
    setActiveImage((prevIndex) => {
      const upcomingIndex = (prevIndex + 1) % images.length;
      console.log('switching to image index', upcomingIndex, images[upcomingIndex]);
      return upcomingIndex;
    });
  }, intervalMs);

  return () => clearInterval(id);
}, [visible, images, intervalMs]);

  return (
    <section className="approachSection" ref={sectionRef}>
      <div className="approachInner">

        {/* ── Left: text ── */}
        <div className="approachCol approachColText">
          <span className="approachEyebrow">
            <span className="approachEyebrowDot" />
            {t('home.approach.eyebrow', 'Our Approach')}
          </span>

          <h2 className="approachHeadline">
            {t(
              'home.approach.title',
              'Magical Africa offers a complete path to preserve, celebrate, and share African culture.'
            )}
          </h2>

          <span className="approachDivider" />

          <p className="approachIntro">
            {t(
              'home.approach.description',
              'We work alongside communities to document languages and traditions, and turn that knowledge into AI, education, and opportunity.'
            )}
          </p>
        </div>

        {/* ── Center: framed, cycling image ── */}
        <div className="approachCol approachColImage">
          <div className="approachImageFrame">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`approachImageLayer ${i === activeImage ? 'approachImageLayer--active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: stage list + CTA ── */}
        <div className="approachCol approachColList">
          <ul className="approachList">
            {STAGES.map((stage) => (
              <li className="approachListItem" key={stage.id}>
                <span className={`approachListDot approachListDot--${stage.color}`} />
                <div>
                  <h3 className="approachListTitle">
                    {t(`home.approach.stages.${stage.id}.title`, stage.fallbackTitle)}
                  </h3>
                  <p className="approachListDesc">
                    {t(`home.approach.stages.${stage.id}.description`, stage.fallbackDesc)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button className="approachCta" onClick={() => navigate('/approach')}>
            {t('home.approach.cta', 'Explore our approach')}
          </button>
        </div>

      </div>
    </section>
  );
};

export default OurApproach;