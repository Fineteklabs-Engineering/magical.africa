import React from 'react'
import '../styles/jewelery.css'
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../components/ProductDetail';


 export const jewelleryData = {
  'Beadwork Jewellery': [
    {
      id: 1,
      image: '/images/jewelery-image1.png',
      name: 'Enkiama Necklace',
      price: 45,
      tribe: 'Maasai',
      description: 'A multi-layered beaded collar handwoven by Maasai women. Each colour carries meaning — red for bravery, blue for water, white for purity.',
    },
    {
      id: 2,
      image: '/images/jewelery-image2.png',
      name: 'Orinka Wrist Coil',
      price: 25,
      tribe: 'Maasai',
      description: 'Tightly coiled glass bead bracelets traditionally exchanged between Maasai women as symbols of friendship and social bond.',
    },
    {
      id: 3,
      image: '/images/jewelery-image.png',
      name: 'Ileke Ife Bead Set',
      price: 60,
      tribe: 'Yoruba',
      description: 'Sacred Yoruba beadwork worn during royal ceremonies. Each strand is believed to carry ancestral power.',
    },
    {
      id: 4,
      image: '/images/jewelery-image4.png',
      name: 'Akori Choker',
      price: 38,
      tribe: 'Akan',
      description: 'A close-fitting beaded choker inspired by the Akan akori tradition of Ghana. Historically worn by royalty and traded across West Africa.',
    },
  ],

  'Stone Jewellery': [
    {
      id: 1,
      image: '/images/stone-image1.png',
      name: 'Githiga wa Mworia Necklace',
      price: 55,
      tribe: 'Kikuyu',
      description: 'Volcanic and river stones strung on twisted sisal cord, worn by Kikuyu elders during initiation rites and land blessing ceremonies.',
    },
    {
      id: 2,
      image: '/images/stone-image2.png',
      name: 'Kiondo Stone Bracelet',
      price: 30,
      tribe: 'Kamba',
      description: 'Polished soapstone and jasper beads crafted by Akamba artisans of Wamba using a centuries-old carving tradition.',
    },
    {
      id: 3,
      image: '/images/stone-image3.png',
      name: 'Tafoukt Turquoise Ring',
      price: 40,
      tribe: 'Tuareg',
      description: 'Saharan turquoise mounted in oxidised silver by Tuareg jewellers of Agadez. Believed to protect the wearer from the evil eye.',
    },
    {
      id: 4,
      image: '/images/stone-image4.png',
      name: 'Malachite Zulu Cuff',
      price: 48,
      tribe: 'Zulu',
      description: 'Raw malachite set into a wide copper cuff. Considered a stone of transformation in Zulu tradition, worn by healers and diviners.',
    },
  ],

  

  'Brass Jewellery': [
    {
      id: 1,
      image: '/images/woman-mask2.png',
      name: 'Mmaa Tweneboa Bangle',
      price: 35,
      tribe: 'Ashanti',
      description: 'Lost-wax cast brass bangle engraved with Adinkra symbols — a technique the Ashanti have practiced for over 600 years.',
    },
    {
      id: 2,
      image: '/images/beaded-jewelery2.jpg',
      name: 'Igun-Eronmwon Pendant',
      price: 50,
      tribe: 'Benin',
      description: 'Cast in the tradition of the Igun Eronmwon guild — the same guild that has served the Oba of Benin for over five centuries.',
    },
    {
      id: 3,
      image: '/images/maasai-bracelets2.jpg',
      name: 'Kwottenai Kanye Earrings',
      price: 28,
      tribe: 'Fulani',
      description: 'Large hammered brass hoops worn by Fulani women across the Sahel as a mark of beauty and nomadic identity.',
    },
    {
      id: 4,
      image: '/images/woman-mask2.png',
      name: 'Dogon Hogon Cuff',
      price: 42,
      tribe: 'Dogon',
      description: 'Brass cuff engraved with Dogon cosmological symbols representing Nommo, the ancestral water spirits.',
    },
  ],

  'Gold Jewellery': [
    {
      id: 1,
      image: '/images/Golden-set2.jpg',
      name: 'Kronti ne Akwamu Ring',
      price: 220,
      tribe: 'Akan',
      description: 'Solid 18k gold ring cast in the form of a talking drum, referencing the Akan proverb "unity makes strength."',
    },
    {
      id: 2,
      image: '/images/woman-mask2.png',
      name: 'Sika Dwa Necklace',
      price: 310,
      tribe: 'Ashanti',
      description: 'Fine gold filigree handcrafted by master goldsmiths of Kumasi\'s Adum market, mirroring the Golden Stool regalia.',
    },
    {
      id: 3,
      image: '/images/beaded-jewelery2.jpg',
      name: 'Thiouraye Gold Bracelet',
      price: 175,
      tribe: 'Wolof',
      description: 'Pure gold beads strung on braided silk thread — a central part of the Wolof bride\'s trousseau, gifted by the groom\'s family.',
    },
    {
      id: 4,
      image: '/images/woman-mask2.png',
      name: 'Diadem of the Ife',
      price: 280,
      tribe: 'Yoruba',
      description: 'A gold-leafed headpiece inspired by the 12th-century Ife bronze tradition — one of the world\'s oldest fine art legacies.',
    },
  ],

  
  'Silver Jewellery': [
    {
      id: 1,
      image: '/images/maasai-bracelets2.jpg',
      name: 'Tenaghalt Cross Pendant',
      price: 80,
      tribe: 'Tuareg',
      description: 'The iconic Tuareg cross hand-engraved in solid silver from Agadez — each of the 21 regional variants has a distinct design.',
    },
    {
      id: 2,
      image: '/images/beaded-jewelery2.jpg',
      name: 'Tizerzai Berber Cuff',
      price: 95,
      tribe: 'Amazigh',
      description: 'Wide silver cuff engraved with Tifinagh script and Amazigh symbols of protection, from the Moroccan Anti-Atlas mountains.',
    },
    {
      id: 3,
      image: '/images/nigeria-wear2.jpg',
      name: 'Zani Hausa Anklet',
      price: 60,
      tribe: 'Hausa',
      description: 'Sterling silver anklet worn during Hausa weddings and celebrations — a sign of elegance in northern Nigerian culture.',
    },
    {
      id: 4,
      image: '/images/maasai-bracelets2.jpg',
      name: 'Mzingo wa Dhahabu Bracelet',
      price: 72,
      tribe: 'Swahili',
      description: 'A fine silver chain with Indian Ocean trade motifs, reflecting centuries of Swahili Coast cultural exchange.',
    },
  ],
};

