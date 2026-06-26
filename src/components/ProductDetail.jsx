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
import { potteryData } from '../components/Pottery';
import PageSeo from '../components/PageSeo';
import '../styles/product-detail.css';

export const toSlug = (name = '') =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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

  const pottery = Object.values(potteryData).flatMap((category) =>
  (category.items || []).map((item) => ({
    ...item,
    imageUrl: item.img,
    description: item.desc,
    price: parseFloat(String(item.price).replace(/[^0-9.]/g, '')),
  }))
);

  return [...jewellery, ...carvings, ...artefacts, ...pottery];
};

const fallbackBestSellers = (t) => [
  { id: 'default-1', imageUrl: '/images/maasai-milkgourd.png', name: t('market.bestSellers.item1.name'), price: 49, tribe: 'Maasai', category: 'carvings', description: t('market.bestSellers.item1.description') },
  { id: 'default-2', imageUrl: '/images/kikuyu-calabash.png', name: t('market.bestSellers.item2.name'), price: 35, tribe: 'Kikuyu', category: 'pottery', description: t('market.bestSellers.item2.description') },
  { id: 'default-3', imageUrl: '/images/luo-bul.png', name: t('market.bestSellers.item3.name'), price: 25, tribe: 'Luo', category: 'carvings', description: t('market.bestSellers.item3.description') },
  { id: 'default-4', imageUrl: '/images/kamba-carving.png', name: t('market.bestSellers.item4.name'), price: 30, tribe: 'Kamba', category: 'carvings', description: t('market.bestSellers.item4.description') },
];

// ── Creator data (same list as CreatorProfile) — used to enrich product with image ──
const creatorProducts = {
  'gloria-machoka': [
    { name: 'Soapstone Elephant', price: 45, imageUrl: '/images/artisan-gloria.jpeg', tribe: 'Kisii', description: 'A hand-carved soapstone elephant by Gloria Machoka, crafted using generations-old Kisii stone carving techniques.' },
    { name: 'Carved Tribal Mask', price: 78, imageUrl: '/images/African2.jpg', tribe: 'Kisii', description: 'An intricately carved tribal mask that draws from Gusii ancestral myths and ceremonial traditions.' },
    { name: 'Ancestral Bowl', price: 60, imageUrl: '/images/lorna2.jpeg', tribe: 'Kisii', description: 'A ceremonial bowl carved from Kisii soapstone, used in traditional Gusii rituals.' },
  ],
  'kofi-mensah': [
    { name: 'Akan Stool', price: 120, imageUrl: '/images/African2.jpg', tribe: 'Ashanti', description: 'A traditional Akan stool handcrafted from raw timber by master woodworker Kofi Mensah.' },
    { name: 'Hand-carved Totem', price: 95, imageUrl: '/images/Joel-Makori.jpeg', tribe: 'Ashanti', description: 'A totem carved from African hardwood, embodying the spirit of Akan heritage.' },
  ],
  'naledi-dlamini': [
    { name: 'Earth Fire Vessel', price: 55, imageUrl: '/images/lorna2.jpeg', tribe: 'Zulu', description: 'A hand-coiled Zulu vessel fired in an open earth kiln, creating unique earthy textures.' },
    { name: 'Coiled Ceremonial Pot', price: 80, imageUrl: '/images/artisan-gloria.jpeg', tribe: 'Zulu', description: 'A ceremonial pot shaped using age-old Zulu coiling techniques passed down through generations.' },
  ],
  'tariq-osei': [
    { name: 'Kente Wrap Shirt', price: 65, imageUrl: '/images/Steve.jpeg', tribe: 'Fante', description: 'A contemporary wrap shirt featuring traditional Fante weaving patterns by Tariq Osei.' },
    { name: 'Woven Festival Dress', price: 110, imageUrl: '/images/ima-thomas.jpg', tribe: 'Fante', description: 'A woven festival dress worn at cultural celebrations across West Africa, featured at Accra Fashion Week.' },
  ],
  'zawadi-achieng': [
    { name: 'Identity Canvas I', price: 200, imageUrl: '/images/Edwait.jpeg', tribe: 'Luo', description: 'A mixed-media canvas by Zawadi Achieng combining natural pigments, beads, and reclaimed materials.' },
  ],
  'emeka-eze': [
    { name: 'Igbo Spirit Mask', price: 150, imageUrl: '/images/Joel-Makori.jpeg', tribe: 'Igbo', description: 'A ceremonial Igbo spirit mask carved by Emeka Eze, rooted in ancestral spiritual tradition.' },
    { name: 'Ancestral Figure', price: 220, imageUrl: '/images/African2.jpg', tribe: 'Igbo', description: 'A carved ancestral figure connecting the world of the living to that of the ancestors.' },
  ],
  'fatuma-hassan': [
    { name: 'Embroidered Diric', price: 90, imageUrl: '/images/ima-thomas.jpg', tribe: 'Somali', description: 'A hand-embroidered diric fusing Somali traditions with East African coastal aesthetics.' },
  ],
  'akosua-boateng': [
    { name: 'Adinkra Canvas', price: 185, imageUrl: '/images/cheru.jpeg', tribe: 'Akan', description: 'A bold geometric painting inspired by Adinkra symbols, carrying a philosophical message about resilience.' },
    { name: 'Geometric Textile', price: 70, imageUrl: '/images/artisan-gloria.jpeg', tribe: 'Akan', description: 'A geometric textile by Akosua Boateng featuring patterns drawn from Akan philosophical tradition.' },
  ],
}

