import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jewelleryData } from '../components/Jewelery';
import { carvingsData } from '../components/Carvings';
import { artefactsData } from '../components/Artefacts';
import { toSlug } from '../components/ProductDetail';
import '../styles/tribe-page.css';
import PageSeo from '../components/PageSeo';
import { SEO_CONTENT } from '../utils/seoContent';
import { tribeData } from '../data/tribesData';
import { folkloreData } from '../data/folkloreData';
import PhraseCarousel from '../components/PhraseCarousel';
import { TRIBE_RADIO_STATIONS } from '../data/tribeRadioStations';
import '../styles/tribes-radio.css'


const TRIBE_RADIO = {
  maasai: {
    name: 'Mayian FM',
    freq: '100.7 FM · Narok, Kenya',
    stream: 'https://mayianfm-atunwadigital.streamguys1.com/mayianfm',
    image: 'https://radio.co.ke/media/station/mayian-fm.webp',  // ← put your image path here
  },
  luo: {
    name: 'Ramogi FM',
    freq: '107.6 FM · Nairobi, Kenya',
    stream: 'https://ramogifm-atunwadigital.streamguys1.com/ramogifm',
    image: 'https://cdn.instant.audio/images/logos/radio-or-ke/ramogi.png',
  },
  kikuyu: {
    name: 'Inooro FM',
    freq: '98.9 FM · Nairobi, Kenya',
    stream: 'https://inoorofm-atunwadigital.streamguys1.com/inoorofm',
    image: 'https://cdn.instant.audio/images/logos/radio-or-ke/inooro.png',
  },
swahili: {
  name: 'Milele FM',
  freq: '104.8 FM · Nairobi, Kenya',
  stream: 'https://milelefm-atunwadigital.streamguys1.com/milelefm',
  image: 'https://cdn.instant.audio/images/logos/radio-or-ke/milele.png',
},
zulu: {
  name: 'Ukhozi FM',
  freq: '90.8 FM · Durban, KwaZulu-Natal',
  stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/UKHOZIFM.mp3',
  image: '/images/ukhozi.jpg',
},
yoruba: {
  name: 'Lagelu FM',
  freq: '96.7 FM · Ibadan, Oyo State',
  stream: 'https://edge.mixlr.com/channel/wupzh',
  image: '/images/lagelu.jpg',
},
igbo: {
  name: 'Radio Palmwine',
  freq: 'Online · Lagos, Nigeria',
  stream: 'https://stream.zeno.fm/yn65m6h2k5zuv',
  image: '/images/radio-palmwine.webp',
},
ashanti: {
  name: 'Otec FM',
  freq: '102.9 FM · Kumasi, Ashanti',
  stream: 'https://stream.zeno.fm/9tua3tnkp0hvv',
  image: '/images/otec-fm.webp',
},
hausa: {
  name: 'Freedom Radio',
  freq: '99.5 FM · Kano, Nigeria',
  stream: 'https://stream.zeno.fm/t8bhnmek8mzuv',
  image: '/images/freedom-radio.png',
},
amhara: {
  name: 'Sheger FM',
  freq: '102.1 FM · Addis Ababa, Amhara',
  stream: 'https://stream.zeno.fm/sheger-fm2fsxukzhgg0uv',
  image: '/images/sheger-fm.avif',
},
};



const getAllProducts = () => {
  const jewellery = Object.values(jewelleryData).flat().map((item) => ({
    ...item,
    imageUrl: item.image,
    category: 'jewellery',
  }));
  const carvings = Object.values(carvingsData).flat().map((item) => ({
    ...item,
    imageUrl: item.img,
    description: item.desc,
    category: 'carvings',
  }));
  const artefacts = Object.values(artefactsData).flatMap((cat) =>
    (cat.items || []).map((item) => ({
      ...item,
      imageUrl: item.img,
      description: item.desc,
      category: 'artefacts',
    }))
  );
  return [...jewellery, ...carvings, ...artefacts];
};

const allProducts = getAllProducts();

const getProductsForTribe = (tribeName) =>
  allProducts.filter((p) => p.tribe?.toLowerCase() === tribeName?.toLowerCase());

const cultureKeys = [
  { key: 'taboos',   label: 'Taboos' },
  { key: 'myths',    label: 'Myths & Legends' },
  { key: 'food',     label: 'Food' },
  { key: 'housing',  label: 'Housing' },
  { key: 'clothing', label: 'Clothing & Adornment' },
  { key: 'religion', label: 'Religion' },
  { key: 'rites',    label: 'Rites of Passage' },
];

