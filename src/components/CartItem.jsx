import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="cart-item glass-card" id={`cart-item-${item.id}`}>
      <div className="cart-item-emoji">
        <span>{item.emoji}</span>
      </div>

      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-unit">{formatPrice(item.price)} / {item.unit}</p>
      </div>

      <div className="cart-item-controls">
        <div className="qty-controls">
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            id={`cart-dec-${item.id}`}
          >
            <Minus size={14} />
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            id={`cart-inc-${item.id}`}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="cart-item-total">
        <span className="item-total-price">{formatPrice(item.price * item.quantity)}</span>
      </div>

      <button
        className="cart-item-remove"
        onClick={() => removeItem(item.id)}
        id={`cart-remove-${item.id}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
