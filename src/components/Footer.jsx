import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '../styles/footer.css';
import { useNavigate } from 'react-router-dom';
import useAcademyNavigation from "../hooks/useAcademyNavigation";
import ContactModal from './ContactModal';

const Footer = () => {
  const { t } = useTranslation();
  const goToAcademy = useAcademyNavigation();
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: wire to newsletter/subscribe endpoint
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer className="footer">

      {/* Follow us */}
      <div className="footer-follow">
        <span className="footer-follow-label">Follow us</span>
        <div className="footer-icons">
          <span onClick={() => window.open('https://www.facebook.com/profile.php?id=61583415501249', '_blank')}>
            <i className="fa-brands fa-facebook-f"></i>
          </span>
          <span onClick={() => window.open('https://www.instagram.com/themagicalafrica/', '_blank')}>
            <i className="fa-brands fa-instagram"></i>
          </span>
          <span onClick={() => window.open('https://x.com/milazetu', '_blank')}>
            <i className="fa-brands fa-x-twitter"></i>
          </span>
          <span onClick={() => window.open('https://www.tiktok.com/@themagicalafrica', '_blank')}>
            <i className="fa-brands fa-tiktok"></i>
          </span>
        </div>
      </div>

      <hr className="footer-hr" />

      {/* Columns */}
      <div className="footer-main">

        <div className="footer-col">
          <h3>{t('footer.quickLinks')}</h3>
          <div className="footer-col-links">
            <Link to="/" onClick={() => handleNavigation('/')}>{t('footer.links.home')}</Link>
            <Link to="/tribes">{t('footer.links.tribes')}</Link>
            <Link to="/about">{t('footer.links.about')}</Link>
            <Link to="/market">{t('footer.links.marketplace')}</Link>
            <Link to="/technology">{t('nav.technology')}</Link>
          </div>
        </div>

        <div className="footer-col">
          <h3>Community</h3>
          <div className="footer-col-links">
            <span className="footer-link" onClick={() => handleNavigation('/academy')}>
              {t('footer.links.academy')}
            </span>
            <Link to="/events">{t('footer.links.events')}</Link>
            <Link to="/music">{t('footer.links.music')}</Link>
            <Link to="/creator">{t('nav.creator')}</Link>
            <span className="footer-link" onClick={() => setContactOpen(true)}>
              {t('footer.links.contact')}
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h3>Legal</h3>
          <div className="footer-col-links">
            <p>{t('footer.terms')}</p>
            <p>{t('footer.privacy')}</p>
            <p>{t('footer.cookiePolicy')}</p>
            <p>{t('footer.cookieSettings')}</p>
          </div>
        </div>

        <div className="footer-newsletter">
          <h3 className="footer-newsletter-heading">Let's talk</h3>
          <p className="footer-newsletter-sub">
            Share your thoughts, questions, or stories from home
          </p>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <i className="fa-regular fa-envelope footer-newsletter-icon"></i>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>

      </div>

      <hr className="footer-hr" />

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="copyright">{t('footer.copyright')}</p>
        <a
          href="https://nakkei.com"
          target="_blank"
          rel="noreferrer"
          className="footer-powered-by"
        >
          Powered by <span className="footer-powered-by-name">Nakkei</span>
        </a>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
};

export default Footer;