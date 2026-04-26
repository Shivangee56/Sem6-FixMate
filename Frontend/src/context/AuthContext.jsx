import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          const { data } = await authService.getMe();
          setUser(data.data);
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (credentials, type = 'user') => {
    const { data } = await authService.login(credentials, type);
    localStorage.setItem('token', data.token);
    setUser(data.data);
    toast.success('Login successful!');
    return { success: true, type, data: data.data };
  };

  const register = async (userData, type = 'user') => {
    const { data } = await authService.register(userData, type);
    localStorage.setItem('token', data.token);
    setUser(data.data);
    toast.success('Registration successful!');
    return { success: true, type, data: data.data };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
