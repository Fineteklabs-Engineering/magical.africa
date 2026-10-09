import { useState, useEffect } from 'react'
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
import '../styles/learner.css'

// Sections the dashboard will hold. Content comes later — this is just the frame.
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

const WIDGETS = ['Heritage Streak', 'Quick actions', 'My profile', 'Learning updates']

export default function Learner() {
  const [activeSection, setActiveSection] = useState('store')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(true)

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
              <span className="learner-greeting">Hi, Learner</span>
            </div>
          </div>

          <div className="learner-body-grid">
            {/* Active section placeholder */}
            <main className="learner-main">
              <section className="learner-panel">
                <h1>{SECTIONS[activeSection]}</h1>
                <p className="learner-empty">Content for this section comes next.</p>
              </section>
            </main>

            {/* Right widgets */}
            <aside className="learner-right-panel">
              {WIDGETS.map((title) => (
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