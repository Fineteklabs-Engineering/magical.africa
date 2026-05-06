import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageSeo from '../components/PageSeo';
import { SEO_CONTENT } from '../utils/seoContent';
import { useRef } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/tribes2.css';
import '../styles/contribute.css';

const Tribes = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [hoveredPin, setHoveredPin] = useState(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearchFocus = () => {
  heroRef.current?.scrollIntoView({ behavior: 'smooth' });
};

  const communitiesData = [
    { name: t('tribesPage.communities.maasai.name'), image: 'maasai', region: 'East Africa', location: t('tribesPage.communities.maasai.location'), population: t('tribesPage.communities.maasai.population'), language: t('tribesPage.communities.maasai.language'), desc: t('tribesPage.communities.maasai.desc'), color: '#8B4513' },
     { name: t('tribesPage.communities.kikuyu.name'), image: 'kikuyu', region: 'East Africa', location: t('tribesPage.communities.kikuyu.location'), population: t('tribesPage.communities.kikuyu.population'), language: t('tribesPage.communities.kikuyu.language'), desc: t('tribesPage.communities.kikuyu.desc'), color: '#1565C0' },

    { name: t('tribesPage.communities.zulu.name'), image: 'zulu', region: 'Southern Africa', location: t('tribesPage.communities.zulu.location'), population: t('tribesPage.communities.zulu.population'), language: t('tribesPage.communities.zulu.language'), desc: t('tribesPage.communities.zulu.desc'), color: '#C62828' },

    { name: t('tribesPage.communities.yoruba.name'), image: 'yoruba', region: 'West Africa', location: t('tribesPage.communities.yoruba.location'), population: t('tribesPage.communities.yoruba.population'), language: t('tribesPage.communities.yoruba.language'), desc: t('tribesPage.communities.yoruba.desc'), color: '#6A1B9A' },


    { name: t('tribesPage.communities.luo.name'), image: 'luo', region: 'East Africa', location: t('tribesPage.communities.yoruba.location'), population: t('tribesPage.communities.luo.population'), language: t('tribesPage.communities.luo.language'), desc: t('tribesPage.communities.luo.desc'), color: '#E65100' },
 
    { name: t('tribesPage.communities.swahili.name'), image: 'swahili', region: 'East Africa', location: t('tribesPage.communities.swahili.location'), population: t('tribesPage.communities.swahili.population'), language: t('tribesPage.communities.swahili.language'), desc: t('tribesPage.communities.swahili.desc'), color: '#1B5E20' },
   
    { name: t('tribesPage.communities.igbo.name'), image: 'igbo', region: 'West Africa', location: t('tribesPage.communities.igbo.location'), population: t('tribesPage.communities.igbo.population'), language: t('tribesPage.communities.igbo.language'), desc: t('tribesPage.communities.igbo.desc'), color: '#00695C' },


    { name: t('tribesPage.communities.ashanti.name'), image: 'ashanti', region: 'West Africa', location: t('tribesPage.communities.ashanti.location'), population: t('tribesPage.communities.ashanti.population'), language: t('tribesPage.communities.ashanti.language'), desc: t('tribesPage.communities.ashanti.desc'), color: '#D4A017' },

    { name: t('tribesPage.communities.hausa.name'), image: 'hausa', region: 'West Africa', location: t('tribesPage.communities.hausa.location'), population: t('tribesPage.communities.hausa.population'), language: t('tribesPage.communities.hausa.language'), desc: t('tribesPage.communities.hausa.desc'), color: '#2E7D32' },
   
    
    
    { name: t('tribesPage.communities.amhara.name'), image: 'amhara', region: 'East Africa', location: t('tribesPage.communities.amhara.location'), population: t('tribesPage.communities.amhara.population'), language: t('tribesPage.communities.amhara.language'), desc: t('tribesPage.communities.amhara.desc'), color: '#E65100' },
    { name: t('tribesPage.communities.berber.name'), image: 'berber', region: 'North Africa', location: t('tribesPage.communities.berber.location'), population: t('tribesPage.communities.berber.population'), language: t('tribesPage.communities.berber.language'), desc: t('tribesPage.communities.berber.desc'), color: '#4E342E' },

    { name: t('tribesPage.communities.fulani.name'), image: 'fulani', region: 'West Africa', location: t('tribesPage.communities.fulani.location'), population: t('tribesPage.communities.fulani.population'), language: t('tribesPage.communities.fulani.language'), desc: t('tribesPage.communities.fulani.desc'), color: '#283593' },
 
    { name: t('tribesPage.communities.wolof.name'), image: 'wolof', region: 'West Africa', location: t('tribesPage.communities.wolof.location'), population: t('tribesPage.communities.wolof.population'), language: t('tribesPage.communities.wolof.language'), desc: t('tribesPage.communities.wolof.desc'), color: '#BF360C' },
  
  ];

  const regions = ['All', 'East Africa', 'West Africa', 'North Africa', 'Southern Africa', 'Central Africa'];

  const filtered = communitiesData.filter((c) => {
    const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchSearch;
  });

  const regionColors = {
    'East Africa': '#1B5E20',
    'West Africa': '#E65100',
    'North Africa': '#4E342E',
    'Southern Africa': '#C62828',
  };

  // Pin positions corrected to match actual SVG map rendering
  const mapPins = [
    { name: 'Berber',  region: 'North Africa',    top: '12%', left: '38%' }, // Algeria/Morocco — north of map
    { name: 'Wolof',   region: 'West Africa',     top: '33%', left: '26%' }, // Senegal — far west coast
    { name: 'Fulani',  region: 'West Africa',     top: '38%', left: '36%' }, // Guinea/Mali — inland west
    { name: 'Hausa',   region: 'West Africa',     top: '36%', left: '43%' }, // Nigeria north / Niger
    { name: 'Ashanti', region: 'West Africa',     top: '40%', left: '34%' }, // Ghana — south west
    { name: 'Yoruba',  region: 'West Africa',     top: '43%', left: '40%' }, // Nigeria south west
    { name: 'Igbo',    region: 'West Africa',     top: '46%', left: '42%' }, // Nigeria south east
    { name: 'Amhara',  region: 'East Africa',     top: '36%', left: '64%' }, // Ethiopia highlands
    { name: 'Kikuyu',  region: 'East Africa',     top: '50%', left: '75%' }, // Central Kenya
    { name: 'Maasai',  region: 'East Africa',     top: '53%', left: '73%' }, // Kenya/Tanzania border
    { name: 'Swahili', region: 'East Africa',     top: '55%', left: '78%' }, // Tanzania coast
    { name: 'Zulu',    region: 'Southern Africa', top: '82%', left: '58%' }, // South Africa
  ];

  return (
    <>
      <PageSeo {...SEO_CONTENT.tribes} />

      {/*  HERO  */}
      <div className="heroSection2" ref={heroRef}>
        <video autoPlay muted loop playsInline className="hero-video" src="/images/african-tribes-video.mp4" />
        <Navbar />
        <div className="tribes-hero-content">
          <div className="tribes-hero-content-text">
            <h1>{t('tribesPage.hero.title')}</h1>
            <p>{t('tribesPage.hero.subtitle')}</p>
          </div>

          {/* inside .tribes-hero-content, after the text div */}
<div className="hero-search-wrap">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  <input
    type="text"
    placeholder="Search communities..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="hero-search-input"
  />

 <span className="hero-count">{filtered.length} communities</span>
  
</div>
        </div>
      </div>

      {/* COMMUNITIES SECTION  */}
      <section className="tribes-communities-section">
        <div className="tribes-section-header">
          <p className="tribes-section-label">ACROSS THE CONTINENT</p>
          <h2 className="tribes-section-title">{t('tribesPage.section.title')}</h2>
          <p className="tribes-section-sub">{t('tribesPage.section.subtitle')}</p>
        </div>

        {/* Filter bar */}
        <div className="tribes-filter-bar">
          <div className="tribes-search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
               onFocus={handleSearchFocus}   // ← add this
              className="tribes-search-input"
            />
          </div>

          <div className="tribes-tabs">
  {regions.map((r) => (
    <button
      key={r}
      className={`tribes-tab ${selectedRegion === r ? 'active' : ''}`}
      onClick={() => setSelectedRegion(r)}
    >
      {r !== 'All' && (
        <span
          className="tribes-tab-dot"
          style={{ background: regionColors[r] || '#B5A191' }}
        />
      )}
      {r}
    </button>
  ))}
</div>

          <span className="tribes-count">{filtered.length} communities</span>
        </div>

        {/* Community cards grid 
        <div className="tribes-grid">
          {filtered.length === 0 ? (
            <div className="tribes-empty">
              <p>No communities found. <button onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}>Clear filters</button></p>
            </div>
          ) : (
            filtered.map((community, index) => (
              <div key={index} className="tribe-card" 
              onClick={() => navigate(`/tribes/${community.name.toLowerCase()}`)}
              >
                <div className={`tribe-card-image community-image ${community.image}`}>
                  <div className="tribe-card-region-badge">{community.region}</div>
                </div>
                <div className="tribe-card-body">
                  <div className="tribe-card-accent" style={{ background: community.color }} />
                  <h3 className="tribe-card-name">{community.name}</h3>
                  <p className="tribe-card-desc">{community.desc}</p>
                  <div className="tribe-card-meta">
                    <span>📍 {community.location}</span>
                    <span>👥 {community.population}</span>
                    <span>📖 {community.language}</span>
                  </div>
                  <button className="tribe-card-btn"
                  onClick={() => navigate(`/tribes/${community.name.toLowerCase()}`)}
                  >{t('tribesPage.exploreCulture')} →</button>
                </div>
              </div>
            ))
          )}
        </div>
*/}


<div className="tribes-grid">
  {filtered.length === 0 ? (
    <div className="tribes-empty">
      <p>No communities found. <button onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}>Clear filters</button></p>
    </div>
  ) : (
    filtered.map((community, index) => (
      <>
        <div key={index} className="tribe-card"
          onClick={() => navigate(`/tribes/${community.name.toLowerCase()}`)}>
          {/* ...your existing card JSX unchanged... */}
          <div className={`tribe-card-image community-image ${community.image}`}>
                  <div className="tribe-card-region-badge">{community.region}</div>
                </div>
                <div className="tribe-card-body">
                  <div className="tribe-card-accent" style={{ background: community.color }} />
                  <h3 className="tribe-card-name">{community.name}</h3>
                  <p className="tribe-card-desc">{community.desc}</p>
                  <div className="tribe-card-meta">
                    <span>📍 {community.location}</span>
                    <span>👥 {community.population}</span>
                    <span>📖 {community.language}</span>
                  </div>
                  <button className="tribe-card-btn"
                  onClick={() => navigate(`/tribes/${community.name.toLowerCase()}`)}
                  >{t('tribesPage.exploreCulture')} →</button>
                </div>
        </div>

        {/* Media break after every 4th card */}
        {(index + 1) % 5 === 0 && index !== filtered.length - 1 && (
          <div key={`break-${index}`} className="tribes-media-break">
            <video autoPlay muted loop playsInline src="/images/afrcan-events-video.mp4" className="tribes-break-video" />
            <div className="tribes-break-overlay">
              <div className="tribes-break-content">
                <div className="tribes-break-play" />
                <p className="tribes-break-label">FEATURED STORY</p>
                <h3 className="tribes-break-title">Voices of the Continent</h3>
                <p className="tribes-break-sub">How traditions are kept alive across generations</p>
              </div>
            </div>
          </div>
        )}
      </>
    ))
  )}
</div>
        
      </section>

      {/* ── AFRICA MAP ── */}
      <section className="tribes-map-section">
        <div className="tribes-section-header">
          <p className="tribes-section-label">WHERE THEY LIVE</p>
          <h2 className="tribes-section-title">Communities Across Africa</h2>
          <p className="tribes-section-sub">Hover over a pin to see the community</p>
        </div>

        <div className="tribes-map-outer">
          <div className="tribes-map-container">

            {/* Map + pins */}
            <div className="tribes-map-wrap">
              <img
                src="/images/africa-map.svg"
                alt="Map of Africa"
                className="tribes-map-img"
              />

              {mapPins.map((pin, i) => (
                <div
                  key={i}
                  className="map-pin-wrap"
                  style={{ top: pin.top, left: pin.left }}
                  onMouseEnter={() => setHoveredPin(pin.name)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <div className="map-pin">
                    <div
                      className="map-pin-dot"
                      style={{ background: regionColors[pin.region] || '#B5A191' }}
                    />
                    <div className="map-pin-pulse" style={{ background: `${regionColors[pin.region]}44` }} />
                  </div>
                  {hoveredPin === pin.name && (
                    <div className="map-pin-tooltip">
                      <strong>{pin.name}</strong>
                      <span>{pin.region}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="tribes-map-legend">
              <h4>Regions</h4>
              {Object.entries(regionColors).map(([label, color]) => (
                <div key={label} className="legend-item">
                  <span className="legend-dot" style={{ background: color }} />
                  <span>{label}</span>
                </div>
              ))}
              <div className="legend-divider" />
              <p className="legend-note">Hover a pin to identify the community</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTRIBUTE ── */}
      <section className="contribute-story">
        <div className="contribute-text">
          <h1>{t('tribesPage.contribute.title')}</h1>
          <p>{t('tribesPage.contribute.description')}</p>
          <button className="contribute-btn" onClick={()=> navigate('/blogs')}>{t('tribesPage.contribute.button')}</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Tribes;