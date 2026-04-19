
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateOrderId() {
  const prefix = 'FB';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}


export function generateProductId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}


export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}


export function formatDateTime(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


export function getDeliveryCharge(subtotal) {
  if (subtotal >= 499) return 0;
  if (subtotal >= 299) return 29;
  return 49;
}


export function calculateGST(subtotal) {
  return Math.round(subtotal * 0.05);
}


export function calculateOrderTotal(subtotal) {
  const delivery = getDeliveryCharge(subtotal);
  const gst = calculateGST(subtotal);
  return subtotal + delivery + gst;
}


export function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}


export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export function isValidPinCode(pin) {
  return /^[1-9]\d{5}$/.test(pin);
}


export function getStarRating(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
}


export function truncate(str, maxLength = 80) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}


export function getDeliverySlots() {
  return [
    { id: 'morning', label: 'Morning', time: '7:00 AM – 10:00 AM', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM – 3:00 PM', icon: '☀️' },
    { id: 'evening', label: 'Evening', time: '5:00 PM – 8:00 PM', icon: '🌆' },
  ];
}


export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


export function getOrderStatusConfig(status) {
  const config = {
    pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    confirmed: { label: 'Confirmed', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
    processing: { label: 'Processing', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
    shipped: { label: 'Out for Delivery', color: '#14B8A6', bg: 'rgba(20,184,166,0.15)' },
    delivered: { label: 'Delivered', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
    cancelled: { label: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  };
  return config[status] || config.pending;
}
