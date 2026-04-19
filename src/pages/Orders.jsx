import { Link } from 'react-router-dom';
import { Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice, formatDateTime, getOrderStatusConfig } from '../utils/helpers';
import './Orders.css';

export default function Orders() {
  const { user } = useAuth();
  const { getUserOrders } = useProducts();
  const orders = getUserOrders(user.id);

  if (orders.length === 0) {
    return (
      <div className="page orders-page" id="orders-page">
        <div className="container">
          <div className="empty-state">
            <div className="emoji">📦</div>
            <h3>No orders yet</h3>
            <p>You haven't placed any orders. Start shopping to get fresh produce delivered!</p>
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
    <div className="page orders-page" id="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>

        <div className="orders-list">
          {orders.map((order) => {
            const statusConfig = getOrderStatusConfig(order.status);
            return (
              <div key={order.id} className="order-card glass-card" id={`order-${order.id}`}>
                <div className="order-header">
                  <div>
                    <h3 className="order-id">
                      <Package size={16} />
                      {order.id}
                    </h3>
                    <p className="order-date">{formatDateTime(order.createdAt)}</p>
                  </div>
                  <span
                    className="order-status"
                    style={{ color: statusConfig.color, background: statusConfig.bg }}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="order-item-emoji">{item.emoji}</span>
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">x{item.quantity}</span>
                      <span className="order-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-delivery">
                    {order.deliverySlot && (
                      <span>{order.deliverySlot.icon} {order.deliverySlot.label} ({order.deliverySlot.time})</span>
                    )}
                  </div>
                  <div className="order-total">
                    Total: <strong>{formatPrice(order.total)}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
