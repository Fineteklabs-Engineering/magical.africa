import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FiShoppingBag,
  FiBookOpen,
  FiPlayCircle,
  FiCheckCircle,
  FiActivity,
  FiAward,
  FiImage,
  FiBell,
  FiUser,
  FiSettings,
  FiMenu,
  FiSearch,
  FiChevronDown,
} from 'react-icons/fi'
import { getCustomerByUsername } from '../api/authApi'
import ProfileSection from './ProfileSection'
import '../styles/learner.css'

// Sections the dashboard will hold. Profile is live; the rest are still frames.
const SECTIONS = {
  store: 'All Courses',
  'courses-mine': 'My Courses',
  'courses-progress': 'Continue Learning',
  'courses-completed': 'Completed Courses',
  progress: 'Progress Overview',
  achievements: 'Certifications & Achievements',
  'my-art': 'My Art',
  notifications: 'Notifications',
  profile: 'Profile',
  settings: 'Settings',
}

// "My profile" and "Quick actions" are real widgets (rendered below); these stay placeholders.
const PLACEHOLDER_WIDGETS = ['Heritage Streak', 'Learning updates']

// Right-panel shortcuts — each just switches the active dashboard section.
const QUICK_ACTIONS = [
  { section: 'store', label: 'Browse courses', Icon: FiShoppingBag },
  { section: 'courses-progress', label: 'Continue learning', Icon: FiPlayCircle },
  { section: 'my-art', label: 'My art', Icon: FiImage },
  { section: 'profile', label: 'Edit profile', Icon: FiUser },
]

