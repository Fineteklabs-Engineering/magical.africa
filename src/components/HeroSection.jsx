import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CultureCard from './CultureCard';
import useAcademyNavigation from "../hooks/useAcademyNavigation";

const heroSlides = [
  {
    image: '/images/Igbo2.jpg',
    mobileImage: '/images/Igbo2-mobile.png', // add a mobile-cropped version
    title: 'Magical Africa - The Real African Story',
    subtitle: "Explore Africa's Culture and Heritage",
    name: '(Igbo)',
    flag: '/images/Nigeria-flag.png',
    box: { icon: 'fa-solid fa-mask', label: 'Explore Culture', action: '/tribes' }
  },
  {
    image: '/images/family.png',
    mobileImage: '/images/family-mobile.jpg',
    subtitle: 'Learn African Languages',
    title: 'Develop practical speaking skills from the very beginning',
    name: '(Swahili)',
    flag: '/images/Kenyan-flag.png',
    box: { icon: 'fa-solid fa-comments', label: 'Learn Language', action: 'academy' }
  },
  {
    image: '/images/young-skills.png',
    mobileImage: '/images/young-skills-mobile.png',
    subtitle: 'Learn African Culture & Skills',
    title: 'Discover traditions while building hands-on creative skills',
    name: '(Maasai)',
    flag: '/images/Kenyan-flag.png',
    box: { icon: 'fa-solid fa-hands', label: 'Learn Cultural Skills', action: 'academy' }
  },
  {
    image: '/images/african-market3.jpg',
    mobileImage: '/images/african-market3-mobile.png',
    subtitle: 'Exclusive African Artifacts & Material Marketplace',
    title: 'Shop rare cultural items and traditional craft materials',
    name: '(Igbo)',
    flag: '/images/Nigeria-flag.png',
    box: { icon: 'fa-solid fa-basket-shopping', label: 'Visit Cultural Market', action: '/market' }
  },
  {
    image: '/images/Ai-image.png',
    mobileImage: '/images/Ai-image-mobile.png',
    subtitle: 'AI Language Preservation',
    title: 'Using technology to safeguard Africa\'s linguistic heritage',
    name: '(Zulu)',
    flag: '/images/South-African-flag.png',
    box: { icon: 'fa-solid fa-microchip', label: 'Preserve Africa with AI', action: '/technology' }
  }
];

const HeroSection = ({ children, customContent, backgroundImage, mobileBackgroundImage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const { t } = useTranslation();
  const goToAcademy = useAcademyNavigation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (backgroundImage) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImage]);

  // Preload both desktop and mobile versions so the carousel doesn't flash/lag
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      if (slide.mobileImage) {
        const mobileImg = new Image();
        mobileImg.src = slide.mobileImage;
      }
    });
  }, []);

  const slide = heroSlides[currentSlide];

  const bgImage = backgroundImage
    ? (isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage)
    : (isMobile && slide.mobileImage ? slide.mobileImage : slide.image);

  return (
    <div 
      className="heroSection" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />

      {customContent ? (
        customContent
      ) : (
        <>
          <div className="hero-stuff">
            <div className="hero-text">
              <h1>{slide.subtitle}</h1>
              <p>{slide.title}</p>
            </div>

            <div className="hero-boxes">
              <div
                className="hero-box"
                onClick={() =>
                  slide.box.action === 'academy'
                    ? goToAcademy()
                    : handleNavigation(slide.box.action)
                }
              >
                <i className={slide.box.icon}></i>
                <p>{slide.box.label}</p>
                <i className="fa-solid fa-arrow-right hero-box-arrow"></i>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <span className="community-name">{slide.name}</span>
            {slide.flag && (
              <img src={slide.flag} alt="hero-section-image" className="hero-img" style={{ display: 'block' }} />
            )}
          </div>
        </>
      )}

      {children}
    </div>
  );
};

export default HeroSection;