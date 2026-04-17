import axios from "axios";

// Createing shared Axios instance for the whole app.
// Keeping the base URL in one place and makes the code easier to maintain.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//axios - when you make an HTTP request using axios, it returns a promise that resolves to the response of the request. You can use async/await syntax to handle these promises in a more readable way, as seen in the various service functions where we await the response from the API calls.
export default api;
