import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import { formatPrice } from "../../utils/helpers";
import "./Dashboard.css";

export default function AdminDashboard() {
  const { products, orders } = useProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const lowStockProducts = products.filter((p) => p.stockQty < 30);
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="page admin-page" id="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back! Here's what's happening with your store.</p>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card glass-card">
            <div
              className="metric-icon"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}
            >
              <Package size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-value">{totalProducts}</span>
              <span className="metric-label">Total Products</span>
            </div>
          </div>
          <div className="metric-card glass-card">
            <div
              className="metric-icon"
              style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6" }}
            >
              <ShoppingCart size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-value">{totalOrders}</span>
              <span className="metric-label">Total Orders</span>
            </div>
          </div>
          <div className="metric-card glass-card">
            <div
              className="metric-icon"
              style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
            >
              <DollarSign size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-value">{formatPrice(totalRevenue)}</span>
              <span className="metric-label">Total Revenue</span>
            </div>
          </div>
          <div className="metric-card glass-card">
            <div
              className="metric-icon"
              style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
            >
              <AlertTriangle size={22} />
            </div>
            <div className="metric-info">
              <span className="metric-value">{pendingOrders}</span>
              <span className="metric-label">Pending Orders</span>
            </div>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-section glass-card">
            <div className="section-top">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <Link to="/admin/products" className="quick-action-card">
                <span className="qa-icon">📦</span>
                <div>
                  <strong>Manage Products</strong>
                  <p>Add, edit, or remove products</p>
                </div>
                <ArrowRight size={16} />
              </Link>
              <Link to="/admin/orders" className="quick-action-card">
                <span className="qa-icon">🚚</span>
                <div>
                  <strong>Manage Orders</strong>
                  <p>View and update order statuses</p>
                </div>
                <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="quick-action-card">
                <span className="qa-icon">🛒</span>
                <div>
                  <strong>View Store</strong>
                  <p>See how customers see your store</p>
                </div>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="admin-section glass-card">
            <div className="section-top">
              <h2>
                <AlertTriangle size={18} />
                Low Stock Alerts
              </h2>
              <span className="badge badge-danger">
                {lowStockProducts.length}
              </span>
            </div>
            {lowStockProducts.length > 0 ? (
              <div className="low-stock-list">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="low-stock-item">
                    <span>{p.emoji}</span>
                    <span className="ls-name">{p.name}</span>
                    <span
                      className="ls-qty"
                      style={{ color: p.stockQty < 10 ? "#EF4444" : "#F59E0B" }}
                    >
                      {p.stockQty} left
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-alerts">✅ All products are well-stocked!</p>
            )}
          </div>
        </div>

        <div className="admin-section glass-card recent-orders-section">
          <div className="section-top">
            <h2>
              <TrendingUp size={18} />
              Recent Orders
            </h2>
            <Link to="/admin/orders" className="btn btn-ghost btn-sm">
              View All
            </Link>
          </div>
          {recentOrders.length > 0 ? (
            <div className="recent-orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
              </div>
              {recentOrders.map((order) => (
                <div key={order.id} className="table-row">
                  <span className="order-id-cell">{order.id}</span>
                  <span>{order.userName}</span>
                  <span>{order.items?.length || 0} items</span>
                  <span className="total-cell">{formatPrice(order.total)}</span>
                  <span className={`status-cell status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-alerts">
              No orders yet. They'll appear here when customers place orders.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
