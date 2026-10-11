import { useState } from 'react'
import { FiUser, FiCamera } from 'react-icons/fi'
import CreatorProfilePersonal from './CreatorProfilePersonal'
import CreatorProfilePhoto from './CreatorProfilePhoto'

// Standalone creator Profile section (same shape as learner/tutor, own files).
// Uses the creator's panel/empty classes (cd-*) + the shared lp-* styles in
// creator-dashboard.css.
const TABS = [
  { key: 'personal', label: 'Personal Info', Icon: FiUser },
  { key: 'photo', label: 'Profile Photo', Icon: FiCamera },
]

export default function CreatorProfileSection({ customer, loading, error, onRetry, onCustomerUpdate }) {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <section className="cd-panel">
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
          <p className="cd-empty">Loading your profile…</p>
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
          <p className="cd-empty">No profile found.</p>
        ) : activeTab === 'personal' ? (
          <CreatorProfilePersonal customer={customer} onCustomerUpdate={onCustomerUpdate} />
        ) : (
          <CreatorProfilePhoto customer={customer} onCustomerUpdate={onCustomerUpdate} />
        )}
      </div>
    </section>
  )
}