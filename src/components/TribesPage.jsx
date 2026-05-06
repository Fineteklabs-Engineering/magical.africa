import { useEffect } from 'react';
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
import { tribeData, folkloreData } from '../data/tribesData';

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

const TABS = ['history', 'culture', 'language', 'market', 'folklore', 'leaders'];
const TAB_LABELS = { history: 'History', culture: 'Culture', language: 'Language', market: 'Market', folklore: 'Folklore', leaders: 'Prominent People' };
const DEFAULT_SECTION = 'taboos';

const TribePage = () => {
  const { tribeName, tab, section } = useParams();
  const navigate = useNavigate();

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

  const dynamicSeo = tribeSeo ? {
    ...tribeSeo,
    title: activeTab === 'culture'
       ? `Tribes | ${tribe?.name} | Culture | ${cultureSectionTitles[activeAccordion] || 'Culture'}`
    : `Tribes | ${tribe?.name} | ${tabTitles[activeTab]}`,
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
          <div className="tp-hero-content">
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
                <div className="tp-phrases-grid">
                  {tribe.language.phrases.map((p, i) => (
                    <div key={i} className="tp-phrase-card">
                      <span className="tp-phrase-word">{p.phrase}</span>
                      <span className="tp-phrase-meaning">{p.meaning}</span>
                    </div>
                  ))}
                </div>
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
                  onClick={() => navigate(`/tribes/${tribeName}/folklore/story`)}
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
                  <div key={i} className="tp-leader-card">
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