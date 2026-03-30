import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user_data");
        localStorage.removeItem("selected_role");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
