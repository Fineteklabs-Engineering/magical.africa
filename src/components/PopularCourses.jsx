import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '../styles/popular-courses.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPublishedCourses } from '../utils/publishedCourses';
import { buildCoursePath } from '../utils/courseRoute';

const CARD_KEYWORDS = {
  pottery: ['pottery', 'ceramic', 'clay'],
  instrumentMaking: ['instrument', 'music', 'drum'],
  weaving: ['weaving', 'textile', 'fabric'],
  cooking: ['cooking', 'food', 'cuisine', 'recipe'],
  woodCarving: ['wood', 'carving', 'sculpture'],
}

const PopularCourses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [publishedCourses, setPublishedCourses] = useState([])

  useEffect(() => {
    getPublishedCourses(20)
      .then(courses => setPublishedCourses(courses))
      .catch(() => setPublishedCourses([]))
  }, [])

  const normalizeRole = (role) => {
    const value = String(role || '').trim().toLowerCase();
    if (value.includes('learner') || value.includes('student')) return 'learner';
    if (value.includes('teacher') || value.includes('tutor')) return 'teacher';
    return '';
  }

  const findCourse = (cardKey) => {
    const keywords = CARD_KEYWORDS[cardKey] || []
    return publishedCourses.find(course =>
      keywords.some(kw =>
        String(course.title || '').toLowerCase().includes(kw) ||
        String(course.description || '').toLowerCase().includes(kw) ||
        String(course.courseType || '').toLowerCase().includes(kw)
      )
    )
  }

  const handleCardClick = (cardKey) => {
    const course = findCourse(cardKey)

    if (!course) {
      alert('This course is not yet published.')
      return
    }

    const resolvedRole = normalizeRole(userData?.role)

    if (user && resolvedRole === 'learner') {
      navigate(buildCoursePath(course.id, course.title))
      return
    }

    navigate(buildCoursePath(course.id, course.title, { preview: true }))
  }

  return (
    <>
      <div className="popular-course-div">

        <h1>{t('popularCourses.title')}</h1>
        <p className='popular-content-div-p'>{t('popularCourses.subtitle')}</p>

        <div className='pop-div'>
          <p className='pop'>{t('popularCourses.popularLabel')}</p>
        </div>

        <div className='popular-div'>

          <div className='popular1 pc-card' onClick={() => handleCardClick('pottery')} style={{ cursor: 'pointer' }}>
            <div className='popular-div-content'>
              <h3>{t('popularCourses.pottery')}</h3>
            </div>
            <div className='pc-overlay'>
              <h3>{t('popularCourses.pottery')}</h3>
              <p>{t('popularCourses.potteryDesc')}</p>
            </div>
          </div>

          <div className='popular2'>
            <div className='popular2-a'>

              <div className='popular2-a1 pc-card' onClick={() => handleCardClick('instrumentMaking')} style={{ cursor: 'pointer' }}>
                <div className='popular-div-content'>
                  <h3>{t('popularCourses.instrumentMaking')}</h3>
                </div>
                <div className='pc-overlay'>
                  <h3>{t('popularCourses.instrumentMaking')}</h3>
                  <p>{t('popularCourses.instrumentMakingDesc')}</p>
                </div>
              </div>

              <div className='popular2-a2 pc-card' onClick={() => handleCardClick('weaving')} style={{ cursor: 'pointer' }}>
                <div className='popular-div-content'>
                  <h3>{t('popularCourses.weaving')}</h3>
                </div>
                <div className='pc-overlay'>
                  <h3>{t('popularCourses.weaving')}</h3>
                  <p>{t('popularCourses.weavingDesc')}</p>
                </div>
              </div>

            </div>

            <div className='popular2-b'>

              <div className='popular2-b1 pc-card' onClick={() => handleCardClick('cooking')} style={{ cursor: 'pointer' }}>
                <div className='popular-div-content'>
                  <h3>{t('popularCourses.cooking')}</h3>
                </div>
                <div className='pc-overlay'>
                  <h3>{t('popularCourses.cooking')}</h3>
                  <p>{t('popularCourses.cookingDesc')}</p>
                </div>
              </div>

              <div className='popular2-b2 pc-card' onClick={() => handleCardClick('woodCarving')} style={{ cursor: 'pointer' }}>
                <div className='popular-div-content'>
                  <h3>{t('popularCourses.woodCarving')}</h3>
                </div>
                <div className='pc-overlay'>
                  <h3>{t('popularCourses.woodCarving')}</h3>
                  <p>{t('popularCourses.woodCarvingDesc')}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className='pop-bottom-div'>
          <p className='pop-bottom' onClick={() => navigate('/academy')}>
            {t('popularCourses.viewMore')}
            <i className="fa-solid fa-arrow-right"></i>
          </p>
        </div>

      </div>
    </>
  )
}

export default PopularCourses