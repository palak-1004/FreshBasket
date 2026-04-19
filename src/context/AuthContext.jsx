import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

// Default admin account
const DEFAULT_ADMIN = {
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@freshbasket.in',
  phone: '9999999999',
  password: 'admin123',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

function getInitialState() {
  const saved = localStorage.getItem('freshbasket_auth');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
  
    }
  }
  return { user: null, isAuthenticated: false };
}

function getUsers() {
  const saved = localStorage.getItem('freshbasket_users');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
  
    }
  }
  // Initialize with default admin
  const users = [DEFAULT_ADMIN];
  localStorage.setItem('freshbasket_users', JSON.stringify(users));
  return users;
}

function saveUsers(users) {
  localStorage.setItem('freshbasket_users', JSON.stringify(users));
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, null, getInitialState);

  // Persist auth state
  useEffect(() => {
    localStorage.setItem('freshbasket_auth', JSON.stringify(state));
  }, [state]);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    const { password: _, ...safeUser } = user;
    dispatch({ type: 'LOGIN', payload: safeUser });
    return { success: true };
  };

  const signup = ({ name, email, phone, password }) => {
    const users = getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser = {
      id: 'user-' + Date.now().toString(36),
      name,
      email,
      phone,
      password,
      role: 'customer',
      createdAt: new Date().toISOString(),
      addresses: [],
    };
    users.push(newUser);
    saveUsers(users);
    const { password: _, ...safeUser } = newUser;
    dispatch({ type: 'LOGIN', payload: safeUser });
    return { success: true };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (data) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === state.user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data };
      saveUsers(users);
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
    }
  };

  const isAdmin = state.user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, updateProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}


export default AuthContext; 