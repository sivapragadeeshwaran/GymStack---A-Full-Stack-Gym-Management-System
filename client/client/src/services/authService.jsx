// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (user,token) => {
    setAuthUser(user);
    localStorage.setItem("user", JSON.stringify(user));
     if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  
const updateAssignedTrainer = (trainerId) => {
  setAuthUser((prev) => {
    const updatedUser = { ...prev, assignedTrainerId: trainerId };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  });
};

const getToken = () => localStorage.getItem("token");
  return (
    <AuthContext.Provider value={{ authUser, login, logout,updateAssignedTrainer, getToken,
        loading,
        isAuthenticated: !!authUser, }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
