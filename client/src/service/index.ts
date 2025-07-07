import axios from "axios";
import { store } from '../app/store'; // adjust path as needed
// import { logout } from '../features/userSlice'; // adjust path as needed

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
  withCredentials: true,
});

// Axios response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("token expired")
    ) {
      localStorage.removeItem("token");
    //   store.dispatch(logout()); // This will clear Redux state and trigger UI changes
      // Optionally, use a navigation method (e.g., react-router) to redirect without reload
      // navigate('/login');
    }
    return Promise.reject(error);
  }
);
