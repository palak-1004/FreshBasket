import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import {
  formatPrice,
  formatDateTime,
  getOrderStatusConfig,
} from "../../utils/helpers";
import "./OrderManagement.css";

const STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderManagement() {
  const { orders, updateOrderStatus } = useProducts();
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="page admin-page" id="order-management">
      <div className="container">
        <Link to="/admin" className="btn btn-ghost back-btn">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="admin-header">
          <div>
            <h1>Order Management</h1>
            <p>{orders.length} total orders</p>
          </div>
        </div>

        <div className="om-filters">
          <Filter size={16} />
          <button
            className={`filter-pill ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All ({orders.length})
          </button>
          {STATUSES.map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            const config = getOrderStatusConfig(status);
            return (
              <button
                key={status}
                className={`filter-pill ${filterStatus === status ? "active" : ""}`}
                onClick={() => setFilterStatus(status)}
                style={
                  filterStatus === status
                    ? {
                        borderColor: config.color,
                        color: config.color,
                        background: config.bg,
                      }
                    : {}
                }
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">📭</div>
            <h3>No orders found</h3>
            <p>No orders match the selected filter.</p>
          </div>
        ) : (
          <div className="om-orders">
            {filtered.map((order) => {
              const statusConfig = getOrderStatusConfig(order.status);
              return (
                <div
                  key={order.id}
                  className="om-order glass-card"
                  id={`om-order-${order.id}`}
                >
                  <div className="om-order-top">
                    <div>
                      <h3 className="om-order-id">{order.id}</h3>
                      <p className="om-order-date">
                        {formatDateTime(order.createdAt)}
                      </p>
                      <p className="om-order-customer">
                        👤 {order.userName} • {order.address?.city},{" "}
                        {order.address?.state}
                      </p>
                    </div>
                    <div className="om-order-right">
                      <span
                        className="order-status-badge"
                        style={{
                          color: statusConfig.color,
                          background: statusConfig.bg,
                        }}
                      >
                        {statusConfig.label}
                      </span>
                      <span className="om-order-total">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="om-order-items">
                    {order.items?.map((item) => (
                      <span key={item.id} className="om-item-chip">
                        {item.emoji} {item.name} x{item.quantity}
                      </span>
                    ))}
                  </div>

                  <div className="om-order-bottom">
                    <div className="om-order-meta">
                      {order.deliverySlot && (
                        <span>
                          🕐 {order.deliverySlot.label} (
                          {order.deliverySlot.time})
                        </span>
                      )}
                      <span>💳 {order.paymentMethod?.toUpperCase()}</span>
                    </div>

                    <div className="om-status-actions">
                      <label className="om-status-label">Update Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="om-status-select"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {getOrderStatusConfig(s).label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
