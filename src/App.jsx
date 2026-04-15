import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Backoffice from "./pages/Backoffice";

// Route protection
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <>
      {/*
        Central routing configuration for the application.
        Each Route maps a URL path to a React page component.
      */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />

        {/*
          Protected route:
          Only authenticated users with role "admin" can access /backoffice.
          If not authenticated → redirect to /login
          If not admin → redirect to /
        */}
        <Route
          path="/backoffice"
          element={
            <ProtectedRoute>
              <Backoffice />
            </ProtectedRoute>
          }
        />

        {/* Optional: 404 fallback */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center text-xl">
              404 – Page not found
            </div>
          }
        />
      </Routes>

      {/*
        Global toast notification system.
        Used for success/error feedback across the app (UX requirement).
      */}
      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </>
  );
}

export default App;
