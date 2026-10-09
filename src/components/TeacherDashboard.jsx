import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi'
import '../styles/teacher-dashboard.css'

// Sidebar groups → sections. Content comes later — this is just the frame.
const NAV_GROUPS = [
  {
    key: 'teaching',
    title: 'Teaching Hub',
    items: [
      ['courses', 'Courses'],
      ['builder', 'Course Builder'],
      ['quizzes', 'Quizzes & Assessments'],
    ],
  },
  {
    key: 'learners',
    title: 'Learners',
    items: [
      ['students', 'Students'],
      ['messages', 'Messages'],
      ['reviews', 'Reviews'],
    ],
  },
  {
    key: 'insights',
    title: 'Insights',
    items: [
      ['analytics', 'Analytics'],
      ['earnings', 'Earnings'],
    ],
  },
  {
    key: 'content',
    title: 'Cultural & Language',
    items: [
      ['culture', 'Cultural Content'],
      ['language', 'Language Tools'],
    ],
  },
  {
    key: 'account',
    title: 'Account',
    items: [
      ['profile', 'Profile'],
      ['settings', 'Settings'],
    ],
  },
]

const SECTION_TITLES = {
  courses: 'Courses',
  builder: 'Course Builder',
  quizzes: 'Quizzes & Assessments',
  students: 'Students',
  messages: 'Messages & Announcements',
  reviews: 'Reviews & Feedback',
  analytics: 'Analytics & Insights',
  earnings: 'Earnings',
  culture: 'Cultural Content',
  language: 'Language Tools',
  profile: 'Tutor Profile',
  settings: 'Dashboard Settings',
}

const WIDGETS = ['Teaching Snapshot', 'Quick actions', 'My profile', 'Latest reviews']

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState('courses')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState({
    teaching: true,
    learners: true,
    insights: false,
    content: false,
    account: false,
  })

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

  const toggleGroup = (key) => setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="td-dashboard">
      {/* Mobile topbar */}
      <div className="td-mobile-topbar">
        <button
          type="button"
          className="td-mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <FiMenu aria-hidden="true" />
        </button>
        <strong>Tutor Dashboard</strong>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="td-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="td-layout">
        {/* Sidebar */}
        <aside className={'td-sidebar' + (sidebarOpen ? ' td-sidebar--open' : '')}>
          <div className="td-sidebar-brand">
            <Link to="/" className="td-sidebar-logo" aria-label="Magical Africa home">
              <img src="/images/magicalProfile.png" alt="Magical Africa" />
            </Link>
            <h2>Tutor Dashboard</h2>
          </div>

          <nav className="td-nav-groups">
            {NAV_GROUPS.map((group) => (
              <div key={group.key} className="td-nav-group">
                <button
                  type="button"
                  className={'td-nav-group-title' + (menuOpen[group.key] ? ' expanded' : '')}
                  onClick={() => toggleGroup(group.key)}
                  aria-expanded={menuOpen[group.key]}
                >
                  <span>{group.title}</span>
                  <FiChevronDown className="td-nav-caret" aria-hidden="true" />
                </button>
                {menuOpen[group.key] && (
                  <div className="td-nav-submenu">
                    {group.items.map(([section, label]) => (
                      <button
                        key={section}
                        type="button"
                        className={'td-nav-subitem' + (activeSection === section ? ' active' : '')}
                        onClick={() => go(section)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main column */}
        <div className="td-shell-main">
          {/* Topbar */}
          <div className="td-page-topbar">
            <div className="td-topbar-left">
              <span className="td-topbar-label">Active courses</span>
              <strong className="td-topbar-count">0 courses</strong>
            </div>
            <label className="td-topbar-search td-search-field" htmlFor="td-search">
              <FiSearch aria-hidden="true" />
              <input id="td-search" type="text" placeholder="Search courses, students, reviews..." />
            </label>
            <div className="td-topbar-right">
              <button
                type="button"
                className="td-alert-bell"
                aria-label="Reviews"
                onClick={() => go('reviews')}
              >
                <FiBell aria-hidden="true" />
              </button>
              <span className="td-greeting-text">Hi, Tutor</span>
            </div>
          </div>

          <div className="td-body-grid">
            {/* Active section placeholder */}
            <main className="td-main">
              <section className="td-panel">
                <h1>{SECTION_TITLES[activeSection]}</h1>
                <p className="td-empty-text">Content for this section comes next.</p>
              </section>
            </main>

            {/* Right widgets */}
            <aside className="td-right-panel">
              {WIDGETS.map((title) => (
                <div key={title} className="td-widget-card">
                  <h2>{title}</h2>
                  <p className="td-widget-empty">—</p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}