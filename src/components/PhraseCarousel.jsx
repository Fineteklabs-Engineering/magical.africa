import { useState } from 'react';
import '../styles/phrases-carousel.css'

const PhraseCarousel = ({ phrases }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + phrases.length) % phrases.length);
  const next = () => setCurrent((c) => (c + 1) % phrases.length);
  const phrase = phrases[current];

 return (
  <div className="tp-phrase-carousel">
    <div className="tp-phrase-carousel-inner">
      <div className="tp-phrase-carousel-text">
        <span className="tp-phrase-carousel-word">{phrase.phrase}</span>
        <span className="tp-phrase-carousel-meaning">{phrase.meaning}</span>
        <div className="tp-phrase-carousel-counter">
          {current + 1} / {phrases.length}
        </div>
      </div>
      <div className="tp-phrase-carousel-img-wrap">
        {phrase.image
          ? <img src={phrase.image} alt={phrase.phrase} />
          : <div className="tp-phrase-carousel-img-placeholder" />}
      </div>
    </div>
    <div className="tp-phrase-carousel-controls">
      <button onClick={prev} className="tp-phrase-nav-btn">&#8592;</button>
      <button onClick={next} className="tp-phrase-nav-btn">&#8594;</button>
    </div>
  </div>
);
};

export default PhraseCarousel