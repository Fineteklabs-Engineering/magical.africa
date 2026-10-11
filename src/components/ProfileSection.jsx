import { useState } from 'react'
import { FiUser, FiCamera } from 'react-icons/fi'
import ProfilePersonal from './ProfilePersonal'
import ProfilePhoto from './ProfilePhoto'

// Each tab is its own component (see imports above). This shell just owns the
// tab bar and the loading/error/empty states; the data itself is fetched once
// by the dashboard and passed down as `customer`.
const TABS = [
  { key: 'personal', label: 'Personal Info', Icon: FiUser },
  { key: 'photo', label: 'Profile Photo', Icon: FiCamera },
]

export default function ProfileSection({ customer, loading, error, onRetry, onCustomerUpdate }) {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <section className="learner-panel">
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
          <p className="learner-empty">Loading your profile…</p>
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
          <p className="learner-empty">No profile found.</p>
        ) : activeTab === 'personal' ? (
          <ProfilePersonal customer={customer} onCustomerUpdate={onCustomerUpdate} />
        ) : (
          <ProfilePhoto customer={customer} onCustomerUpdate={onCustomerUpdate} />
        )}
      </div>
    </section>
  )
}