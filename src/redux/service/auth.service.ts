import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const login = (username, password) => {
  return axios
    .post(API_URL + '/api/v1/user/login', {
      username,
      password
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  return axios.get(API_URL + 'api/v1/user/logout').then((response) => {
    return response.data;
  });
};

const checkAuth = () => {
  return axios
    .get(API_URL + 'api/v1/user/protected')
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  checkAuth
};

export default AuthService;
