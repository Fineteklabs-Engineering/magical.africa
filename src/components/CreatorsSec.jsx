import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/creators-sec.css';

const floatingCards = [
  {
    id: 1,
    label: 'Creator',
    title: 'Ian Cheryuiot',
    excerpt: 'About Magical Africa',
    video: '/images/ian-cheruiyot.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/qf0gvfIjP3c',
    style: { top: '18%', left: '4%' },
  },
  {
    id: 2,
    label: 'Creator',
    title: 'Steve Kombo',
    excerpt: 'The authenticity of Magical Africa',
    video: '/images/steve-kombo.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/udnvqPG2yNo',
    style: { top: '58%', left: '8%' },
  },
  {
    id: 3,
    label: 'Creator',
    title: 'Lorna Wanderi',
    excerpt: 'Kikuyu Expert',
    video: '/images/lorna-wanderi.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/GpcpkDnjUPI',
    style: { top: '12%', right: '4%' },
  },
  {
    id: 4,
    label: 'Creator',
    title: 'Gloria Nyatichi',
    excerpt: 'What Magical Africa is all about',
    video: '/images/gloria-nyatichi.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/4hOnrv9tleo',
    style: { top: '52%', right: '8%' },
  },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const FloatingCard = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cs-card"
      style={card.style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cs-card-media">
        <video
          src={card.video}
          autoPlay
          muted
          loop
          playsInline
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            top: '-10%',
            left: 0,
            width: '100%',
            height: '120%',
            objectFit: 'cover',
          }}
        />
        <div className="cs-card-overlay" />
        <a
          href={card.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`cs-card-play ${hovered ? 'cs-card-play--active' : ''}`}
          aria-label={`Watch ${card.title} on YouTube`}
        >
          <PlayIcon />
        </a>
      </div>

      <div className="cs-card-text">
        <span className="cs-card-label">{card.label}</span>
        <h3 className="cs-card-title">{card.title}</h3>
        <p className="cs-card-excerpt">{card.excerpt}</p>
      </div>
    </div>
  );
};

const CreatorsSec = ({
  backgroundImage = '/images/woman-painting.png',
}) => {
  const navigate = useNavigate();

  return (
    <section className="cs-section">
      <div
        className="cs-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="cs-bg-gradient" />

      <div className="cs-center">
        <h2 className="cs-heading">African Creators</h2>
        <p className="cs-subtitle">
          Artists, makers, and marketplace sellers sharing authentic African
          culture, craft, and creativity with the world through Magical Africa.
        </p>
        <button
          className="cs-cta-btn"
          onClick={() => navigate('/join')}
        >
          Become a Creator
        </button>
      </div>

      <div className="cs-cards-row">
        {floatingCards.map((card) => (
          <FloatingCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default CreatorsSec;