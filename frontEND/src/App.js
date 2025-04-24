// frontend/src/App.js
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import "./App.css"; // Assure-toi d'importer ton CSS global

function AppContent() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("Utilisateur connecté :", user);
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      {/* Wrapper sans marge top */}
      <div className="content-wrapper">
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
