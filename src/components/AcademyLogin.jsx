import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../styles/academy-login.css'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { login, getLocalRole } from '../api/authApi' // ⬅️ adjust path to match your project
import { buildLearnerDashboardPath, buildTeacherDashboardPath } from '../utils/dashboardRoute'
import { useAuth } from '../context/AuthContext'
import PageSeo from './PageSeo'
import { SEO_CONTENT } from '../utils/seoContent'
import Footer from '../components/Footer';

const AcademyLogin = () => {
  // NOTE: renamed conceptually to "username" since Milazetu's /authenticate
  // endpoint takes userName + password, not email. Firebase let people log in
  // by email — Milazetu doesn't have that option in what's been shared so far,
  // so this field now collects the username created at signup
  // (firstName + secondName, lowercased, no spaces).
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

   const [showPassword, setShowPassword] = useState(false)


  const bgImages = [
   'https://res.cloudinary.com/gjpfbvzb/image/upload/f_auto,q_auto/art-image1_vctfmx',
    'https://res.cloudinary.com/gjpfbvzb/image/upload/f_auto,q_auto/art-image2_uwvtnt',
    'https://res.cloudinary.com/gjpfbvzb/image/upload/f_auto,q_auto/art-image3_gnlpqp',

    'https://res.cloudinary.com/gjpfbvzb/image/upload/f_auto,q_auto/art-image5_vtsmwk',
    'https://res.cloudinary.com/gjpfbvzb/image/upload/f_auto,q_auto/art-image6_ajkvsx',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()
  const { refreshAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Sign in via Milazetu
      const { token, refresh_token } = await login(username, password)

      // 2. Persist the session the same way axiosConfig.js expects on reload
      localStorage.setItem('ma_token', token)
      localStorage.setItem('ma_refresh_token', refresh_token)
      localStorage.setItem('ma_username', username)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // 3. Role isn't returned by the backend yet — pull it from local storage
      //    (saved during the signup role-picker step). Defaults to learner
      //    if nothing was ever saved for this username.
      const role = getLocalRole(username) || 'learner'

      // Tell AuthContext to re-read localStorage right now, so
      // ProtectedRoute sees a logged-in user before we navigate.
      refreshAuth()

      setSuccess(true)
      setTimeout(() => {
        if (role === 'teacher') {
          navigate(buildTeacherDashboardPath('courses'))
        } else if (role === 'creator') {
          navigate('/creator-dashboard')
        } else {
          navigate(buildLearnerDashboardPath('store'))
        }
      }, 2000)

    } catch (err) {
      console.log('Login error:', err?.response?.status, err?.message)
      const status = err?.response?.status
      if (status === 401 || status === 403) {
        setError('Invalid username or password. Please try again.')
      } else if (status === 404) {
        setError('No account found with this username.')
      } else if (status === 429) {
        setError('Too many failed attempts. Please try again later.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageSeo {...SEO_CONTENT.academyLogin} />
      <Navbar solid />

      <div className="signIn-page">

        {/* Rotating crossfade background */}
        <div className="signIn-visual">
          {bgImages.map((img, index) => (
            <div
              key={img}
              className="signIn-visual-bg"
              style={{
                backgroundImage: `url('${img}')`,
                opacity: index === currentIndex ? 1 : 0
              }}
            />
          ))}
          <div className="signIn-visual-overlay">
            <h1>Welcome <span>back</span><br />Login to Your Account</h1>
          </div>
        </div>

        {/* Floating form card */}
        <div className="signIn-form-panel">
          <div className="signIn-form">

            <h1>Welcome Back</h1>
            <h2>Sign in to your account</h2>

            {/*  Success Message */}
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
                🎉 Logged in successfully! Redirecting...
              </div>
            )}

            {/* ❌ Error Message */}
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

            <form onSubmit={handleSubmit}>

              <div className="signIn-field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="signIn-field" style={{ position: 'relative' }}>
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

              <div className="signIn-forgot">
                <a href="#">Forgot password?</a>
              </div>

              <div className="signIn-submit">
                <button type="submit" disabled={loading || success}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>

            </form>

            <div className="signIn-or">
              <hr />
              <p>Or</p>
              <hr />
            </div>

            <div className="signIn-register">
              <p>Don't have an account? <a onClick={() => navigate('/join')}>Create Account</a></p>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default AcademyLogin