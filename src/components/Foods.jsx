
import React from 'react'
import '../styles/foods.css'

const Foods = () => {
  return (
  <>

  <div className='Foods-div'>

    <div className='food-div1 food-slide'>
      <h3>Tunisia Food Festival</h3>
      <p>
        Tunis, Tunisia (July) — Showcases North African flavours like harissa-spiced dishes, 
        couscous, brik pastries, and fresh seafood from the Mediterranean coast.
      </p>
    </div>

    <div className='food-div2 food-slide food-delay-2'>
      <h3>Abuja Food & Arts Festival</h3>
      <p>
        Nigeria (December) — A lively celebration of Nigerian culinary culture featuring egusi soup, 
        suya, pounded yam, and pepper soup alongside live Afrobeats performances.
      </p>
    </div>

    <div className='food-div3 food-slide food-delay-3'>
      <h3>Nairobi Restaurant Week</h3>
      <p>
        Kenya (October) — A celebrated week where Nairobi's best restaurants offer special menus 
        highlighting Kenyan cuisine: nyama choma, ugali, sukuma wiki at accessible prices.
      </p>
    </div>

    <div className='food-div4 food-slide food-delay-4'>
      <h3>Cape Town Good Food & Wine Show</h3>
      <p>
        South Africa (June) — One of Africa's biggest food expos where top chefs showcase local 
        flavours like braai, bobotie, and Cape Malay curry alongside wine pairings.
      </p>
    </div>

  </div>

  <div className='food-book'>

    <button>Book Now</button>

  </div>
  </>
  )
}

export default Foods