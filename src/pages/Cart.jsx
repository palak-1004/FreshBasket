import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice, getDeliveryCharge, calculateGST } from "../utils/helpers";
import "./Cart.css";

export default function Cart() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const { isAuthenticated } = useAuth();

  const delivery = getDeliveryCharge(subtotal);
  const gst = calculateGST(subtotal);
  const total = subtotal + delivery + gst;
  const freeDeliveryRemaining = Math.max(0, 499 - subtotal);

  if (items.length === 0) {
    return (
      <div className="page cart-page" id="cart-page">
        <div className="container">
          <div className="empty-state">
            <div className="emoji">🧺</div>
            <h3>Your basket is empty</h3>
            <p>
              Looks like you haven't added any fresh produce yet. Start shopping
              to fill your basket!
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page" id="cart-page">
      <div className="container">
        <div className="cart-header">
          <div>
            <h1>Your Basket</h1>
            <p className="cart-count">
              {itemCount} item{itemCount !== 1 ? "s" : ""} in basket
            </p>
          </div>
          <button
            className="btn btn-ghost"
            onClick={clearCart}
            id="clear-cart-btn"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Link to="/shop" className="btn btn-ghost back-link">
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          <div className="cart-summary glass-card">
            <h3 className="summary-title">Order Summary</h3>

            {freeDeliveryRemaining > 0 && (
              <div className="free-delivery-banner">
                <p>
                  Add {formatPrice(freeDeliveryRemaining)} more for{" "}
                  <strong>FREE delivery!</strong>
                </p>
                <div className="delivery-progress">
                  <div
                    className="delivery-progress-bar"
                    style={{
                      width: `${Math.min(100, (subtotal / 499) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className={delivery === 0 ? "free" : ""}>
                  {delivery === 0 ? "FREE" : formatPrice(delivery)}
                </span>
              </div>
              <div className="summary-row">
                <span>GST (5%)</span>
                <span>{formatPrice(gst)}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < 199 ? (
              <div className="min-order-warning">
                ⚠️ Minimum order value is ₹199. Add{" "}
                {formatPrice(199 - subtotal)} more.
              </div>
            ) : isAuthenticated ? (
              <Link
                to="/checkout"
                className="btn btn-primary btn-lg checkout-btn"
                id="checkout-btn"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-lg checkout-btn"
                id="login-to-checkout"
              >
                Login to Checkout
                <ArrowRight size={18} />
              </Link>
            )}

            <p className="secure-text">
              🔒 Secure checkout powered by FreshBasket
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
