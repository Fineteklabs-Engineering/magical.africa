import { useState, useEffect } from 'react'
import { updateCustomer } from '../api/authApi'

// Turn an ISO datetime (or null) into a YYYY-MM-DD value for <input type="date">.
const toDateInput = (iso) => (iso ? String(iso).slice(0, 10) : '')

// Only values we've actually seen from the backend. If a customer has some
// other value, we keep it selectable (see genderOptions) rather than drop it.
const GENDERS = ['MALE', 'FEMALE']

const formFrom = (c) => ({
  firstName: c.firstName || '',
  lastName: c.lastName || '',
  otherNames: c.otherNames || '',
  telephone: c.telephone || '',
  gender: c.gender || '',
  dob: toDateInput(c.dob),
})

export default function TutorProfilePersonal({ customer, onCustomerUpdate }) {
  const [form, setForm] = useState(() => formFrom(customer))
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null) // { type: 'ok' | 'err', text }

  // Re-sync when the customer object changes upstream (e.g. after a save).
  useEffect(() => {
    setForm(formFrom(customer))
  }, [customer])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const isDirty =
    form.firstName !== (customer.firstName || '') ||
    form.lastName !== (customer.lastName || '') ||
    form.otherNames !== (customer.otherNames || '') ||
    form.telephone !== (customer.telephone || '') ||
    form.gender !== (customer.gender || '') ||
    form.dob !== toDateInput(customer.dob)

  // Keep the current value selectable even if it's outside our known list.
  const genderOptions =
    form.gender && !GENDERS.includes(form.gender) ? [form.gender, ...GENDERS] : GENDERS

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isDirty || saving) return
    setSaving(true)
    setMsg(null)
    try {
      // Full-object PUT: send the WHOLE customer back with only the edited
      // fields changed, so nothing else (role/customerCategoryId, email,
      // flags, imageUrl) gets wiped by the overwrite.
      const body = {
        ...customer,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        otherNames: form.otherNames.trim(),
        telephone: form.telephone.trim() || null,
        gender: form.gender || null,
        dob: form.dob ? new Date(`${form.dob}T00:00:00.000Z`).toISOString() : null,
      }
      const updated = await updateCustomer(customer.publicId, body)
      // The PUT returns the updated customer — push it up so the whole
      // dashboard (greeting included) refreshes without another fetch.
      onCustomerUpdate(updated && updated.publicId ? updated : body)
      setMsg({ type: 'ok', text: 'Profile updated.' })
    } catch (err) {
      const status = err?.response?.status
      setMsg({
        type: 'err',
        text:
          status === 403
            ? "You don't have permission to update this profile."
            : 'Could not save your changes. Please try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="lp-form" onSubmit={handleSubmit}>
      {msg && (
        <div className={'lp-msg ' + (msg.type === 'ok' ? 'lp-msg--ok' : 'lp-msg--err')}>
          {msg.text}
        </div>
      )}

      <div className="lp-grid-2">
        <div className="lp-field">
          <label htmlFor="pf-first">First name</label>
          <input id="pf-first" className="lp-input" value={form.firstName} onChange={set('firstName')} required />
        </div>
        <div className="lp-field">
          <label htmlFor="pf-last">Last name</label>
          <input id="pf-last" className="lp-input" value={form.lastName} onChange={set('lastName')} required />
        </div>
      </div>

      <div className="lp-field">
        <label htmlFor="pf-other">Other names</label>
        <input id="pf-other" className="lp-input" value={form.otherNames} onChange={set('otherNames')} placeholder="Optional" />
      </div>

      <div className="lp-grid-2">
        <div className="lp-field">
          <label htmlFor="pf-phone">Phone</label>
          <input id="pf-phone" className="lp-input" type="tel" value={form.telephone} onChange={set('telephone')} placeholder="Optional" />
        </div>
        <div className="lp-field">
          <label htmlFor="pf-gender">Gender</label>
          <select id="pf-gender" className="lp-input" value={form.gender} onChange={set('gender')}>
            <option value="">Prefer not to say</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0) + g.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="lp-grid-2">
        <div className="lp-field">
          <label htmlFor="pf-dob">Date of birth</label>
          <input id="pf-dob" className="lp-input" type="date" value={form.dob} onChange={set('dob')} />
        </div>
        <div className="lp-field">
          <label htmlFor="pf-email">Email</label>
          <input id="pf-email" className="lp-input" value={customer.email || ''} readOnly />
          <span className="lp-hint">Your email is your login — it can't be changed here.</span>
        </div>
      </div>

      <div className="lp-field">
        <label htmlFor="pf-username">Username</label>
        <input id="pf-username" className="lp-input" value={customer.username || ''} readOnly />
      </div>

      <div className="lp-actions">
        <button type="submit" className="lp-btn" disabled={!isDirty || saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {isDirty && !saving && (
          <button type="button" className="lp-btn-ghost" onClick={() => setForm(formFrom(customer))}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}