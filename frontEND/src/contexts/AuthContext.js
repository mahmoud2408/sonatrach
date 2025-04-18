// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Au montage, on vérifie la session et on initialise user avec isMembre
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:5005/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("GET /auth/me →", data);
        if (data.userId) {
          const userData = {
            userId: data.userId,
            role: data.role,
            isMembre: data.isMembre,
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          // Si pas connecté, on vide localStorage
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session :", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    };
    fetchMe();
  }, []);

  const login = (userData) => {
    // userData doit contenir { userId, role, isMembre }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5005/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      Navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
