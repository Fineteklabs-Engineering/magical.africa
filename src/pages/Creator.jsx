import React from 'react'
import CreatorHero from '../components/CreatorHero'
import CreatorGrid from '../components/CreatorGrid'
import Footer from '../components/Footer'
import PageSeo from '../components/PageSeo'

const Creator = () => {
  return (
    <>
<PageSeo
  title="African Creators & Artisans | Magical Africa"
  description="Meet the artisans, weavers, carvers, and fashion designers behind Magical Africa's handcrafted products — each telling their community's story through their craft."
  path="/creator"
  image="/images/artisan-gloria.jpeg"
  keywords="African artisans, African creators, African craftspeople, handmade African art, African weavers, African carvers, African fashion designers"
  schemaType="CollectionPage"
      />
   <CreatorHero />
   <img src="/images/maasai-pattern.avif" alt="Maasai decorative pattern" />
   <CreatorGrid />
    <Footer />
    
    </>
  )
}

export default Creator