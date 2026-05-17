import '../styles/african-loader.css'

const AfricanLoader = () => {
  return (
    <div className='african-loader-wrap'>
      <img 
        src="/images/Loading_circles.gif" 
        alt="Loading..." 
        className='al-gif'
      />
      <div className='al-loading-text'>
        <span className='al-loading-label'>Loading</span>
        <span className='al-dot al-dot1'>.</span>
        <span className='al-dot al-dot2'>.</span>
        <span className='al-dot al-dot3'>.</span>
      </div>
    </div>
  )
}

export default AfricanLoader