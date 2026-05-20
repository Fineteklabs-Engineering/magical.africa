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

  // Fetch Firestore posts on mount
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

  // Merge Firestore posts (first) + static posts
  const staticPosts = latestPostKeys.map(key => ({ key, ...blogData[key] }))
  const allPosts = [...firestorePosts, ...staticPosts]

  // Filter merged posts by category and search
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

        <Navbar />

        {/* ── HEADER ── */}
        <div className="blogs-header">
          <div className="blogs-header-decor top" />
          <div className="blogs-header-content">
            <h1 className="blogs-title">
              {t('blogs.header.titleStart')} <span>{t('blogs.header.titleAccent')}</span>
            </h1>
            <div className="blogs-title-divider" />
            <p className="blogs-tagline">{t('blogs.header.tagline')}</p>
          </div>
          <div className="blogs-header-decor bottom" />
        </div>

        {/* ── SEARCH & WRITE STRIP ── */}
        <div className="blogs-action-strip">
          <button className="blogs-write-btn" onClick={() => navigate('/blogs/create-blog')}>
            <FiEdit2 size={15} />
            Write a Blog
          </button>
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
                        <div className="blogs-card-overlay" />
                        <div className="blogs-card-body">
                       
                          <h3>{post.title}</h3>
                          <p>{post.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="blogs-no-results">No posts found.</p>
              )}
            </div>

          </main>

          {/* ── SIDEBAR ── */}
          <aside className="blogs-sidebar">

            {/* Recent Posts */}
            <div className="sidebar-section">
              {sidebarPosts.map((post) => (
                <div
                  className="sidebar-post"
                  key={post.key}
                  style={{ cursor: 'pointer' }}
                  onClick={() => goToPost(post.key)}
                >
                  <div className="sidebar-post-img" style={{ backgroundImage: `url('${post.image}')` }} />
                  <div className="sidebar-post-info">
                    <h4>{t(`blogs.sidebar.recent.${post.key}.title`)}</h4>
                    <p className="sidebar-post-date">{post.date}</p>
                    <p className="sidebar-post-sub">{t(`blogs.sidebar.recent.${post.key}.subtitle`)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">{t('blogs.sidebar.categories.heading')}</h3>
              <ul className="sidebar-categories">
                {categoryKeys.map(({ key, tag }) => (
                  <li
                    key={key}
                    onClick={() => handleCategoryClick(tag)}
                    className={activeCategory === tag ? 'sidebar-cat-active' : ''}
                  >
                    <span className="sidebar-cat-arrow">▶</span>
                    {t(`blogs.sidebar.categories.items.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Posts */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">{t('blogs.sidebar.popular.heading')}</h3>
              <div className="sidebar-popular">
                {popularPosts.map((post) => (
                  <div className="sidebar-popular-item" key={post.key} onClick={() => goToPost(post.key)}>
                    <div className="sidebar-popular-img" style={{ backgroundImage: `url('${post.image}')` }} />
                    <p>{t(`blogs.sidebar.popular.posts.${post.key}`)}</p>
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