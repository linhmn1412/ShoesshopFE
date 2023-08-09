import axios from "axios";
export const BASE_URL = "http://127.0.0.1:8000/api/v1";
const api = axios.create({
  baseURL:  `${BASE_URL}`,
});

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default api;