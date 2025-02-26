import axios from "axios";
import { store } from "../../redux/store/Store";

export const API = axios.create({
  baseURL: "http://localhost:5000/users",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
