import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import PageSeo from '../components/PageSeo'
import '../styles/auction-detail.css'

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
    tribe: 'Maasai',
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
     tribe: 'Maasai', 
    material: 'Mixed Media',
    condition: 'Excellent',
  },
]

const toSlug = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const formatBid = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const AuctionDetail = () => {
 const { slug } = useParams() // stays the same, route handles it
  const navigate = useNavigate()
  const { t } = useTranslation()

  const auction = AUCTION_DATA.find(
    (a) => toSlug(t(a.keyName)) === slug
  )

  if (!auction) {
    return (
      <>
      <PageSeo
          title="Auction Not Found | Magical Africa"
          description="This auction could not be found."
          path={`/market/auctions/live/${slug}`}
          noIndex
        />

        <Navbar solid />
        <div className='ad-not-found'>
          <h1>Auction not found</h1>
          <p>We could not find the auction you are looking for.</p>
          <button onClick={() => navigate('/market')}>← Back to Marketplace</button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>

    <PageSeo
          title={`${t(auction.keyName)} | African Art Auction | Magical Africa`}
          description={`${t(auction.keyDescription)}`.slice(0, 155)}
          path={`/market/auctions/live/${slug}`}
          image={auction.image}
          type="product"
          schemaType="Product"
        />
        
      <div className='ad-page'>
        <Navbar solid />

        {/* Breadcrumb */}
       <div className='ad-breadcrumb'>
  <span className='ad-crumb' onClick={() => navigate('/')}>Home</span>
  <span className='ad-crumb-sep'>›</span>
  <span className='ad-crumb' onClick={() => navigate('/market')}>Marketplace</span>
  <span className='ad-crumb-sep'>›</span>
  <span className='ad-crumb' onClick={() => navigate('/market/auctions')}>Auctions</span>
  <span className='ad-crumb-sep'>›</span>
  <span className='ad-crumb' onClick={() => navigate('/market/auctions/live')}>Live Auctions</span>
  <span className='ad-crumb-sep'>›</span>
  <span className='ad-crumb ad-crumb-active'>{t(auction.keyName)}</span>
</div>


        <div className='ad-main'>

          {/* Image Side */}
          <div className='ad-image-side'>
            <div className='ad-image-frame'>
              <img src={auction.image} alt={t(auction.keyName)} />
            </div>
            <div className='ad-live-badge'>
              <span className='ad-live-dot' />
              <span>Live Auction</span>
            </div>
          </div>

          {/* Info Side */}
          <div className='ad-info-side'>

            <span className='ad-pill'>{t(auction.keyCategory)}</span>
            <h1 className='ad-title'>{t(auction.keyName)}</h1>

            {/* Current bid */}
            <div className='ad-bid-row'>
              <div className='ad-bid-block'>
                <span className='ad-bid-label'>Current Bid</span>
                <span className='ad-bid-value'>{formatBid(auction.currentBid)}</span>
              </div>
              {auction.keyTimeLeft && (
                <div className='ad-time-block'>
                  <span className='ad-bid-label'>Time Left</span>
                  <span className='ad-time-value'>{t(auction.keyTimeLeft)}</span>
                </div>
              )}
            </div>

            <div className='ad-divider' />

            {/* Description */}
            <div className='ad-description-block'>
              <h3>About this piece</h3>
              <p className='ad-description'>{t(auction.keyDescription)}</p>
            </div>

            {/* Meta */}
            {auction.tribe && (
              <div className='ad-meta-row'>
                <span className='ad-meta-key'>Tribe</span>
                <span className='ad-meta-val'>{auction.tribe}</span>
              </div>
            )}
            {auction.material && (
              <div className='ad-meta-row'>
                <span className='ad-meta-key'>Material</span>
                <span className='ad-meta-val'>{auction.material}</span>
              </div>
            )}
            {auction.condition && (
              <div className='ad-meta-row'>
                <span className='ad-meta-key'>Condition</span>
                <span className='ad-meta-val'>{auction.condition}</span>
              </div>
            )}

            <div className='ad-divider' />

            {/* Actions */}
            <div className='ad-actions'>
              <button className='ad-btn-bid'>Place Bid</button>
              <button className='ad-btn-watch'>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
           <path d="M1 12s4-8 11-8 11 8 11 8-4  8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
  </svg>
                Watch
              </button>
            </div>
<button className='ad-back-link' onClick={() => navigate('/market/auctions/live')}>
  ← Back to Live Auctions
</button>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AuctionDetail