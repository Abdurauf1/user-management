import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminPage, LogIn, NotFound, Profile, Register } from "./pages/index";

function App() {
  const isLoggedIn = !!sessionStorage.getItem("token")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/" element={isLoggedIn ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
