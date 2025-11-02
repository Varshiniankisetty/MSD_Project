import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>🏠 CommUnityCare</h2>
          <p>Building stronger apartment communities through smart maintenance management. We connect residents, property managers, and maintenance teams for efficient issue resolution and better living experiences.</p>

          <div className="social-icons">
            <a href="#" aria-label="Facebook" title="Follow us on Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" title="Follow us on Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" title="Follow us on Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" title="Connect with us on LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>🏢 Quick Access</h3>
          <ul>
            <li><a href="/">🏡 Home</a></li>
            <li><a href="/services">🔧 Services</a></li>
            <li><a href="/complaint">📝 Submit Issue</a></li>
            <li><a href="/feedback">💬 Feedback</a></li>
            <li><a href="/profile">👤 My Profile</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>📞 Get In Touch</h3>
          <p><i className="fas fa-envelope"></i> Email: support@communitycare.com</p>
          <p><i className="fas fa-phone"></i> Phone: +91-9876543210</p>
          <p><i className="fas fa-map-marker-alt"></i> Address: 123 Community Ave, Apartment District</p>

          <div className="newsletter">
            <h4>📧 Stay Updated</h4>
            <p className="newsletter-subtitle">Get notified about community updates and maintenance schedules</p>
            <div className="newsletter-form">
              <input type="email" placeholder="your@email.com" />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 CommUnityCare. Building Better Communities Together.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#support">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;