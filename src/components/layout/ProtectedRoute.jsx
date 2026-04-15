import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Read persisted auth data from localStorage.
  // The login flow already saves both token and user after successful sign-in.
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  let user = null;

  try {
    // Parse the stored user safely.
    // If parsing fails, we treat the session as invalid.
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    user = null;
  }

  // Only admins are allowed to access the backoffice route.
  const isAdmin = String(user?.role || "").toLowerCase() === "admin";

  // No token means the user is not authenticated at all.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged-in non-admin users are redirected away from admin-only pages.
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If both token and admin role are present, render the protected page.
  return children;
}

export default ProtectedRoute;
