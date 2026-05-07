import React from 'react'
import '../styles/carvings.css'
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../components/ProductDetail';


export const carvingsData = {
  "Wood Sculpture": [
    {
      img: "/images/wood-image1.png",
      tribe: "Makonde",
      name: "Shetani wa Msitu",
      price: "$120",
      desc: "Hand-carved ebony spirit figure from the Makonde of Tanzania. Shetani figures represent otherworldly beings from Makonde spiritual belief."
    },
    {
      img: "/images/wood-image2.png",
      tribe: "Ashanti",
      name: "Dwa Kofi Stool",
      price: "$95",
      desc: "Miniature version of the Ashanti ceremonial stool carved from mahogany. Every Ashanti chief receives a stool at enstoolment — it holds his soul."
    },
    {
      img: "/images/wood-image3.png",
      tribe: "Yoruba",
      name: "Ere Ibeji Twin Figure",
      price: "$110",
      desc: "Carved wooden figure representing a deceased twin. The Yoruba have the world's highest rate of twin births and honour them with sacred Ibeji sculptures."
    },
    {
      img: "/images/wood-image4.png",
      tribe: "Dogon",
      name: "Nommo Ancestor Post",
      price: "$145",
      desc: "A carved granary door post depicting the Nommo, Dogon water spirits of creation. Traditionally fixed to communal granaries in Mali's Bandiagara Escarpment."
    }
  ],
 
 
  "Stone Sculpture": [
    {
      img: "/images/ukomaShona.jpg",
      tribe: "Shona",
      name: "Ukama Family Bond",
      price: "$210",
      desc: "Carved in Zimbabwe springstone, Ukama means 'family' in Shona. This flowing form of intertwined figures is one of the most celebrated themes in Shona sculpture."
    },
    {
      img: "/images/musikavanhuShona.jpg",
      tribe: "Shona",
      name: "Musikavanhu The Creator",
      price: "$180",
      desc: "Hand-polished serpentine figure inspired by Shona mythology. Musikavanhu is the divine being who, in Shona belief, fashioned humanity from clay."
    },
    {
      img: "/images/mweyaShona.jpg",
      tribe: "Shona",
      name: "Mweya The Spirit Within",
      price: "$240",
      desc: "Abstract springstone sculpture capturing the Shona concept of mweya — the life spirit believed to reside in every living being and in the stone itself."
    },
    {
      img: "/images/ngoziShona.jpg",
      tribe: "Shona",
      name: "Ngozi Avenging Spirit",
      price: "$195",
      desc: "Carved in dark opalstone, this piece references the Ngozi — a restless spirit in Shona belief that arises from unresolved injustice."
    }
  ],

 
 
  "Metallic Sculpture": [
    {
      img: "/images/uhunmwunElaoMemorialHead.jpg",
      tribe: "Benin",
      name: "Uhunmwun Elao Memorial Head",
      price: "$260",
      desc: "Bronze cast in the tradition of Benin Kingdom memorial heads, placed on ancestral altars to honour deceased Obas. The tradition dates to the 13th century."
    },
    {
      img: "/images/hogonStaffFigure.jpg",
      tribe: "Dogon",
      name: "Hogon Staff Figure",
      price: "$190",
      desc: "Forged iron figure of a seated elder, referencing the Hogon — the spiritual leader of the Dogon people of Mali. Iron is sacred in Dogon cosmology."
    },
    {
      img: "/images/akuabaAshanti.jpg",
      tribe: "Ashanti",
      name: "Akuaba Fertility Figure",
      price: "$155",
      desc: "Cast brass Akuaba doll with a disc-shaped head, carried by Ashanti women to ensure beautiful, healthy children. One of Ghana's most iconic cultural symbols."
    },
    {
      img: "/images/shangoYoruba.jpg",
      tribe: "Yoruba",
      name: "Shango Thunder Axe",
      price: "$175",
      desc: "Forged iron double-headed axe representing Shango, the Yoruba god of thunder and lightning. Carried by Shango priests during Egungun ceremonies."
    }


  ]
     
}

const Carvings = ({ subCategory }) => {
 const navigate = useNavigate();
  const items = carvingsData[subCategory] || carvingsData["Wood Sculpture"]

  return (
    <div className='Carvings-div'>
      {items.map((item, index) => (
        <div
          key={index}
          className='carving'
          style={{ backgroundImage: `url(${item.img})` }}
        onClick={() => navigate(`/market/carvings/${toSlug(item.name)}`)}
        >
       <div className='carving-description'>
  <p className='carving-pill'>{item.tribe}</p>
  <h3>{item.name}</h3>
  <p className='carving-desc'>{item.desc}</p>
  <button>Add to Cart</button>
</div>

          <div className='seller-price3'>
            <p>Price : {item.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carvings