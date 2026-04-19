# FreshBasket

FreshBasket is a modern e-commerce platform built for fresh grocery shopping. It provides a seamless online experience for users to browse, search, and purchase fresh produce and groceries, with features like user authentication, shopping cart, secure checkout, and an admin dashboard for managing products and orders.

## Features

- **User Authentication**: Secure login and signup functionality with protected routes.
- **Product Browsing**: Browse products by categories with a responsive product grid.
- **Search and Filter**: Advanced search bar and category filters to find products quickly.
- **Shopping Cart**: Add, remove, and manage items in the cart with real-time updates.
- **Order Management**: View order history and track order status.
- **User Profile**: Manage personal information and preferences.
- **Admin Dashboard**: Comprehensive admin panel for product and order management.
- **Responsive Design**: Mobile-friendly interface built with modern CSS.

## Tech Stack

- **Frontend**: React 19, React Router DOM, Vite
- **Icons**: Lucide React
- **Payment**: Razorpay
- **Backend**: Express.js (for API endpoints)
- **Styling**: Custom CSS with responsive design
- **Linting**: ESLint with React-specific rules

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/freshbasket.git
   cd freshbasket
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (default Vite port).

## Usage

- **For Users**:
  - Register or log in to access the platform.
  - Browse products on the Home and Shop pages.
  - Use the search bar or category filters to find specific items.
  - Add products to the cart and proceed to checkout.
  - Complete payment via Razorpay integration.
  - View and track orders in the Orders section.

- **For Admins**:
  - Access the admin dashboard at `/admin/dashboard`.
  - Manage products: add, edit, or remove items.
  - Handle order management: view and update order statuses.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── ...
├── context/             # React contexts for state management
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ...
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Cart.jsx
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   └── ...
│   └── ...
├── data/                # Static data (e.g., products)
├── utils/               # Utility functions
└── assets/              # Static assets
```
