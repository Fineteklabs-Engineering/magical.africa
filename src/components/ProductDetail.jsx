import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jewelleryData } from '../components/Jewelery';
import { carvingsData } from '../components/Carvings';
import { artefactsData } from '../components/Artefacts';
import PageSeo from '../components/PageSeo';
import { SEO_CONTENT } from '../utils/seoContent';
import '../styles/product-detail.css';

// Helper: convert product name to URL slug
export const toSlug = (name = '') =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Flatten all static component data into one searchable list.
// Add more imports + entries here as you build new components.
const getAllStaticProducts = () => {
  const jewellery = Object.values(jewelleryData).flat().map((item) => ({
    ...item,
    imageUrl: item.image,
    description: item.description || item.desc,
  }));

  const carvings = Object.values(carvingsData).flat().map((item) => ({
    ...item,
    imageUrl: item.img,
    description: item.desc,
    price: parseFloat(String(item.price).replace(/[^0-9.]/g, '')),
  }));

  const artefacts = Object.values(artefactsData).flatMap((category) =>
    (category.items || []).map((item) => ({
      ...item,
      imageUrl: item.img,
      description: item.desc,
    }))
  );

  return [...jewellery, ...carvings, ...artefacts];
};

{/* 
const fallbackBestSellers = (t) => [
  { id: 'default-1', imageUrl: '/images/maasai-milkgourd.png', name: t('market.bestSellers.item1.name'), price: 49, tribe: 'Maasai', description: t('market.bestSellers.item1.description') },
  { id: 'default-2', imageUrl: '/images/kikuyu-calabash.png', name: t('market.bestSellers.item2.name'), price: 35, tribe: 'Kikuyu', description: t('market.bestSellers.item2.description') },
  { id: 'default-3', imageUrl: '/images/luo-bul.png', name: t('market.bestSellers.item3.name'), price: 25, tribe: 'Luo', description: t('market.bestSellers.item3.description') },
  { id: 'default-4', imageUrl: '/images/kamba-carving.png', name: t('market.bestSellers.item4.name'), price: 30, tribe: 'Kamba', description: t('market.bestSellers.item4.description') },
];
*/}

const fallbackBestSellers = (t) => [
  { id: 'default-1', imageUrl: '/images/maasai-milkgourd.png', name: t('market.bestSellers.item1.name'), price: 49, tribe: 'Maasai', category: 'carvings', description: t('market.bestSellers.item1.description') },
  { id: 'default-2', imageUrl: '/images/kikuyu-calabash.png', name: t('market.bestSellers.item2.name'), price: 35, tribe: 'Kikuyu', category: 'pottery', description: t('market.bestSellers.item2.description') },
  { id: 'default-3', imageUrl: '/images/luo-bul.png', name: t('market.bestSellers.item3.name'), price: 25, tribe: 'Luo', category: 'carvings', description: t('market.bestSellers.item3.description') },
  { id: 'default-4', imageUrl: '/images/kamba-carving.png', name: t('market.bestSellers.item4.name'), price: 30, tribe: 'Kamba', category: 'carvings', description: t('market.bestSellers.item4.description') },
];

