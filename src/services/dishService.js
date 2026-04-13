import api from "./api";

// Fetching all dishes from the backend.
// backend returns an object like:
// { status: "ok", message: "...", data: [...] }
export const getAllDishes = async () => {
  const response = await api.get("/dishes");
  return response.data;
};

// Fetching only signature dishes for the homepage.
// Using backend query parameter instead of filtering on the frontend.
export const getSignatureDishes = async () => {
  const response = await api.get("/dishes?signature=true");
  return response.data;
};
