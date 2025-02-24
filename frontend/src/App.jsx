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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/Unauthorized";

function App() {
  return (
    
    <Router>
      <AuthProvider>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/pos" element={<ProtectedRoute allowedRoles={["cashier"]}><Pos /> </ProtectedRoute> } />
          <Route path="/kitchen" element={<ProtectedRoute allowedRoles={["chef"]}><Kitchen /> </ProtectedRoute> } />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /> </ProtectedRoute> } />
          <Route path="/admin/menuManagement" element={<ProtectedRoute allowedRoles={["admin"]}><MenuManagement /></ProtectedRoute>} />
          <Route path="/admin/userManagement" element={<ProtectedRoute allowedRoles={["admin"]}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/salesReports" element={<ProtectedRoute allowedRoles={["admin"]}><SalesReports /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
