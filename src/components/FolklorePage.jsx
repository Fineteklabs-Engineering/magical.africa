import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { folkloreData } from '../data/tribesData';
import '../styles/folklore-page.css';

const FolklorePage = () => {
  const { tribeName } = useParams();
  const navigate = useNavigate();
  const data = folkloreData[tribeName?.toLowerCase()];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tribeName]);

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="fl-not-found">
          <h1>Story not found</h1>
          <p>We don't have a folklore page for "{tribeName}" yet.</p>
          <button onClick={() => navigate('/tribes')}>← Back to Tribes</button>
        </div>
        <Footer />
      </>
    );
  }

  const { originStory, stories, culturalContext, narrator } = data;

  return (
    <>
      <div className="fl-page">
        <Navbar />

        {/* ── CINEMATIC HERO ── */}
        <div className="fl-hero" style={{ backgroundImage: `url(${originStory.image})` }}>
          <div className="fl-hero-overlay" />
          <div className="fl-hero-content">
            <div className="fl-breadcrumb">
              <span onClick={() => navigate('/')} className="fl-crumb">Home</span>
              <span className="fl-sep">›</span>
              <span onClick={() => navigate('/tribes')} className="fl-crumb">Tribes</span>
              <span className="fl-sep">›</span>
              <span onClick={() => navigate(`/tribes/${tribeName}/folklore`)} className="fl-crumb">{data.tribeName}</span>
              <span className="fl-sep">›</span>
              <span className="fl-crumb fl-crumb-active">Folklore</span>
            </div>
            <div className="fl-hero-meta">
              <span className="fl-hero-tag">Origin Story</span>
              <span className="fl-hero-tag fl-hero-tag-outline">{originStory.theme}</span>
              <span className="fl-hero-tag fl-hero-tag-outline">{originStory.readTime}</span>
            </div>
            <h1 className="fl-hero-title">{originStory.title}</h1>
            <p className="fl-hero-tribe">{data.tribeName} People</p>
          </div>
        </div>

        {/* ── STORY BODY ── */}
        <div className="fl-body">
          <div className="fl-body-inner">

            {/* Narrator note */}
            <div className="fl-narrator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(210,123,53)" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>{narrator}</span>
            </div>

            {/* Story text */}
            <div className="fl-story-text">
              {originStory.story.split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'fl-story-first' : ''}>{para}</p>
              ))}
            </div>

            {/* Cultural context */}
            <div className="fl-context">
              <div className="fl-context-label">Cultural Significance</div>
              <p>{culturalContext}</p>
            </div>

          </div>
        </div>

        {/* ── MORE STORIES ── */}
        {stories && stories.length > 0 && (
          <div className="fl-more">
            <div className="fl-more-inner">
              <div className="fl-more-header">
                <h2>More Stories from the {data.tribeName}</h2>
                <div className="fl-more-rule" />
              </div>
              <div className="fl-more-grid">
                {stories.map((story, i) => (
                  <div key={i} className="fl-more-card">
                    <div className="fl-more-card-img">
                      <img src={story.image} alt={story.title} />
                      <div className="fl-more-card-fade" />
                      <span className="fl-more-card-theme">{story.theme}</span>
                    </div>
                    <div className="fl-more-card-body">
                      <h3>{story.title}</h3>
                      <p>{story.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BACK NAVIGATION ── */}
        <div className="fl-nav-footer">
          <button
            className="fl-back-btn"
            onClick={() => navigate(`/tribes/${tribeName}/folklore`)}
          >
            ← Back to {data.tribeName} Folklore
          </button>
          <button
            className="fl-tribe-btn"
            onClick={() => navigate(`/tribes/${tribeName}/history`)}
          >
            Explore {data.tribeName} History →
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default FolklorePage;