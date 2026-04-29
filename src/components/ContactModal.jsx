import { useState, useEffect } from 'react';
import '../styles/contact-modal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Simulate sending — wire to EmailJS or Formspree later
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="cm-backdrop" onClick={handleClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
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
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Amina Osei"
                  value={form.name}
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