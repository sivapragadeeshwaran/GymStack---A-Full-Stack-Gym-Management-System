// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      console.log(
        "Initial check - token in localStorage:",
        token ? "Found" : "Not found"
      );

      if (token) {
        setLoading(false);
      } else {
        setAuthUser(null);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Modified login function to handle token
  const login = (user, token) => {
    console.log("=== AUTHCONTEXT LOGIN START ===");
    console.log("User received:", user);
    console.log("Token received:", token);

    if (!token || token === "undefined" || token === "null") {
      console.error("❌ Invalid token received in AuthContext:", token);
      return;
    }

    try {
      // Store token in localStorage
      localStorage.setItem("authToken", token);
      console.log("✅ Token stored in localStorage with key 'authToken'");

      // Verify it was stored
      const storedToken = localStorage.getItem("authToken");
      console.log(
        "Verification - stored token:",
        storedToken ? "✅ Success" : "❌ Failed"
      );
      if (storedToken) {
        console.log(
          "Stored token value (first 10 chars):",
          storedToken.substring(0, 10) + "..."
        );
      }

      // Set token in Zoho SalesIQ visitor attributes if available
      if (
        typeof window !== "undefined" &&
        window.$zoho &&
        window.$zoho.salesiq
      ) {
        if (window.$zoho.salesiq.visitor) {
          try {
            // Use visitor.info instead of visitor.set
            window.$zoho.salesiq.visitor.info({
              authToken: token,
            });
            console.log("✅ Token set in Zoho SalesIQ using visitor.info");
          } catch (e) {
            console.error("❌ Error setting token in Zoho SalesIQ:", e);
          }
        } else {
          console.log("⚠️ Zoho SalesIQ visitor object not available");
        }
      } else {
        console.log("⚠️ Zoho SalesIQ not available");
      }

      setAuthUser(user);
      console.log("✅ authUser state set");
    } catch (e) {
      console.error("❌ Error storing token in localStorage:", e);
    }

    console.log("=== AUTHCONTEXT LOGIN END ===");
  };

  // Modified logout function to handle token
  const logout = async () => {
    try {
      await axiosInstance.post("/api/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Remove token from localStorage
      localStorage.removeItem("authToken");
      console.log("Token removed from localStorage");

      // Remove token from Zoho SalesIQ visitor attributes if available
      if (
        typeof window !== "undefined" &&
        window.$zoho &&
        window.$zoho.salesiq
      ) {
        if (window.$zoho.salesiq.visitor) {
          try {
            // Use visitor.info to remove token
            window.$zoho.salesiq.visitor.info({
              authToken: null,
            });
            console.log("Token removed from Zoho SalesIQ");
          } catch (e) {
            console.error("Error removing token from Zoho SalesIQ:", e);
          }
        }
      }

      setAuthUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        logout,
        loading,
        isAuthenticated: !!authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
