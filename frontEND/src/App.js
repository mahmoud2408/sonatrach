// frontend/src/App.js
import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RoutesConfig from "./routes";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./assets/logo.png";

function AppContent() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center nav-col"
            to="/"
          >
            <img
              src={logo}
              alt="ASL SONATRACH Logo"
              style={{ width: "30px", marginRight: "8px" }}
            />
            ASL SONATRACH
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav-col">
                <Link className="nav-link nav-col" to="/">
                  {t("navbar.home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-col" to="/activities">
                  {t("navbar.activities")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-col" to="/members">
                  {t("navbar.members")}
                </Link>
              </li>
              {user && user.role === "admin" && (
                <>
                  <li className="nav-item ms-3">
                    <Link className="nav-link nav-col" to="/admin/activities">
                      Gérer Activités
                    </Link>
                  </li>
                  <li className="nav-item ms-3">
                    <Link className="nav-link nav-col" to="/admin/members">
                      Gérer Membres
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {user ? (
                <li className="nav-item ms-3">
                  <button className="btn btn-se-connecter" onClick={logout}>
                    Se déconnecter
                  </button>
                </li>
              ) : (
                <li className="nav-item ms-3">
                  <Link className="btn btn-se-connecter" to="/login">
                    {t("navbar.login")} <span className="ms-1">&raquo;</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
