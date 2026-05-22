import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FiBell, FiChevronLeft, FiEdit2, FiEye, FiLogOut, FiPlus, FiSearch, FiTrash2, FiUpload, FiX } from 'react-icons/fi'
import '../styles/creator-dashboard.css'
import { auth, db } from '../context/AuthContext'
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const getMyArtProductsKey = (uid) => `creatorMyArtProducts_${uid}`
const getProfilePhotoKey = (uid) => `creatorProfilePhoto_${uid}`
const getSettingsPrefsKey = (uid) => `creatorSettingsPrefs_${uid}`
const getAnnouncementSeenKey = (uid) => `creatorAnnouncementSeenAt_${uid}`
const getMarketProductDocId = (uid, productId) => `market_${uid}_${productId}`

const toMs = (value) => {
  if (!value) return 0
  const parsed = new Date(value).getTime()
  return Number.isNaN(parsed) ? 0 : parsed
}

const createEmptyProductDraft = () => ({
  name: '', alias: '', code: '', quantity: '', metaTags: '', iconName: '', inStock: true,
  showOnWebsite: true, productionCost: '', wholesalePrice: '', sellingPrice: '', onOffer: false,
  offerPrice: '', taxInclusive: true, shippingOrigin: '', shippingMethod: 'standard',
  shippingCost: '', deliveryWindowKenya: '', deliveryWindowInternational: '',
  photoURL: '', description: '', active: true
})

const buildPublicMarketProduct = (product, sellerId, sellerName) => ({
  sourceProductId: product.id, sellerId, sellerName, name: product.name,
  description: product.description,
  price: Number(product.onOffer && product.offerPrice > 0 ? product.offerPrice : product.sellingPrice) || 0,
  imageUrl: product.photoURL || product.iconName || '', inStock: Boolean(product.inStock),
  showOnWebsite: Boolean(product.showOnWebsite), active: Boolean(product.active),
  code: product.code || '', shippingOrigin: product.shippingOrigin || '',
  tags: Array.isArray(product.metaTags) ? product.metaTags : [],
  createdAt: product.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString()
})

const formatUsd = (value) => {
  const amount = Number(value || 0)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Number.isFinite(amount) ? amount : 0)
}

const normalizeSettingsPrefs = (prefs = {}) => ({
  darkMode: Boolean(prefs?.darkMode),
  notifications: prefs?.notifications !== false,
  cloudSync: prefs?.cloudSync !== false
})

