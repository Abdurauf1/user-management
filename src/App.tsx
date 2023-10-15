import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage, LogIn, Register } from "./pages/index";

function App() {
  const isLoggedIn = "true";
  // const isLoggedIn = sessionStorage.getItem("isLoggedIn");
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
