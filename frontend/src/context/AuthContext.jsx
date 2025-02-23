import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("accessToken", userData.access_token, { secure: true, sameSite: "Strict" });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
