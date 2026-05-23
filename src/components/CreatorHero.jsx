import { useState } from 'react';
import Navbar from './Navbar';
import '../styles/creator-hero.css';

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
      className="ch-card"
      style={card.style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ch-card-media">
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
        <div className="ch-card-overlay" />
        <a
          href={card.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`ch-card-play ${hovered ? 'ch-card-play--active' : ''}`}
          aria-label={`Watch ${card.title} on YouTube`}
        >
          <PlayIcon />
        </a>
      </div>

      <div className="ch-card-text">
        <span className="ch-card-label">{card.label}</span>
        <p className="ch-card-title">{card.title}</p>
        <p className="ch-card-excerpt">{card.excerpt}</p>
      </div>
    </div>
  );
};

const CreatorHero = ({
  backgroundImage = '/images/pyramids2.jpg',
}) => {
  return (
    <section className="ch-section">
      {/* Background */}
      <div
        className="ch-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="ch-bg-gradient" />

      {/* Navbar sits inside the hero */}
      <div className="ch-navbar-wrap">
        <Navbar />
      </div>

      {/* Center text */}
      <div className="ch-center">
        <p className="ch-eyebrow">Magical Africa</p>
        <h1 className="ch-heading">African Creators</h1>
        <p className="ch-subtitle">
          Artists, makers, and marketplace sellers sharing authentic African
  culture, craft, and creativity with the world through Magical Africa.
        </p>
        <div className="ch-line" />
      </div>

      {/* Floating cards */}
      {floatingCards.map((card) => (
        <FloatingCard key={card.id} card={card} />
      ))}
    </section>
  );
};


export default CreatorHero;