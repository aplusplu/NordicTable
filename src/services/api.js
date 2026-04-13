import axios from "axios";

// Createing shared Axios instance for the whole app.
// Keeping the base URL in one place and makes the code easier to maintain.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
