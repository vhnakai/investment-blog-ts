import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:5000',
});
api.defaults.withCredentials = true;

export default api;
