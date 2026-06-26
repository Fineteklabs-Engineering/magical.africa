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
          image: '/images/enkiamaNeckless.jpg',
          title: 'Enkiama Necklace',
          description: 'A multi-layered beaded collar handwoven by Maasai women.',
          price: '$45',
        },
        {
          category: 'jewellery',
          image: '/images/orinkaWristCoil.jpg',
          title: 'Orinka Wrist Coil',
          description: 'Tightly coiled glass bead bracelets exchanged as symbols of friendship.',
          price: '$25',
        },
        {
          category: 'jewellery',
          image: '/images/krontiNeAkwamuRing.jpg',
          title: 'Kronti ne Akwamu Ring',
          description: 'Solid 18k gold ring cast in the form of a talking drum.',
          price: '$220',
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
          image: '/images/musikavanhuShona.jpg',
          title: 'Musikavanhu The Creator',
          description: 'Hand-polished serpentine figure inspired by Shona mythology. ',
          price: '$180',
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
          image: '/images/akuabaAshanti.jpg',
          title: 'Akuaba Fertility Figure',
          description: 'Cast brass Akuaba doll with a disc-shaped head, carried by Ashanti women.',
          price: '$155',
        },
      ],
    },
    {
      name: t('marketplace.categories.musicalInstruments'),
      sections: [
        {
          category: 'jewellery',
          image: '/images/ashantiGlazedPlatter.jpg',
          title: 'Glazed Platter',
          description: 'A wide ceremonial platter with the rich amber glaze',
          price: '$55',
        },
        {
          category: 'jewellery',
          image: '/images/swahiliBlueGlazeJar.jpg',
          title: 'Blue Glaze Jar',
          description: 'Coastal - inspired jar iwth deep ocean lue glaze.',
          price: '$45',
        },
        {
          category: 'jewellery',
          image: '/images/amharaSpeckledMug.jpg',
          title: 'Speckled Mug',
          description: 'A hand - thrown mug with earthy speckled finish.',
          price: '$22',
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