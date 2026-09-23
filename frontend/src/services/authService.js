import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const registerUser = (userData) => {
  return API.post("/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/login", userData);
};

const SESSION_KEY = "ownbit_session";

export const saveSession = ({ token, user }) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
};

export const getSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

export const getAuthToken = () => getSession()?.token || null;

export const logout = () => sessionStorage.removeItem(SESSION_KEY);

API.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
