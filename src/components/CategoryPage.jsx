import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jewelleryData } from '../components/Jewelery';
import { toSlug } from '../components/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/category-page.css';
import { carvingsData } from '../components/Carvings';
import { artefactsData } from '../components/Artefacts';
import { potteryData } from '../components/Pottery';
import PageSeo from '../components/PageSeo';
import { SEO_CONTENT } from '../utils/seoContent';


const allCategoryData = {
  jewellery: jewelleryData,
  carvings: carvingsData,
  artefacts: artefactsData,
  pottery: potteryData
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

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const meta = categoryMeta[category] || {
    label: category,
    hero: '/images/side-view-people-garage-sale2.jpg',
    tagline: '',
  };
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

  // Filter by tab first, then by search query
  const filtered = allItems
    .filter((item) => activeTab === 'All' || item.subCategory === activeTab)
    .filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        item.name?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.tribe?.toLowerCase().includes(q) ||
        item.subCategory?.toLowerCase().includes(q)
      );
    });

  const handleProductClick = (item) => {
    navigate(`/market/${category}/${toSlug(item.name)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>

    <PageSeo
    title={`Marketplace | ${meta.label}`}
    description={meta.tagline}
    path={`/market/${category}`}
    />

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

            {/* Search bar */}
            <form className="cp-search-form" onSubmit={handleSearchSubmit}>
              <div className="cp-search-bar">
                <svg className="cp-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  className="cp-search-input"
                  placeholder={`Search ${meta.label.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="cp-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>
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

        {/* Search result count */}
        {searchQuery && (
          <div className="cp-search-result-info">
            {filtered.length === 0
              ? `No results for "${searchQuery}"`
              : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`}
          </div>
        )}

        {/* Grid */}
        <div className="cp-grid-section">
          {filtered.length === 0 ? (
            <div className="cp-empty">
              <p>
                {searchQuery
                  ? `No products found matching "${searchQuery}".`
                  : 'No items found in this category yet.'}
              </p>
              {searchQuery ? (
                <button onClick={() => setSearchQuery('')}>Clear search</button>
              ) : (
                <button onClick={() => navigate('/market')}>← Back to Marketplace</button>
              )}
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
                          {typeof item.price === 'number' ? `$${item.price}` : item.price}
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