const TABS = ['history', 'culture', 'language', 'market', 'folklore', 'leaders', 'radio'];
const TAB_LABELS = { history: 'History', culture: 'Culture', language: 'Language', market: 'Market', folklore: 'Folklore', leaders: 'Prominent People', radio: 'Radio' };
const DEFAULT_SECTION = 'taboos';

const TribePage = () => {
  const { tribeName, tab, section } = useParams();
  const navigate = useNavigate();



const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);
const [playerOpen, setPlayerOpen] = useState(false); 
const [activeStation, setActiveStation] = useState(null);
const tabAudioRef = useRef(null);
const [tabPlaying, setTabPlaying] = useState(false);

const radioStation = TRIBE_RADIO[tribeName?.toLowerCase()];

const handleRadioToggle = () => {
  const audio = audioRef.current;
  if (!audio) return;
  if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    audio.play().catch(() => {});
    setIsPlaying(true);
  }
};

const handleCardClick = () => {
  setPlayerOpen(true);
  // auto-play when card is clicked open
  setTimeout(() => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, 100);
};


const handleStationClick = (station) => {
  if (activeStation?.id === station.id) {
    const audio = tabAudioRef.current;
    if (!audio) return;
    if (tabPlaying) {
      audio.pause();
      setTabPlaying(false);
    } else {
      audio.play().catch(() => {});
      setTabPlaying(true);
    }
    return;
  }
  if (tabAudioRef.current) {
    tabAudioRef.current.pause();
    setTabPlaying(false);
  }
  setActiveStation(station);
  setTimeout(() => {
    if (tabAudioRef.current) {
      tabAudioRef.current.play().catch(() => {});
      setTabPlaying(true);
    }
  }, 80);
};

const handleStationClose = () => {
  if (tabAudioRef.current) tabAudioRef.current.pause();
  setTabPlaying(false);
  setActiveStation(null);
};

