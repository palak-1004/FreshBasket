import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Leaf } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <div className="hero-badge">
            <Leaf size={14} />
            <span>Farm Fresh • 100% Natural</span>
          </div>

          <h1 className="hero-title">
            Fresh <span className="gradient-text">Vegetables</span> &{' '}
            <span className="gradient-text-alt">Fruits</span> Delivered to Your Door
          </h1>

          <p className="hero-description">
            Get farm-fresh sabzi and fruits delivered in under 30 minutes. 
            From Palak to Mangoes — we bring the mandii to you. 
            Serving across India with ❤️
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-lg" id="hero-shop-btn">
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <Link to="/shop" className="btn btn-secondary btn-lg" id="hero-browse-btn">
              Browse Categories
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">45+</span>
              <span className="stat-label">Fresh Items</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">30 min</span>
              <span className="stat-label">Delivery</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">₹199</span>
              <span className="stat-label">Min Order</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-emoji-grid">
            <div className="emoji-float e1">🥬</div>
            <div className="emoji-float e2">🍅</div>
            <div className="emoji-float e3">🥭</div>
            <div className="emoji-float e4">🥕</div>
            <div className="emoji-float e5">🍇</div>
            <div className="emoji-float e6">🍋</div>
            <div className="emoji-float e7">🥦</div>
            <div className="emoji-float e8">🍎</div>
            <div className="emoji-float e9">🍌</div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="features-bar container">
        <div className="feature-item glass-card">
          <div className="feature-icon">
            <Truck size={22} />
          </div>
          <div>
            <h4>Free Delivery</h4>
            <p>On orders above ₹499</p>
          </div>
        </div>
        <div className="feature-item glass-card">
          <div className="feature-icon">
            <Clock size={22} />
          </div>
          <div>
            <h4>Express Delivery</h4>
            <p>Within 30 minutes</p>
          </div>
        </div>
        <div className="feature-item glass-card">
          <div className="feature-icon">
            <Shield size={22} />
          </div>
          <div>
            <h4>100% Fresh</h4>
            <p>Quality guaranteed</p>
          </div>
        </div>
        <div className="feature-item glass-card">
          <div className="feature-icon">
            <Leaf size={22} />
          </div>
          <div>
            <h4>Organic Options</h4>
            <p>Chemical-free produce</p>
          </div>
        </div>
      </div>
    </section>
  );
}
