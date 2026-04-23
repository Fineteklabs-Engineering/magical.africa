import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/blogpost.css'
import { blogData, relatedMap } from '../data/blogData'

const BlogPost = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const post = blogData[key]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [key])

  if (!post) {
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

  const related = (relatedMap[key] || []).map((k) => ({ key: k, ...blogData[k] }))

  return (
    <>
      <div className="blogpost-page">
        <Navbar />

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
              <div className="blogpost-author-avatar">MA</div>
              <div>
                <p className="blogpost-author-name">{post.author}</p>
                <p className="blogpost-author-bio">
                  Stories from across the African continent — culture, heritage, people, and place.
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
          </aside>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default BlogPost