import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/faq.css';




/* ── Tri-mark icon per question ── */
const TriMark = ({ isOpen }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="faq-tri-mark" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="rgb(210,123,53)" strokeWidth="1.5" fill={isOpen ? 'rgba(210,123,53,0.1)' : 'none'}/>
    <line x1="12" y1="8" x2="12" y2="16" stroke="rgb(210,123,53)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke="rgb(210,123,53)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const faqData = [
    { question: t('faq.items.whatIs.question'),       answer: t('faq.items.whatIs.answer') },
    { question: t('faq.items.contribute.question'),   answer: t('faq.items.contribute.answer') },
    { question: t('faq.items.authentic.question'),    answer: t('faq.items.authentic.answer') },
    { question: t('faq.items.learnLanguage.question'),answer: t('faq.items.learnLanguage.answer') },
    { question: t('faq.items.purchase.question'),     answer: t('faq.items.purchase.answer') },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="FAQ">

      {/* kente stripe at the top edge */}
      <div className="faq-kente-stripe" />

      <div className="faq-inner">
        <div className="faq-heading-block">
          <h1>{t('faq.title')} <span>{t('faq.titlespan')}</span></h1>
          <div className="faq-divider">
            <span className="faq-divider-line" />
            <HelpCircle size={22} color="rgb(210,123,53)" strokeWidth={1.5} />
            <span className="faq-divider-line" />
          </div>
          <p>{t('faq.subtitle2')}</p>
        </div>

        <div className="questions-section">
          {faqData.map((item, index) => (
            <div
              className={`question ${openIndex === index ? 'question--open' : ''}`}
              key={index}
            >
              <div className="question1" onClick={() => toggleQuestion(index)}>
                <div className="question1-left">
                  <span className="question-number">0{index + 1}</span>
                  <span className="question-text">{item.question}</span>
                </div>
                <TriMark isOpen={openIndex === index} />
              </div>
              <div className={`answer1 ${openIndex === index ? 'answer1--open' : ''}`}>
                <div className="answer1-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* kente stripe at the bottom edge */}
      <div className="faq-kente-stripe" />

    </section>
  );
};

export default FAQ;