import { useState } from 'react';
import '../styles/cinematic-stories.css';

const floatingCards = [
  {
    id: 1,
    label: 'Member',
    title: "Ian Cheryuiot",
    excerpt: 'About Magical Africa',
    video: '/images/ian-cheruiyot.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/qf0gvfIjP3c',
    style: { top: '18%', left: '4%' },
  },
  {
    id: 2,
    label: 'Member',
    title: 'Steve Kombo',
    excerpt: 'The authenticity of Magical Africa',
    video: '/images/steve-kombo.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/udnvqPG2yNo',
    style: { top: '58%', left: '8%' },
  },
  {
    id: 3,
    label: 'Member',
    title: 'Lorna Wanderi',
    excerpt: 'Kikuyu Expert',
    video: '/images/lorna-wanderi.mp4',
    youtubeUrl: 'https://www.youtube.com/shorts/GpcpkDnjUPI',
    style: { top: '12%', right: '4%' },
  },
  {
    id: 4,
    label: 'Member',
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

/* ── Floating card ── */
const FloatingCard = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cs-card"
      style={card.style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Local MP4 fills the card (muted, looping preview) */}
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

        {/* gradient overlay */}
        <div className="cs-card-overlay" />

        {/* Play button → opens YouTube in new tab */}
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

      {/* Text always on top */}
      <div className="cs-card-text">
        <span className="cs-card-label">{card.label}</span>
        <p className="cs-card-title">{card.title}</p>
        <p className="cs-card-excerpt cs-card-excerpt--visible">
          {card.excerpt}
        </p>
      </div>
    </div>
  );
};

/* ── Main section ── */
const CinematicStories = ({
  backgroundImage = '/images/pyramids2.jpg',
}) => {
  return (
    <section className="cs-section">
      {/* Background */}
      <div
        className="cs-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="cs-bg-gradient" />

      {/* Center text */}
      <div className="cs-center">
        <p className="cs-center-eyebrow">Voices of Africa</p>
        <h2 className="cs-center-text">
          Whose <em>artists</em> and <em>youth</em>
          <br />
          radiate across the continent and the world.
          <br />
          Where <span>the art of living</span> and creation
          <br />
          can be found everywhere,
          <br />
          where every reflection is{' '}
          <span className="cs-italic">a source of inspiration.</span>
        </h2>
        <div className="cs-center-line" />
      </div>

      {/* Floating cards */}
      {floatingCards.map((card) => (
        <FloatingCard key={card.id} card={card} />
      ))}
    </section>
  );
};

export default CinematicStories;