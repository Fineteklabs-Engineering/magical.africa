import { useRef, useState } from 'react'
import { uploadCustomerProfilePhoto } from '../api/authApi'

const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

function initials(customer) {
  const a = (customer.firstName || '').charAt(0)
  const b = (customer.lastName || '').charAt(0)
  return (a + b).toUpperCase() || '?'
}

export default function ProfilePhoto({ customer, onCustomerUpdate }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState(null) // { type: 'ok' | 'err', text }

  const pick = () => inputRef.current?.click()

  const onFile = (e) => {
    const f = e.target.files?.[0]
    e.target.value = '' // let the same file be re-picked later
    if (!f) return
    setMsg(null)
    if (!f.type.startsWith('image/')) {
      setMsg({ type: 'err', text: 'Please choose an image file.' })
      return
    }
    if (f.size > MAX_BYTES) {
      setMsg({ type: 'err', text: 'Image is larger than 5 MB. Choose a smaller one.' })
      return
    }
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const clear = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
  }

  const upload = async () => {
    if (!file || uploading) return
    setUploading(true)
    setMsg(null)
    try {
      const updated = await uploadCustomerProfilePhoto(customer.publicId, file)
      if (updated && updated.publicId) onCustomerUpdate(updated)
      clear()
      setMsg({ type: 'ok', text: 'Profile photo updated.' })
    } catch (err) {
      const status = err?.response?.status
      setMsg({
        type: 'err',
        text:
          status === 413
            ? 'That image is too large for the server.'
            : 'Could not upload your photo. Please try again.',
      })
    } finally {
      setUploading(false)
    }
  }

  const shownImage = preview || customer.imageUrl
  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(' ')

  return (
    <div className="lp-photo">
      {msg && (
        <div className={'lp-msg ' + (msg.type === 'ok' ? 'lp-msg--ok' : 'lp-msg--err')}>
          {msg.text}
        </div>
      )}

      <div className="lp-photo-row">
        <div className="lp-avatar">
          {shownImage ? (
            <img src={shownImage} alt="Profile" />
          ) : (
            <span className="lp-avatar-fallback">{initials(customer)}</span>
          )}
        </div>

        <div className="lp-photo-meta">
          <span className="lp-photo-name">{fullName || 'Your photo'}</span>
          <span className="lp-hint">JPG or PNG, up to 5 MB.</span>
          {file && <span className="lp-file-name">{file.name}</span>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFile}
        style={{ display: 'none' }}
      />

      <div className="lp-photo-actions">
        {!file ? (
          <button type="button" className="lp-btn-ghost" onClick={pick}>
            {customer.imageUrl ? 'Change photo' : 'Choose photo'}
          </button>
        ) : (
          <>
            <button type="button" className="lp-btn" onClick={upload} disabled={uploading}>
              {uploading ? 'Uploading…' : 'Upload photo'}
            </button>
            <button type="button" className="lp-btn-ghost" onClick={clear} disabled={uploading}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}