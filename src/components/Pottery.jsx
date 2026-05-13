import React from 'react'
import '../styles/pottery.css'
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../components/ProductDetail';

export const potteryData = {
  "Terracotta": {
    coverImage: "/images/terracotta.jpg",
    items: [
      { img: "/images/yorubaGoldMask.jpg", name: "Golden Mask", price: 25, tribe: "Yoruba", desc: "A ceremonial terracotta mask with gold detailing." },
      { img: "/images/handShapedVase.jpg", name: "Earth Vase", price: 30, tribe: "Kikuyu", desc: "Hand-shaped vase from rich African red clay." },
      { img: "/images/zuluCeramicCup.jpg", name: "Ceramic Cup", price: 20, tribe: "Zulu", desc: "A rustic cup fired in traditional open kilns." },
      { img: "/images/maasaiClayBowl.jpg", name: "Clay Bowl", price: 18, tribe: "Maasai", desc: "Wide-mouthed bowl used in ceremonial gatherings." },
    ]
  },
  "Glazed Pottery": {
    coverImage: "/images/glazedPottery.jpg",
    items: [
      { img: "/images/swahiliBlueGlazeJar.jpg", name: "Blue Glaze Jar", price: 45, tribe: "Swahili", desc: "Coastal-inspired jar with deep ocean blue glaze." },
      { img: "/images/amharaSpeckledMug.jpg", name: "Speckled Mug", price: 22, tribe: "Amhara", desc: "A hand-thrown mug with earthy speckled finish." },
      { img: "/images/ashantiGlazedPlatter.jpg", name: "Glazed Platter", price: 55, tribe: "Ashanti", desc: "Wide ceremonial platter with rich amber glaze." },
      { img: "/images/igboShinePot.jpg", name: "Shine Pot", price: 38, tribe: "Igbo", desc: "Polished pot with reflective glaze surface." },
    ]
  },
  "Sculptural": {
    coverImage: "/images/sculturalPottery.jpg",
    items: [
      { img: "/images/zuluWarriorBust.jpg", name: "Warrior Bust", price: 60, tribe: "Zulu", desc: "A sculpted bust honouring the Zulu warrior spirit." },
      { img: "/images/yorubaMotherFigure.jpg", name: "Mother Figure", price: 55, tribe: "Yoruba", desc: "Abstract clay figure symbolising motherhood." },
      { img: "/images/kikuyuAnimalTotem.jpg", name: "Animal Totem", price: 48, tribe: "Kikuyu", desc: "Hand-sculpted animal totem with cultural markings." },
      { img: "/images/ashantiAncetorMask.jpg", name: "Ancestor Mask", price: 70, tribe: "Ashanti", desc: "Deeply carved ancestral mask in raw clay." },
    ]
  }
}

const Pottery = ({ subCategory = "Terracotta" }) => {
  const navigate = useNavigate();
  const category = potteryData[subCategory] || {}
  const items = category.items || []
  const coverImage = category.coverImage || "/images/pottery1-image1.jpg"

  return (
    <div className='pottery-div'>

      <div className='pottery-cover'
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="pottery-cover-title">
          <h1>{subCategory}</h1>
        </div>
      </div>

      <div className='pottery-grid-wrapper'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`pottery-card pot-${index + 1}`}
            onClick={() => navigate(`/market/pottery/${toSlug(item.name)}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.img} alt={item.name} />

            <div className='pottery-card-content'>
              <p className='pottery-tribe'>{item.tribe}</p>
              <h3>{item.name}</h3>
              <p className='pottery-desc'>{item.desc}</p>
              <button>Add to Cart</button>
            </div>

            <div className='pottery-price'>
              <p>Price : ${item.price}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Pottery