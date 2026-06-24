


import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/accordian-principles.css'

const AccordionPrinciples = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)

  const items = t('accordionPrinciples.items', { returnObjects: true })

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <div className='ap-wrap'>
      {items.map((item, i) => (
        <div
          key={i}
          className={`ap-item ${openIndex === i ? 'ap-item--open' : ''}`}
          onClick={() => toggle(i)}
        >
          <div className='ap-row'>
            <div className='ap-left'>
              <span className='ap-subtitle'>{item.subtitle}</span>
              <h3 className='ap-title'>{item.title}</h3>
            </div>
            <button
              className={`ap-btn ${openIndex === i ? 'ap-btn--open' : ''}`}
              type='button'
              aria-label={openIndex === i ? 'Collapse' : 'Expand'}
            >
              <i className={`fa-solid ${openIndex === i ? 'fa-minus' : 'fa-plus'}`}></i>
            </button>
          </div>

          {openIndex === i && (
            <p className='ap-detail'>{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default AccordionPrinciples