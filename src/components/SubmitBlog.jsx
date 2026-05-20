import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, useAuth } from '../context/AuthContext'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiTag, FiImage, FiFileText, FiCheck, FiAlertCircle, FiUpload, FiX } from 'react-icons/fi'
import '../styles/submitblog.css'
import PageSeo from '../components/PageSeo'

const CATEGORIES = ['Language', 'Heritage', 'Crafts', 'Food', 'Travel', 'Music', 'Art']

const TAGS_OPTIONS = ['Language', 'Heritage', 'Crafts', 'Food', 'Travel', 'Music', 'Culture', 'History', 'Art', 'Nature']

const SubmitBlog = () => {
  const { user, getFullName } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle]             = useState('')
  const [subtitle, setSubtitle]       = useState('')
  const [category, setCategory]       = useState('')
  const [tags, setTags]               = useState([])
  const [imageUrl, setImageUrl]       = useState('')
  const [imageFile, setImageFile]     = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading]     = useState(false)
  const [body, setBody]               = useState('')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [success, setSuccess]         = useState(false)
  const [preview, setPreview]         = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.')
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError('')
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
    setImageUrl('')
    setUploadProgress(0)
  }



 const uploadImage = () => {
  return new Promise((resolve) => {
    if (!imageFile) { resolve(''); return }
    setUploading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      setUploading(false)
      setUploadProgress(100)
      resolve(reader.result)
    }
    reader.readAsDataURL(imageFile)
  })
}




  const handleSubmit = async () => {
    setError('')

    if (!title.trim())     return setError('Please add a title.')
    if (!subtitle.trim())  return setError('Please add a subtitle.')
    if (!category)         return setError('Please select a category.')
    if (!body.trim())      return setError('Please write your blog content.')
    if (tags.length === 0) return setError('Please select at least one tag.')

    setLoading(true)

    try {
      const uploadedUrl = await uploadImage()
      const finalImage  = uploadedUrl || '/images/AI-woman.png'

      const paragraphs = body
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0)

      const authorName = getFullName() || user?.email || 'Anonymous'

      await addDoc(collection(db, 'blogs'), {
        title:     title.trim(),
        subtitle:  subtitle.trim(),
        category,
        tags,
        image:     finalImage,
        body:      paragraphs,
        author:    authorName,
        authorId:  user.uid,
        date:      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime:  `${Math.max(1, Math.ceil(paragraphs.join(' ').split(' ').length / 200))} min read`,
        createdAt: serverTimestamp(),
        source:    'user',
      })

      setSuccess(true)
      setTimeout(() => navigate('/blogs'), 2500)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const authorName = getFullName() || user?.email || ''

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length

  return (
    <>
      <div className="submit-page">
        <Navbar />

        <PageSeo
        title="Create a Post | Magical Africa"
        description="Share your African culture story with the world. Write and publish your blog on Magical Africa."
        path="/blogs/submit"
        noIndex={true}  
      />

        {/* ── HERO ── */}
        <div className="submit-hero">
          <div className="submit-hero-overlay" />
          <div className="submit-hero-content">
            <span className="submit-hero-eyebrow">Share Your Story</span>
            <h1>Write for <span>Magical Africa</span></h1>
            <p>Your voice matters. Share the culture, heritage and stories that move you.</p>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="submit-layout">

          {/* ── FORM ── */}
          <div className="submit-form-wrap">

            {/* Success */}
            {success && (
              <div className="submit-alert submit-alert--success">
                <FiCheck size={16} />
                Your blog has been published! Redirecting you back...
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="submit-alert submit-alert--error">
                <FiAlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Author pill */}
            <div className="submit-author-pill">
              <div className="submit-author-avatar">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="submit-author-label">Writing as</p>
                <p className="submit-author-name">{authorName}</p>
              </div>
            </div>

            {/* Title */}
            <div className="submit-field">
              <label>
                <FiFileText size={14} />
                Blog Title <span className="submit-required">*</span>
              </label>
              <input
                type="text"
                placeholder="Give your story a powerful title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
              <span className="submit-char-count">{title.length}/100</span>
            </div>

            {/* Subtitle */}
            <div className="submit-field">
              <label>
                <FiFileText size={14} />
                Subtitle <span className="submit-required">*</span>
              </label>
              <input
                type="text"
                placeholder="A short description of your post..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                maxLength={160}
              />
              <span className="submit-char-count">{subtitle.length}/160</span>
            </div>

            {/* Category + Image row */}
            <div className="submit-row">
              <div className="submit-field">
                <label>
                  <FiTag size={14} />
                  Category <span className="submit-required">*</span>
                </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="submit-field">
                <label>
                  <FiImage size={14} />
                  Cover Image
                </label>
                {!imagePreview ? (
                  <label className="submit-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                    />
                    <FiUpload size={22} />
                    <span>Click to upload image</span>
                    <span className="submit-upload-hint">PNG, JPG, WEBP — max 5MB</span>
                  </label>
                ) : (
                  <div className="submit-image-preview" style={{ backgroundImage: `url('${imagePreview}')` }}>
                    <button className="submit-image-remove" onClick={handleRemoveImage} type="button">
                      <FiX size={14} /> Remove
                    </button>
                    <span className="submit-image-name">{imageFile?.name}</span>
                  </div>
                )}
                {uploading && (
                  <div className="submit-upload-progress">
                    <div className="submit-upload-bar" style={{ width: `${uploadProgress}%` }} />
                    <span>{uploadProgress}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="submit-field">
              <label>
                <FiTag size={14} />
                Tags <span className="submit-required">*</span>
              </label>
              <div className="submit-tags-grid">
                {TAGS_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`submit-tag-btn ${tags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tags.includes(tag) && <FiCheck size={11} />}
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="submit-field">
              <label>
                <FiFileText size={14} />
                Your Story <span className="submit-required">*</span>
              </label>
              <p className="submit-field-hint">
                Press <kbd>Enter</kbd> twice between paragraphs each paragraph will be displayed separately.
              </p>
              <textarea
                rows={16}
                placeholder="Start writing your story here... Share your experiences, knowledge, and passion for African culture."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <span className="submit-char-count">{wordCount} words</span>
            </div>

            {/* Actions */}
            <div className="submit-actions">
              <button
                className="submit-btn-preview"
                onClick={() => setPreview(!preview)}
                type="button"
              >
                {preview ? 'Hide Preview' : 'Preview Post'}
              </button>
              <button
                className="submit-btn-publish"
                onClick={handleSubmit}
                disabled={loading || success}
                type="button"
              >
                {loading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="submit-sidebar">
            <div className="submit-sidebar-box">
              <h3>Writing Tips</h3>
              <ul>
                <li>Start with a strong opening that hooks the reader.</li>
                <li>Break your content into clear paragraphs.</li>
                <li>Share personal experiences or research ibacked facts.</li>
                <li>Use a high quality cover image that reflects your topic.</li>
                <li>Keep your title under 10 words for best impact.</li>
              </ul>
            </div>

            <div className="submit-sidebar-box">
              <h3>Guidelines</h3>
              <ul>
                <li>Content must celebrate African culture & heritage.</li>
                <li>No hate speech or offensive content.</li>
                <li>Respect intellectual property credit your sources.</li>
                <li>Posts go live immediately after submission.</li>
              </ul>
            </div>

            <div className="submit-sidebar-box submit-sidebar-stats">
              <h3>Your Post</h3>
              <div className="submit-stat">
                <span>Words</span>
                <strong>{wordCount}</strong>
              </div>
              <div className="submit-stat">
                <span>Est. Read Time</span>
                <strong>{Math.max(1, Math.ceil(wordCount / 200))} min</strong>
              </div>
              <div className="submit-stat">
                <span>Tags Selected</span>
                <strong>{tags.length}</strong>
              </div>
              <div className="submit-stat">
                <span>Category</span>
                <strong>{category || '—'}</strong>
              </div>
            </div>
          </aside>
        </div>

        {/* ── PREVIEW ── */}
        {preview && (
          <div className="submit-preview-section">
            <h2 className="submit-preview-label">Post Preview</h2>
            <div
              className="submit-preview-hero"
              style={{ backgroundImage: `url('${imagePreview || '/images/AI-woman.png'}')` }}
            >
              <div className="submit-preview-overlay" />
              <div className="submit-preview-hero-content">
                {category && <span className="submit-preview-tag">{category}</span>}
                <h1>{title || 'Your Title Here'}</h1>
                <p>{subtitle || 'Your subtitle will appear here...'}</p>
                <div className="submit-preview-meta">
                  <span>{authorName}</span>
                  <span>·</span>
                  <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>·</span>
                  <span>{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
                </div>
              </div>
            </div>
            <div className="submit-preview-body">
              {body.split('\n').filter(p => p.trim()).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}

export default SubmitBlog