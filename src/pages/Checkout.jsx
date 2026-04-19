import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  CreditCard,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import {
  formatPrice,
  getDeliveryCharge,
  calculateGST,
  getDeliverySlots,
  isValidPinCode,
} from "../utils/helpers";
import "./Checkout.css";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useProducts();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [deliverySlot, setDeliverySlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  const delivery = getDeliveryCharge(subtotal);
  const gst = calculateGST(subtotal);
  const total = subtotal + delivery + gst;
  const slots = getDeliverySlots();

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const validateAddress = () => {
    const errs = {};
    if (!address.fullName.trim()) errs.fullName = "Name is required";
    if (!address.phone.trim()) errs.phone = "Phone is required";
    if (!address.line1.trim()) errs.line1 = "Address is required";
    if (!address.city.trim()) errs.city = "City is required";
    if (!address.state.trim()) errs.state = "State is required";
    if (!isValidPinCode(address.pinCode))
      errs.pinCode = "Enter valid 6-digit PIN code";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateAddress()) setStep(2);
    else if (step === 2 && deliverySlot) setStep(3);
  };

  const handlePlaceOrder = () => {
    const order = placeOrder({
      userId: user.id,
      userName: user.name,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        emoji: i.emoji,
        price: i.price,
        unit: i.unit,
        quantity: i.quantity,
      })),
      address,
      deliverySlot: slots.find((s) => s.id === deliverySlot),
      paymentMethod,
      subtotal,
      delivery,
      gst,
      total,
    });
    setOrderPlaced(order);
    clearCart();
  };

  // Order Confirmation
  if (orderPlaced) {
    return (
      <div className="page checkout-page" id="checkout-page">
        <div className="container">
          <div className="order-success animate-scale-in">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Order Placed Successfully! 🎉</h1>
            <p className="order-id">
              Order ID: <strong>{orderPlaced.id}</strong>
            </p>
            <p className="success-text">
              Your fresh vegetables & fruits are being prepared for delivery.
              You'll receive them during your selected time slot.
            </p>
            <div className="success-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/orders")}
              >
                View My Orders
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page" id="checkout-page">
      <div className="container">
        <button
          className="btn btn-ghost back-btn"
          onClick={() => navigate("/cart")}
        >
          <ArrowLeft size={16} /> Back to Cart
        </button>

        <h1 className="checkout-title">Checkout</h1>

        {/* Stepper */}
        <div className="stepper">
          {["Address", "Delivery Slot", "Payment"].map((label, i) => (
            <div
              key={label}
              className={`step ${step > i + 1 ? "completed" : ""} ${step === i + 1 ? "active" : ""}`}
            >
              <div className="step-circle">{step > i + 1 ? "✓" : i + 1}</div>
              <span className="step-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-form glass-card">
            {step === 1 && (
              <div className="checkout-step animate-fade-in" id="step-address">
                <h2>
                  <MapPin size={20} /> Delivery Address
                </h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      placeholder="Full name"
                    />
                    {errors.fullName && (
                      <span className="field-error">{errors.fullName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      placeholder="10-digit number"
                    />
                    {errors.phone && (
                      <span className="field-error">{errors.phone}</span>
                    )}
                  </div>
                  <div className="form-group full-width">
                    <label>Address Line 1</label>
                    <input
                      value={address.line1}
                      onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })
                      }
                      placeholder="House/Flat number, Street"
                    />
                    {errors.line1 && (
                      <span className="field-error">{errors.line1}</span>
                    )}
                  </div>
                  <div className="form-group full-width">
                    <label>Address Line 2 (Optional)</label>
                    <input
                      value={address.line2}
                      onChange={(e) =>
                        setAddress({ ...address, line2: e.target.value })
                      }
                      placeholder="Landmark, Area"
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      placeholder="City"
                    />
                    {errors.city && (
                      <span className="field-error">{errors.city}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      placeholder="State"
                    />
                    {errors.state && (
                      <span className="field-error">{errors.state}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>PIN Code</label>
                    <input
                      value={address.pinCode}
                      onChange={(e) =>
                        setAddress({ ...address, pinCode: e.target.value })
                      }
                      placeholder="6-digit PIN"
                      maxLength={6}
                    />
                    {errors.pinCode && (
                      <span className="field-error">{errors.pinCode}</span>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-lg step-next"
                  onClick={handleNext}
                >
                  Continue to Delivery Slot
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-step animate-fade-in" id="step-slot">
                <h2>
                  <Clock size={20} /> Choose Delivery Slot
                </h2>
                <p className="step-desc">Select your preferred delivery time</p>
                <div className="slots-grid">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      className={`slot-card glass-card ${deliverySlot === slot.id ? "selected" : ""}`}
                      onClick={() => setDeliverySlot(slot.id)}
                    >
                      <span className="slot-icon">{slot.icon}</span>
                      <strong>{slot.label}</strong>
                      <span className="slot-time">{slot.time}</span>
                    </button>
                  ))}
                </div>
                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleNext}
                    disabled={!deliverySlot}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-step animate-fade-in" id="step-payment">
                <h2>
                  <CreditCard size={20} /> Payment Method
                </h2>
                <div className="payment-options">
                  {[
                    {
                      id: "cod",
                      label: "Cash on Delivery",
                      icon: "💵",
                      desc: "Pay when your order arrives",
                    },
                    {
                      id: "upi",
                      label: "UPI",
                      icon: "📱",
                      desc: "GPay, PhonePe, Paytm",
                    },
                    {
                      id: "card",
                      label: "Card",
                      icon: "💳",
                      desc: "Credit / Debit Card",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      className={`payment-option glass-card ${paymentMethod === opt.id ? "selected" : ""}`}
                      onClick={() => setPaymentMethod(opt.id)}
                    >
                      <span className="payment-icon">{opt.icon}</span>
                      <div>
                        <strong>{opt.label}</strong>
                        <small>{opt.desc}</small>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handlePlaceOrder}
                    id="place-order-btn"
                  >
                    Place Order • {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-summary glass-card">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="summary-item-emoji">{item.emoji}</span>
                  <div className="summary-item-info">
                    <span>{item.name}</span>
                    <small>x{item.quantity}</small>
                  </div>
                  <span className="summary-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
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
        </div>
      </div>
    </div>
  );
}
