import { useState, useEffect } from 'react';
import { createInquiry } from '../api/inquiryApi';
import { getInquiryTypes } from '../api/inquiryTypeApi';
import '../styles/contact-modal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: '',
    inquiryTypeId: '',
  });
  const [inquiryTypes, setInquiryTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setLoadingTypes(true);
    getInquiryTypes()
      .then((data) => setInquiryTypes(Array.isArray(data) ? data : data?.content || []))
      .catch(() => setInquiryTypes([]))
      .finally(() => setLoadingTypes(false));
  }, [isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.message || !form.inquiryTypeId) return;

    setLoading(true);
    setError(null);
    try {
      await createInquiry({
        title: form.title,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        telephone: form.telephone,
        message: form.message,
        status: 'OPEN',
        inquiryTypeId: form.inquiryTypeId,
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setForm({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        message: '',
        inquiryTypeId: '',
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="cm-backdrop" onClick={handleClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={handleClose}>×</button>

        {!submitted ? (
          <>
            <div className="cm-header">
              <span className="cm-tag">Get in Touch</span>
              <h2>Send us a Message</h2>
              <p>We'd love to hear from you. Fill in the form and we'll get back to you shortly.</p>
            </div>

            <form className="cm-form" onSubmit={handleSubmit}>
              <div className="cm-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. Amina"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cm-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Osei"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cm-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="amina@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cm-field">
                <label htmlFor="telephone">Phone (optional)</label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  placeholder="+254 7xx xxx xxx"
                  value={form.telephone}
                  onChange={handleChange}
                />
              </div>

              <div className="cm-field">
                <label htmlFor="inquiryTypeId">Inquiry Type</label>
                <select
                  id="inquiryTypeId"
                  name="inquiryTypeId"
                  value={form.inquiryTypeId}
                  onChange={handleChange}
                  required
                  disabled={loadingTypes}
                >
                  <option value="">
                    {loadingTypes ? 'Loading...' : 'Select a type'}
                  </option>
                  {inquiryTypes.map((type) => (
                    <option key={type.publicId || type.id} value={type.publicId || type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cm-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="cm-error">{error}</p>}

              <button className="cm-submit" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        ) : (
          <div className="cm-success">
            <div className="cm-success-icon">✓</div>
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. We'll get back to you at <strong>{form.email}</strong> as soon as possible.</p>
            <button className="cm-submit" onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;