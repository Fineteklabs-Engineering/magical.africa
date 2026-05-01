import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jewelleryData } from '../components/Jewelery';
import { toSlug } from '../components/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/category-page.css';
import { carvingsData } from '../components/Carvings';
import { artefactsData } from '../components/Artefacts';


const allCategoryData = {

  jewellery: jewelleryData,
 carvings: carvingsData,    
  artefacts: artefactsData,  
};

const categoryMeta = {
  jewellery: {
    label: 'Jewellery',
    hero: '/images/african-jewelery.jpg',
    tagline: 'Beads, metals & sacred adornments from across the continent',
  },
  carvings: {
    label: 'Carvings',
    hero: '/images/carvings-image.jpg',
    tagline: 'Wood & stone sculptures carrying centuries of meaning',
  },
  artefacts: {
    label: 'Artefacts',
    hero: '/images/african-painting2.jpg',
    tagline: 'Paintings, portraits and visual art from African masters',
  },
  pottery: {
    label: 'Pottery',
    hero: '/images/african-spices.jpg',
    tagline: 'Hand-shaped clay pieces fired with tradition',
  },
};

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const meta = categoryMeta[category] || { label: category, hero: '/images/side-view-people-garage-sale2.jpg', tagline: '' };
  const rawData = allCategoryData[category] || {};

 
  const allItems = Object.entries(rawData).flatMap(([subCat, items]) =>
    (Array.isArray(items) ? items : items?.items || []).map((item) => ({
      ...item,
      imageUrl: item.image || item.img,
      description: item.description || item.desc,
      subCategory: subCat,
    }))
  );

 
  const subCategories = ['All', ...Object.keys(rawData)];
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? allItems
    : allItems.filter((item) => item.subCategory === activeTab);

  const handleProductClick = (item) => {
    navigate(`/market/${category}/${toSlug(item.name)}`);
  };

  return (
    <>
      <div className="cp-page">
        <Navbar />

        {/* Hero */}
        <div className="cp-hero" style={{ backgroundImage: `url(${meta.hero})` }}>
          <div className="cp-hero-overlay" />
          <div className="cp-hero-content">
            <div className="cp-breadcrumb-hero">
              <span onClick={() => navigate('/')} className="cp-crumb-light">Home</span>
              <span className="cp-crumb-sep">›</span>
              <span onClick={() => navigate('/market')} className="cp-crumb-light">Marketplace</span>
              <span className="cp-crumb-sep">›</span>
              <span className="cp-crumb-light cp-crumb-active">{meta.label}</span>
            </div>
            <h1 className="cp-hero-title">{meta.label}</h1>
            <p className="cp-hero-tagline">{meta.tagline}</p>
            <div className="cp-hero-count">{allItems.length} pieces available</div>
          </div>
        </div>

        {/* Subcategory tabs */}
        {subCategories.length > 2 && (
          <div className="cp-tabs">
            {subCategories.map((tab) => (
              <button
                key={tab}
                className={`cp-tab ${activeTab === tab ? 'cp-tab-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="cp-grid-section">
          {filtered.length === 0 ? (
            <div className="cp-empty">
              <p>No items found in this category yet.</p>
              <button onClick={() => navigate('/market')}>← Back to Marketplace</button>
            </div>
          ) : (
            <div className="cp-grid">
              {filtered.map((item, index) => (
                <div
                  key={index}
                  className="cp-card"
                  onClick={() => handleProductClick(item)}
                >
                  {/* Image */}
                  <div className="cp-card-image">
                    <img src={item.imageUrl || '/images/pottery2-image2.png'} alt={item.name} />
                    <div className="cp-card-overlay" />
                    <span className="cp-card-sub">{item.subCategory}</span>
                  </div>

                  {/* Content */}
                  <div className="cp-card-body">
                    <span className="cp-tribe-pill">{item.tribe || 'African Artisan'}</span>
                    <p className="cp-card-name">{item.name}</p>
                    <p className="cp-card-desc">{item.description || item.desc}</p>

                    <div className="cp-card-footer">
                      <div className="cp-price-block">
                        <span className="cp-price-label">Price</span>
                        <span className="cp-price-value">
                          {typeof item.price === 'number'
                            ? `$${item.price}`
                            : item.price}
                        </span>
                      </div>
                      <button className="cp-view-btn">View →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="cp-back" onClick={() => navigate('/market')}>
          ← Back to Marketplace
        </button>
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;