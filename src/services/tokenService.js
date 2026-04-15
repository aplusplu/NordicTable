import api from "./api";

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
