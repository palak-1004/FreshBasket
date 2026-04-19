import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit3, Trash2, ArrowLeft, X, Save, Search } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import { CATEGORIES } from "../../data/products";
import { formatPrice } from "../../utils/helpers";
import "./ProductManagement.css";

const emptyProduct = {
  name: "",
  nameHi: "",
  emoji: "🥬",
  category: "",
  price: "",
  unit: "kg",
  description: "",
  stockQty: "",
  isOrganic: false,
  isBestseller: false,
  inStock: true,
};

export default function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(emptyProduct);
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setForm({ ...product });
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSave = () => {
    const productData = {
      ...form,
      price: Number(form.price),
      stockQty: Number(form.stockQty),
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  const isValid = form.name && form.category && form.price && form.unit;

  return (
    <div className="page admin-page" id="product-management">
      <div className="container">
        <Link to="/admin" className="btn btn-ghost back-btn">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="admin-header">
          <div>
            <h1>Product Management</h1>
            <p>{products.length} products in catalog</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={openAdd}
            id="add-product-btn"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="pm-search">
          <Search size={16} className="pm-search-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pm-search-input"
          />
        </div>

        <div className="pm-table-wrapper glass-card">
          <div className="pm-table">
            <div className="pm-header">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {filtered.map((product) => (
              <div
                key={product.id}
                className="pm-row"
                id={`pm-row-${product.id}`}
              >
                <div className="pm-product">
                  <span className="pm-emoji">{product.emoji}</span>
                  <div>
                    <strong>{product.name}</strong>
                    {product.nameHi && <small>{product.nameHi}</small>}
                  </div>
                </div>
                <span className="pm-category">{product.category}</span>
                <span className="pm-price">
                  {formatPrice(product.price)}/{product.unit}
                </span>
                <span
                  className={`pm-stock ${product.stockQty < 30 ? "low" : ""}`}
                >
                  {product.stockQty}
                </span>
                <span>
                  {product.inStock ? (
                    <span className="badge badge-success">In Stock</span>
                  ) : (
                    <span className="badge badge-danger">Out</span>
                  )}
                </span>
                <div className="pm-actions">
                  <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => openEdit(product)}
                    title="Edit"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => setDeleteConfirm(product.id)}
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              id="product-modal"
            >
              <div className="modal-header">
                <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => setShowModal(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g. Palak (Spinach)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Hindi Name</label>
                    <input
                      value={form.nameHi}
                      onChange={(e) => update("nameHi", e.target.value)}
                      placeholder="e.g. पालक"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Emoji Icon</label>
                    <input
                      value={form.emoji}
                      onChange={(e) => update("emoji", e.target.value)}
                      placeholder="🥬"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                    >
                      <option value="">Select category</option>
                      {Object.values(CATEGORIES).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                      placeholder="40"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Unit *</label>
                    <select
                      value={form.unit}
                      onChange={(e) => update("unit", e.target.value)}
                    >
                      <option value="kg">kg</option>
                      <option value="piece">piece</option>
                      <option value="bunch">bunch</option>
                      <option value="dozen">dozen</option>
                      <option value="250g">250g</option>
                      <option value="200g">200g</option>
                      <option value="125g">125g</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      value={form.stockQty}
                      onChange={(e) => update("stockQty", e.target.value)}
                      placeholder="100"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <input
                      type="number"
                      value={form.rating || ""}
                      onChange={(e) => update("rating", e.target.value)}
                      placeholder="4.5"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Product description..."
                    rows={3}
                  />
                </div>

                <div className="form-checkboxes">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.isOrganic}
                      onChange={(e) => update("isOrganic", e.target.checked)}
                    />
                    <span>Organic</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.isBestseller}
                      onChange={(e) => update("isBestseller", e.target.checked)}
                    />
                    <span>Bestseller</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.inStock}
                      onChange={(e) => update("inStock", e.target.checked)}
                    />
                    <span>In Stock</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!isValid}
                  id="save-product-btn"
                >
                  <Save size={16} />
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              id="delete-confirm-modal"
            >
              <h2>Delete Product?</h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-6)",
                }}
              >
                This action cannot be undone. The product will be permanently
                removed from the catalog.
              </p>
              <div className="modal-actions">
                <button
                  className="btn btn-ghost"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteConfirm)}
                  id="confirm-delete-btn"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
