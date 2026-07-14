import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../styles/academy-signIn.css'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../context/AuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import Footer from '../components/Footer'
import PageSeo from '../components/PageSeo'
import { SEO_CONTENT } from '../utils/seoContent'

const Academy2 = () => {
  
  const [step, setStep] = useState('signup')

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [role, setRole] = useState('')
  const [subject, setSubject] = useState('')
  const [roleLoading, setRoleLoading] = useState(false)
  const [roleError, setRoleError] = useState('')

  const bgImages = [
   '/images/art-image1.jpg',
    '/images/art-image2.jpg',
    '/images/art-image3.jpg',
    '/images/art-image4.jpg',
    '/images/art-image5.jpg',
    '/images/art-image6.jpg',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()

  const handleCreate = async () => {
    if (!firstName || !secondName || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, {
        displayName: `${firstName} ${secondName}`
      })

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        secondName,
        email,
        gender: gender || null,
        role: null,
        subject: null,
        createdAt: new Date().toISOString()
      })

      setSuccess(true)

      setTimeout(() => {
        setStep('role')
      }, 1800)

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRoleContinue = async () => {
    if (!role) {
      setRoleError('Please select an option to continue.')
      return
    }
    if ((role === 'teacher' || role === 'creator') && !subject) {
      setRoleError(role === 'teacher' ? 'Please tell us your subject or expertise.' : 'Please tell us the type of content you create.')
      return
    }

    setRoleLoading(true)
    setRoleError('')

    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        role,
        subject: (role === 'teacher' || role === 'creator') ? subject : null
      })

      if (role === 'teacher') {
        navigate('/teacher-dashboard')
      } else if (role === 'creator') {
        navigate('/creator-dashboard')
      } else {
        navigate('/learner')
      }
    } catch (err) {
      setRoleError('Something went wrong setting up your account. Please try again.')
    } finally {
      setRoleLoading(false)
    }
  }

  return (
    <>
      <PageSeo {...SEO_CONTENT.academySignup} />

      <Navbar solid />

      {step === 'signup' && (
        <div className="academy-signIn">

          {/* Rotating crossfade background */}
          <div className="academy-visual">
            {bgImages.map((img, index) => (
              <div
                key={img}
                className="academy-visual-bg"
                style={{
                  backgroundImage: `url('${img}')`,
                  opacity: index === currentIndex ? 1 : 0
                }}
              />
            ))}
            <div className="academy-visual-overlay">
              <h1>Sign up to <span>learn, teach,</span><br />and create</h1>
            </div>
          </div>

          <div className="academy-form-panel">
            <div className='academy-form'>

              <h1>Create your Account</h1>

              {success && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  border: '1px solid #c3e6cb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  🎉 Your account has been successfully created!
                </div>
              )}

              {error && (
                <div style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  border: '1px solid #f5c6cb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <div className='academy-info1'>
                <div className='academy-info1-a'>
                  <label>First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='John'
                  />
                </div>
                <div className='academy-info1-b'>
                  <label>Last name</label>
                  <input
                    type="text"
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                    placeholder='Doe'
                  />
                </div>
              </div>

              <div className='academy-info2'>
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='johndoe@gmail.com'
                />
              </div>

              <div className='academy-info2'>
                <label>Gender</label>
                <div className="academy-gender-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={gender === 'other'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className='academy-info3' style={{ position: 'relative' }}>
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                />
                <i
                  className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    bottom: '10px',
                    cursor: 'pointer',
                    color: 'rgb(181, 161, 145)'
                  }}
                />
              </div>

              <div className='academy-create'>
                <button onClick={handleCreate} disabled={loading || success}>
                  {loading ? 'Creating Account...' : 'Create your Account'}
                </button>
              </div>

              <div className='academy-or'>
                <hr /><p>Or</p><hr />
              </div>

              <div className='academy-already'>
                <p>Already have an account? <a onClick={() => navigate('/login')}>Sign In</a></p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Step 2: role picker — white background, centered card */}
      {step === 'role' && (
        <div className="academy-role-page">
          <div className="academy-role-card">
            <h2>Welcome, {firstName}!</h2>
            <p>How would you like to use Magical Africa?</p>

            {roleError && (
              <div className="academy-role-error">⚠️ {roleError}</div>
            )}

            <div className="academy-role-options">
              <button
                className={role === 'learner' ? 'academy-role-btn active' : 'academy-role-btn'}
                onClick={() => { setRole('learner'); setRoleError('') }}
              >
                Learner
              </button>
              <button
                className={role === 'teacher' ? 'academy-role-btn active' : 'academy-role-btn'}
                onClick={() => { setRole('teacher'); setRoleError('') }}
              >
                Tutor
              </button>
              <button
                className={role === 'creator' ? 'academy-role-btn active' : 'academy-role-btn'}
                onClick={() => { setRole('creator'); setRoleError('') }}
              >
                Creator
              </button>
            </div>

            {role === 'teacher' && (
              <div className="academy-role-extra">
                <label>Subject / Expertise</label>
                <input
                  type="text"
                  placeholder="e.g. Artisan, Pottery, Language, Woodwork...."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            )}

            {role === 'creator' && (
              <div className="academy-role-extra">
                <label>Type of Content</label>
                <input
                  type="text"
                  placeholder="e.g. Music, Art, Storytelling, Fashion..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            )}

            <button className="academy-role-continue" onClick={handleRoleContinue} disabled={roleLoading}>
              {roleLoading ? 'Setting up your dashboard...' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Academy2