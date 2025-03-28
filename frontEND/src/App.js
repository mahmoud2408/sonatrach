import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoutesConfig from './routes';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import logo from './assets/logo.png';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <BrowserRouter>
      {/* NAVBAR Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        {/* Nom/Logo du site */}
        <a className="navbar-brand d-flex align-items-center nav-col" href="/">
          {/* Logo */}
          <img
            src={logo}
            alt="ASL SONATRACH Logo"
            style={{ width: '30px', marginRight: '8px' }}
          />
          {/* Texte */}
          ASL SONATRACH
        </a>

          {/* Bouton hamburger pour mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Liens de navigation à gauche (Accueil, Activités, Membres, Admin) */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav-col">
                <a className="nav-link nav-col" href="/">
                  {t('navbar.home') /* Par ex. "Accueil" */}
                </a>
              </li>
              <li className="nav-item  ">
                <a className="nav-link nav-col" href="/activities">
                  {t('navbar.activities') /* Par ex. "Activités" */}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-col" href="/members">
                  {t('navbar.members') /* Par ex. "Membres" */}
                </a>
              </li>
              
            </ul>

            {/* Menu de droite */}
            <ul className="navbar-nav ms-auto">
              {/* Dropdown "A propos de nous" */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle nav-col"
                  href="#"
                  id="aboutDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  A propos de nous
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="aboutDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/qui-sommes-nous">
                      Qui sommes-nous ?
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/equipe-sportmember">
                      L’équipe ASL SONATRACH
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/carriere">
                      Carrière
                    </a>
                  </li>
                </ul>
              </li>

              {/* Dropdown "Fonctionnalités" */}
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle nav-col"
                  href="#"
                  id="featuresDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Fonctionnalités
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="featuresDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/calendrier-sportif">
                      Calendrier sportif
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/cotisation-association">
                      Cotisation association
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/site-internet">
                      Site internet association
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/application-sportive">
                      Application sportive
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/boutique-en-ligne">
                      Boutique en ligne
                    </a>
                  </li>
                </ul>
              </li>

              {/* Dropdown Langue */}
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle nav-col"
                  href="#"
                  id="languageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t('navbar.language') /* Par ex. "Langue" */}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="languageDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => changeLanguage('fr')}
                    >
                      FR
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => changeLanguage('en')}
                    >
                      EN
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => changeLanguage('es')}
                    >
                      ES
                    </button>
                  </li>
                </ul>
              </li>

              {/* Bouton "Se connecter" */}
              <li className="nav-item ms-3">
                <a className="btn btn-se-connecter" href="/login">
                  {t('navbar.login')} <span className="ms-1">&raquo;</span>
                </a>
              </li> 

              <li className="nav-item dropdown ms-3">
  <a
    className="nav-link dropdown-toggle text-dark"
    href="#"
    id="userDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-person-fill fs-4"></i>
  </a>
  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
    
    <li>
      <a className="dropdown-item" href="/logout">Se déconnecter</a>
    </li>
  </ul>
</li>

            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <div className="mt-4">
        <RoutesConfig />
      </div>

      {/* FOOTER */}
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
            <a href="/archives" className="text-decoration-none text-muted">
              Archives d'articles
            </a>
          </li>
          <li>
            <a href="/privacy" className="text-decoration-none text-muted">
              Politique de confidentialité
            </a>
          </li>
          <li>
            <a href="/plan-du-site" className="text-decoration-none text-muted">
              Plan du site
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
            <a href="/sites-web-des-clubs" className="text-decoration-none text-muted">
              Sites web des clubs
            </a>
          </li>
          <li>
            <a href="/actualites-du-club" className="text-decoration-none text-muted">
              Actualités du club
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
              Calendrier sportif
            </a>
          </li>
          <li>
            <a href="/cotisation-association" className="text-decoration-none text-muted">
              Cotisation association
            </a>
          </li>
          <li>
            <a href="/site-internet-association" className="text-decoration-none text-muted">
              Site internet association
            </a>
          </li>
          <li>
            <a href="/application-sportive" className="text-decoration-none text-muted">
              Application sportive
            </a>
          </li>
          <li>
            <a href="/logiciel-association-gratuit" className="text-decoration-none text-muted">
              Logiciel association gratuit
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
        <a href="https://facebook.com" className="text-muted me-3">
          <i className="bi bi-facebook fs-4"></i>
        </a>
        <a href="https://instagram.com" className="text-muted me-3">
          <i className="bi bi-instagram fs-4"></i>
        </a>
        <a href="https://twitter.com" className="text-muted me-3">
          <i className="bi bi-twitter fs-4"></i>
        </a>
        <a href="https://youtube.com" className="text-muted me-3">
          <i className="bi bi-youtube fs-4"></i>
        </a>
      </div> 
      
      {/* Copyright */}
      <div className="col-md-4 text-md-end text-center">
        © 2025 - Club Sportif
      </div>
    </div>
  </div>
</footer>

    </BrowserRouter>
  );
}

export default App;
