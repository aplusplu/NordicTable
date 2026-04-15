import api from "./api";

export async function signIn(credentials) {
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
