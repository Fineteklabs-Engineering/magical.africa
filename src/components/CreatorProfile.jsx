import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/creator-profile.css'
import PageSeo from '../components/PageSeo'

const creators = [
  {
    id: 1,
    name: 'Gloria Machoka',
    slug: 'gloria-machoka',
    category: 'Art',
    tribe: 'Kisii',
    image: '/images/artisan-gloria.jpeg',
    bio: 'Gloria is a celebrated Kisii stone carver whose intricate sculptures draw from generations of ancestral craft. Her work tells the stories of the Gusii people myths, rituals, and the rhythms of everyday life carved into soapstone that has been quarried from the hills of Kisii for centuries.',
    followers: 1240,
    video: 'https://www.youtube.com/shorts/4hOnrv9tleo',
    social: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', tiktok: 'https://tiktok.com' },
    gallery: ['/images/artisan-gloria.jpeg', '/images/African2.jpg', '/images/lorna2.jpeg', '/images/Steve.jpeg', '/images/Edwait.jpeg', '/images/cheru.jpeg'],
    products: [
      { id: 'p1', name: 'Soapstone Elephant', price: 45, image: '/images/artisan-gloria.jpeg' },
      { id: 'p2', name: 'Carved Tribal Mask', price: 78, image: '/images/African2.jpg' },
      { id: 'p3', name: 'Ancestral Bowl', price: 60, image: '/images/lorna2.jpeg' },
    ],
  },
  {
    id: 2,
    name: 'William Munyira',
    slug: 'william-munyira',
    category: 'Art',
    tribe: 'Kikuyu',
    image: '/images/william-photo.jpeg',
    bio: 'William Munyira is a gifted portrait artist whose pencil and pen drawings bring people to life with remarkable detail and emotion. His work captures the unique character and expressions of each subject, transforming simple sketches into timeless works of art.',
    followers: 0,
    video: 'https://www.youtube.com/shorts/qf0gvfIjP3c',
    social: { instagram: 'https://instagram.com', youtube: 'https://youtube.com' },
    gallery: ['/images/william-potrait1.jpeg', '/images/william-potrait2.jpeg', '/images/william-potrait3.jpeg', '/images/william-potrait4.jpeg', '/images/william-potrait5.jpeg', '/images/william-potrait6.jpeg', '/images/william-potrait7.jpeg', '/images/william-potrait8.jpeg', '/images/william-potrait9.jpeg', '/images/william-potrait10.jpeg'], 
    products: [
      { id: 'p1', name: 'Akan Stool', price: 120, image: '/images/African2.jpg' },
      { id: 'p2', name: 'Hand-carved Totem', price: 95, image: '/images/Joel-Makori.jpeg' },
    ],
  },
  {
    id: 3,
    name: 'Naledi Dlamini',
    slug: 'naledi-dlamini',
    category: 'Pottery',
    tribe: 'Zulu',
    image: '/images/lorna2.jpeg',
    bio: 'Naledi is a Zulu potter whose vessels are shaped by hand using age-old coiling techniques passed down from her grandmother. Each piece is fired in an open earth kiln, resulting in unique, earthy textures that cannot be replicated.',
    followers: 670,
    video: 'https://www.youtube.com/shorts/GpcpkDnjUPI',
    social: { instagram: 'https://instagram.com', tiktok: 'https://tiktok.com' },
    gallery: ['/images/lorna2.jpeg', '/images/artisan-gloria.jpeg', '/images/ima-thomas.jpg'],
    products: [
      { id: 'p1', name: 'Earth Fire Vessel', price: 55, image: '/images/lorna2.jpeg' },
      { id: 'p2', name: 'Coiled Ceremonial Pot', price: 80, image: '/images/artisan-gloria.jpeg' },
    ],
  },
  {
    id: 4,
    name: 'Tariq Osei',
    slug: 'tariq-osei',
    category: 'Fashion',
    tribe: 'Fante',
    image: '/images/Steve.jpeg',
    bio: 'Tariq blends traditional Fante weaving patterns with contemporary silhouettes. His garments are worn at cultural festivals across West Africa and have been featured in Accra Fashion Week.',
    followers: 2100,
    video: 'https://www.youtube.com/shorts/udnvqPG2yNo',
    social: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', tiktok: 'https://tiktok.com' },
    gallery: ['/images/Steve.jpeg', '/images/ima-thomas.jpg', '/images/cheru.jpeg', '/images/Edwait.jpeg'],
    products: [
      { id: 'p1', name: 'Kente Wrap Shirt', price: 65, image: '/images/Steve.jpeg' },
      { id: 'p2', name: 'Woven Festival Dress', price: 110, image: '/images/ima-thomas.jpg' },
    ],
  },
  {
    id: 5,
    name: 'Zawadi Achieng',
    slug: 'zawadi-achieng',
    category: 'Art',
    tribe: 'Luo',
    image: '/images/Edwait.jpeg',
    bio: 'Zawadi is a Luo visual artist working in mixed media — combining natural pigments, beads, and reclaimed materials to create layered canvases that speak to migration, identity, and belonging in modern Africa.',
    followers: 540,
    video: 'https://www.youtube.com/shorts/qf0gvfIjP3c',
    social: { instagram: 'https://instagram.com' },
    gallery: ['/images/Edwait.jpeg', '/images/artisan-gloria.jpeg', '/images/cheru.jpeg'],
    products: [{ id: 'p1', name: 'Identity Canvas I', price: 200, image: '/images/Edwait.jpeg' }],
  },
  {
    id: 6,
    name: 'Emeka Eze',
    slug: 'emeka-eze',
    category: 'Woodwork',
    tribe: 'Igbo',
    image: '/images/Joel-Makori.jpeg',
    bio: 'Emeka carves masks and sculptures rooted in Igbo spiritual tradition. Each piece begins with a prayer and ends with a story — connecting the world of the living to that of the ancestors.',
    followers: 730,
    video: 'https://www.youtube.com/shorts/GpcpkDnjUPI',
    social: { instagram: 'https://instagram.com', youtube: 'https://youtube.com' },
    gallery: ['/images/Joel-Makori.jpeg', '/images/African2.jpg', '/images/artisan-gloria.jpeg'],
    products: [
      { id: 'p1', name: 'Igbo Spirit Mask', price: 150, image: '/images/Joel-Makori.jpeg' },
      { id: 'p2', name: 'Ancestral Figure', price: 220, image: '/images/African2.jpg' },
    ],
  },
  {
    id: 7,
    name: 'Fatuma Hassan',
    slug: 'fatuma-hassan',
    category: 'Fashion',
    tribe: 'Somali',
    image: '/images/ima-thomas.jpg',
    bio: 'Fatuma creates hand-embroidered garments that fuse Somali diric traditions with East African coastal aesthetics. Her work celebrates the beauty of the Horn of Africa through colour, texture, and intricate stitchwork.',
    followers: 980,
    video: 'https://www.youtube.com/shorts/4hOnrv9tleo',
    social: { instagram: 'https://instagram.com', tiktok: 'https://tiktok.com' },
    gallery: ['/images/ima-thomas.jpg', '/images/Steve.jpeg', '/images/Edwait.jpeg'],
    products: [{ id: 'p1', name: 'Embroidered Diric', price: 90, image: '/images/ima-thomas.jpg' }],
  },
  {
    id: 9,
    name: 'Akosua Boateng',
    slug: 'akosua-boateng',
    category: 'Art',
    tribe: 'Akan',
    image: '/images/cheru.jpeg',
    bio: 'Akosua is an Akan painter and textile artist. Her bold, geometric paintings are inspired by Adinkra symbols — each piece carrying a philosophical message about life, community, and resilience.',
    followers: 1560,
    video: 'https://www.youtube.com/shorts/udnvqPG2yNo',
    social: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', tiktok: 'https://tiktok.com' },
    gallery: ['/images/cheru.jpeg', '/images/artisan-gloria.jpeg', '/images/Edwait.jpeg', '/images/African2.jpg'],
    products: [
      { id: 'p1', name: 'Adinkra Canvas', price: 185, image: '/images/cheru.jpeg' },
      { id: 'p2', name: 'Geometric Textile', price: 70, image: '/images/artisan-gloria.jpeg' },
    ],
  },
]


