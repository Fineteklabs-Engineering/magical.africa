import { useState } from 'react'
import { FiUser, FiCamera } from 'react-icons/fi'
import TutorProfilePersonal from './TutorProfilePersonal'
import TutorProfilePhoto from './TutorProfilePhoto'

// Standalone tutor Profile section. Same shape as the learner's, but its own
// files so the two dashboards never depend on each other. Uses the tutor's
// panel/empty classes (td-*) and the shared lp-* styles in teacher-dashboard.css.
const TABS = [
  { key: 'personal', label: 'Personal Info', Icon: FiUser },
  { key: 'photo', label: 'Profile Photo', Icon: FiCamera },
]

export default function TutorProfileSection({ customer, loading, error, onRetry, onCustomerUpdate }) {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <section className="td-panel">
      <div className="lp-head">
        <h1>Profile</h1>
        <p className="lp-sub">Manage your personal details and photo.</p>
      </div>

      <div className="lp-tabs" role="tablist">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            className={'lp-tab' + (activeTab === key ? ' is-active' : '')}
            onClick={() => setActiveTab(key)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="lp-tab-body">
        {loading ? (
          <p className="td-empty-text">Loading your profile…</p>
        ) : error ? (
          <div className="lp-state">
            <p className="lp-state-error">{error}</p>
            {onRetry && (
              <button type="button" className="lp-btn-ghost" onClick={onRetry}>
                Retry
              </button>
            )}
          </div>
        ) : !customer ? (
          <p className="td-empty-text">No profile found.</p>
        ) : activeTab === 'personal' ? (
          <TutorProfilePersonal customer={customer} onCustomerUpdate={onCustomerUpdate} />
        ) : (
          <TutorProfilePhoto customer={customer} onCustomerUpdate={onCustomerUpdate} />
        )}
      </div>
    </section>
  )
}