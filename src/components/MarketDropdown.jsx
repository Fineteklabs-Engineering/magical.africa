import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/market-dropdown.css'

const marketData = [
  {
    col: 'auctions',
    title: 'Auctions',
    items: [
      { label: 'Live Auctions', sub: 'Bid in real time', route: '/market' },
      { label: 'Upcoming', sub: 'Reserve your spot', route: '/market' },
      { label: 'Past Sales', sub: 'Browse sold items', route: '/market' },
    ]
  },
  {
    col: 'shop',
    title: 'Shop',
    items: [
      { label: 'Pottery', sub: 'Handcrafted pieces', route: '/market/pottery' },
      { label: 'Jewellery', sub: 'Beads & metalwork', route: '/market/jewellery' },
      { label: 'Carvings', sub: 'Wood & stone art', route: '/market/carvings' },
    ]
  }
]

const MarketDropdown = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className='mk-wrapper'>
      <div className='mk-trigger'>

        <NavLink
          to='/market'
          className={({ isActive }) => `mk-nav-label ${isActive ? 'active-link' : ''}`}
        >
          {t('sideMenu.marketplace')}
        </NavLink>

        <div className='mk-panel'>
          <div className='mk-header'>Explore the Marketplace</div>

          <div className='mk-grid'>
            {marketData.map((col) => (
              <div key={col.title} className={`mk-col mk-col--${col.col}`}>
                <div className='mk-col-title'>{col.title}</div>
                {col.items.map((item) => (
                  <div key={item.label} className='mk-item'>
                    <span className='mk-dot' />
                    <div>
                      <div className='mk-item-label'
                      onClick={() => navigate(item.route)}
// carvings → '/market/carvings'
// artefacts → '/market/artefacts'
                      >{item.label}</div>
                      <div className='mk-item-sub'>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className='mk-footer'>
            <span className='mk-footer-link' onClick={() => navigate('/market')}>
              Browse market →
            </span>
            <span className='mk-footer-tag'>New listings daily</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MarketDropdown