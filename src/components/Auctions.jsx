import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/auctions-page.css'

const toSlug = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const AUCTION_DATA = [
  {
    keyName: 'market.auctions.item1.name',
    keyCategory: 'market.auctions.item1.category',
    keyDescription: 'market.auctions.item1.description',
    keyTimeLeft: 'market.auctions.item1.timeLeft',
    currentBid: 4200,
    image: '/images/kitenge-latest.jpg',
   tribe: 'Maasai',
    material: 'Handwoven Fabric',
    condition: 'Excellent',
  },
  {
    keyName: 'market.auctions.item2.name',
    keyCategory: 'market.auctions.item2.category',
    keyDescription: 'market.auctions.item2.description',
    keyTimeLeft: null,
    currentBid: 2200,
    image: '/images/spear2.jpg',
    tribe: 'Kikuyu',
    
    material: 'Iron & Wood',
    condition: 'Very Good',
  },
  {
    keyName: 'market.auctions.item3.name',
    keyCategory: 'market.auctions.item3.category',
    keyDescription: 'market.auctions.item3.description',
    keyTimeLeft: null,
    currentBid: 3500,
    image: '/images/Oromo2.jpg',
    tribe: 'Kamba',
    material: 'Mixed Media',
    condition: 'Excellent',
  },
]

const formatBid = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const Auctions = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <div className='ap-page'>
        <Navbar  />

        {/* Hero */}
        <div className='ap-hero'>
          <div className='ap-hero-inner'>
            <div className='ap-hero-eyebrow'>
              <span className='ap-live-dot' />
              Live Auctions
            </div>
            <h1 className='ap-hero-title'>
              Bid on Rare <span>African Treasures</span>
            </h1>
            <p className='ap-hero-sub'>
              Authentic handcrafted pieces from across the continent — each with a story,
              each one of a kind. Bid before time runs out.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
      <div className='ap-breadcrumb'>
  <span className='ap-crumb' onClick={() => navigate('/')}>Home</span>
  <span className='ap-crumb-sep'>›</span>
  <span className='ap-crumb' onClick={() => navigate('/market')}>Marketplace</span>
  <span className='ap-crumb-sep'>›</span>
  <span className='ap-crumb' onClick={() => navigate('/market/auctions')}>Auctions</span>
  <span className='ap-crumb-sep'>›</span>
  <span className='ap-crumb ap-crumb-active'>Live Auctions</span>
</div>
        {/* Auction grid */}
        <div className='ap-main'>
          <p className='ap-count'>{AUCTION_DATA.length} items available</p>

          <div className='ap-grid'>
            {AUCTION_DATA.map((auction, index) => (
              <div
                key={index}
                className='ap-card'
               onClick={() => navigate(`/market/auctions/live/${toSlug(t(auction.keyName))}`)}
              >
                {/* Image */}
                <div className='ap-card-image-wrap'>
                  <img
                    src={auction.image}
                    alt={t(auction.keyName)}
                    className='ap-card-image'
                  />
                  <span className='ap-card-live-badge'>
                    <span className='ap-live-dot' />
                    Live
                  </span>
                  {auction.keyTimeLeft && (
                    <span className='ap-card-time'>{t(auction.keyTimeLeft)}</span>
                  )}
                </div>

                {/* Content */}
                <div className='ap-card-content'>
                  <span className='ap-card-pill'>{t(auction.keyCategory)}</span>
                  <h2 className='ap-card-title'>{t(auction.keyName)}</h2>
                  <p className='ap-card-desc'>{t(auction.keyDescription)}</p>

                  <div className='ap-card-divider' />

                  {/* Meta */}
                  <div className='ap-card-meta'>
                    {auction.tribe && (
                      <div className='ap-card-meta-row'>
                        <span className='ap-card-meta-key'>Tribe</span>
                        <span className='ap-card-meta-val'>{auction.tribe}</span>
                      </div>
                    )}
                    {auction.material && (
                      <div className='ap-card-meta-row'>
                        <span className='ap-card-meta-key'>Material</span>
                        <span className='ap-card-meta-val'>{auction.material}</span>
                      </div>
                    )}
                  </div>

                  <div className='ap-card-divider' />

                  {/* Footer */}
                  <div className='ap-card-footer'>
                    <div className='ap-card-bid-block'>
                      <span className='ap-card-bid-label'>Current Bid</span>
                      <span className='ap-card-bid-value'>{formatBid(auction.currentBid)}</span>
                    </div>
                    <button
                      className='ap-card-btn'
                      onClick={(e) => {
          e.stopPropagation()
       navigate(`/market/auctions/live/${toSlug(t(auction.keyName))}`)
       }}
                    >
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Auctions