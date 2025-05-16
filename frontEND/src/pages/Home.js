import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import bgImage from "../assets/bg.jpg";
import bdImage from "../assets/bd.jpg";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* SECTION HERO - Avec accent sur l'adhésion au club */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="container text-center">
          {/* Titre principal avec animation */}
          <h1 className="display-2 fw-bold animate__animated animate__fadeInDown">
            Club Sportif <span className="text-warning">ASL SONATRACH</span>
          </h1>

          {/* Sous-titre avec la mission */}
          <p
            className="lead fs-4 animate__animated animate__fadeIn animate__delay-1s"
            style={{
              maxWidth: "800px",
              margin: "20px auto",
              display: "block",
              opacity: "0.9",
            }}
          >
            Rejoignez notre communauté sportive et profitez d'activités variées
            dans un cadre exceptionnel
          </p>

          {/* Boutons d'action avec les bonnes routes */}
          <div className="mt-5 animate__animated animate__fadeInUp animate__delay-2s">
            <a
              href="/activities"
              className="btn btn-warning btn-lg me-3 shadow"
              style={{
                padding: "12px 30px",
                borderRadius: "30px",
                fontWeight: "600",
              }}
            >
              <i className="bi bi-calendar-check me-2"></i> Découvrir nos
              activités
            </a>
            <a
              href={user ? "/member" : "/profil"}
              className="btn btn-outline-light btn-lg shadow"
              style={{
                padding: "12px 30px",
                borderRadius: "30px",
                fontWeight: "600",
              }}
            >
              <i
                className={`bi ${
                  user ? "bi-person-circle" : "bi-person-plus"
                } me-2`}
              ></i>
              {user ? "Mon espace membre" : "Créer mon profil"}
            </a>
          </div>
        </div>
      </div>

      {/* SECTION AVANTAGES MEMBRE - Axée sur les bénéfices pour le membre */}
      <div className="container my-5 py-5">
        <h2 className="text-center mb-5 fw-bold">Pourquoi nous rejoindre ?</h2>
        <div className="row g-4">
          {/* Card 1: Activités diversifiées */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-card">
              <div className="card-body text-center p-4">
                <div className="icon-wrapper mb-4">
                  <i
                    className="bi bi-lightning-charge-fill text-warning"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h4 className="card-title mb-3">Activités diversifiées</h4>
                <p className="card-text">
                  Profitez d'une large gamme d'activités sportives adaptées à
                  tous les âges et niveaux. Trouvez celle qui vous correspond !
                </p>
                <a
                  href="/activities"
                  className="btn btn-sm btn-link text-warning text-decoration-none mt-3"
                >
                  Voir les activités <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Simplicité d'inscription */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-card">
              <div className="card-body text-center p-4">
                <div className="icon-wrapper mb-4">
                  <i
                    className="bi bi-calendar-event text-warning"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h4 className="card-title mb-3">Simplicité d'inscription</h4>
                <p className="card-text">
                  Inscrivez-vous aux activités en quelques clics et gardez un
                  œil sur votre calendrier sportif personnalisé.
                </p>
                <a
                  href="/activities"
                  className="btn btn-sm btn-link text-warning text-decoration-none mt-3"
                >
                  S'inscrire à une activité{" "}
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Conditionnelle selon la connexion */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-card">
              <div className="card-body text-center p-4">
                <div className="icon-wrapper mb-4">
                  {user ? (
                    <i
                      className="bi bi-credit-card text-warning"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-trophy text-warning"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  )}
                </div>
                {user ? (
                  <>
                    <h4 className="card-title mb-3">Paiement sécurisé</h4>
                    <p className="card-text">
                      Réglez votre cotisation et abonnements en ligne de manière
                      sécurisée pour profiter pleinement des installations.
                    </p>
                    <a
                      href="/paiement-abonnement"
                      className="btn btn-sm btn-link text-warning text-decoration-none mt-3"
                    >
                      Gérer mon abonnement <i className="bi bi-arrow-right"></i>
                    </a>
                  </>
                ) : (
                  <>
                    <h4 className="card-title mb-3">Évènements exclusifs</h4>
                    <p className="card-text">
                      Participez à des compétitions et événements spéciaux
                      organisés régulièrement pour les membres du club.
                    </p>
                    <a
                      href="/login"
                      className="btn btn-sm btn-link text-warning text-decoration-none mt-3"
                    >
                      Se connecter pour en savoir plus{" "}
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION MEMBRES - Pour qui? */}
      <div style={{ background: "#f8f9fa", padding: "80px 0" }}>
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">
            À qui s'adresse notre club ?
          </h2>

          <div className="row g-4">
            {/* Profil 1: Adultes */}
            <div className="col-md-4">
              <div className="d-flex flex-column align-items-center text-center p-3">
                <div
                  className="rounded-circle bg-warning p-3 mb-4"
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="bi bi-person fs-1 text-white"></i>
                </div>
                <h4>Adultes</h4>
                <p>
                  Participez à des activités adaptées pour maintenir votre forme
                  physique et rencontrer d'autres passionnés de sport.
                </p>
              </div>
            </div>

            {/* Profil 2: Enfants */}
            <div className="col-md-4">
              <div className="d-flex flex-column align-items-center text-center p-3">
                <div
                  className="rounded-circle bg-warning p-3 mb-4"
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="bi bi-people fs-1 text-white"></i>
                </div>
                <h4>Enfants</h4>
                <p>
                  Des activités ludiques et pédagogiques pour initier les plus
                  jeunes aux bienfaits du sport et développer leur motricité.
                </p>
              </div>
            </div>

            {/* Profil 3: Familles */}
            <div className="col-md-4">
              <div className="d-flex flex-column align-items-center text-center p-3">
                <div
                  className="rounded-circle bg-warning p-3 mb-4"
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="bi bi-house-heart fs-1 text-white"></i>
                </div>
                <h4>Familles</h4>
                <p>
                  Partagez des moments sportifs en famille avec nos activités
                  spécialement conçues pour tous les âges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION STATISTIQUES - Adaptée pour ASL SONATRACH */}
      <div
        style={{
          position: "relative",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bdImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          color: "#fff",
          padding: "100px 0",
        }}
      >
        <div className="container" style={{ position: "relative" }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h5
                className="text-warning"
                style={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                ASL SONATRACH
              </h5>
              <h2
                className="mt-2 mb-4 display-4 fw-bold"
                style={{ maxWidth: "600px" }}
              >
                Rejoignez notre communauté sportive
              </h2>
              <p
                className="mb-4"
                style={{
                  maxWidth: "550px",
                  lineHeight: "1.8",
                  fontSize: "1.1rem",
                  opacity: "0.9",
                }}
              >
                Le club ASL SONATRACH vous ouvre ses portes pour vous offrir une
                expérience sportive de qualité dans un environnement convivial.
                Nos installations modernes et nos coachs expérimentés vous
                attendent.
              </p>
              {user ? (
                <a
                  href="/member"
                  className="btn btn-warning btn-lg shadow"
                  style={{ borderRadius: "30px", padding: "12px 30px" }}
                >
                  <i className="bi bi-person-circle me-2"></i> Mon espace membre
                </a>
              ) : (
                <a
                  href="/login"
                  className="btn btn-warning btn-lg shadow"
                  style={{ borderRadius: "30px", padding: "12px 30px" }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i> Se connecter
                </a>
              )}
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="row text-center g-4">
                <div className="col-6">
                  <div
                    className="p-4 rounded"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    <h3 className="fw-bold stat-number display-4 text-warning">
                      15+
                    </h3>
                    <p
                      className="text-uppercase mb-0"
                      style={{ letterSpacing: "1px" }}
                    >
                      Activités
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="p-4 rounded"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    <h3 className="fw-bold stat-number display-4 text-warning">
                      500+
                    </h3>
                    <p
                      className="text-uppercase mb-0"
                      style={{ letterSpacing: "1px" }}
                    >
                      Membres
                    </p>
                  </div>
                </div>
                <div className="col-6 mt-4">
                  <div
                    className="p-4 rounded"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    <h3 className="fw-bold stat-number display-4 text-warning">
                      20+
                    </h3>
                    <p
                      className="text-uppercase mb-0"
                      style={{ letterSpacing: "1px" }}
                    >
                      Coachs
                    </p>
                  </div>
                </div>
                <div className="col-6 mt-4">
                  <div
                    className="p-4 rounded"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    <h3 className="fw-bold stat-number display-4 text-warning">
                      10+
                    </h3>
                    <p
                      className="text-uppercase mb-0"
                      style={{ letterSpacing: "1px" }}
                    >
                      Sports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PRISE DE RENDEZ-VOUS / CONTACT */}
      <div className="container my-5 py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="mb-4 fw-bold">
              Besoin d'informations supplémentaires ?
            </h2>
            <p className="mb-4">
              Vous avez des questions sur nos activités, nos horaires ou nos
              tarifs ? N'hésitez pas à prendre rendez-vous avec l'un de nos
              conseillers ou à nous contacter directement.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a
                href="/rendezvous"
                className="btn btn-warning btn-lg shadow"
                style={{ borderRadius: "30px", padding: "12px 25px" }}
              >
                <i className="bi bi-calendar-plus me-2"></i> Prendre rendez-vous
              </a>
              <a
                href="/contact"
                className="btn btn-outline-dark shadow"
                style={{ borderRadius: "30px", padding: "12px 25px" }}
              >
                <i className="bi bi-chat-dots me-2"></i> Nous contacter
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h4 className="mb-4">Nos horaires d'ouverture</h4>
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between mb-3">
                    <span>Samedi - Jeudi</span>
                    <span className="fw-bold">09:00 - 20:00</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Vendredi</span>
                    <span className="fw-bold">15:30 - 20:00</span>
                  </li>
                </ul>
                <hr className="my-4" />
                <div className="text-center">
                  <p className="mb-2">
                    <i className="bi bi-geo-alt me-2"></i> Complexe sportif ASL
                    SONATRACH, Alger
                  </p>
                  <p>
                    <i className="bi bi-telephone me-2"></i> +213 542 07 00 46
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
