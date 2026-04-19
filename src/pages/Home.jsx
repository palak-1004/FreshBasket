import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { CATEGORIES, CATEGORY_ICONS } from "../data/products";
import "./Home.css";

export default function Home() {
  const { products } = useProducts();

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 8);
  const categories = Object.values(CATEGORIES);

  return (
    <div className="home-page" id="home-page">
      <HeroSection />

      {/* Categories Section */}
      <section className="home-section container">
        <div className="section-header">
          <div className="overline">🛒 Browse by Category</div>
          <h2>Shop by Category</h2>
          <p>Find exactly what you need from our curated categories</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              to={`/shop?category=${encodeURIComponent(cat)}`}
              key={cat}
              className="category-card glass-card"
              id={`home-cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <span className="category-card-icon">{CATEGORY_ICONS[cat]}</span>
              <span className="category-card-name">{cat}</span>
              <span className="category-card-count">
                {products.filter((p) => p.category === cat).length} items
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section container">
        <div className="section-header">
          <div className="overline">🔥 Most Popular</div>
          <h2>Bestsellers</h2>
          <p>Top-selling fresh produce loved by our customers</p>
        </div>

        <div className="products-grid">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="section-action">
          <Link
            to="/shop"
            className="btn btn-secondary btn-lg"
            id="view-all-btn"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="home-section container why-section">
        <div className="section-header">
          <div className="overline">💚 Why FreshBasket?</div>
          <h2>Why Choose Us</h2>
          <p>We are committed to delivering the freshest produce</p>
        </div>

        <div className="why-grid">
          <div className="why-card glass-card">
            <div className="why-emoji">🌾</div>
            <h3>Farm Fresh</h3>
            <p>
              Sourced directly from local farms. No middlemen, no warehouse
              storage.
            </p>
          </div>
          <div className="why-card glass-card">
            <div className="why-emoji">⚡</div>
            <h3>Lightning Fast</h3>
            <p>30-minute express delivery across all major Indian cities.</p>
          </div>
          <div className="why-card glass-card">
            <div className="why-emoji">💰</div>
            <h3>Best Prices</h3>
            <p>
              Mandi prices at your doorstep. Save more with subscription plans.
            </p>
          </div>
          <div className="why-card glass-card">
            <div className="why-emoji">🔄</div>
            <h3>Easy Returns</h3>
            <p>Not satisfied? Get instant refund — no questions asked.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
