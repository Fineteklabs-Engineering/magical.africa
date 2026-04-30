import React from 'react'
import '../styles/artefacts.css'
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../components/ProductDetail';


export const artefactsData = {
  "Oil Paintings": {
    coverImage: "/images/pottery1-image1.jpg", // swap to your preferred image
    items: [
      { img: "/images/Oromo2.jpg", name: "Sunset Canvas", price: 40, tribe: "Yoruba", desc: "A warm depiction of African sunset life in vibrant tones." },
      { img: "/images/kitenge-latest.jpg", name: "Village Glow", price: 35, tribe: "Zulu", desc: "Captures daily village harmony and tradition." },
      { img: "/images/Oromo2.jpg", name: "Sunset Canvas", price: 40, tribe: "Yoruba", desc: "A warm depiction of African sunset life in vibrant tones." },
      { img: "/images/kitenge-latest.jpg", name: "Village Glow", price: 35, tribe: "Zulu", desc: "Captures daily village harmony and tradition." },
    ]
  },
  "Pencil Portraits": {
    coverImage: "/images/maasai-wear2.jpg", // swap to your preferred image
    items: [
      { img: "/images/maasai-bracelets2.jpg", name: "Silent Gaze", price: 45, tribe: "Kikuyu", desc: "A detailed pencil portrait showing deep emotion." },
      { img: "/images/maasai-wear2.jpg", name: "Elder Wisdom", price: 50, tribe: "Maasai", desc: "A strong portrait of an elder full of history." },
      { img: "/images/maasai-bracelets2.jpg", name: "Silent Gaze", price: 45, tribe: "Kikuyu", desc: "A detailed pencil portrait showing deep emotion." },
      { img: "/images/maasai-wear2.jpg", name: "Elder Wisdom", price: 50, tribe: "Maasai", desc: "A strong portrait of an elder full of history." },
    ]
  },
  "Coloured Pencils": {
    coverImage: "/images/maasai-women2.jpg", // swap to your preferred image
    items: [
      { img: "/images/nigeria-wear2.jpg", name: "Color Burst", price: 38, tribe: "Igbo", desc: "Bright expressive artwork using colored pencils." },
      { img: "/images/maasai-women2.jpg", name: "Wild Harmony", price: 42, tribe: "Kamba", desc: "A fusion of wildlife and abstract color energy." },
      { img: "/images/nigeria-wear2.jpg", name: "Color Burst", price: 38, tribe: "Igbo", desc: "Bright expressive artwork using colored pencils." },
      { img: "/images/maasai-women2.jpg", name: "Wild Harmony", price: 42, tribe: "Kamba", desc: "A fusion of wildlife and abstract color energy." },
    ]
  }
}

// ✅ FIX: use same prop name as parent
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