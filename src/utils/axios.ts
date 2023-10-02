import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config
});

export default instance;
