import { useState, useRef } from 'react';
import '../styles/cinematic-stories.css';

const floatingCards = [
  {
    id: 1,
    label: 'Interview',
    title: "The Griot's Voice",
    excerpt: 'The last keepers of oral tradition speak',
    video: '/images/afrcan-events-video.mp4',
    style: { top: '18%', left: '4%' },
  },
  {
    id: 2,
    label: 'Interview',
    title: 'The Beadwork Artist',
    excerpt: 'Every colour tells a story only she knows',
    video: '/images/african-tribes-video.mp4',
    style: { top: '58%', left: '8%' },
  },
  {
    id: 3,
    label: 'Interview',
    title: 'The Kente Weaver',
    excerpt: 'Threading identity into cloth, one strip at a time',
    video: '/images/pottery-video.mp4',
    style: { top: '12%', right: '4%' },
  },
  {
    id: 4,
    label: 'Interview',
    title: 'The Drum Master',
    excerpt: 'When the drum speaks, the village listens',
    video: '/images/child.mp4',
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
      {/* ── Video always visible, fills whole card ── */}
      <div className="cs-card-media">
        <video
          src={card.video}
          muted
          loop
          playsInline
          autoPlay
          className="cs-card-video cs-card-video--visible"
        />

        {/* gradient overlay */}
        <div className="cs-card-overlay" />

        {/* play button */}
        <div className={`cs-card-play ${hovered ? 'cs-card-play--active' : ''}`}>
          <PlayIcon />
        </div>
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