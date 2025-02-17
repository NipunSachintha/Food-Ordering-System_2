import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pos from "./pages/Pos";
import Kitchen from "./pages/Kitchen";
import Admin from "./pages/Admin";
import MenuManagement from "./pages/adminPages/MenuManagement";
import UserManagement from "./pages/adminPages/UserManagement";
import SalesReports from "./pages/adminPages/SalesReports";
import LogIn from "./pages/logIn";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/menuManagement" element={<MenuManagement />} />
          <Route path="/admin/userManagement" element={<UserManagement />} />
          <Route path="/admin/salesReports" element={<SalesReports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
