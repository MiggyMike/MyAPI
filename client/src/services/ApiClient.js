import axios from "axios";

const ApiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${window.location.origin}/api`
      : "mongodb://localhost:27017/MyAPI/api",
});

ApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

ApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default ApiClient;
