import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/blogpost.css'
import { blogData, relatedMap } from '../data/blogData'
import { db } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import PageSeo from '../components/PageSeo' 

const BlogPost = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [post, setPost]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const isStatic = Boolean(blogData[key])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const loadPost = async () => {
      setLoading(true)
      setNotFound(false)

      // 1. Try static data first
      if (blogData[key]) {
        setPost({ key, ...blogData[key], source: 'static' })
        setLoading(false)
        return
      }

      // 2. Fall back to Firestore
      try {
        const docRef  = doc(db, 'blogs', key)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPost({ key: docSnap.id, ...docSnap.data(), source: 'firestore' })
        } else {
          setNotFound(true)
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [key])

  // ── LOADING ──
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="blogpost-loading">
          <div className="blogpost-loading-spinner" />
          <p>Loading story...</p>
        </div>
        <Footer />
      </>
    )
  }

  // ── NOT FOUND ──
  if (notFound || !post) {
    return (
      <>
        <Navbar />
        <div className="blogpost-not-found">
          <h2>Post not found</h2>
          <button onClick={() => navigate('/blogs')}>← Back to Blogs</button>
        </div>
        <Footer />
      </>
    )
  }

 
  const related = isStatic
    ? (relatedMap[key] || []).map((k) => ({ key: k, ...blogData[k] }))
    : []

 
  const initials = post.author
    ? post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'MA'

  return (
    <>
      <div className="blogpost-page">
        <Navbar />

        <PageSeo
        title={`${post.title} | Magical Africa`}
        description={post.subtitle || post.body?.[0]?.slice(0, 155) || 'Read this story on Magical Africa.'}
        path={`/blogs/${post.key}`}
        image={post.image}
        keywords={post.tags?.join(', ') || ''}
        type="article"
        schemaType="Article"
      />

        {/* ── HERO ── */}
        <div
          className="blogpost-hero"
          style={{ backgroundImage: `url('${post.image}')` }}
        >
          <div className="blogpost-hero-overlay" />
          <div className="blogpost-hero-content">
            <button className="blogpost-back" onClick={() => navigate('/blogs')}>
              ← Back to Blogs
            </button>

           

            <span className="blogpost-category-tag">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="blogpost-subtitle">{post.subtitle}</p>
            <div className="blogpost-meta">
              <span>{post.author}</span>
              <span className="blogpost-meta-dot">·</span>
              <span>{post.date}</span>
              <span className="blogpost-meta-dot">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="blogpost-layout">
          <article className="blogpost-article">
            {post.body.map((para, i) => (
              <p key={i} className="blogpost-para">{para}</p>
            ))}

            <div className="blogpost-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blogpost-tag">{tag}</span>
              ))}
            </div>

            <div className="blogpost-divider" />

            <div className="blogpost-share">
              <span>Share this post:</span>
              <button onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                }
              }}>
                Copy link
              </button>
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="blogpost-sidebar">

            <div className="blogpost-author-card">
              <div className="blogpost-author-avatar">{initials}</div>
              <div>
                <p className="blogpost-author-name">{post.author}</p>
                <p className="blogpost-author-bio">
                  {post.source === 'firestore'
                    ? 'A community contributor sharing stories from across Africa.'
                    : 'Stories from across the African continent — culture, heritage, people, and place.'
                  }
                </p>
              </div>
            </div>

            <div className="blogpost-sidebar-box">
              <h3>Tags</h3>
              <div className="blogpost-sidebar-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Read Next — only for static posts that have related */}
            {related.length > 0 && (
              <div className="blogpost-sidebar-box">
                <h3>Read Next</h3>
                {related.map((r) => (
                  <div
                    key={r.key}
                    className="blogpost-related-item"
                    onClick={() => navigate(`/blogs/${r.key}`)}
                  >
                    <div
                      className="blogpost-related-img"
                      style={{ backgroundImage: `url('${r.image}')` }}
                    />
                    <div>
                      <p className="blogpost-related-title">{r.title}</p>
                      <p className="blogpost-related-date">{r.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </aside>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default BlogPost