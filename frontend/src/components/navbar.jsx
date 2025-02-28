import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();

  const handleLogout = () => {
    // Clear any authentication tokens or user data
    logout();
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      <h1 className="text-black text-x1 font-bold"></h1>
      <button onClick={handleLogout} className="bg-black text-white hover:bg-gray-800 py-2 px-4 rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
