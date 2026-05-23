import { useState } from 'react'
import '../styles/creator-grid.css'

const categories = ['All', 'Art', 'Pottery', 'Woodwork', 'Fashion']

// Static creators — swap out images/data as needed
const creators = [
  {
    id: 1,
    name: 'Gloria Machoka',
    category: 'Art',
    tribe: 'Kisii',
    image: '/images/artisan-gloria.jpeg',
  },
  {
    id: 2,
    name: 'Kofi Mensah',
    category: 'Woodwork',
    tribe: 'Ashanti',
    image: '/images/African2.jpg',
  },
  {
    id: 3,
    name: 'Naledi Dlamini',
    category: 'Pottery',
    tribe: 'Zulu',
    image: '/images/lorna2.jpeg',
  },
  {
    id: 4,
    name: 'Tariq Osei',
    category: 'Fashion',
    tribe: 'Fante',
    image: '/images/Steve.jpeg',
  },
  {
    id: 5,
    name: 'Zawadi Achieng',
    category: 'Art',
    tribe: 'Luo',
    image: '/images/Edwait.jpeg',
  },
  {
    id: 6,
    name: 'Emeka Eze',
    category: 'Woodwork',
    tribe: 'Igbo',
    image: '/images/creators/emeka-eze.jpg',
  },
  {
    id: 7,
    name: 'Fatuma Hassan',
    category: 'Fashion',
    tribe: 'Somali',
    image: '/images/creators/fatuma-hassan.jpg',
  },
  {
    id: 8,
    name: 'Sipho Ndlovu',
    category: 'Pottery',
    tribe: 'Ndebele',
    image: '/images/creators/sipho-ndlovu.jpg',
  },
  {
    id: 9,
    name: 'Akosua Boateng',
    category: 'Art',
    tribe: 'Akan',
    image: '/images/creators/akosua-boateng.jpg',
  },
  {
    id: 10,
    name: 'Leilani Mwangi',
    category: 'Pottery',
    tribe: 'Kikuyu',
    image: '/images/creators/leilani-mwangi.jpg',
  },
  {
    id: 11,
    name: 'Chidi Okafor',
    category: 'Woodwork',
    tribe: 'Yoruba',
    image: '/images/creators/chidi-okafor.jpg',
  },
  {
    id: 12,
    name: 'Adaeze Nwosu',
    category: 'Fashion',
    tribe: 'Igbo',
    image: '/images/creators/adaeze-nwosu.jpg',
  },
]

const CreatorCard = ({ creator }) => {
  const [followed, setFollowed] = useState(false)

  return (
    <div className="cg-card">
      {/* Image */}
      <div className="cg-card-img-wrap">
        <img
          src={creator.image}
          alt={creator.name}
          className="cg-card-img"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="cg-card-placeholder" aria-hidden="true">
          <span>{creator.name.charAt(0)}</span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="cg-card-overlay">
        <div className="cg-card-overlay-inner">
          <span className="cg-card-category">{creator.category}</span>
          <h3 className="cg-card-name">{creator.name}</h3>
          <p className="cg-card-tribe">{creator.tribe}</p>
          <button
            className={`cg-follow-btn ${followed ? 'cg-follow-btn--following' : ''}`}
            onClick={(e) => { e.stopPropagation(); setFollowed((prev) => !prev) }}
          >
           View
          </button>
        </div>
      </div>
    </div>
  )
}

const CreatorGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? creators
    : creators.filter((c) => c.category === activeCategory)

  return (
    <section className="cg-section">
      {/* Header */}
      <div className="cg-header">
        <p className="cg-eyebrow">Discover</p>
        <h2 className="cg-title">Meet the Creators</h2>
        <p className="cg-subtitle">
          Talented artists and makers from across Africa sharing their craft with the world.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="cg-tabs" role="tablist" aria-label="Filter creators by category">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`cg-tab ${activeCategory === cat ? 'cg-tab--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="cg-grid">
        {filtered.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  )
}

export default CreatorGrid