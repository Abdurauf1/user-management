import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/Admin";
import LogIn from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn === "true" ? <AdminPage /> : <LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
