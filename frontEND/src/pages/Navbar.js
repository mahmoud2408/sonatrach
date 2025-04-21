import React, { useContext, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AboReset from "./AboReset";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../assets/logo.png";

function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    console.log("Utilisateur connecté :", user);
  }, [user]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center nav-col" to="/">
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
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
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

            <AboReset />

            {user && user.role === "entraineur" && (
              <>
                <li className="nav-item ms-3">
                  <Link className="nav-link nav-col" to="/trainer/activities">
                    Mes Activités
                  </Link>
                </li>
              </>
            )}

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
                <li className="nav-item ms-3">
                  <Link className="nav-link nav-col" to="/creer-admin">
                    Créer Admin
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link nav-col" to="/send-mails">
                    emails
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link nav-col" to="/create-trainer">
                    créer entraineur
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item ms-3">
                <button
                  className="btn btn-se-connecter"
                  to="/home"
                  onClick={logout}
                >
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
  );
}

export default Navbar;
