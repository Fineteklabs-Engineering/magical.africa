import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/culture-showcase.css';

const EVENTS = [
  {
    key: 'music',
    accent: 'orange',
    image: '/images/Sauti-Za-Busara-Tanzania.jpg',
    title: 'Music Festivals',
    description: 'Drums, strings and voices from across the continent, gathered in open-air celebrations that run through the night.',
  },
  {
    key: 'food',
    accent: 'sage',
    image: '/images/food-event2.jpg',
    title: 'Culinary Events',
    description: 'Street feasts and communal tables serving generations-old recipes, from Nairobi kitchens to coastal grills.',
  },
  {
    key: 'art',
    accent: 'red',
    image: '/images/art-event2.jpg',
    title: 'Art & Heritage',
    description: 'Craft markets, textile exhibitions and gallery walks celebrating symbols, sculpture and story passed down through hands.',
  },
];

const FLIP_SHOW_MS = 2600; // how long the back stays visible
const GAP_MS = 500;        // pause on the front before the next card flips

const CultureShowcase = () => {
  const navigate = useNavigate();
  const [flippedIndex, setFlippedIndex] = useState(-1);
  const timersRef = useRef([]);

  useEffect(() => {
    let cardIndex = 0;

    const runCycle = () => {
      setFlippedIndex(cardIndex);

      const flipBack = setTimeout(() => {
        setFlippedIndex(-1);

        const advance = setTimeout(() => {
          cardIndex = (cardIndex + 1) % EVENTS.length;
          runCycle();
        }, GAP_MS);

        timersRef.current.push(advance);
      }, FLIP_SHOW_MS);

      timersRef.current.push(flipBack);
    };

    runCycle();

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <section className="culture-hero">
      <div className="culture-hero-bg" />
      <div className="culture-hero-overlay" />

      <div className="culture-hero-content">
        {/* Left: heading + CTAs */}
        <div className="culture-hero-left">
          <span className="culture-hero-eyebrow">Experience</span>
       <h1 className="culture-hero-heading">
  African Cultural
  <br />
  <span>Events</span>
</h1>
          <div className="culture-hero-ctas">
            <button
              className="culture-cta culture-cta--solid"
              onClick={() => navigate('/events')}
            >
              Book Now
            </button>
            <button
              className="culture-cta culture-cta--outline"
              onClick={() => navigate('/events')}
            >
              View Events
            </button>
          </div>
        </div>

        {/* Right: flip-card venn cluster */}
        <div className="culture-hero-right">
          <div className="culture-venn">
            {EVENTS.map((event, index) => (
              <div
                key={event.key}
                className={`flip-card flip-card--${event.key} ${
                  flippedIndex === index ? 'is-flipped' : ''
                }`}
              >
                <div className="flip-card-inner">
                  <div className="flip-face flip-face--front">
                    <img src={event.image} alt={event.title} />
                    <div className="flip-face-shade" />
                  </div>
                  <div className={`flip-face flip-face--back flip-face--${event.accent}`}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureShowcase;