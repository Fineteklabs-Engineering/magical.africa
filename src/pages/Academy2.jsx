import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/academy-signIn.css'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../context/AuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import Footer from '../components/Footer'
import PageSeo from '../components/PageSeo'
import { SEO_CONTENT } from '../utils/seoContent'

const Academy2 = () => {
  const [role, setRole] = useState('learner')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subject, setSubject] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // const [dob, setDob] = useState('')
  const [success, setSuccess] = useState(false)
  const [tribe, setTribe] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // const dateRef = useRef(null)

  // const openDatePicker = () => {
  //   if (dateRef.current) {
  //     dateRef.current.showPicker()
  //   }
  // }

  const navigate = useNavigate()

  const roleLabel = role === 'learner' ? 'Learner' : role === 'teacher' ? 'Tutor' : 'Creator'

  const handleCreate = async () => {
    // Validation
    if (!firstName || !secondName || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if ((role === 'teacher' || role === 'creator') && !subject) {
      setError('Please enter your subject or type of content.')
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
        tribe: tribe || null,
        gender: gender || null,
        // dob,
        role,
        subject: (role === 'teacher' || role === 'creator') ? subject : null,
        createdAt: new Date().toISOString()
      })

      setSuccess(true)

      setTimeout(() => {
        if (role === 'teacher') {
          navigate('/teacher-dashboard')
        } else if (role === 'creator') {
          navigate('/creator-dashboard')
        } else {
          navigate('/learner')
        }
      }, 2000)

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

  return (
    <>
      <PageSeo {...SEO_CONTENT.academySignup} />

      <Navbar solid />

      <div className="academy-signIn">

        {/* Full-bleed masonry background */}
     {/* Full-bleed masonry background */}
<div className="academy-visual">
  <div className="academy-image-grid">

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/kitenge-latest.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai2.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/pottery1-image1.jpg')" }} />
    </div>

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/african-spices.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/african-learning.png')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/woman-painting.png')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/brassJewellery.jpg')" }} />
    </div>


     <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai2.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/pottery1-image1.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/woman-painting.png')" }} />
    </div>

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/brassJewellery.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai-art2.png')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/orinkaWristCoil.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/kitenge-latest.jpg')" }} />
     
    </div>

   

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/african-learning.png')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/orinkaWristCoil.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai-art2.png')" }} />

    
    </div>

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/kitenge-latest.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/african-spices.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai2.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/pottery1-image1.jpg')" }} />
     
    </div>

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/orinkaWristCoil.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai-art2.png')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/brassJewellery.jpg')" }} />
   
    </div>

    {/* 

    <div className="academy-grid-col">
      <div className="academy-tile" style={{ backgroundImage: "url('/images/african-learning.png')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/kitenge-latest.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/african-spices.jpg')" }} />
      <div className="academy-tile" style={{ backgroundImage: "url('/images/maasai2.jpg')" }} />
    </div>

    */}

  </div>

  <div className="academy-visual-overlay">
    <h1>Sign up to <span>learn, teach,</span><br />and create</h1>
  </div>
</div>
        {/* Floating form card */}
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
                🎉 Your account has been successfully created! Redirecting...
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

            {/* <div className='academy-info2 date-wrapper'>
              <label>Date of Birth</label>
              <div className="date-input-container" onClick={openDatePicker}>
                <input
                  ref={dateRef}
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                <i
                  className="fa-regular fa-calendar calendar-icon"
                  onClick={openDatePicker}
                />
              </div>
            </div> */}

            <div className='academy-info2'>
              <label>Tribe / Ethnic Group</label>
              <input
                type="text"
                value={tribe}
                onChange={(e) => setTribe(e.target.value)}
                placeholder='e.g. Kikuyu, Luo, Maasai, Zulu...'
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

            <div className='academy-info2'>
              <label>Sign up as</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="learner">Learner</option>
                <option value="teacher">Tutor</option>
                <option value="creator">Creator</option>
              </select>
            </div>

            {role === 'teacher' && (
              <div className='academy-info3'>
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
              <div className='academy-info3'>
                <label>Type of Content</label>
                <input
                  type="text"
                  placeholder="e.g. Music, Art, Storytelling, Fashion..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            )}

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
                {loading ? 'Creating Account...' : `Create a ${roleLabel} Account`}
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

      <Footer />
    </>
  )
}

export default Academy2