// frontend/src/App.js
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import RoutesConfig from "./routes";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./assets/logo.png";
import Navbar from "./pages/Navbar";

function AppContent() {
  const { user, logout } = useContext(AuthContext);
  useEffect(() => {
    console.log("Utilisateur connecté :", user);
  }, [user]);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-4">
        <RoutesConfig />
      </div>
      <footer className="bg-light text-muted pt-5 pb-4">
        <div className="container">© 2025 - Club Sportif</div>
      </footer>
    </BrowserRouter>
  );
}

function App() {
  return (
    console.log("App"),
    (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    )
  );
}

export default App;
