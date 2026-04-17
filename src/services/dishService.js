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

  //formData.append means the key is "title" and the value is dishData.title .  building the form data to send to the backend. The backend expects these fields in the request body, and if an image file is included, it will be handled as multipart/form-data.
  formData.append("title", dishData.title);
  formData.append("description", dishData.description);
  formData.append("price", dishData.price);
  formData.append("category", dishData.category);
  formData.append("isSignature", String(Boolean(dishData.isSignature)));

  if (dishData.image instanceof File) { //if dishData.image is an instance of File (which means it's a file object, not just a URL or string), then we append it to the form data. This allows the backend to receive the image file properly when creating or updating a dish.
    formData.append("image", dishData.image);
  }

  const response = await api.post("/dish", formData, getMultipartAuthConfig()); //multipartauthconfig is used to set the correct headers for the request, including the authorization token and content type for file upload.
  return response.data;
};

export const updateDish = async (dishData) => { //async function to update an existing dish. It takes dishData as an argument, which should include the dish's id and the updated fields. Similar to createDish, it builds a FormData object to send to the backend, allowing for both text fields and an optional image file to be updated.
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

  const response = await api.put("/dish", formData, getMultipartAuthConfig()); // The PUT method is used for updating existing resources. The endpoint "/dish" is the same as for creating a dish, but the backend will differentiate between create and update based on the presence of the "id" field in the form data. The getMultipartAuthConfig() function is used to set the appropriate headers for authentication and content type.
  return response.data;
};

export const deleteDish = async (id) => { //async function to delete a dish by its id. It sends a DELETE request to the backend with the dish's id in the URL. The getAuthConfig() function is used to include the authorization token in the request headers, ensuring that only authenticated users can perform this action.
  const response = await api.delete(`/dish/${id}`, getAuthConfig());
  return response.data;
};

export const toggleDishSignature = async (id) => { //async function to toggle the signature status of a dish. It sends a PATCH request to the backend with the dish's id in the URL. The backend will handle the logic of toggling the signature status (e.g., if it's currently true, it will set it to false, and vice versa). The getAuthConfig() function is used to include the authorization token in the request headers, ensuring that only authenticated users can perform this action.
  const response = await api.patch(
    `/dish/${id}/signature`,
    {},
    getAuthConfig(),
  );
  return response.data;
};
