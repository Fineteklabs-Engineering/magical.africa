import React, { useState, useEffect } from 'react'
import '../styles/blogs.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageSeo from '../components/PageSeo'
import { SEO_CONTENT } from '../utils/seoContent'
import { blogData } from '../data/blogData'
import { FiSearch, FiX, FiEdit2 } from 'react-icons/fi'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../context/AuthContext'

const featuredPostKey = 'storytelling'
const latestPostKeys  = ['beadwork', 'maasai', 'fashion', 'masks', 'swahili', 'cuisine', 'zulu', 'drumming', 'festivals']
const sidebarPostKeys = ['swahili', 'cuisine']
const popularPostKeys = ['zulu', 'drumming', 'festivals']

const categoryKeys = [
  { key: 'all',      tag: null       },
  { key: 'language', tag: 'Language' },
  { key: 'heritage', tag: 'Heritage' },
  { key: 'crafts',   tag: 'Crafts'   },
  { key: 'food',     tag: 'Food'     },
  { key: 'travel',   tag: 'Travel'   },
]

const Blogs = () => {
  const { t } = useTranslation()
  const [email, setEmail]                   = useState('')
  const [subscribed, setSubscribed]         = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchQuery, setSearchQuery]       = useState('')
  const [firestorePosts, setFirestorePosts] = useState([])
  const [loadingPosts, setLoadingPosts]     = useState(true)
  const navigate = useNavigate()

  const goToPost = (key) => navigate(`/blogs/${key}`)

  const featuredPost = blogData[featuredPostKey]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const posts = snapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }))
        setFirestorePosts(posts)
      } catch (err) {
        console.error('Error fetching blogs:', err)
      } finally {
        setLoadingPosts(false)
      }
    }
    fetchPosts()
  }, [])


  const staticPosts = latestPostKeys.map(key => ({ key, ...blogData[key] }))
  const allPosts = [...firestorePosts, ...staticPosts]


  const filteredPosts = allPosts
    .filter(post =>
      activeCategory === null ? true : post.tags?.includes(activeCategory)
    )
    .filter(post =>
      searchQuery.trim() === ''
        ? true
        : post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const sidebarPosts = sidebarPostKeys.map(key => ({ key, ...blogData[key] }))
  const popularPosts = popularPostKeys.map(key => ({ key, ...blogData[key] }))

  const handleSubscribe = () => {
    if (email) { setSubscribed(true); setEmail('') }
  }

  const handleCategoryClick = (tag) => {
    setActiveCategory(tag)
  }

  return (
    <>
      <PageSeo {...SEO_CONTENT.blogs} />
      <div className="blogs-page">

        <Navbar solid />

        {/* ── HERO ── */}
        <div className="blogs-hero">
          <span className="blogs-hero-eyebrow">{t('blogs.header.eyebrow', 'Blog')}</span>
          <h1 className="blogs-title">
            {t('blogs.header.titleStart')} <span>{t('blogs.header.titleAccent')}</span>
          </h1>
          <p className="blogs-tagline">{t('blogs.header.tagline')}</p>

          <div className="blogs-hero-toolbar">
            <div className="blogs-hero-search-group">
              <div className="blogs-search-bar">
                <FiSearch size={15} className="blogs-search-icon" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="blogs-search-clear" onClick={() => setSearchQuery('')}>
                    <FiX size={14} />
                  </button>
                )}
              </div>
              <button className="blogs-hero-find-btn">Find Now</button>
            </div>
            <button className="blogs-write-btn" onClick={() => navigate('/blogs/create-blog')}>
              <FiEdit2 size={15} />
              Write a Blog
            </button>
          </div>
        </div>


        {/* ── MAIN LAYOUT ── */}
        <div className="blogs-layout">

          {/* ── MAIN ── */}
          <main className="blogs-main">

            {/* Featured */}
            <div className="blogs-featured">
              <div
                className="blogs-featured-img"
                style={{ backgroundImage: `url('${featuredPost.image}')` }}
              >
                <div className="blogs-featured-overlay" />
                <div className="blogs-featured-content">
                  <span className="blogs-category-tag">{featuredPost.category}</span>
                  <h2 style={{ cursor: 'pointer' }} onClick={() => goToPost(featuredPostKey)}>
                    {t('blogs.featured.title')}
                  </h2>
                  <p className="blogs-featured-date">{featuredPost.date}</p>
                  <p className="blogs-featured-excerpt">{t('blogs.featured.excerpt')}</p>
                  <button className="blogs-read-more" onClick={() => goToPost(featuredPostKey)}>
                    {t('blogs.featured.readMore')}
                  </button>
                </div>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="blogs-latest-section">
              <h2 className="blogs-section-title">
                {activeCategory
                  ? `${t('blogs.latest.heading')}: ${activeCategory}`
                  : t('blogs.latest.heading')
                }
              </h2>

              {loadingPosts ? (
                <div className="blogs-loading">
                  <div className="blogs-loading-spinner" />
                  <p>Loading stories...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="blogs-grid">
                  {filteredPosts.map((post) => (
                    <div className="blogs-card" key={post.key} onClick={() => goToPost(post.key)}>
                      <div
                        className="blogs-card-img"
                        style={{ backgroundImage: `url('${post.image}')` }}
                      >
                        {(post.category || post.tags?.[0]) && (
                          <span className="blogs-card-tag">{post.category || post.tags?.[0]}</span>
                        )}
                      </div>
                      <div className="blogs-card-body">
                        <h3>{post.title}</h3>
                        <p>{post.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="blogs-no-results">No posts found.</p>
              )}
            </div>

          </main>


          <aside className="blogs-sidebar">

            {/* Categories */}
            <div className="sidebar-feature-block">
              <h3 className="sidebar-heading">{t('blogs.sidebar.categories.heading')}</h3>
              <div className="sidebar-category-list">
                {categoryKeys.map(({ key, tag }) => (
                  <button
                    key={key}
                    className={`blogs-filter-btn ${activeCategory === tag ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(tag)}
                  >
                    {t(`blogs.sidebar.categories.items.${key}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured list */}
            <div className="sidebar-feature-block">
              <h3 className="sidebar-heading">{t('blogs.sidebar.recent.heading', 'Featured')}</h3>
              <div className="sidebar-feature-list">
                {sidebarPosts.map((post) => (
                  <div
                    className="sidebar-feature-item"
                    key={post.key}
                    onClick={() => goToPost(post.key)}
                  >
                    <div className="sidebar-feature-thumb" style={{ backgroundImage: `url('${post.image}')` }} />
                    <div className="sidebar-feature-meta">
                      <span className="sidebar-feature-date">{post.date}</span>
                      <h4>{t(`blogs.sidebar.recent.${post.key}.title`)}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest list */}
            <div className="sidebar-feature-block">
              <h3 className="sidebar-heading">{t('blogs.sidebar.popular.heading')}</h3>
              <div className="sidebar-feature-list">
                {popularPosts.map((post) => (
                  <div className="sidebar-feature-item" key={post.key} onClick={() => goToPost(post.key)}>
                    <div className="sidebar-feature-thumb" style={{ backgroundImage: `url('${post.image}')` }} />
                    <div className="sidebar-feature-meta">
                      <span className="sidebar-feature-date">{post.date}</span>
                      <h4>{t(`blogs.sidebar.popular.posts.${post.key}`)}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="sidebar-newsletter">
              <h3>{t('blogs.sidebar.newsletter.heading')}</h3>
              <p>{t('blogs.sidebar.newsletter.subtitle')}</p>
              {subscribed ? (
                <p className="newsletter-success">{t('blogs.sidebar.newsletter.success')}</p>
              ) : (
                <div className="newsletter-form">
                  <input
                    type="email"
                    placeholder={t('blogs.sidebar.newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleSubscribe}>{t('blogs.sidebar.newsletter.button')}</button>
                </div>
              )}
            </div>

          </aside>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Blogs