const ProductDetail = () => {
  const { category, productSlug } = useParams(); // now reads both /market/:category/:productSlug
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  useEffect(() => {
    // Safety net timeout — prevents infinite loading
    const timeout = setTimeout(() => {
      const staticProducts = getAllStaticProducts();
      const staticMatch = staticProducts.find((p) => toSlug(p.name) === productSlug);
      if (staticMatch) { setProduct(staticMatch); setLoading(false); return; }
      const defaults = fallbackBestSellers(t);
      setProduct(defaults.find((p) => toSlug(p.name) === productSlug) || null);
      setLoading(false);
    }, 5000);

    const marketProductsRef = collection(db, 'marketProducts');
    const unsubscribe = onSnapshot(
      marketProductsRef,
      (snapshot) => {
        clearTimeout(timeout);

        // 1. Check Firestore live products
        const products = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.showOnWebsite && p.active);

        const liveMatch = products.find((p) => toSlug(p.name) === productSlug);
        if (liveMatch) { setProduct(liveMatch); setLoading(false); return; }

        // 2. Check all static component data
        const staticProducts = getAllStaticProducts();
        const staticMatch = staticProducts.find((p) => toSlug(p.name) === productSlug);
        if (staticMatch) { setProduct(staticMatch); setLoading(false); return; }

        // 3. Check best seller fallbacks
        const defaults = fallbackBestSellers(t);
        setProduct(defaults.find((p) => toSlug(p.name) === productSlug) || null);
        setLoading(false);
      },
      (error) => {
        clearTimeout(timeout);
        console.error('Failed to load product:', error);
        const staticProducts = getAllStaticProducts();
        const staticMatch = staticProducts.find((p) => toSlug(p.name) === productSlug);
        if (staticMatch) { setProduct(staticMatch); setLoading(false); return; }
        const defaults = fallbackBestSellers(t);
        setProduct(defaults.find((p) => toSlug(p.name) === productSlug) || null);
        setLoading(false);
      }
    );

    return () => { unsubscribe(); clearTimeout(timeout); };
  }, [productSlug, t]);

  // Back navigation — goes to category page if category exists, else marketplace
  const handleBack = () => {
    if (category) navigate(`/market/${category}`);
    else navigate('/market');
  };

  if (loading) {
    return (
     
      <div className="pd-loading-screen">
        <Navbar solid />
        <div className="pd-loading-content">
          <div className="pd-spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    
    );
  }

  if (!product) {
    return (
      <>

   <PageSeo
  title={`Marketplace | ${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'} | ${product.name}`}
  description={product.description || 'Hand-crafted by skilled artisans using traditional techniques passed down through generations.'}
  path={`/market/${category}/${productSlug}`}
/>
        <Navbar solid />
        <div className="pd-not-found">
          <h1>Product not found</h1>
          <p>We could not find what you are looking for.</p>
          <button onClick={handleBack}>← Back</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
  <PageSeo
  title={`Marketplace | ${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'} | ${product.name}`}
  description={product.description || 'Hand-crafted by skilled artisans using traditional techniques passed down through generations.'}
  path={`/market/${category}/${productSlug}`}
/>
      <div className="pd-page">
        <Navbar solid />

        {/* Breadcrumb — now shows category if present */}
        <div className="pd-breadcrumb">
          <span onClick={() => navigate('/')} className="pd-crumb">Home</span>
          <span className="pd-crumb-sep">›</span>
          <span onClick={() => navigate('/market')} className="pd-crumb">Marketplace</span>
          {category && (
            <>
              <span className="pd-crumb-sep">›</span>
              <span onClick={() => navigate(`/market/${category}`)} className="pd-crumb" style={{ textTransform: 'capitalize' }}>{category}</span>
            </>
          )}
          <span className="pd-crumb-sep">›</span>
          <span className="pd-crumb pd-crumb-active">{product.name}</span>
        </div>

        <div className="pd-main">
          <div className="pd-image-side">
            <div className="pd-image-frame">
              <img src={product.imageUrl || '/images/pottery2-image2.png'} alt={product.name} />
            </div>
            <div className="pd-tribe-badge"
            
            onClick={() => product.tribe && navigate(`/tribes/${product.tribe.toLowerCase()}`)}
            style={{ cursor: product.tribe ? 'pointer' : 'default' }}
            >
              <span className="pd-tribe-label">Community</span>
              <span className="pd-tribe-value">{product.tribe || 'African Artisan'}</span>
            </div>
          </div>

          <div className="pd-info-side">
            <span className="pd-pill"
            onClick={() => product.tribe && navigate(`/tribes/${product.tribe.toLowerCase()}`)}
            style={{ cursor: product.tribe ? 'pointer' : 'default' }}
            >{product.tribe || 'Handcrafted'}</span>
            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-price-row">
              <span className="pd-price-label">Price</span>
              <span className="pd-price">{formatPrice(product.price)}</span>
            </div>

            <div className="pd-divider" />

            <div className="pd-description-block">
              <h3>About this piece</h3>
              <p className="pd-description">
                {product.description || 'Hand-crafted by skilled artisans using traditional techniques passed down through generations.'}
              </p>
            </div>

            {product.origin && <div className="pd-meta-row"><span className="pd-meta-key">Origin</span><span className="pd-meta-val">{product.origin}</span></div>}
            {product.material && <div className="pd-meta-row"><span className="pd-meta-key">Material</span><span className="pd-meta-val">{product.material}</span></div>}
            {product.dimensions && <div className="pd-meta-row"><span className="pd-meta-key">Dimensions</span><span className="pd-meta-val">{product.dimensions}</span></div>}

            <div className="pd-divider" />

            <div className="pd-quantity-row">
              <span className="pd-meta-key">Quantity</span>
              <div className="pd-qty-controls">
                <button className="pd-qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span className="pd-qty-value">{quantity}</span>
                <button className="pd-qty-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="pd-btn-cart">Add to Cart</button>
              <button className="pd-btn-wishlist">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M7 12S1.5 8 1.5 4.5a2.8 2.8 0 015.5-.7 2.8 2.8 0 015.5.7C12.5 8 7 12 7 12z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
                Wishlist
              </button>
            </div>

            <button className="pd-back-link" onClick={handleBack}>
              ← Back to {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Marketplace'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;