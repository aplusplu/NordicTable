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

// Reading the latest token when a protected request is made.
// This keeps the admin requests in sync with login/logout.
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

// Create/update endpoints use multipart/form-data because the backend
// accepts upload.single("image") through multer.
const getMultipartAuthConfig = () => ({
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

export const createDish = async (dishData) => {
  const formData = new FormData();

  formData.append("title", dishData.title);
  formData.append("description", dishData.description);
  formData.append("price", dishData.price);
  formData.append("category", dishData.category);
  formData.append("isSignature", String(Boolean(dishData.isSignature)));

  if (dishData.image instanceof File) {
    formData.append("image", dishData.image);
  }

  const response = await api.post("/dish", formData, getMultipartAuthConfig());
  return response.data;
};

export const updateDish = async (dishData) => {
  const formData = new FormData();

  formData.append("id", dishData.id);
  formData.append("title", dishData.title);
  formData.append("description", dishData.description);
  formData.append("price", dishData.price);
  formData.append("category", dishData.category);
  formData.append("isSignature", String(Boolean(dishData.isSignature)));

  if (dishData.image instanceof File) {
    formData.append("image", dishData.image);
  }

  const response = await api.put("/dish", formData, getMultipartAuthConfig());
  return response.data;
};

export const deleteDish = async (id) => {
  const response = await api.delete(`/dish/${id}`, getAuthConfig());
  return response.data;
};

export const toggleDishSignature = async (id) => {
  const response = await api.patch(
    `/dish/${id}/signature`,
    {},
    getAuthConfig(),
  );
  return response.data;
};
