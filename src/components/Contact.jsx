import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/contact.css';
import ContactModal from './ContactModal';

const Contact = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="contact-page">
        <div className="contact-section">
          <div className="contact1">
            <h1>Magical Africa</h1>
            <p>{t('contact.description')}</p>
            <button onClick={() => setModalOpen(true)}>
              {t('contact.button')}
            </button>
          </div>

          <div className="contact2">
            <img src="/images/magical-colored-fav.png" alt="logo" />
            
            <div className="contact-links">
              <a href="mailto:gloria@magical.africa">
                <i className="fa-regular fa-envelope"></i>
                gloria@magical.africa
              </a>
              <a href="tel:+254718085773">
                <i className="fa-solid fa-mobile"></i>
                +254 718 085 773
              </a>
              <a href="#">
                <i className="fa-solid fa-location-dot"></i>
                Chandaria Innovation Center
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Contact;