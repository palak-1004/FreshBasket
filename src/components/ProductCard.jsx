import { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem, removeItem, getItemQuantity, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const qty = getItemQuantity(product.id);

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = () => {
    if (qty <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, qty - 1);
    }
  };

  return (
    <div className={`product-card glass-card ${isAdding ? 'adding' : ''}`} id={`product-${product.id}`}>
      {/* Badges */}
      <div className="product-badges">
        {product.isOrganic && (
          <span className="badge badge-primary">
            <Leaf size={10} />
            Organic
          </span>
        )}
        {product.isBestseller && (
          <span className="badge badge-secondary">🔥 Bestseller</span>
        )}
      </div>

      {/* Emoji Image */}
      <div className="product-emoji">
        <span>{product.emoji}</span>
      </div>

      {/* Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.nameHi && <p className="product-name-hi">{product.nameHi}</p>}

        <div className="product-rating">
          <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
          <span className="rating-value">{product.rating}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-price-row">
          <div className="product-price">
            <span className="price-value">{formatPrice(product.price)}</span>
            <span className="price-unit">/{product.unit}</span>
          </div>

          {qty === 0 ? (
            <button
              className="add-btn btn btn-primary btn-sm"
              onClick={handleAdd}
              disabled={!product.inStock}
              id={`add-btn-${product.id}`}
            >
              <ShoppingCart size={14} />
              Add
            </button>
          ) : (
            <div className="qty-controls">
              <button className="qty-btn" onClick={handleDecrement} id={`dec-btn-${product.id}`}>
                <Minus size={14} />
              </button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" onClick={handleIncrement} id={`inc-btn-${product.id}`}>
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>

        {!product.inStock && (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  );
}
