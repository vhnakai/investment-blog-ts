import axios from 'axios';

const api = axios.create({
  baseURL: 'https://herokuinvestmentblog.herokuapp.com',
});
api.defaults.withCredentials = true;

export default api;