const tribeStations = TRIBE_RADIO_STATIONS[tribeName?.toLowerCase()] || [];

  const tribe = tribeData[tribeName?.toLowerCase()];
  const tribeFolklore = folkloreData[tribeName?.toLowerCase()];
  const activeTab = TABS.includes(tab) ? tab : 'history';
  const activeAccordion = section || DEFAULT_SECTION;
  const tribeProducts = getProductsForTribe(tribeName);

  useEffect(() => {
    if (!tab) {
      navigate(`/tribes/${tribeName}/history`, { replace: true });
    }
  }, [tab, tribeName, navigate]);

  const handleTabClick = (t) => {
    if (t === 'culture') {
      navigate(`/tribes/${tribeName}/culture/${DEFAULT_SECTION}`);
    } else {
      navigate(`/tribes/${tribeName}/${t}`);
    }
  };

  const tabTitles = {
    history: 'History',
    culture: 'Culture',
    language: 'Language',
    market: 'Market',
    folklore: 'Folklore',
    leaders: 'Prominent People',
  };

  const cultureSectionTitles = {
    taboos:   'Taboos',
    myths:    'Myths & Legends',
    food:     'Food',
    housing:  'Housing',
    clothing: 'Clothing & Adornment',
    religion: 'Religion',
    rites:    'Rites of Passage',
  };

  const tribeSeo = SEO_CONTENT[tribeName?.toLowerCase()];

  {/* 
  const dynamicSeo = tribeSeo ? {
    ...tribeSeo,
    title: activeTab === 'culture'
       ? `Tribes | ${tribe?.name} | Culture | ${cultureSectionTitles[activeAccordion] || 'Culture'}`
    : `Tribes | ${tribe?.name} | ${tabTitles[activeTab]}`,
    path: activeTab === 'culture'
      ? `/tribes/${tribeName}/culture/${activeAccordion}`
      : `/tribes/${tribeName}/${activeTab}`,
  } : null;
   */}

   const dynamicSeo = tribeSeo ? {
  ...tribeSeo,
  title: activeTab === 'culture'
    ? `The ${tribe?.name} ${cultureSectionTitles[activeAccordion] || 'Culture'}`
    : `The ${tribe?.name} ${tabTitles[activeTab]} `,
  path: activeTab === 'culture'
    ? `/tribes/${tribeName}/culture/${activeAccordion}`
    : `/tribes/${tribeName}/${activeTab}`,
} : null;

  const handleAccordionClick = (key) => {
    navigate(`/tribes/${tribeName}/culture/${key}`);
  };

  if (!tribe) {
    return (
      <>
      {dynamicSeo && <PageSeo {...dynamicSeo} />}
        <Navbar />
        <div className="tp-not-found">
          <h1>Tribe not found</h1>
          <p>We don't have a page for "{tribeName}" yet.</p>
          <button onClick={() => navigate('/tribes')}>← Back to Tribes</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {dynamicSeo && <PageSeo {...dynamicSeo} />}
      <div className="tp-page">
        <Navbar />

 {/* ── HERO ── */}
<div className="tp-hero" style={{ backgroundImage: `url(${tribe.heroImage})` }}>
  <div className="tp-hero-overlay" />
  <div
    className="tp-hero-content"
    style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}
  >
    {/* ── LEFT: existing content ── */}
    <div style={{ flex: 1 }}>
      <div className="tp-breadcrumb">
        <span onClick={() => navigate('/')} className="tp-crumb">Home</span>
        <span className="tp-crumb-sep">›</span>
        <span onClick={() => navigate('/tribes')} className="tp-crumb">Tribes</span>
        <span className="tp-crumb-sep">›</span>
        <span className="tp-crumb tp-crumb-active">{tribe.name}</span>
      </div>
      <p className="tp-hero-region">{tribe.region}</p>
      <h1 className="tp-hero-title">{tribe.name}</h1>
      <p className="tp-hero-tagline">{tribe.tagline}</p>
      <div className="tp-hero-stats">
        <div className="tp-stat">
          <span className="tp-stat-label">Location</span>
          <span className="tp-stat-value">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="rgb(210,123,53)" strokeWidth="1.8" fill="none"/>
              <circle cx="12" cy="9" r="2.5" stroke="rgb(210,123,53)" strokeWidth="1.8" fill="none"/>
            </svg>
            {tribe.location}
          </span>
        </div>
        <div className="tp-stat">
          <span className="tp-stat-label">Population</span>
          <span className="tp-stat-value">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="rgb(210,123,53)" strokeWidth="1.8"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {tribe.population}
          </span>
        </div>
        <div className="tp-stat">
          <span className="tp-stat-label">Language</span>
          <span className="tp-stat-value">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {tribe.language.name}
          </span>
        </div>
      </div>
    </div>

    {/* ── RIGHT: Radio card ── */}
    {radioStation && (
  <>
    <audio ref={audioRef} src={radioStation.stream} preload="none" />

    {!playerOpen ? (
      /* ── STAGE 1: Image card with hover overlay ── */
      <div className="tp-radio-thumbnail" onClick={handleCardClick}>
        <img
          src={radioStation.image}
          alt={radioStation.name}
          className="tp-radio-thumb-img"
        />
        <div className="tp-radio-thumb-overlay">
          <div className="tp-radio-thumb-play">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p className="tp-radio-thumb-label">Tune In</p>
        </div>
      </div>
    ) : (
      /* ── STAGE 2: Full player card ── */
      <div className="tp-radio-card">
        {/* top row: image + station info */}
        <div className="tp-radio-card-top">
          <img
            src={radioStation.image}
            alt={radioStation.name}
            className="tp-radio-card-img"
          />
          <div className="tp-radio-card-info">
            {/* 
            <div className="tp-radio-label">
              <span className={`tp-radio-label-dot ${!isPlaying ? 'paused' : ''}`} />
              Tribe Radio
            </div>
            */}
            <p className="tp-radio-station-name">{radioStation.name}</p>
            <p className="tp-radio-station-freq">{radioStation.freq}</p>
          </div>
          {/* close button */}
          <button
            className="tp-radio-close"
            onClick={(e) => {
              e.stopPropagation();
              audioRef.current?.pause();
              setIsPlaying(false);
              setPlayerOpen(false);
            }}
          >
            ✕
          </button>
        </div>

        {/* controls row */}
        <div className="tp-radio-controls">
          <button
            className="tp-radio-play-btn"
            onClick={handleRadioToggle}
            aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <div className="tp-radio-waveform">
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} className={`tp-radio-bar ${!isPlaying ? 'paused' : ''}`} />
            ))}
          </div>
        </div>

        <p className="tp-radio-status">
          {isPlaying ? 'Streaming live · Ewangan olosho' : 'Tap to tune in'}
        </p>
      </div>
    )}
  </>
)}
  </div>