// Creator display names for breadcrumb
const creatorNames = {
  'gloria-machoka': 'Gloria Machoka',
  'kofi-mensah': 'Kofi Mensah',
  'naledi-dlamini': 'Naledi Dlamini',
  'tariq-osei': 'Tariq Osei',
  'zawadi-achieng': 'Zawadi Achieng',
  'emeka-eze': 'Emeka Eze',
  'fatuma-hassan': 'Fatuma Hassan',
  'akosua-boateng': 'Akosua Boateng',
}

const ProductDetail = () => {
  // Supports two route shapes:
  //   /market/:category/:productSlug       (marketplace)
  //   /creators/:creatorSlug/:productSlug  (creator profile)
  const { category, creatorSlug, productSlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const isCreatorRoute = Boolean(creatorSlug);

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  useEffect(() => {
    // ── If coming from a creator profile, look up the product locally first ──
    if (isCreatorRoute) {
      const creatorProds = creatorProducts[creatorSlug] || [];
      const match = creatorProds.find((p) => toSlug(p.name) === productSlug);
      if (match) { setProduct(match); setLoading(false); return; }
    }

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
        const products = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.showOnWebsite && p.active);

        const liveMatch = products.find((p) => toSlug(p.name) === productSlug);
        if (liveMatch) { setProduct(liveMatch); setLoading(false); return; }

        const staticProducts = getAllStaticProducts();
        const staticMatch = staticProducts.find((p) => toSlug(p.name) === productSlug);
        if (staticMatch) { setProduct(staticMatch); setLoading(false); return; }

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
  }, [productSlug, creatorSlug, isCreatorRoute, t]);

  const handleBack = () => {
    if (isCreatorRoute) navigate(`/creator/${creatorSlug}`);
    else if (category) navigate(`/market/${category}`);
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

  // ── Build breadcrumb based on which route we're on ──
  const renderBreadcrumb = () => {
    if (isCreatorRoute) {
      const creatorDisplayName = creatorNames[creatorSlug] || creatorSlug
      return (
        <div className="pd-breadcrumb">
          <span onClick={() => navigate('/')} className="pd-crumb">Home</span>
          <span className="pd-crumb-sep">›</span>
          <span onClick={() => navigate('/creator')} className="pd-crumb">Creators</span>
          <span className="pd-crumb-sep">›</span>
          <span onClick={() => navigate(`/creator/${creatorSlug}`)} className="pd-crumb">{creatorDisplayName}</span>
          <span className="pd-crumb-sep">›</span>
          <span className="pd-crumb pd-crumb-active">{product.name}</span>
        </div>
      )
    }

    return (
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
    )
  }

  return (
    <>
      <PageSeo
        title={
          isCreatorRoute
            ? `${creatorNames[creatorSlug] || 'Creator'} | ${product.name}`
            : `Marketplace | ${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'} | ${product.name}`
        }
        description={product.description || 'Hand-crafted by skilled artisans using traditional techniques passed down through generations.'}
        path={isCreatorRoute ? `/creators/${creatorSlug}/${productSlug}` : `/market/${category}/${productSlug}`}
      />

      <div className="pd-page">
        <Navbar solid />

        {renderBreadcrumb()}

        <div className="pd-main">
          <div className="pd-image-side">
            <div className="pd-image-frame">
              <img src={product.imageUrl || '/images/pottery2-image2.png'} alt={product.name} />
            </div>
            <div
              className="pd-tribe-badge"
              onClick={() => product.tribe && navigate(`/tribes/${product.tribe.toLowerCase()}`)}
              style={{ cursor: product.tribe ? 'pointer' : 'default' }}
            >
              <span className="pd-tribe-label">Community</span>
              <span className="pd-tribe-value">{product.tribe || 'African Artisan'}</span>
            </div>
          </div>

          <div className="pd-info-side">
            <span
              className="pd-pill"
              onClick={() => product.tribe && navigate(`/tribes/${product.tribe.toLowerCase()}`)}
              style={{ cursor: product.tribe ? 'pointer' : 'default' }}
            >
              {product.tribe || 'Handcrafted'}
            </span>
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
              ← Back to {isCreatorRoute ? (creatorNames[creatorSlug] || 'Creator') : (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Marketplace')}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;