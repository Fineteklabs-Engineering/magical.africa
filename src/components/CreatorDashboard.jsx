import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiImage, FiBell, FiUser, FiSettings, FiMenu, FiSearch } from 'react-icons/fi'
import { getCustomerByUsername } from '../api/authApi'
import CreatorProfileSection from './CreatorProfileSection'
import '../styles/creator-dashboard.css'

// Flat sections. Profile is live; the rest are skeletons (see memory note —
// My Art product CRUD, Notifications, Settings get rebuilt against the real
// backend later).
const SECTIONS = {
  'my-art': 'My Art & Products',
  notifications: 'Notifications',
  profile: 'Profile',
  settings: 'Settings',
}

// "My profile" and "Quick actions" are real widgets (below); these stay placeholders.
const PLACEHOLDER_WIDGETS = ['Store snapshot', 'Latest activity']

// Right-panel shortcuts — each just switches the active section.
const QUICK_ACTIONS = [
  { section: 'my-art', label: 'My Art & Products', Icon: FiImage },
  { section: 'notifications', label: 'Notifications', Icon: FiBell },
  { section: 'profile', label: 'Edit profile', Icon: FiUser },
  { section: 'settings', label: 'Settings', Icon: FiSettings },
]

export default function CreatorDashboard() {
  const [activeSection, setActiveSection] = useState('my-art')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // The logged-in customer (the creator) — fetched once, used for the greeting,
  // the Profile section and the My-profile widget.
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
      className={'cd-nav-item' + (activeSection === section ? ' is-active' : '')}
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
    <div className="cd-dashboard">
      {/* Mobile topbar */}
      <div className="cd-mobile-topbar">
        <button
          type="button"
          className="cd-mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <FiMenu aria-hidden="true" />
        </button>
        <strong>Creator Dashboard</strong>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="cd-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="cd-shell">
        {/* Sidebar */}
        <aside className={'cd-sidebar' + (sidebarOpen ? ' cd-sidebar--open' : '')}>
          <div className="cd-sidebar-brand">
            <Link to="/" className="cd-sidebar-logo" aria-label="Magical Africa home">
              <img src="/images/magicalProfile.png" alt="Magical Africa" />
            </Link>
            <h2>Creator Dashboard</h2>
          </div>

          <nav className="cd-nav">
            {navItem('my-art', 'My Art & Products', FiImage)}
            {navItem('notifications', 'Notifications', FiBell)}
            {navItem('profile', 'Profile', FiUser)}
            {navItem('settings', 'Settings', FiSettings)}
          </nav>
        </aside>

        {/* Main column */}
        <div className="cd-shell-main">
          {/* Topbar */}
          <div className="cd-page-topbar">
            <div className="cd-topbar-left">
              <span className="cd-topbar-label">Store listings</span>
              <strong className="cd-topbar-count">0 listings</strong>
            </div>
            <label className="cd-topbar-search" htmlFor="cd-search">
              <FiSearch aria-hidden="true" />
              <input id="cd-search" type="text" placeholder="Search your art, notifications..." />
            </label>
            <div className="cd-topbar-right">
              <button
                type="button"
                className="cd-bell"
                aria-label="Notifications"
                onClick={() => go('notifications')}
              >
                <FiBell aria-hidden="true" />
              </button>
              <span className="cd-greeting">Hi, {firstName || 'there'}</span>
            </div>
          </div>

          <div className="cd-body-grid">
            {/* Active section */}
            <main className="cd-main">
              {activeSection === 'profile' ? (
                <CreatorProfileSection
                  customer={customer}
                  loading={customerLoading}
                  error={customerError}
                  onRetry={loadCustomer}
                  onCustomerUpdate={setCustomer}
                />
              ) : (
                <section className="cd-panel">
                  <h1>{SECTIONS[activeSection]}</h1>
                  <p className="cd-empty">Content for this section comes next.</p>
                </section>
              )}
            </main>

            {/* Right widgets */}
            <aside className="cd-right-panel">
              {/* My profile — real data: name + avatar + jump to the Profile section */}
              <div className="cd-widget-card">
                <h2>My profile</h2>
                {customerLoading ? (
                  <p className="cd-widget-empty">Loading…</p>
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
                  <p className="cd-widget-empty">—</p>
                )}
              </div>

              {/* Quick actions — shortcuts into the sections */}
              <div className="cd-widget-card">
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
                <div key={title} className="cd-widget-card">
                  <h2>{title}</h2>
                  <p className="cd-widget-empty">—</p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}