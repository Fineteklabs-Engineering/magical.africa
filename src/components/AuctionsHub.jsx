import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/auctions-hub.css'

const toSlug = (str = '') =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const LIVE_AUCTIONS = [
  {
    keyName: 'market.auctions.item1.name',
    keyCategory: 'market.auctions.item1.category',
    keyTimeLeft: 'market.auctions.item1.timeLeft',
    currentBid: 4200,
    image: '/images/kitenge-latest.jpg',
    tribe: 'Maasai',
  },
  {
    keyName: 'market.auctions.item2.name',
    keyCategory: 'market.auctions.item2.category',
    keyTimeLeft: null,
    currentBid: 2200,
    image: '/images/spear2.jpg',
   tribe: 'Kikuyu',
  },
  {
    keyName: 'market.auctions.item3.name',
    keyCategory: 'market.auctions.item3.category',
    keyTimeLeft: null,
    currentBid: 3500,
    image: '/images/Oromo2.jpg',
    tribe: 'Kamba',
  },
]

const UPCOMING_AUCTIONS = [
  {
    name: 'Kente Royal Cloth',
    category: 'Textiles',
    tribe: 'Maasai',
    startingBid: 1800,
    image: '/images/african-atire.jpg',
    date: 'May 10, 2026',
  },
  {
    name: 'Zulu Shield & Spear Set',
    category: 'Weaponry',
    tribe: 'Kikuyu',
    startingBid: 3200,
    image: '/images/carvings-image.jpg',
    date: 'May 14, 2026',
  },
]

const PAST_SALES = [
  {
    name: 'Maasai Beaded Collar',
    category: 'Jewellery',
   tribe: 'Kamba',
    soldFor: 920,
    image: '/images/african-jewelery.jpg',
    soldOn: 'Apr 12, 2026',
  },
  {
    name: 'Benin Bronze Head',
    category: 'Sculpture',
    tribe: 'Kikuyu',
    soldFor: 7400,
    image: '/images/african-painting2.jpg',
    soldOn: 'Mar 28, 2026',
  },
]

const TABS = ['Live Auctions', 'Upcoming', 'Past Sales']

const formatBid = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const AuctionsHub = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('Live Auctions')

  const currentItems =
    activeTab === 'Live Auctions'
      ? LIVE_AUCTIONS
      : activeTab === 'Upcoming'
      ? UPCOMING_AUCTIONS
      : PAST_SALES

  const totalCount =
    LIVE_AUCTIONS.length + UPCOMING_AUCTIONS.length + PAST_SALES.length

  return (
    <>
      <div className='ah-page'>
        <Navbar solid />

        {/* Hero — matches cp-hero style */}
        <div className='ah-hero'>
          <div className='ah-hero-overlay' />
          <div className='ah-hero-content'>

            {/* Breadcrumb inside hero */}
            <div className='ah-breadcrumb-hero'>
              <span className='ah-crumb-light' onClick={() => navigate('/')}>Home</span>
              <span className='ah-crumb-sep'>›</span>
              <span className='ah-crumb-light' onClick={() => navigate('/market')}>Marketplace</span>
              <span className='ah-crumb-sep'>›</span>
              <span className='ah-crumb-light ah-crumb-active'>Auctions</span>
            </div>

            <h1 className='ah-hero-title'>Auctions</h1>
            <p className='ah-hero-tagline'>
              Live bidding, upcoming lots, and a record of past sales — all in one place.
            </p>
            <div className='ah-hero-count'>{totalCount} lots available</div>
          </div>
        </div>

        {/* Tabs — matches cp-tabs style */}
        <div className='ah-tabs'>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`ah-tab ${activeTab === tab ? 'ah-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Live Auctions' && (
                <span className='ah-live-dot' />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className='ah-grid-section'>
          <div className='ah-grid'>
            {currentItems.map((item, i) => {
              const isLive = activeTab === 'Live Auctions'
              const isUpcoming = activeTab === 'Upcoming'
              const isPast = activeTab === 'Past Sales'

              const name = isLive ? t(item.keyName) : item.name
              const category = isLive ? t(item.keyCategory) : item.category
              const image = item.image
              const tribe = item.tribe

              return (
                <div
                  key={i}
                  className={`ah-card ${isPast ? 'ah-card--past' : ''}`}
                  onClick={() =>
                    isLive
                      ? navigate(`/market/auctions/live/${toSlug(name)}`)
                      : undefined
                  }
                  style={{ cursor: isLive ? 'pointer' : 'default' }}
                >
                  {/* Image */}
                  <div className='ah-card-image'>
                    <img
                      src={image}
                      alt={name}
                      className={isPast ? 'ah-card-img--sold' : ''}
                    />
                    <div className='ah-card-img-overlay' />

                    {/* Badge */}
                    {isLive && item.keyTimeLeft && (
                      <span className='ah-card-sub ah-card-sub--time'>
                        {t(item.keyTimeLeft)}
                      </span>
                    )}
                    {isLive && !item.keyTimeLeft && (
                      <span className='ah-card-sub ah-card-sub--live'>
                        <span className='ah-live-dot-sm' /> Live
                      </span>
                    )}
                    {isUpcoming && (
                      <span className='ah-card-sub ah-card-sub--upcoming'>
                        {item.date}
                      </span>
                    )}
                    {isPast && (
                      <span className='ah-card-sub ah-card-sub--sold'>
                        Sold
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className='ah-card-body'>
                    <span className='ah-origin-pill'>{tribe}</span>
                    <p className='ah-card-name'>{name}</p>
                    <p className='ah-card-category'>{category}</p>

                    <div className='ah-card-footer'>
                      <div className='ah-price-block'>
                        <span className='ah-price-label'>
                          {isLive ? 'Current Bid' : isUpcoming ? 'Starting Bid' : 'Sold For'}
                        </span>
                        <span className='ah-price-value'>
                          {formatBid(isLive ? item.currentBid : isUpcoming ? item.startingBid : item.soldFor)}
                        </span>
                      </div>

                      {isLive && (
                        <button
                          className='ah-view-btn'
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/market/auctions/live/${toSlug(name)}`)
                          }}
                        >
                          Bid Now →
                        </button>
                      )}
                      {isUpcoming && (
                        <span className='ah-date-tag'>{item.date}</span>
                      )}
                      {isPast && (
                        <span className='ah-date-tag'>{item.soldOn}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button className='ah-back' onClick={() => navigate('/market')}>
          ← Back to Marketplace
        </button>
      </div>

      <Footer />
    </>
  )
}

export default AuctionsHub