import { createContext, useContext, useReducer, useEffect } from 'react';
import defaultProducts from '../data/products';
import { generateProductId, generateOrderId } from '../utils/helpers';

const ProductContext = createContext(null);

function getInitialProducts() {
  const saved = localStorage.getItem('freshbasket_products');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // corrupted
    }
  }
  localStorage.setItem('freshbasket_products', JSON.stringify(defaultProducts));
  return defaultProducts;
}

function getInitialOrders() {
  const saved = localStorage.getItem('freshbasket_orders');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // corrupted
    }
  }
  return [];
}

function productReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? { ...o, status: action.payload.status } : o
        ),
      };

    default:
      return state;
  }
}

export  function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, null, () => ({
    products: getInitialProducts(),
    orders: getInitialOrders(),
  }));

  // Persist products
  useEffect(() => {
    localStorage.setItem('freshbasket_products', JSON.stringify(state.products));
  }, [state.products]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('freshbasket_orders', JSON.stringify(state.orders));
  }, [state.orders]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: generateProductId(),
      rating: product.rating || 4.0,
      reviews: 0,
      inStock: true,
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    return newProduct;
  };

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const placeOrder = (orderData) => {
    const order = {
      ...orderData,
      id: generateOrderId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ORDER', payload: order });
    return order;
  };

  const updateOrderStatus = (id, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
  };

  const getProductsByCategory = (category) => {
    if (!category || category === 'All') return state.products;
    return state.products.filter((p) => p.category === category);
  };

  const searchProducts = (query) => {
    const q = query.toLowerCase();
    return state.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.nameHi && p.nameHi.includes(query)) ||
        p.category.toLowerCase().includes(q)
    );
  };

  const getUserOrders = (userId) => {
    return state.orders.filter((o) => o.userId === userId);
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        orders: state.orders,
        addProduct,
        updateProduct,
        deleteProduct,
        placeOrder,
        updateOrderStatus,
        getProductsByCategory,
        searchProducts,
        getUserOrders,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}

export default ProductContext;