export default function Learner() {
  const [activeSection, setActiveSection] = useState('store')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(true)

  // The logged-in customer — fetched once, used for the greeting and Profile.
  const [customer, setCustomer] = useState(null)
  const [customerLoading, setCustomerLoading] = useState(true)
  const [customerError, setCustomerError] = useState('')

  const loadCustomer = useCallback(async () => {
    const username = localStorage.getItem('ma_username')
    if (!username) {
      setCustomerError('You are not signed in.')
      setCustomerLoading(false)
      return
    }
    setCustomerLoading(true)
    setCustomerError('')
    try {
      const data = await getCustomerByUsername(username)
      setCustomer(data)
    } catch {
      setCustomerError('Could not load your profile. Please try again.')
    } finally {
      setCustomerLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCustomer()
  }, [loadCustomer])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  // Close the drawer on Escape
  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  const go = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
  }

  const navItem = (section, label, Icon) => (
    <button
      type="button"
      className={'learner-nav-item' + (activeSection === section ? ' is-active' : '')}
      onClick={() => go(section)}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </button>
  )

  const firstName = customer?.firstName || ''
  const fullName = [customer?.firstName, customer?.lastName].filter(Boolean).join(' ')
  const initials =
    ((customer?.firstName?.[0] || '') + (customer?.lastName?.[0] || '')).toUpperCase() || '?'

  return (
    <div className="learner-dashboard">
      {/* Mobile topbar */}
      <div className="learner-mobile-topbar">
        <button
          type="button"
          className="learner-mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <FiMenu aria-hidden="true" />
        </button>
        <strong>Learner Dashboard</strong>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="learner-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="learner-shell">
        {/* Sidebar */}
        <aside className={'learner-sidebar' + (sidebarOpen ? ' learner-sidebar--open' : '')}>
          <div className="learner-sidebar-brand">
            <Link to="/" className="learner-sidebar-logo" aria-label="Magical Africa home">
              <img src="/images/magicalProfile.png" alt="Magical Africa" />
            </Link>
            <h2>Learner Dashboard</h2>
          </div>

          <nav className="learner-nav">
            {navItem('store', 'All Courses', FiShoppingBag)}

            <div className="learner-nav-group">
              <button
                type="button"
                className={'learner-nav-item learner-nav-item--group' + (learningOpen ? ' is-open' : '')}
                onClick={() => setLearningOpen((v) => !v)}
                aria-expanded={learningOpen}
              >
                <FiBookOpen aria-hidden="true" />
                <span>My Learning</span>
                <FiChevronDown className="learner-nav-caret" aria-hidden="true" />
              </button>
              {learningOpen && (
                <div className="learner-nav-submenu">
                  {navItem('courses-mine', 'My Courses', FiBookOpen)}
                  {navItem('courses-progress', 'Continue Learning', FiPlayCircle)}
                  {navItem('courses-completed', 'Completed Courses', FiCheckCircle)}
                </div>
              )}
            </div>

            {navItem('progress', 'Progress Overview', FiActivity)}
            {navItem('achievements', 'Certifications & Achievements', FiAward)}
            {navItem('my-art', 'My Art', FiImage)}
            {navItem('notifications', 'Notifications', FiBell)}
            {navItem('profile', 'Profile', FiUser)}
            {navItem('settings', 'Settings', FiSettings)}
          </nav>
        </aside>

        {/* Main column */}
        <div className="learner-shell-main">
          {/* Topbar */}
          <div className="learner-page-topbar">
            <div className="learner-topbar-left">
              <span className="learner-topbar-label">Purchased courses</span>
              <strong className="learner-topbar-count">0 courses</strong>
            </div>
            <label className="learner-topbar-search" htmlFor="learner-search">
              <FiSearch aria-hidden="true" />
              <input id="learner-search" type="text" placeholder="Search courses, art, notifications..." />
            </label>
            <div className="learner-topbar-right">
              <button
                type="button"
                className="learner-bell"
                aria-label="Notifications"
                onClick={() => go('notifications')}
              >
                <FiBell aria-hidden="true" />
              </button>
              <span className="learner-greeting">Hi, {firstName || 'there'}</span>
            </div>
          </div>

          <div className="learner-body-grid">
            {/* Active section */}
            <main className="learner-main">
              {activeSection === 'profile' ? (
                <ProfileSection
                  customer={customer}
                  loading={customerLoading}
                  error={customerError}
                  onRetry={loadCustomer}
                  onCustomerUpdate={setCustomer}
                />
              ) : (
                <section className="learner-panel">
                  <h1>{SECTIONS[activeSection]}</h1>
                  <p className="learner-empty">Content for this section comes next.</p>
                </section>
              )}
            </main>

            {/* Right widgets */}
            <aside className="learner-right-panel">
              {/* My profile — real data: name + avatar + a jump to the Profile section */}
              <div className="learner-widget-card">
                <h2>My profile</h2>
                {customerLoading ? (
                  <p className="learner-empty">Loading…</p>
                ) : customer ? (
                  <div className="lw-profile-body">
                    <div className="lp-avatar lw-profile-avatar">
                      {customer.imageUrl ? (
                        <img src={customer.imageUrl} alt="Profile" />
                      ) : (
                        <span className="lp-avatar-fallback">{initials}</span>
                      )}
                    </div>
                    <div className="lw-profile-meta">
                      <span className="lw-profile-name">{fullName || '—'}</span>
                      {customer.email && <span className="lw-profile-email">{customer.email}</span>}
                    </div>
                    <button type="button" className="lw-profile-link" onClick={() => go('profile')}>
                      View profile
                    </button>
                  </div>
                ) : (
                  <p className="learner-empty">—</p>
                )}
              </div>

              {/* Quick actions — shortcuts into the main sections */}
              <div className="learner-widget-card">
                <h2>Quick actions</h2>
                <div className="lw-actions">
                  {QUICK_ACTIONS.map(({ section, label, Icon }) => (
                    <button
                      key={section}
                      type="button"
                      className="lw-action"
                      onClick={() => go(section)}
                    >
                      <span className="lw-action-icon"><Icon aria-hidden="true" /></span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Still placeholders */}
              {PLACEHOLDER_WIDGETS.map((title) => (
                <div key={title} className="learner-widget-card">
                  <h2>{title}</h2>
                  <p className="learner-empty">—</p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}