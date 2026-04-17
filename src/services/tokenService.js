import api from "./api";

// Function to sign in a user using a token. This is useful for maintaining user sessions across page reloads. The function sends a POST request to the backend with the token in the request body. The backend will validate the token and return a response indicating whether the token is valid and the user is authenticated. If successful, the response will typically include user information and a new token if needed. If there's an error during this process (e.g., invalid token, expired token), the function catches the error and returns a standardized error response.
export async function signInWithToken(token) {
  try {
    const response = await api.post("/auth/token", { token });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      status: "error",
      message: "Kunne ikke validere token.",
      data: {},
    };
  }
}