const toSlug = (name = '') =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-8.32a8.2 8.2 0 0 0 4.79 1.53V5.06a4.85 4.85 0 0 1-1-.37z" />
  </svg>
)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const getYoutubeEmbedUrl = (url) => {
  if (!url) return ''
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`
  const watchMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  return ''
}

const CreatorProfile = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [followed, setFollowed] = useState(false)
  const [followers, setFollowers] = useState(0)
  const [activeTab, setActiveTab] = useState('gallery')
  const [lightboxImg, setLightboxImg] = useState(null)

  const creator = creators.find(
    (c) => c.slug === name || c.name.toLowerCase().replace(/\s+/g, '-') === name
  )

  useState(() => { if (creator) setFollowers(creator.followers) }, [creator])

  if (!creator) {
    return (
      <div className="cp-not-found">
        <Navbar solid />
        <div className="cp-not-found-body">
          <h1>Creator not found</h1>
          <p>We couldn't find a creator matching that name.</p>
          <button onClick={() => navigate('/creator')} className="cp-back-link">
            <BackIcon /> Back to Creators
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const embedUrl = getYoutubeEmbedUrl(creator.video)

  const handleFollow = () => {
    setFollowed((prev) => {
      setFollowers((f) => prev ? f - 1 : f + 1)
      return !prev
    })
  }

  // Navigate to product detail — route: /creators/:creatorSlug/:productSlug
  const handleViewProduct = (product) => {
    navigate(`/creators/${creator.slug}/${toSlug(product.name)}`)
  }

  return (


    
    <div className="cp-page">

      <PageSeo
  title={`Creator — ${creator.name} `}

/>
      <Navbar solid />

      <div className="cp-container">

        <button className="cp-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /> Back
        </button>

        {/* ── PROFILE SECTION ── */}
        <section className="cp-profile-section">
          <div className="cp-avatar-wrap">
            <img src={creator.image} alt={creator.name} className="cp-avatar" />
          </div>
          <div className="cp-profile-info">
            <span className="cp-category-badge">{creator.category}</span>
            <h1 className="cp-name">{creator.name}</h1>
            <p className="cp-tribe">{creator.tribe} People</p>
            <div className="cp-header-actions">
              <div className="cp-followers">
                <span className="cp-followers-count">{followers.toLocaleString()}</span>
                <span className="cp-followers-label">followers</span>
              </div>
              <button
                className={`cp-follow-btn ${followed ? 'cp-follow-btn--active' : ''}`}
                onClick={handleFollow}
              >
                {followed ? 'Following' : 'Follow'}
              </button>
              <div className="cp-socials">
                {creator.social?.instagram && <a href={creator.social.instagram} target="_blank" rel="noopener noreferrer" className="cp-social-link" aria-label="Instagram"><InstagramIcon /></a>}
                {creator.social?.youtube && <a href={creator.social.youtube} target="_blank" rel="noopener noreferrer" className="cp-social-link" aria-label="YouTube"><YoutubeIcon /></a>}
                {creator.social?.tiktok && <a href={creator.social.tiktok} target="_blank" rel="noopener noreferrer" className="cp-social-link" aria-label="TikTok"><TikTokIcon /></a>}
                {creator.social?.facebook && <a href={creator.social.facebook} target="_blank" rel="noopener noreferrer" className="cp-social-link" aria-label="Facebook"><FacebookIcon /></a>}
              </div>
            </div>
          </div>
        </section>

        <hr className="cp-divider" />

        {/* ── ABOUT SECTION ── */}
        <section className="cp-about-section">
          <p className="cp-eyebrow">About</p>
          <p className="cp-bio">{creator.bio}</p>
        </section>

        <hr className="cp-divider" />

        {/* ── TABS ── */}
        <div className="cp-tabs">
          {['gallery', 'products', 'story'].map((tab) => (
            <button
              key={tab}
              className={`cp-tab ${activeTab === tab ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'gallery' ? 'Gallery' : tab === 'products' ? 'Products' : 'Story'}
            </button>
          ))}
        </div>


         {/* ── GALLERY ── */}
        {activeTab === 'gallery' && (
          <div className="cp-gallery-grid">
            {creator.gallery.map((img, i) => (
              <div
                key={i}
                className="cp-gallery-item"
                onClick={() => setLightboxImg(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxImg(img)}
                aria-label={`View gallery image ${i + 1}`}
              >
                <img src={img} alt={`${creator.name} gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {activeTab === 'products' && (
          <div className="cp-products-grid">
            {creator.products.length === 0
              ? <p className="cp-empty">No products listed yet.</p>
              : creator.products.map((product) => (
                <article key={product.id} className="cp-product-card">
                  <div className="cp-product-img-wrap">
                    <img src={product.image} alt={product.name} className="cp-product-img" />
                  </div>
                  <div className="cp-product-body">
                    <h3 className="cp-product-name">{product.name}</h3>
                    <p className="cp-product-price">${product.price}</p>
                   
                    <button
                      className="cp-product-btn"
                      onClick={() => handleViewProduct(product)}
                    >
                      View Product
                    </button>
                  </div>
                </article>
              ))}
          </div>
        )}

       

        {/* ── STORY ── */}
        {activeTab === 'story' && (
          <div className="cp-story-section">
            <p className="cp-eyebrow">Featured Video</p>
            <h2 className="cp-story-title">{creator.name}'s Story</h2>
            {embedUrl
              ? (
                <div className="cp-video-wrap">
                  <iframe
                    src={embedUrl}
                    title={`${creator.name} story video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )
              : <p className="cp-empty">No featured video yet.</p>}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div className="cp-lightbox" onClick={() => setLightboxImg(null)} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button className="cp-lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close lightbox">✕</button>
          <img src={lightboxImg} alt="Gallery full view" className="cp-lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CreatorProfile