const CreatorDashboard = () => {
  const navigate = useNavigate()
  const { user, userData, getFullName, getInitials, logout } = useAuth()

  const [activeSection, setActiveSection] = useState('my-art')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [myArtProducts, setMyArtProducts] = useState([])
  const [editingProductId, setEditingProductId] = useState('')
  const [viewingProduct, setViewingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [productCodeManuallyEdited, setProductCodeManuallyEdited] = useState(false)
  const [productSearchTerm, setProductSearchTerm] = useState('')
  const [productFormStep, setProductFormStep] = useState(1)
  const [productDraft, setProductDraft] = useState(createEmptyProductDraft)
  const [myArtSyncError, setMyArtSyncError] = useState('')
  const [actionToast, setActionToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [profileDraft, setProfileDraft] = useState({ firstName: '', lastName: '', photoURL: '' })
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [securityMessage, setSecurityMessage] = useState('')
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' })
  const [settingsPrefs, setSettingsPrefs] = useState({ darkMode: false, notifications: true, cloudSync: true })
  const [announcementSeenAt, setAnnouncementSeenAt] = useState('')
  const [notifications, setNotifications] = useState([])
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const profileMenuRef = useRef(null)
  const profilePhotoInputRef = useRef(null)
  const productIconInputRef = useRef(null)
  const productPhotoInputRef = useRef(null)

  const creatorName = useMemo(() => {
    const fullName = getFullName ? getFullName() : ''
    if (fullName && fullName.trim()) return fullName.trim()
    if (userData?.firstName) return userData.firstName
    if (user?.displayName) return user.displayName
    return user?.email?.split('@')[0] || 'Creator'
  }, [getFullName, userData, user])

  const avatarInitials = useMemo(() => {
    const first = (profileDraft.firstName || userData?.firstName || '').trim()
    const last = (profileDraft.lastName || userData?.lastName || userData?.secondName || '').trim()
    const custom = `${first.charAt(0)}${last.charAt(0)}`.toUpperCase().trim()
    if (custom) return custom
    return getInitials ? getInitials() : 'C'
  }, [profileDraft.firstName, profileDraft.lastName, userData, getInitials])

  // ── LOAD PRODUCTS ──
  useEffect(() => {
    const isArtSection = activeSection === 'my-art' || activeSection === 'my-art-add'
    if (!user?.uid) { setMyArtProducts([]); return }
    if (!isArtSection) return
    const cached = localStorage.getItem(getMyArtProductsKey(user.uid))
    if (cached) {
      try { const parsed = JSON.parse(cached); if (Array.isArray(parsed)) setMyArtProducts(parsed) }
      catch { localStorage.removeItem(getMyArtProductsKey(user.uid)) }
    }
    const productsRef = collection(db, 'users', user.uid, 'products')
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setMyArtProducts(products)
      setMyArtSyncError('')
      localStorage.setItem(getMyArtProductsKey(user.uid), JSON.stringify(products))
    }, (error) => {
      console.error('Error loading products:', error)
      setMyArtSyncError('Could not sync products from Firebase. Showing local data.')
      const c = localStorage.getItem(getMyArtProductsKey(user.uid))
      if (c) { try { const p = JSON.parse(c); if (Array.isArray(p)) setMyArtProducts(p) } catch { setMyArtProducts([]) } }
    })
    return () => unsubscribe()
  }, [activeSection, user?.uid])

  // ── SETTINGS ──
  useEffect(() => {
    if (!user?.uid) return
    const stored = localStorage.getItem(getSettingsPrefsKey(user.uid))
    if (!stored) return
    try { const p = JSON.parse(stored); setSettingsPrefs(normalizeSettingsPrefs(p)) }
    catch { localStorage.removeItem(getSettingsPrefsKey(user.uid)) }
  }, [user?.uid])

  useEffect(() => {
    if (!user?.uid) return
    localStorage.setItem(getSettingsPrefsKey(user.uid), JSON.stringify(settingsPrefs))
  }, [settingsPrefs, user?.uid])

  // ── NOTIFICATIONS ──
  useEffect(() => {
    if (!user?.uid) return
    const stored = localStorage.getItem(getAnnouncementSeenKey(user.uid)) || ''
    setAnnouncementSeenAt(stored)
  }, [user?.uid])

  // ── PROFILE ──
  useEffect(() => {
    const localPhoto = user?.uid ? (localStorage.getItem(getProfilePhotoKey(user.uid)) || '') : ''
    setProfileDraft({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || userData?.secondName || '',
      photoURL: localPhoto || userData?.photoURL || user?.photoURL || ''
    })
  }, [userData, user?.uid, user?.photoURL])

  // ── OUTSIDE CLICK ──
  useEffect(() => {
    const handleOutside = (e) => { if (!profileMenuRef.current) return; if (!profileMenuRef.current.contains(e.target)) setProfileMenuOpen(false) }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  useEffect(() => { setSidebarOpen(false) }, [activeSection])

  // ── AUTO CODE ──
  const getAutoProductCode = (nameValue = '') => {
    const normalized = String(nameValue || '').toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 10)
    const base = normalized || 'PRD'
    const sequence = String(myArtProducts.length + (editingProductId ? 0 : 1)).padStart(3, '0')
    return `${base}-${sequence}`
  }

  useEffect(() => {
    if (productCodeManuallyEdited) return
    const autoCode = getAutoProductCode(productDraft.name)
    setProductDraft((prev) => (prev.code === autoCode ? prev : { ...prev, code: autoCode }))
  }, [productCodeManuallyEdited, productDraft.name, myArtProducts.length, editingProductId])

  const filteredMyArtProducts = useMemo(() => {
    const q = productSearchTerm.trim().toLowerCase()
    if (!q) return myArtProducts
    return myArtProducts.filter((p) => [p.name, p.code, p.description].filter(Boolean).join(' ').toLowerCase().includes(q))
  }, [myArtProducts, productSearchTerm])

  const unseenCount = useMemo(() => {
    if (!announcementSeenAt) return notifications.length
    const seenTime = toMs(announcementSeenAt)
    return notifications.filter((n) => toMs(n.createdAt) > seenTime).length
  }, [notifications, announcementSeenAt])

  const markAllRead = () => {
    if (!user?.uid) return
    const now = new Date().toISOString()
    setAnnouncementSeenAt(now)
    localStorage.setItem(getAnnouncementSeenKey(user.uid), now)
  }

  const openSection = (section) => { setActiveSection(section); setSidebarOpen(false) }

  // ── PRODUCT ACTIONS ──
  const startCreateProduct = () => {
    setEditingProductId(''); setProductCodeManuallyEdited(false)
    setProductFormStep(1); setProductDraft(createEmptyProductDraft())
    setActiveSection('my-art-add')
  }

  const handleProductIconUpload = async (event) => {
    const file = event.target.files?.[0]; event.target.value = ''
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setActionToast({ tone: 'warning', title: 'Icon too large', message: 'Please choose an icon under 2MB.' }); setTimeout(() => setActionToast(null), 2600); return }
    try {
      const dataUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(); r.readAsDataURL(file) })
      setProductDraft((prev) => ({ ...prev, iconName: String(dataUrl || '') }))
    } catch { setActionToast({ tone: 'warning', title: 'Upload failed', message: 'Could not upload icon.' }); setTimeout(() => setActionToast(null), 2600) }
  }

  const handleProductPhotoUpload = async (event) => {
    const file = event.target.files?.[0]; event.target.value = ''
    if (!file) return
    if (file.size > 4 * 1024 * 1024) { setActionToast({ tone: 'warning', title: 'Photo too large', message: 'Please choose a photo under 4MB.' }); setTimeout(() => setActionToast(null), 2600); return }
    try {
      const dataUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(); r.readAsDataURL(file) })
      setProductDraft((prev) => ({ ...prev, photoURL: String(dataUrl || '') }))
    } catch { setActionToast({ tone: 'warning', title: 'Upload failed', message: 'Could not upload photo.' }); setTimeout(() => setActionToast(null), 2600) }
  }

  const handleEditProduct = (product) => {
    setEditingProductId(product.id); setProductCodeManuallyEdited(true); setProductFormStep(1)
    setProductDraft({ ...createEmptyProductDraft(), ...product, quantity: String(product.quantity || ''), productionCost: String(product.productionCost || ''), wholesalePrice: String(product.wholesalePrice || ''), sellingPrice: String(product.sellingPrice || ''), offerPrice: String(product.offerPrice || ''), shippingCost: String(product.shippingCost || ''), deliveryWindowKenya: product.deliveryWindowKenya || product.deliveryWindow || '', deliveryWindowInternational: product.deliveryWindowInternational || '', metaTags: Array.isArray(product.metaTags) ? product.metaTags.join(', ') : (product.metaTags || '') })
    setActiveSection('my-art-add')
  }

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return
    const product = deletingProduct
    setMyArtProducts((prev) => prev.filter((p) => p.id !== product.id))
    if (user?.uid) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'products', product.id))
        await deleteDoc(doc(db, 'marketProducts', getMarketProductDocId(user.uid, product.id)))
      } catch (error) {
        console.error('Error deleting product:', error)
        setActionToast({ tone: 'warning', title: 'Delete warning', message: 'Removed locally but failed to sync.' }); setTimeout(() => setActionToast(null), 3000); return
      }
    }
    setDeletingProduct(null)
    setActionToast({ tone: 'success', title: 'Product deleted', message: `${product.name || 'Product'} was removed.` })
    setTimeout(() => setActionToast(null), 2600)
  }

  const handleCreateProduct = (event) => {
    event.preventDefault()
    const name = productDraft.name.trim()
    const description = productDraft.description.trim()
    const sellingPrice = Number(productDraft.sellingPrice || 0)
    const offerPrice = Number(productDraft.offerPrice || 0)
    const normalizedCode = productDraft.code.trim().toUpperCase()
    const metaTags = productDraft.metaTags.split(',').map((t) => t.trim()).filter(Boolean)

    if (productFormStep === 1) {
      if (!name) { setActionToast({ tone: 'warning', title: 'Name required', message: 'Enter a product name.' }); setTimeout(() => setActionToast(null), 2600); return }
      if (!normalizedCode) { setActionToast({ tone: 'warning', title: 'Code required', message: 'Enter a product code.' }); setTimeout(() => setActionToast(null), 2600); return }
      if (!description) { setActionToast({ tone: 'warning', title: 'Description required', message: 'Add a product description.' }); setTimeout(() => setActionToast(null), 2600); return }
      setProductFormStep(2); return
    }
    if (productFormStep === 2) {
      if (!Number.isFinite(sellingPrice) || sellingPrice <= 0) { setActionToast({ tone: 'warning', title: 'Price required', message: 'Enter a valid selling price.' }); setTimeout(() => setActionToast(null), 2600); return }
      if (productDraft.onOffer && offerPrice > 0 && offerPrice >= sellingPrice) { setActionToast({ tone: 'warning', title: 'Offer price too high', message: 'Offer price must be lower than selling price.' }); setTimeout(() => setActionToast(null), 2600); return }
      setProductFormStep(3); return
    }
    if (productFormStep === 3) {
      if (!productDraft.shippingOrigin.trim()) { setActionToast({ tone: 'warning', title: 'Shipping origin required', message: 'Provide shipping origin.' }); setTimeout(() => setActionToast(null), 2600); return }
      if (!productDraft.deliveryWindowKenya.trim() || !productDraft.deliveryWindowInternational.trim()) { setActionToast({ tone: 'warning', title: 'Delivery window required', message: 'Provide delivery timelines.' }); setTimeout(() => setActionToast(null), 2600); return }
      setProductFormStep(4); return
    }
    if (productFormStep === 4) {
      if (!productDraft.photoURL.trim()) { setActionToast({ tone: 'warning', title: 'Photo required', message: 'Add a product photo.' }); setTimeout(() => setActionToast(null), 2600); return }
      setProductFormStep(5); return
    }
    if (!name) { setActionToast({ tone: 'warning', title: 'Name required', message: 'Enter a product name.' }); setTimeout(() => setActionToast(null), 2600); return }

    const resolvedId = editingProductId || `product-${Date.now()}`
    const quantity = Number(productDraft.quantity || 0)
    const productionCost = Number(productDraft.productionCost || 0)
    const wholesalePrice = Number(productDraft.wholesalePrice || 0)
    const shippingCost = Number(productDraft.shippingCost || 0)

    const nextProduct = { id: resolvedId, name, alias: productDraft.alias.trim(), code: normalizedCode || `PRD-${String(myArtProducts.length + 1).padStart(3, '0')}`, quantity: Number.isFinite(quantity) ? quantity : 0, metaTags, iconName: productDraft.iconName, inStock: Boolean(productDraft.inStock), showOnWebsite: Boolean(productDraft.showOnWebsite), productionCost: Number.isFinite(productionCost) ? productionCost : 0, wholesalePrice: Number.isFinite(wholesalePrice) ? wholesalePrice : 0, sellingPrice: Number.isFinite(sellingPrice) ? sellingPrice : 0, onOffer: Boolean(productDraft.onOffer), offerPrice: Number.isFinite(offerPrice) ? offerPrice : 0, taxInclusive: Boolean(productDraft.taxInclusive), shippingOrigin: productDraft.shippingOrigin.trim(), shippingMethod: productDraft.shippingMethod, shippingCost: Number.isFinite(shippingCost) ? shippingCost : 0, deliveryWindowKenya: productDraft.deliveryWindowKenya.trim(), deliveryWindowInternational: productDraft.deliveryWindowInternational.trim(), deliveryWindow: productDraft.deliveryWindowKenya.trim(), photoURL: productDraft.photoURL.trim(), description, active: Boolean(productDraft.active), sellerId: user?.uid || '', sellerName: creatorName, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }

    setMyArtProducts((prev) => { if (!editingProductId) return [nextProduct, ...prev]; return prev.map((p) => (p.id === editingProductId ? nextProduct : p)) })

    if (user?.uid) {
      const { id, ...productData } = nextProduct
      setDoc(doc(db, 'users', user.uid, 'products', nextProduct.id), productData, { merge: true }).catch(console.error)
      setDoc(doc(db, 'marketProducts', getMarketProductDocId(user.uid, nextProduct.id)), buildPublicMarketProduct(nextProduct, user.uid, creatorName), { merge: true }).catch(console.error)
    }

    setEditingProductId(''); setProductCodeManuallyEdited(false); setProductDraft(createEmptyProductDraft()); setProductFormStep(1); setActiveSection('my-art')
    setActionToast(editingProductId ? { tone: 'success', title: 'Listing updated', message: `${name} was updated.` } : { tone: 'success', title: 'Listing added', message: `${name} is now in your marketplace.` })
    setTimeout(() => setActionToast(null), 2600)
  }

  // ── PROFILE HANDLERS ──
  const handleProfilePhotoUpload = async (event) => {
    if (!user?.uid) return
    const file = event.target.files?.[0]; event.target.value = ''
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setProfileMessage('Please choose an image smaller than 2MB.'); return }
    try {
      setProfileSaving(true)
      const photoURL = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(); r.readAsDataURL(file) })
      localStorage.setItem(getProfilePhotoKey(user.uid), String(photoURL || ''))
      setProfileDraft((prev) => ({ ...prev, photoURL: String(photoURL || '') }))
      setProfileMessage('Profile picture saved on this device.')
    } catch { setProfileMessage('Could not save profile picture.') }
    finally { setProfileSaving(false) }
  }

  const handleProfilePhotoDelete = async () => {
    if (!user?.uid) return
    if (!window.confirm('Remove your profile picture?')) return
    try {
      setProfileSaving(true)
      localStorage.removeItem(getProfilePhotoKey(user.uid))
      await setDoc(doc(db, 'users', user.uid), { photoURL: '', updatedAt: new Date().toISOString() }, { merge: true })
      await updateProfile(auth.currentUser, { photoURL: '' })
      setProfileDraft((prev) => ({ ...prev, photoURL: '' }))
      setProfileMessage('Profile picture removed.')
    } catch { setProfileMessage('Could not remove profile picture.') }
    finally { setProfileSaving(false) }
  }

  const handleProfileSave = async () => {
    if (!user?.uid) return
    const firstName = profileDraft.firstName.trim(); const lastName = profileDraft.lastName.trim()
    if (!firstName) { setProfileMessage('First name is required.'); return }
    try {
      setProfileSaving(true)
      const isLocalPhoto = String(profileDraft.photoURL || '').startsWith('data:')
      const cloudSafePhoto = isLocalPhoto ? '' : (profileDraft.photoURL || '')
      await setDoc(doc(db, 'users', user.uid), { firstName, lastName, secondName: lastName, photoURL: cloudSafePhoto, updatedAt: new Date().toISOString() }, { merge: true })
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}`.trim(), photoURL: cloudSafePhoto })
      setProfileMessage('Profile updated successfully.')
    } catch { setProfileMessage('Could not save profile details.') }
    finally { setProfileSaving(false) }
  }

  const handlePasswordUpdate = async () => {
    if (!auth.currentUser) return
    if (!passwordForm.currentPassword || !passwordForm.newPassword) { setSecurityMessage('Enter both current and new password.'); return }
    if (passwordForm.newPassword.length < 6) { setSecurityMessage('New password should be at least 6 characters.'); return }
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email || '', passwordForm.currentPassword)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, passwordForm.newPassword)
      setPasswordForm({ currentPassword: '', newPassword: '' })
      setSecurityMessage('Password updated successfully.')
    } catch { setSecurityMessage('Password update failed. Confirm your current password.') }
  }

  const handleLogoutClick = async () => {
    if (!window.confirm('Are you sure you want to log out?')) return
    await logout(); navigate('/')
  }

  const handleDeleteAccount = async () => {
    if (!user?.uid || !auth.currentUser) return
    if (!window.confirm('Delete your account permanently? This cannot be undone.')) return
    if (!window.confirm('Final confirmation: delete your account and all creator data?')) return
    try {
      await Promise.all([deleteDoc(doc(db, 'users', user.uid)).catch(() => null)])
      localStorage.removeItem(getProfilePhotoKey(user.uid))
      await deleteUser(auth.currentUser)
      navigate('/')
    } catch { setSecurityMessage('Delete failed. You may need to log in again first.') }
  }

  return (
    <div className={`creator-dashboard ${settingsPrefs.darkMode ? 'creator-dashboard--dark' : ''}`}>
      {/* ── MOBILE TOPBAR ── */}
      <div className='creator-mobile-topbar'>
        <button type='button' className='creator-mobile-menu-btn' onClick={() => setSidebarOpen(true)} aria-label='Open navigation' aria-expanded={sidebarOpen}>
          <span /><span /><span />
        </button>
        <div className='creator-mobile-topbar-copy'>
          <strong>Creator Dashboard</strong>
          <span>{creatorName}</span>
        </div>
      </div>

      {sidebarOpen && <button type='button' className='creator-sidebar-overlay' aria-label='Close navigation' onClick={() => setSidebarOpen(false)} />}

      <div className='creator-shell'>
        {/* ── SIDEBAR ── */}
        <aside className={`creator-sidebar ${sidebarOpen ? 'creator-sidebar--open' : ''}`}>
          <div className='creator-sidebar-mobile-head'>
            <div className='creator-sidebar-mobile-copy'>
              <strong>Navigate</strong>
              <span>Switch sections</span>
            </div>
            <button type='button' className='creator-sidebar-close' onClick={() => setSidebarOpen(false)}>Close</button>
          </div>
          <button className='creator-back-btn' onClick={() => navigate('/')}>
            <FiChevronLeft aria-hidden='true' /><span>Back to Website</span>
          </button>
          <div className='creator-sidebar-brand'>
            <img src='/images/magicaal-logo1-removebg-preview.png' alt='Magical Africa logo' />
            <h2>Creator Dashboard</h2>
          </div>
          <div className='creator-nav-groups'>
            <div className='creator-nav-group'>
              <button className={`creator-nav-group-title ${activeSection === 'my-art' || activeSection === 'my-art-add' ? 'active' : ''}`} onClick={() => openSection('my-art')}>
                My Art &amp; Products
              </button>
            </div>
            <div className='creator-nav-group'>
              <button className={`creator-nav-group-title ${activeSection === 'notifications' ? 'active' : ''}`} onClick={() => openSection('notifications')}>
                Notifications
              </button>
            </div>
            <div className='creator-nav-group'>
              <button className={`creator-nav-group-title ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => openSection('profile')}>
                Profile
              </button>
            </div>
            <div className='creator-nav-group'>
              <button className={`creator-nav-group-title ${activeSection === 'settings' ? 'active' : ''}`} onClick={() => openSection('settings')}>
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className='creator-main'>
          {myArtSyncError && (
            <div className='creator-panel' role='status' aria-live='polite' style={{ borderColor: 'rgba(179,38,30,0.35)', backgroundColor: 'rgba(179,38,30,0.08)', marginBottom: 12 }}>
              <p style={{ margin: 0, color: '#9b1b1b', fontWeight: 700 }}>{myArtSyncError}</p>
            </div>
          )}

          {/* ── GREETING ── */}
          <div className='creator-greeting'>
            <div className='creator-greeting-top'>
              <div><h3>Welcome, <span className='creator-name-highlight'>{creatorName}</span></h3></div>
              <div className='creator-top-actions'>
                <button className='creator-top-stat' type='button' onClick={() => openSection('my-art')}>
                  {myArtProducts.length} listing{myArtProducts.length === 1 ? '' : 's'} in your store
                </button>
                <button className='creator-alert-bell' type='button' onClick={() => openSection('notifications')}>
                  <FiBell aria-hidden='true' />
                  {unseenCount > 0 && <span>{unseenCount}</span>}
                </button>
                <div className='creator-profile-menu' ref={profileMenuRef}>
                  <button className='creator-profile-trigger' type='button' onClick={() => setProfileMenuOpen((prev) => !prev)} aria-expanded={profileMenuOpen}>
                    {profileDraft.photoURL
                      ? <img src={profileDraft.photoURL} alt='Profile' className='creator-avatar-thumb' />
                      : <span className='creator-avatar-fallback'>{avatarInitials || 'C'}</span>}
                  </button>
                  {profileMenuOpen && (
                    <div className='creator-profile-dropdown'>
                      <p className='creator-profile-name'>{creatorName}</p>
                      <p className='creator-profile-email'>{user?.email || 'No email on file'}</p>
                      <button type='button' onClick={() => { openSection('profile'); setProfileMenuOpen(false) }}><strong>Profile</strong><small>View your account details</small></button>
                      <button type='button' onClick={() => { openSection('settings'); setProfileMenuOpen(false) }}><strong>Settings</strong><small>Security, sync &amp; notifications</small></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── MY ART ── */}
          {activeSection === 'my-art' && (
            <section className='creator-panel creator-art-panel'>
              <h1>My Art &amp; Products</h1>
              <div className='creator-art-head'>
                <div>
                  <h2>Manage your marketplace listings</h2>
                  <p>{myArtProducts.length} product{myArtProducts.length === 1 ? '' : 's'} listed</p>
                </div>
                <div className='creator-art-actions'>
                  <button type='button' className='creator-art-add-btn' onClick={startCreateProduct}>
                    <FiPlus aria-hidden='true' /> Add listing
                  </button>
                </div>
              </div>
              {actionToast && (
                <article className={`creator-inline-toast creator-inline-toast--${actionToast.tone || 'success'}`}>
                  <h3>{actionToast.title}</h3><p>{actionToast.message}</p>
                </article>
              )}
              <div className='creator-art-table-wrap'>
                <div className='creator-art-toolbar'>
                  <label className='creator-art-search'>
                    <input type='text' value={productSearchTerm} onChange={(e) => setProductSearchTerm(e.target.value)} placeholder='Search listings' />
                    <FiSearch aria-hidden='true' />
                  </label>
                </div>
                <div className='creator-art-table'>
                  <div className='creator-art-row creator-art-row--head'>
                    <span>Product</span><span>Code</span><span>Qty</span><span>In Stock</span><span>Active</span><span>Actions</span>
                  </div>
                  {filteredMyArtProducts.length === 0
                    ? (<div className='creator-art-empty'><p>No listings yet. Add your first product to get started.</p></div>)
                    : filteredMyArtProducts.map((product, index) => (
                      <div key={product.id} className='creator-art-row'>
                        <span className='creator-art-product-cell'>
                          <span>{index + 1}.</span>
                          {product.iconName
                            ? <img src={product.iconName} alt={`${product.name || 'Product'} icon`} className='creator-art-product-icon' />
                            : <span className='creator-art-product-icon creator-art-product-icon--placeholder'>•</span>}
                          <span>{product.name}</span>
                        </span>
                        <span>{product.code}</span>
                        <span>{product.quantity || 0}</span>
                        <span className='creator-art-status-check'>{product.inStock ? '✓' : '—'}</span>
                        <span className='creator-art-status-check'>{product.active ? '✓' : '—'}</span>
                        <span className='creator-art-actions-cell'>
                          <button type='button' className='creator-art-action-icon' onClick={() => setViewingProduct(product)} aria-label={`View ${product.name}`}><FiEye aria-hidden='true' /></button>
                          <button type='button' className='creator-art-action-icon' onClick={() => handleEditProduct(product)} aria-label={`Edit ${product.name}`}><FiEdit2 aria-hidden='true' /></button>
                          <button type='button' className='creator-art-action-icon creator-art-action-icon--danger' onClick={() => setDeletingProduct(product)} aria-label={`Delete ${product.name}`}><FiTrash2 aria-hidden='true' /></button>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

          {/* ── ADD / EDIT PRODUCT ── */}
          {activeSection === 'my-art-add' && (
            <section className='creator-panel creator-art-panel creator-art-create-panel'>
              <div className='creator-art-create-head'>
                <h1>{editingProductId ? 'Edit Listing' : 'Add Listing'}</h1>
                <div className='creator-art-create-head-actions'>
                  <button type='button' className='creator-art-back-btn' onClick={() => { setEditingProductId(''); setProductCodeManuallyEdited(false); setProductDraft(createEmptyProductDraft()); setProductFormStep(1); setActiveSection('my-art') }}>Back to Listings</button>
                  <button type='button' className='creator-art-close-btn' onClick={() => { setEditingProductId(''); setProductCodeManuallyEdited(false); setProductDraft(createEmptyProductDraft()); setProductFormStep(1); setActiveSection('my-art') }} aria-label='Close'><FiX aria-hidden='true' /></button>
                </div>
              </div>
              <div className='creator-art-stepper'>
                {['Product Info', 'Pricing', 'Shipping', 'Photo', 'Review'].map((label, i) => (
                  <span key={label} className={productFormStep === i + 1 ? 'active' : productFormStep > i + 1 ? 'done' : ''}>{i + 1} {label}</span>
                ))}
              </div>
              {actionToast && (
                <article className={`creator-inline-toast creator-inline-toast--${actionToast.tone || 'success'}`}>
                  <h3>{actionToast.title}</h3><p>{actionToast.message}</p>
                </article>
              )}
              <form className='creator-art-form creator-art-form-page' onSubmit={handleCreateProduct}>
                {productFormStep === 1 && (
                  <>
                    <label><span>Name <em className='creator-required'>*</em></span><input type='text' value={productDraft.name} onChange={(e) => setProductDraft((prev) => ({ ...prev, name: e.target.value }))} placeholder='e.g. Handwoven Basket' /></label>
                    <label><span>Alias</span><input type='text' value={productDraft.alias} onChange={(e) => setProductDraft((prev) => ({ ...prev, alias: e.target.value }))} placeholder='Short alias' /></label>
                    <label><span>Code <em className='creator-required'>*</em></span><input type='text' value={productDraft.code} onChange={(e) => { const v = e.target.value; setProductCodeManuallyEdited(Boolean(v.trim())); setProductDraft((prev) => ({ ...prev, code: v })) }} placeholder='Auto-generated' /></label>
                    <label><span>Icon URL</span><input type='url' value={productDraft.iconName} onChange={(e) => setProductDraft((prev) => ({ ...prev, iconName: e.target.value }))} placeholder='https://example.com/icon.png' /></label>
                    <div className='creator-art-icon-upload'>
                      <input ref={productIconInputRef} type='file' accept='image/png,image/jpeg,image/webp,image/svg+xml' onChange={handleProductIconUpload} hidden />
                      <button type='button' className='creator-art-back-btn' onClick={() => productIconInputRef.current?.click()}><FiUpload aria-hidden='true' /> Upload Icon</button>
                      {productDraft.iconName ? <img src={productDraft.iconName} alt='Icon preview' className='creator-art-icon-preview' /> : <span className='creator-art-icon-hint'>No icon selected.</span>}
                    </div>
                    <label className='creator-art-active-toggle'><input type='checkbox' checked={productDraft.inStock} onChange={(e) => setProductDraft((prev) => ({ ...prev, inStock: e.target.checked }))} /><span>In stock?</span></label>
                    <label className='creator-art-active-toggle'><input type='checkbox' checked={productDraft.showOnWebsite} onChange={(e) => setProductDraft((prev) => ({ ...prev, showOnWebsite: e.target.checked }))} /><span>Show on website?</span></label>
                    <label><span>Quantity</span><input type='number' min='0' value={productDraft.quantity} onChange={(e) => setProductDraft((prev) => ({ ...prev, quantity: e.target.value }))} placeholder='0' /></label>
                    <label><span>Tags</span><input type='text' value={productDraft.metaTags} onChange={(e) => setProductDraft((prev) => ({ ...prev, metaTags: e.target.value }))} placeholder='comma separated' /></label>
                    <label className='creator-art-form-wide'><span>Description <em className='creator-required'>*</em></span><textarea rows='4' value={productDraft.description} onChange={(e) => setProductDraft((prev) => ({ ...prev, description: e.target.value }))} placeholder='Describe your artwork or product' /></label>
                    <label className='creator-art-active-toggle'><input type='checkbox' checked={productDraft.active} onChange={(e) => setProductDraft((prev) => ({ ...prev, active: e.target.checked }))} /><span>Active listing</span></label>
                    <div className='creator-art-form-actions'><button type='submit' className='creator-art-save-btn'>Next</button></div>
                  </>
                )}
                {productFormStep === 2 && (
                  <>
                    <label><span>Production Cost (USD)</span><input type='number' min='0' step='0.01' value={productDraft.productionCost} onChange={(e) => setProductDraft((prev) => ({ ...prev, productionCost: e.target.value }))} placeholder='0.00' /></label>
                    <label><span>Wholesale Price (USD)</span><input type='number' min='0' step='0.01' value={productDraft.wholesalePrice} onChange={(e) => setProductDraft((prev) => ({ ...prev, wholesalePrice: e.target.value }))} placeholder='0.00' /></label>
                    <label><span>Selling Price (USD) <em className='creator-required'>*</em></span><input type='number' min='0' step='0.01' value={productDraft.sellingPrice} onChange={(e) => setProductDraft((prev) => ({ ...prev, sellingPrice: e.target.value }))} placeholder='0.00' /></label>
                    <label className='creator-art-active-toggle'><input type='checkbox' checked={productDraft.onOffer} onChange={(e) => setProductDraft((prev) => ({ ...prev, onOffer: e.target.checked }))} /><span>On offer?</span></label>
                    <label><span>Offer Price (USD)</span><input type='number' min='0' step='0.01' value={productDraft.offerPrice} onChange={(e) => setProductDraft((prev) => ({ ...prev, offerPrice: e.target.value }))} placeholder='0.00' /></label>
                    <label className='creator-art-active-toggle'><input type='checkbox' checked={productDraft.taxInclusive} onChange={(e) => setProductDraft((prev) => ({ ...prev, taxInclusive: e.target.checked }))} /><span>Price is tax inclusive?</span></label>
                    <div className='creator-art-form-actions creator-art-form-actions--between'><button type='button' className='creator-art-back-btn' onClick={() => setProductFormStep(1)}>Previous</button><button type='submit' className='creator-art-save-btn'>Next</button></div>
                  </>
                )}
                {productFormStep === 3 && (
                  <>
                    <label><span>Shipping Origin <em className='creator-required'>*</em></span><input type='text' value={productDraft.shippingOrigin} onChange={(e) => setProductDraft((prev) => ({ ...prev, shippingOrigin: e.target.value }))} placeholder='e.g. Nairobi, Kenya' /></label>
                    <label><span>Shipping Method</span><select value={productDraft.shippingMethod} onChange={(e) => setProductDraft((prev) => ({ ...prev, shippingMethod: e.target.value }))}><option value='standard'>Standard</option><option value='express'>Express</option><option value='pickup'>Pickup</option></select></label>
                    <label><span>Shipping Cost (USD)</span><input type='number' min='0' step='0.01' value={productDraft.shippingCost} onChange={(e) => setProductDraft((prev) => ({ ...prev, shippingCost: e.target.value }))} placeholder='0.00' /></label>
                    <label><span>Delivery Window (Kenya) <em className='creator-required'>*</em></span><input type='text' value={productDraft.deliveryWindowKenya} onChange={(e) => setProductDraft((prev) => ({ ...prev, deliveryWindowKenya: e.target.value }))} placeholder='e.g. 2-3 business days' /></label>
                    <label><span>Delivery Window (International) <em className='creator-required'>*</em></span><input type='text' value={productDraft.deliveryWindowInternational} onChange={(e) => setProductDraft((prev) => ({ ...prev, deliveryWindowInternational: e.target.value }))} placeholder='e.g. 7-14 business days' /></label>
                    <div className='creator-art-form-actions creator-art-form-actions--between'><button type='button' className='creator-art-back-btn' onClick={() => setProductFormStep(2)}>Previous</button><button type='submit' className='creator-art-save-btn'>Next</button></div>
                  </>
                )}
                {productFormStep === 4 && (
                  <>
                    <label className='creator-art-form-wide'><span>Product Photo URL <em className='creator-required'>*</em></span><input type='url' value={productDraft.photoURL} onChange={(e) => setProductDraft((prev) => ({ ...prev, photoURL: e.target.value }))} placeholder='https://example.com/photo.jpg' /></label>
                    <div className='creator-art-icon-upload'>
                      <input ref={productPhotoInputRef} type='file' accept='image/png,image/jpeg,image/webp,image/avif' onChange={handleProductPhotoUpload} hidden />
                      <button type='button' className='creator-art-back-btn' onClick={() => productPhotoInputRef.current?.click()}><FiUpload aria-hidden='true' /> Upload Photo</button>
                      <span className='creator-art-icon-hint'>Paste a URL or upload from device.</span>
                    </div>
                    <div className='creator-art-form-wide creator-art-photo-preview'>
                      {productDraft.photoURL ? <img src={productDraft.photoURL} alt={productDraft.name || 'Preview'} /> : <div className='creator-art-photo-placeholder'>Paste a photo URL to preview.</div>}
                    </div>
                    <div className='creator-art-form-actions creator-art-form-actions--between'><button type='button' className='creator-art-back-btn' onClick={() => setProductFormStep(3)}>Previous</button><button type='submit' className='creator-art-save-btn'>Next</button></div>
                  </>
                )}
                {productFormStep === 5 && (
                  <>
                    <div className='creator-art-form-wide creator-art-summary'>
                      <h3>Review Listing</h3>
                      <p><strong>Name:</strong> {productDraft.name || 'Not provided'}</p>
                      <p><strong>Code:</strong> {productDraft.code.trim().toUpperCase() || 'Auto-generated'}</p>
                      <p><strong>Selling Price:</strong> {formatUsd(productDraft.sellingPrice)}</p>
                      <p><strong>Shipping:</strong> {productDraft.shippingMethod}</p>
                      <p><strong>Delivery (Kenya):</strong> {productDraft.deliveryWindowKenya || 'Not provided'}</p>
                      <p><strong>Delivery (International):</strong> {productDraft.deliveryWindowInternational || 'Not provided'}</p>
                      <p><strong>Status:</strong> {productDraft.active ? 'Active' : 'Inactive'}</p>
                    </div>
                    <div className='creator-art-form-actions creator-art-form-actions--between'><button type='button' className='creator-art-back-btn' onClick={() => setProductFormStep(4)}>Previous</button><button type='submit' className='creator-art-save-btn'>Save Listing</button></div>
                  </>
                )}
              </form>
            </section>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeSection === 'notifications' && (
            <section className='creator-panel'>
              <h1><FiBell /> Notifications</h1>
              {notifications.length === 0
                ? <p className='creator-empty'>No notifications yet. Check back here for updates about your listings and orders.</p>
                : (
                  <>
                    <div className='creator-notification-topbar'>
                      <span aria-live='polite'>{unseenCount} unread</span>
                      <button type='button' onClick={markAllRead}>Mark all as read</button>
                    </div>
                    <div className='creator-notification-list'>
                      {notifications.map((item) => {
                        const isUnread = toMs(item.createdAt) > toMs(announcementSeenAt)
                        return (
                          <article key={item.id} className={`creator-notification-card ${isUnread ? 'unread' : ''}`} tabIndex={0}>
                            <h3>{item.title || 'Notification'}{isUnread && <span className='creator-unread-dot'>New</span>}</h3>
                            <p>{item.message || 'No message.'}</p>
                            <small>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Just now'}</small>
                          </article>
                        )
                      })}
                    </div>
                  </>
                )}
            </section>
          )}

          {/* ── PROFILE ── */}
          {activeSection === 'profile' && (
            <section className='creator-panel'>
              <h1>Profile</h1>
              {profileMessage && <p className='creator-profile-message'>{profileMessage}</p>}
              {securityMessage && <p className='creator-profile-message creator-profile-message-warning'>{securityMessage}</p>}
              <div className='creator-account-wrap'>
                <div className='creator-account-row'>
                  <div className='creator-account-avatar'>
                    {profileDraft.photoURL ? <img src={profileDraft.photoURL} alt='Profile' /> : <span>{avatarInitials || 'C'}</span>}
                  </div>
                  <div className='creator-account-avatar-copy'><h3>Profile picture</h3><p>PNG, JPEG or WEBP under 2MB (saved on this device)</p></div>
                  <div className='creator-account-avatar-actions'>
                    <input ref={profilePhotoInputRef} type='file' accept='image/png,image/jpeg,image/webp' onChange={handleProfilePhotoUpload} hidden />
                    <button type='button' onClick={() => profilePhotoInputRef.current?.click()} disabled={profileSaving}><FiUpload aria-hidden='true' /> Upload</button>
                    <button type='button' onClick={handleProfilePhotoDelete} disabled={profileSaving}>Delete</button>
                  </div>
                </div>
                <div className='creator-account-group'>
                  <h3>Full name</h3>
                  <div className='creator-account-grid'>
                    <label><span>First name <em className='creator-required'>*</em></span><input type='text' value={profileDraft.firstName} onChange={(e) => setProfileDraft((prev) => ({ ...prev, firstName: e.target.value }))} placeholder='First name' /></label>
                    <label><span>Last name</span><input type='text' value={profileDraft.lastName} onChange={(e) => setProfileDraft((prev) => ({ ...prev, lastName: e.target.value }))} placeholder='Last name' /></label>
                  </div>
                  <button type='button' className='creator-account-save-btn' onClick={handleProfileSave} disabled={profileSaving}>Save profile</button>
                </div>
                <div className='creator-account-group'><h3>Contact email</h3><p>Email used for account communication.</p><div className='creator-account-email'>{user?.email || 'No email on file'}</div></div>
                <div className='creator-account-group'>
                  <h3>Password</h3><p>Update your current password.</p>
                  <div className='creator-account-grid'>
                    <label><span>Current password <em className='creator-required'>*</em></span><input type='password' value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))} placeholder='Current password' /></label>
                    <label><span>New password <em className='creator-required'>*</em></span><input type='password' value={passwordForm.newPassword} onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))} placeholder='New password' /></label>
                  </div>
                  <button type='button' className='creator-account-save-btn' onClick={handlePasswordUpdate}>Update password</button>
                </div>
                <div className='creator-account-group'>
                  <h3>Account security</h3>
                  <div className='creator-account-danger-zone'>
                    <button type='button' className='creator-security-btn' onClick={handleLogoutClick}><FiLogOut aria-hidden='true' /> Logout</button>
                    <button type='button' className='creator-security-btn creator-security-btn-danger' onClick={handleDeleteAccount}><FiTrash2 aria-hidden='true' /> Delete my account</button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── SETTINGS ── */}
          {activeSection === 'settings' && (
            <section className='creator-panel'>
              <h1>Settings</h1>
              <div className='creator-settings-grid'>
                <article className='creator-settings-card'>
                  <h3>Notifications</h3>
                  <label className='creator-setting-row'>
                    <div><strong>Push notifications</strong><p>Receive updates about your listings and orders.</p></div>
                    <input type='checkbox' checked={settingsPrefs.notifications} onChange={(e) => setSettingsPrefs((prev) => ({ ...prev, notifications: e.target.checked }))} />
                  </label>
                </article>
                <article className='creator-settings-card'>
                  <h3>Sync</h3>
                  <label className='creator-setting-row'>
                    <div><strong>Cloud sync</strong><p>Sync your dashboard data across devices.</p></div>
                    <input type='checkbox' checked={settingsPrefs.cloudSync} onChange={(e) => setSettingsPrefs((prev) => ({ ...prev, cloudSync: e.target.checked }))} />
                  </label>
                </article>
                <article className='creator-settings-card'>
                  <h3>Appearance</h3>
                  <label className='creator-setting-row'>
                    <div><strong>Dark mode</strong><p>Switch between light and dark mode.</p></div>
                    <input type='checkbox' checked={settingsPrefs.darkMode} onChange={(e) => setSettingsPrefs((prev) => ({ ...prev, darkMode: e.target.checked }))} />
                  </label>
                </article>
              </div>
            </section>
          )}

          {/* ── VIEW PRODUCT DIALOG ── */}
          {viewingProduct && (
            <div className='creator-art-dialog-overlay' role='dialog' aria-modal='true' aria-label='Product details'>
              <article className='creator-art-dialog'>
                <header><h3>{viewingProduct.name || 'Product Details'}</h3></header>
                <div className='creator-art-dialog-body'>
                  {viewingProduct.photoURL && <img src={viewingProduct.photoURL} alt={viewingProduct.name || 'Product'} className='creator-art-dialog-image' />}
                  <p><strong>Code:</strong> {viewingProduct.code || 'N/A'}</p>
                  <p><strong>Quantity:</strong> {viewingProduct.quantity || 0}</p>
                  <p><strong>Selling Price:</strong> {formatUsd(viewingProduct.sellingPrice)}</p>
                  <p><strong>Shipping Origin:</strong> {viewingProduct.shippingOrigin || 'N/A'}</p>
                  <p><strong>Delivery (Kenya):</strong> {viewingProduct.deliveryWindowKenya || viewingProduct.deliveryWindow || 'N/A'}</p>
                  <p><strong>Delivery (International):</strong> {viewingProduct.deliveryWindowInternational || 'N/A'}</p>
                  <p><strong>Description:</strong> {viewingProduct.description || 'No description'}</p>
                </div>
                <footer className='creator-art-dialog-actions'><button type='button' className='creator-art-back-btn' onClick={() => setViewingProduct(null)}>Close</button></footer>
              </article>
            </div>
          )}

          {/* ── DELETE DIALOG ── */}
          {deletingProduct && (
            <div className='creator-art-dialog-overlay' role='dialog' aria-modal='true' aria-label='Delete listing'>
              <article className='creator-art-dialog creator-art-dialog--danger'>
                <header><h3>Delete Listing</h3></header>
                <div className='creator-art-dialog-body'>
                  <p>Are you sure you want to delete <strong>{deletingProduct.name || 'this listing'}</strong>?</p>
                  <p>This action cannot be undone.</p>
                </div>
                <footer className='creator-art-dialog-actions'>
                  <button type='button' className='creator-art-back-btn' onClick={() => setDeletingProduct(null)}>Cancel</button>
                  <button type='button' className='creator-art-save-btn creator-art-save-btn--danger' onClick={handleDeleteProduct}>Delete</button>
                </footer>
              </article>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default CreatorDashboard