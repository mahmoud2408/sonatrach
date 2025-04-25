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
  <div className="container">
    <div className="row">
      {/* Colonne 1 : SportMember */}
      <div className="col-md-3 mb-3">
        <h5 className="text-dark fw-bold">ASL SONATRACH</h5>
        <ul className="list-unstyled">
          <li>
            <a href="/contact" className="text-decoration-none text-muted">
              Nous contacter
            </a>
          </li>
          <li>
            <a href="/qui-sommes-nous" className="text-decoration-none text-muted">
              Qui sommes-nous ?
            </a>
          </li>
          <li>
            <a href="/carriere" className="text-decoration-none text-muted">
              Carrière
            </a>
          </li>
        
          <li>
            <a href="/privacy" className="text-decoration-none text-muted">
              Politique et confidentialité
            </a>
          </li>
         
        </ul>
      </div>

      {/* Colonne 2 : Aide */}
      <div className="col-md-2 mb-3">
        <h5 className="text-dark fw-bold">Aide</h5>
        <ul className="list-unstyled">
          <li>
            <a href="/faq" className="text-decoration-none text-muted">
              FAQ
            </a>
          </li>
          <li>
            <a href="/regles-des-sports" className="text-decoration-none text-muted">
              Règles des sports
            </a>
          </li>
        </ul>
      </div>

      {/* Colonne 3 : Univers des clubs */}
      <div className="col-md-3 mb-3">
        <h5 className="text-dark fw-bold">Univers des clubs</h5>
        <ul className="list-unstyled">
       
          <li>
            <a href="/actualites-du-club" className="text-decoration-none text-muted">
              Actualitées
            </a>
          </li>
        </ul>
      </div>

      {/* Colonne 4 : Fonctionnalités principales */}
      <div className="col-md-4 mb-3">
        <h5 className="text-dark fw-bold">Fonctionnalités principales</h5>
        <ul className="list-unstyled">
          <li>
            <a href="/calendrier-sportif" className="text-decoration-none text-muted">
              Calendrier Sportif
            </a>
          </li>
      
          <li>
            <a href="/ecom-foot" className="text-decoration-none text-muted">
              Ecom foot
            </a>
          </li>
          <li>
            <a href="/logiciel-reservation-en-ligne" className="text-decoration-none text-muted">
              Logiciel de réservation en ligne
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Ligne du bas : réseaux sociaux, app stores, copyright */}
    <div className="row mt-4 align-items-center">
      {/* Icônes réseaux sociaux (exemple) */}
      <div className="col-md-4 mb-3 mb-md-0">
        <a href="https://web.facebook.com/SONATRACH/?locale=fr_FR&_rdc=1&_rdr#" className="text-muted me-3">
          <i className="bi bi-facebook fs-4"></i>
        </a>
   
        <a href="https://x.com/sonatrach_dz?lang=fr" className="text-muted me-3">
          <i className="bi bi-twitter fs-4"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCNZPL_sNE1nQ2azMKyZX3xQ" className="text-muted me-3">
          <i className="bi bi-youtube fs-4"></i>
        </a>
        
  <a href="https://maps.app.goo.gl/NrV8w7Dd8gN64hHS9" target="_blank" rel="noopener noreferrer" className="text-muted me-3">
    <i className="bi bi-geo-alt fs-4"></i>
  </a>
      </div> 
      
      {/* Copyright */}
      <div className="col-md-4 text-md-end text-center">
  © ASL-SONATRACH {new Date().getFullYear()}
</div>
    </div>
  </div>
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