// 👇 Map each category to its hero image
const categoryHeroImage = {
  'Beadwork Jewellery': '/images/woman-jewelery.png',
  'Stone Jewellery':    '/images/man-stonejewelery.png',
  'Brass Jewellery':    '/images/woman-mask2.png',
  'Gold Jewellery':     '/images/Golden-set2.jpg',
  'Silver Jewellery':   '/images/maasai-bracelets2.jpg',
};

const Jewelery = ({ subCategory }) => {
  const items = jewelleryData[subCategory] || jewelleryData['Beadwork Jewellery'];
  const heroImage = categoryHeroImage[subCategory] || categoryHeroImage['Beadwork Jewellery'];
  const navigate = useNavigate();

  return (
    <div className='African-jewelery'>

      {/* Left hero panel — image now changes with subCategory */}
      <div
        className='African-jewelery1'
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className='jewelery-hero-label'>
          <h2>{subCategory}</h2>
          <p>Handcrafted with tradition</p>
        </div>
      </div>

      {/* Right grid */}
      <div className='African-jewelery2'>
        {items.map((item) => (
          <div key={item.id} className='grid-item' style={{ backgroundImage: `url(${item.image})` }}
       onClick={() => navigate(`/market/jewellery/${toSlug(item.name)}`)}
          >

            <div className='seller-price2'>
              <p>Price: ${item.price}</p>
            </div>

            <div className='grid-item-description'>
              <span className='grid-tribe-pill'>{item.tribe}</span>
              <p className='grid-item-name'>{item.name}</p>
              <p className='grid-item-desc'>{item.description}</p>
              <h3 className='grid-add-cart'>+ Add to Cart</h3>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Jewelery;