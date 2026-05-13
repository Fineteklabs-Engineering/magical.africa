import React from 'react'
import '../styles/artefacts.css'
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../components/ProductDetail';


export const artefactsData = {
  "Oil Paintings": {
    coverImage: "/images/oilPaint.jpg",
    items: [
      { img: "/images/yorubaSunsetCanva.jpg", name: "Sunset Canvas", price: 40, tribe: "Yoruba", desc: "A warm depiction of African sunset life in vibrant tones." },
      { img: "/images/zuluVillageGlow.jpg", name: "Village Glow", price: 35, tribe: "Zulu", desc: "Captures daily village harmony and tradition." },
      { img: "/images/igboVillagePaint.jpg", name: "Sunlit Village Path", price: 35, tribe: "Igbo", desc: "Captures a peaceful rural village scene with colorful homes, palm trees, and daily life unfolding along a sunlit path." },
      { img: "/images/oilPaint02.jpg", name: "Radiant Heritage", price: 35, tribe: "Yoruba", desc: "A vibrant textured portrait highlighting African beauty, culture, and strength through bold expressive colors." },
    ]
  },
  "Pencil Portraits": {
    coverImage: "/images/pencil-potrait.jpeg", 
    items: [
      { img: "/images/pencil-potrait2.jpeg", name: "Voice of Change", price: 35, tribe: "Kisii", desc: "A detailed pencil portrait honoring leadership, courage, and the spirit of unity." },
      { img: "/images/pencilPortraits.jpg", name: "African Woman", price: 20, tribe: "Maasai", desc: "A potrait on a beautiful cultural woman with a traditional skulf worn on the head." },
      { img: "/images/kikiyuSilentGlaze.jpg", name: "Elderly Woman", price: 45, tribe: "Kikuyu", desc: "A detailed pencil portrait showing deep emotion ofrom an elderly woman." },
      { img: "/images/maasaiElderWisdom.jpg", name: "Elder Wisdom", price: 50, tribe: "Maasai", desc: "A strong portrait of an elder full of history." },
    ]
  },
  "Coloured Pencils": {
    coverImage: "/images/coloredPencil.jpg", 
    items: [
      { img: "/images/coloredPencil02.jpg", name: "Color Burst", price: 38, tribe: "Igbo", desc: "Bright expressive artwork using colored pencils." },
      { img: "/images/coloredPencil03.jpg", name: "Wild Harmony", price: 42, tribe: "Kamba", desc: "A fusion of wildlife and abstract color energy." },
      { img: "/images/coloredPencil04.jpg", name: "Color Burst", price: 38, tribe: "Igbo", desc: "Bright expressive artwork using colored pencils." },
      { img: "/images/coloredPencil05.jpg", name: "Wild Harmony", price: 42, tribe: "Kamba", desc: "A fusion of wildlife and abstract color energy." },
    ]
  }
}


const Artefacts = ({ subCategory = "Oil Paintings" }) => {
const navigate = useNavigate(); 
const category = artefactsData[subCategory] || {}
  const items = category.items || []
  const coverImage = category.coverImage || "/images/pottery1-image1.jpg"

  return (
    <div className='Artefacts-div'>

      <div className='artefacts1'
      style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="artefacts-title">
          <h1>{subCategory}</h1>
        </div>
      </div>

      <div className='artefacts2'>
        {items.map((item, index) => (
          <div 
        
           key={index}
  className={`artefacts-grid art${index + 1}`}
onClick={() => navigate(`/market/artefacts/${toSlug(item.name)}`)}
  style={{ cursor: 'pointer' }}
         >

            <img src={item.img} alt={item.name} />

            <div className='artefacts-content'>
              <p className='tribe'>{item.tribe}</p>
              <h3>{item.name}</h3>
              <p className='desc'>{item.desc}</p>

              <button>Add to Cart</button>
            </div>

            <div className='seller4-price'>
              <p>Price : ${item.price}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Artefacts