import '../styles/african-loader.css'

const AfricanLoader = () => {
  return (
    <div className='african-loader-wrap'>
      <svg width="420" height="300" viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">

        {/* Ground shadow */}
        <ellipse className='al-ground' cx="210" cy="288" rx="160" ry="9" fill="#c8783a" />

        {/* DANCER 1 — left, orange dress */}
        <g className='al-d1'>
          <rect x="-13" y="10" width="26" height="38" rx="6" fill="#D85A30" />
          <circle cx="0" cy="0" r="16" fill="#8B4513" />
          <rect x="-16" y="-16" width="32" height="12" rx="4" fill="#E9A43A" />
          <rect x="-9" y="-21" width="18" height="7" rx="3" fill="#D85A30" />
          <g className='al-arm-l1'>
            <line x1="-13" y1="18" x2="-36" y2="4" stroke="#8B4513" strokeWidth="8" strokeLinecap="round" />
          </g>
          <g className='al-arm-r1'>
            <line x1="13" y1="18" x2="36" y2="6" stroke="#8B4513" strokeWidth="8" strokeLinecap="round" />
          </g>
          <polygon points="-20,48 20,48 32,95 -32,95" fill="#E9A43A" />
          <polygon points="-18,55 -2,55 -10,95 -30,95" fill="#D85A30" opacity="0.5" />
          <polygon points="2,55 18,55 28,95 8,95" fill="#D85A30" opacity="0.5" />
          <g className='al-leg-l1'>
            <line x1="-10" y1="95" x2="-16" y2="128" stroke="#8B4513" strokeWidth="10" strokeLinecap="round" />
          </g>
          <g className='al-leg-r1'>
            <line x1="10" y1="95" x2="18" y2="128" stroke="#8B4513" strokeWidth="10" strokeLinecap="round" />
          </g>
        </g>

        {/* DANCER 2 — right, teal dress */}
        <g className='al-d2'>
          <rect x="-13" y="10" width="26" height="38" rx="6" fill="#1D9E75" />
          <circle cx="0" cy="0" r="16" fill="#7B3F00" />
          <rect x="-16" y="-16" width="32" height="12" rx="4" fill="#F7C547" />
          <rect x="-8" y="-21" width="16" height="7" rx="3" fill="#1D9E75" />
          <g className='al-arm-l2'>
            <line x1="-13" y1="18" x2="-38" y2="10" stroke="#7B3F00" strokeWidth="8" strokeLinecap="round" />
          </g>
          <g className='al-arm-r2'>
            <line x1="13" y1="18" x2="38" y2="-8" stroke="#7B3F00" strokeWidth="8" strokeLinecap="round" />
          </g>
          <polygon points="-20,48 20,48 30,95 -30,95" fill="#F7C547" />
          <polygon points="-16,55 0,55 -6,95 -26,95" fill="#1D9E75" opacity="0.5" />
          <polygon points="4,55 18,55 26,95 10,95" fill="#1D9E75" opacity="0.5" />
          <g className='al-leg-l2'>
            <line x1="-10" y1="95" x2="-18" y2="128" stroke="#7B3F00" strokeWidth="10" strokeLinecap="round" />
          </g>
          <g className='al-leg-r2'>
            <line x1="10" y1="95" x2="14" y2="128" stroke="#7B3F00" strokeWidth="10" strokeLinecap="round" />
          </g>
        </g>

        {/* DRUMMER — center */}
        <g className='al-drummer'>
          <ellipse cx="210" cy="252" rx="28" ry="10" fill="#7B3F00" />
          <rect x="182" y="218" width="56" height="38" rx="6" fill="#A0522D" />
          <ellipse cx="210" cy="218" rx="28" ry="10" fill="#C8863A" />
          <ellipse cx="210" cy="218" rx="22" ry="7" fill="none" stroke="#E9A43A" strokeWidth="2" opacity="0.5" />
          <rect x="196" y="158" width="28" height="36" rx="6" fill="#4A2C0C" />
          <circle cx="210" cy="144" r="15" fill="#8B5E3C" />
          <ellipse cx="210" cy="132" rx="15" ry="8" fill="#2C1A08" />
          <g className='al-stick-r'>
            <line x1="224" y1="168" x2="244" y2="208" stroke="#D4A056" strokeWidth="5" strokeLinecap="round" />
          </g>
          <g className='al-stick-l'>
            <line x1="196" y1="168" x2="176" y2="202" stroke="#D4A056" strokeWidth="5" strokeLinecap="round" />
          </g>
          <line x1="202" y1="194" x2="196" y2="230" stroke="#4A2C0C" strokeWidth="10" strokeLinecap="round" />
          <line x1="218" y1="194" x2="224" y2="230" stroke="#4A2C0C" strokeWidth="10" strokeLinecap="round" />
        </g>

        {/* Sparkles */}
        <circle className='al-sp1' cx="140" cy="130" r="4" fill="#E9A43A" opacity="0.7" />
        <circle className='al-sp2' cx="155" cy="115" r="3" fill="#D85A30" opacity="0.6" />
        <circle className='al-sp3' cx="168" cy="102" r="2.5" fill="#E9A43A" opacity="0.5" />
        <circle className='al-sp4' cx="278" cy="118" r="4" fill="#F7C547" opacity="0.7" />
        <circle className='al-sp5' cx="263" cy="104" r="3" fill="#1D9E75" opacity="0.6" />

      </svg>

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