import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register user
const register = async (userData: { name: string; email: string; password: string; timeZone?: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  
  if (response.data) {
    localStorage.setItem('token', response.data.data.token);
  }
  
  return {
    user: {
      id: response.data.data.id,
      email: response.data.data.email,
      name: response.data.data.name,
      timeZone: response.data.data.timeZone,
    },
    token: response.data.data.token,
  };
};

// Login user
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  
  if (response.data) {
    localStorage.setItem('token', response.data.data.token);
  }
  
  return {
    user: {
      id: response.data.data.id,
      email: response.data.data.email,
      name: response.data.data.name,
      timeZone: response.data.data.timeZone,
    },
    token: response.data.data.token,
  };
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data.data;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;