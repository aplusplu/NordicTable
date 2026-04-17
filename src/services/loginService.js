import api from "./api";

export async function signIn(credentials) { //async function to sign in a user. It sends a POST request to the backend with the user's email and password in the request body. The backend will validate the credentials and return a response indicating whether the login was successful or not. If successful, the response will typically include a token that can be used for authenticated requests in the future. If there's an error during the login process (e.g., network issues, invalid credentials), the function catches the error and returns a standardized error response.
  try {
    const response = await api.post("/auth/signin", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    return {
      status: "error",
      message: "Der opstod en fejl ved login.",
      data: {},
    };
  }
}

// Function to sign in a user using a token. This is useful for maintaining user sessions across page reloads. The function sends a POST request to the backend with the token in the request body. The backend will validate the token and return a response indicating whether the token is valid and the user is authenticated. If successful, the response will typically include user information and a new token if needed. If there's an error during this process (e.g., invalid token, expired token), the function catches the error and returns a standardized error response.
export async function signInWithToken(token) {
  try {
    const response = await api.post("/auth/token", { token });

    return response.data;
  } catch (error) {
    console.error("Token auth error:", error);

    return {
      status: "error",
      message: "Token login fejlede.",
      data: {},
    };
  }
}
