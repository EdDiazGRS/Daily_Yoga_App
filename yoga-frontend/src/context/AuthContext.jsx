import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
      
      // Configure axios to send the token with every request
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      });
      
      const { token, username: userName, id } = response.data;
      
      // Store user data
      const userData = { username: userName, id };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username,
        password
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if you're tracking sessions on the server
      if (localStorage.getItem('token')) {
        await axios.post('http://localhost:8000/api/logout/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear auth header
      delete axios.defaults.headers.common['Authorization'];
      
      // Update state
      setUser(null);
    }
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

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;