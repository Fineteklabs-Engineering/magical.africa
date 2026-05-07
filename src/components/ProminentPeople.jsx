import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tribeData } from '../data/tribesData';
import '../styles/prominent-people.css';

const ProminentPeople = () => {
const { tribeName, leaderName } = useParams(); 
  const navigate = useNavigate();

  const tribe = tribeData[tribeName?.toLowerCase()];
  
 const leader = tribe?.leaders?.find(
  (l) => l.name.toLowerCase().replace(/\s+/g, '-') === leaderName
);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!tribe || !leader) {
    return (
      <>
        <Navbar />
        <div className="pp-not-found">
          <h1>Person not found</h1>
          <p>We couldn't find this person.</p>
          <button onClick={() => navigate(`/tribes/${tribeName}/leaders`)}>
            ← Back to Prominent People
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="pp-page">
        <Navbar />

        {/* ── HERO ── */}
        <div className="pp-hero">
          <div
            className="pp-hero-bg"
            style={{ backgroundImage: `url(${leader.image})` }}
          />
          <div className="pp-hero-overlay" />
          <div className="pp-hero-content">
            <div className="pp-breadcrumb">
              <span onClick={() => navigate('/')} className="pp-crumb">Home</span>
              <span className="pp-crumb-sep">›</span>
              <span onClick={() => navigate('/tribes')} className="pp-crumb">Tribes</span>
              <span className="pp-crumb-sep">›</span>
              <span
                onClick={() => navigate(`/tribes/${tribeName}/leaders`)}
                className="pp-crumb"
              >
                {tribe.name}
              </span>
              <span className="pp-crumb-sep">›</span>
              <span className="pp-crumb pp-crumb-active">Prominent People</span>
            </div>
            <div className="pp-hero-legacy">{leader.legacy}</div>
            <h1 className="pp-hero-name">{leader.name}</h1>
            <p className="pp-hero-role">{leader.role}</p>
            <p className="pp-hero-years">{leader.years}</p>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="pp-body">

          {/* ── LEFT COLUMN ── */}
          <div className="pp-left">

            {/* Portrait card */}
            <div className="pp-portrait-card">
              <div className="pp-portrait-img-wrap">
                <img src={leader.image} alt={leader.name} className="pp-portrait-img" />
              </div>
              <div className="pp-portrait-meta">
                <div className="pp-meta-row">
                  <span className="pp-meta-label">Tribe</span>
                  <span className="pp-meta-value">{tribe.name}</span>
                </div>
                <div className="pp-meta-row">
                  <span className="pp-meta-label">Years</span>
                  <span className="pp-meta-value">{leader.years}</span>
                </div>
                <div className="pp-meta-row">
                  <span className="pp-meta-label">Role</span>
                  <span className="pp-meta-value">{leader.role}</span>
                </div>
                <div className="pp-meta-row">
                  <span className="pp-meta-label">Legacy</span>
                  <span className="pp-meta-value pp-meta-legacy">{leader.legacy}</span>
                </div>
              </div>
            </div>

            {/* Other leaders from same tribe */}
            {tribe.leaders.length > 1 && (
              <div className="pp-others">
                <h4 className="pp-others-heading">Other Prominent People</h4>
                <div className="pp-others-list">
                  {tribe.leaders.map((l, i) => {
                   if (l.name.toLowerCase().replace(/\s+/g, '-') === leaderName) return null;
                    return (
                      <div
                        key={i}
                        className="pp-other-card"
                       onClick={() => navigate(`/tribes/${tribeName}/leaders/${l.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      >
                        <div className="pp-other-img-wrap">
                          <img src={l.image} alt={l.name} />
                        </div>
                        <div className="pp-other-info">
                          <span className="pp-other-name">{l.name}</span>
                          <span className="pp-other-role">{l.role}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="pp-right">

            {/* Quote */}
            {leader.quote && (
              <div className="pp-quote-block">
                <div className="pp-quote-mark">"</div>
                <blockquote className="pp-quote-text">{leader.quote}</blockquote>
                {leader.quoteContext && (
                  <p className="pp-quote-context">— {leader.quoteContext}</p>
                )}
              </div>
            )}

            {/* Full bio */}
            <div className="pp-section">
              <h2 className="pp-section-title">Biography</h2>
              <p className="pp-section-body">
                {leader.fullBio || leader.description}
              </p>
            </div>

     {/* Achievements */}
{leader.achievements && leader.achievements.length > 0 && (
  <div className="pp-section">
    <h2 className="pp-section-title">Key Achievements</h2>
    <ul className="pp-ach-list">
      {leader.achievements.map((item, i) => (
        <li key={i} className="pp-ach-item">
          <span className="pp-ach-dot" />
          <span className="pp-ach-text">{item}</span>
        </li>
      ))}
    </ul>
  </div>
)}
          </div>
        </div>

        {/* ── BACK BUTTON ── */}
        <button
          className="pp-back"
          onClick={() => navigate(`/tribes/${tribeName}/leaders`)}
        >
          ← Back to Prominent People
        </button>

        <Footer />
      </div>
    </>
  );
};

export default ProminentPeople;