import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Backoffice from "./pages/Backoffice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
      />
    </>
  );
}

export default App;
