import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🧺</span>
              <span className="logo-text">Fresh<span className="logo-accent">Basket</span></span>
            </Link>
            <p className="footer-tagline">
              Fresh vegetables & fruits delivered to your doorstep. 
              Farm-fresh produce across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/shop">Leafy Greens</Link></li>
              <li><Link to="/shop">Root Vegetables</Link></li>
              <li><Link to="/shop">Tropical Fruits</Link></li>
              <li><Link to="/shop">Seasonal Fruits</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>
                <Phone size={14} />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <Mail size={14} />
                <span>hello@freshbasket.in</span>
              </li>
              <li>
                <MapPin size={14} />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 FreshBasket. Made with <Heart size={13} fill="#EF4444" stroke="#EF4444" /> in India</p>
          <div className="footer-payments">
            <span>We accept:</span>
            <span className="payment-icons">💳 UPI • COD • Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
