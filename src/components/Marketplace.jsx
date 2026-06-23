import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../components/ProductDetail';
import '../styles/marketplace.css';

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const marketplaceData = [
    {
      name: t('marketplace.categories.jewelery'),
      sections: [
        {
          category: 'jewellery',
          image: '/images/jewelery-image1.png',
          title: 'Enkiama Necklace',
          description: 'A multi-layered beaded collar handwoven by Maasai women.',
          price: '$45',
        },
        {
          category: 'jewellery',
          image: '/images/jewelery-image2.png',
          title: 'Orinka Wrist Coil',
          description: 'Tightly coiled glass bead bracelets exchanged as symbols of friendship.',
          price: '$25',
        },
        {
          category: 'jewellery',
          image: '/images/jewelery-image.png',
          title: 'Ileke Ife Bead Set',
          description: 'Sacred Yoruba beadwork worn during royal ceremonies.',
          price: '$60',
        },
      ],
    },
    {
      name: t('marketplace.categories.garments'),
      sections: [
        {
          category: 'artefacts',
          image: '/images/yorubaSunsetCanva.jpg',
          title: 'Sunset Canvas',
          description: 'A warm depiction of African sunset life in vibrant tones.',
          price: '$40',
        },
        {
          category: 'artefacts',
          image: '/images/zuluVillageGlow.jpg',
          title: 'Village Glow',
          description: 'Captures daily village harmony and tradition.',
          price: '$35',
        },
        {
          category: 'artefacts',
          image: '/images/kikiyuSilentGlaze.jpg',
          title: 'Elderly Woman',
          description: 'A detailed pencil portrait showing deep emotion ofrom an elderly woman.',
          price: '$45',
        },
      ],
    },
    {
      name: t('marketplace.categories.toolsArtefacts'),
      sections: [
        {
          category: 'carvings',
          image: '/images/wood-image1.png',
          title: 'Shetani wa Msitu',
          description: 'Hand-carved ebony spirit figure from the Makonde of Tanzania.',
          price: '$120',
        },
        {
          category: 'carvings',
          image: '/images/wood-image2.png',
          title: 'Dwa Kofi Stool',
          description: 'Miniature version of the Ashanti ceremonial stool.',
          price: '$95',
        },
        {
          category: 'carvings',
          image: '/images/wood-image3.png',
          title: 'Ere Ibeji Twin Figure',
          description: 'Carved wooden figure representing a deceased twin.',
          price: '$110',
        },
      ],
    },
    {
      name: t('marketplace.categories.musicalInstruments'),
      sections: [
        {
          category: 'jewellery',
          image: '/images/Golden-set2.jpg',
          title: 'Kronti ne Akwamu Ring',
          description: 'Solid 18k gold ring cast in the form of a talking drum.',
          price: '$220',
        },
        {
          category: 'jewellery',
          image: '/images/maasai-bracelets2.jpg',
          title: 'Tenaghalt Cross Pendant',
          description: 'The iconic Tuareg cross hand-engraved in solid silver.',
          price: '$80',
        },
        {
          category: 'jewellery',
          image: '/images/stone-image1.png',
          title: 'Githiga wa Mworia Necklace',
          description: 'Volcanic and river stones strung on twisted sisal cord.',
          price: '$55',
        },
      ],
    },
  ];

  const currentData = marketplaceData[activeCategory];

  return (
    <section className="marketplace">
      <h2>{t('marketplace.title')}</h2>

      <div id="categoryList">
        {marketplaceData.map((category, index) => (
          <button
            key={index}
            className={activeCategory === index ? 'active' : ''}
            onClick={() => setActiveCategory(index)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="market-section">
        {currentData.sections.map((item, index) => (
          <div
            key={index}
            className={`section section${index + 1}`}
            style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}
            onClick={() => handleNavigation(`/market/${item.category}/${toSlug(item.title)}`)}
          >
            <div className="description">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{t('marketplace.price')}: {item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="show-all2">
        <button className="show-btn2" onClick={() => handleNavigation('/market')}>
          {t('hero.visitAntiques')}
        </button>
      </div>
    </section>
  );
};

export default Marketplace;