</div>

        {/* ── TABS ── */}
        <div className="tp-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tp-tab ${activeTab === t ? 'tp-tab-active' : ''}`}
              onClick={() => handleTabClick(t)}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="tp-content">

          {/* HISTORY */}
          {activeTab === 'history' && (
            <div className="tp-history">
              <div className="tp-history-overview">
                <h2>Overview</h2>
                <p>{tribe.history.overview}</p>
              </div>
              <div className="tp-timeline">
                <h2>Timeline</h2>
                <div className="tp-timeline-list">
                  {tribe.history.timeline.map((item, i) => (
                    <div key={i} className="tp-timeline-item">
                      <div className="tp-timeline-year">{item.year}</div>
                      <div className="tp-timeline-dot" />
                      <div className="tp-timeline-event">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CULTURE */}
          {activeTab === 'culture' && (
            <div className="tp-culture">
              <div className="tp-culture-list">
                {cultureKeys.map((item) => (
                  <button
                    key={item.key}
                    className={`tp-culture-item ${activeAccordion === item.key ? 'active' : ''}`}
                    onClick={() => handleAccordionClick(item.key)}
                  >
                    <span className="tp-culture-arrow">
                      {activeAccordion === item.key ? '▼' : '▶'}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="tp-culture-content">
                <h2>{tribe.culture[activeAccordion]?.title}</h2>
                <p>{tribe.culture[activeAccordion]?.content}</p>
              </div>
            </div>
          )}

          {/* LANGUAGE */}
          {activeTab === 'language' && (
            <div className="tp-language">
              <div className="tp-language-overview">
                <h2>{tribe.language.name}</h2>
                <div className="tp-lang-meta">
                  <span><strong>Language Family:</strong> {tribe.language.family}</span>
                  <span><strong>Speakers:</strong> {tribe.language.speakers}</span>
                </div>
                <p>{tribe.language.overview}</p>
              </div>
              <div className="tp-phrases">
                <h3>Common Phrases</h3>
                
                <PhraseCarousel phrases={tribe.language.phrases} />
              </div>
            </div>
          )}

          {/* MARKET */}
          {activeTab === 'market' && (
            <div className="tp-market">
              <div className="tp-market-overview">
                <h2>Marketplace</h2>
                <p>{tribe.marketOverview}</p>
              </div>
              {tribeProducts.length === 0 ? (
                <div className="tp-market-empty">
                  <p>No products listed for this tribe yet.</p>
                  <button onClick={() => navigate('/market')}>Browse the full marketplace →</button>
                </div>
              ) : (
                <div className="tp-market-grid">
                  {tribeProducts.map((product, i) => (
                    <div
                      key={i}
                      className="tp-product-card"
                      onClick={() => navigate(`/market/${product.category}/${toSlug(product.name)}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="tp-product-image">
                        <img src={product.imageUrl} alt={product.name} />
                      </div>
                      <div className="tp-product-body">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <div className="tp-product-footer">
                          <span className="tp-product-price">
                            {typeof product.price === 'number' ? `$${product.price}` : product.price}
                          </span>
                          <button className="tp-product-btn" onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/market/${product.category}/${toSlug(product.name)}`);
                          }}>
                            View →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── FOLKLORE ── */}
          {activeTab === 'folklore' && tribeFolklore && (
            <div className="tp-folklore">
              {/* Origin Story */}
              <div className="tp-folklore-origin">
                <div className="tp-folklore-origin-badge">Origin Story</div>
                <div className="tp-folklore-origin-inner"
                  style={{ cursor: 'pointer' }}
                 onClick={() => navigate(`/tribes/${tribeName}/folklore/${tribeFolklore.originStory.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                >
                  <div className="tp-folklore-origin-img-wrap">
                    <img
                      src={tribeFolklore.originStory.image}
                      alt={tribeFolklore.originStory.title}
                      className="tp-folklore-origin-img"
                    />
                    <div className="tp-folklore-origin-img-overlay" />
                  </div>


                 <div className="tp-folklore-origin-text">
  <h2>{tribeFolklore.originStory.title}</h2>

  {tribeFolklore.originStory.story
    .split('\n\n') 
    .slice(0, 4)     // show ONLY first 2 paragraphs 
    .map((para, i) => (
      <p key={i}>{para}</p>
    ))
  }
</div>


                </div>
              </div>

              {/* Popular Stories */}
              <div className="tp-folklore-stories">
                <h3 className="tp-folklore-stories-heading">
                  <span>Popular Stories</span>
                </h3>
                <div className="tp-folklore-stories-grid">
                  {tribeFolklore.stories.map((story, i) => (
                    <div key={i} className="tp-folklore-story-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/tribes/${tribeName}/folklore/story`)}
                    >
                      <div className="tp-folklore-story-img-wrap">
                        <img src={story.image} alt={story.title} />
                        <div className="tp-folklore-story-img-fade" />
                        <span className="tp-folklore-story-theme">{story.theme}</span>
                      </div>
                      <div className="tp-folklore-story-body">
                        <h4>{story.title}</h4>
                        <p>{story.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FOLKLORE TAB — no data state ── */}
          {activeTab === 'folklore' && !tribeFolklore && (
            <div className="tp-market-empty">
              <p>No folklore data available for this tribe yet.</p>
            </div>
          )}

          {/* ── PROMINENT PEOPLE ── */}
          {activeTab === 'leaders' && tribe.leaders && (
            <div className="tp-leaders">
              <div className="tp-leaders-header">
                <h2>Prominent People</h2>
                <p>Figures who shaped {tribe.name} history, culture, and legacy.</p>
              </div>
              <div className="tp-leaders-grid">
                {tribe.leaders.map((leader, i) => (
                  <div key={i} className="tp-leader-card"
                  
                  style={{ cursor: 'pointer' }} 
                  onClick={() => navigate(`/tribes/${tribeName}/leaders/${leader.name.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <div className="tp-leader-img-wrap">
                      <img src={leader.image} alt={leader.name} className="tp-leader-img" />
                      <div className="tp-leader-img-overlay" />
                      <div className="tp-leader-img-bottom">
                        <span className="tp-leader-legacy">{leader.legacy}</span>
                      </div>
                    </div>
                    <div className="tp-leader-body">
                      <div className="tp-leader-years">{leader.years}</div>
                      <h3 className="tp-leader-name">{leader.name}</h3>
                      <div className="tp-leader-role">{leader.role}</div>
                      <p className="tp-leader-desc">{leader.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



        {activeTab === 'radio' && (
  <div className="tp-radio-tab">

    {activeStation && (
      <audio ref={tabAudioRef} src={activeStation.stream} preload="none" />
    )}

    <div className="tp-radio-tab-header">
      <h2>Radio Stations</h2>
      <p>Tune in to radio stations connected to the {tribe.name} community.</p>
    </div>

    {tribeStations.length === 0 ? (
      <div className="tp-market-empty">
        <p>No radio stations listed for this tribe yet.</p>
      </div>
    ) : (
      <div className="tp-radio-tab-grid">
        {tribeStations.map((station) => {
          const isActive = activeStation?.id === station.id;
          return (
            <div
              key={station.id}
              className={`tp-radio-tab-card ${isActive ? 'tp-radio-tab-card--active' : ''}`}
              onClick={() => handleStationClick(station)}
            >
              {/* ── IMAGE (always visible) ── */}
              <div className="tp-radio-tab-card-img-wrap">
                <img
                  src={station.image}
                  alt={station.name}
                  className="tp-radio-tab-card-img"
                />
              </div>

              {/* ── HOVER PLAYER OVERLAY ── */}
              <div className="tp-radio-tab-hover-player" onClick={(e) => e.stopPropagation()}>
                
                {/* close button */}
                {isActive && (
                  <button
                    className="tp-radio-tab-close"
                    onClick={(e) => { e.stopPropagation(); handleStationClose(); }}
                  >✕</button>
                )}

                {/* top row: small logo + name + freq */}
                <div className="tp-radio-tab-hover-top">
                  <img src={station.image} alt={station.name} className="tp-radio-tab-hover-thumb" />
                  <div>
                    <p className="tp-radio-tab-hover-name">{station.name}</p>
                    <p className="tp-radio-tab-hover-freq">{station.freq}</p>
                  </div>
                </div>

                {/* play/pause + waveform */}
                <div className="tp-radio-tab-hover-controls">
                  <button
                    className="tp-radio-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(station);
                    }}
                  >
                    {isActive && tabPlaying ? (
                      <svg viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  <div className="tp-radio-waveform">
                    {[1,2,3,4,5,6,7].map(i => (
                      <div key={i} className={`tp-radio-bar ${!(isActive && tabPlaying) ? 'paused' : ''}`} />
                    ))}
                  </div>
                </div>

                <p className="tp-radio-status">
                  {isActive && tabPlaying ? `Streaming live · ${station.name}` : 'Tap to tune in'}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    )}
  </div>
)}

        </div>

        <button className="tp-back" onClick={() => navigate('/tribes')}>
          ← Back to Tribes
        </button>
      </div>

      <Footer />
    </>
  );
};

export default TribePage;