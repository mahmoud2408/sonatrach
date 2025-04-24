import React from 'react';
import { useTranslation } from 'react-i18next'; // <-- Import du hook
import bgImage from '../assets/bg.jpg';
import bdImage from '../assets/bd.jpg';

function Home() {
  // Récupération de la fonction t pour traduire
  const { t } = useTranslation();

  return (
    <>
      {/* SECTION "Hero" avec l'image de fond */}
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        
      >
           
        <div className="container text-center ">
          {/* Titre (ex: "Plus de temps pour le sport") */}
          <h1 className="display-3 fw-bold ">{t('home.title')}</h1>

          
          <b
            className="text-white"
            style={{ maxWidth: '900px', margin: '20px auto', display: 'block' }}
          >
          
          </b>

          {/* Boutons (ex: "Prendre rendez-vous en ligne" / "Créer un profil") */}
          <div className="mt-5">
            <a href="/rendezvous" className="btn btn-rendezvous btn-lg me-3">
              {t('prenez rendez-vous en ligne')}
            </a>
            <a href="/profil" className="btn btn-profile btn-se-connecter btn-lg me-3">
              {t('creer votre profil')}
            </a>
          </div>
        </div>
      </div>

      {/* SECTION "Prêt à commencer ?" */}
<div className="container my-5">
  <div className="row">
    {/* Colonne 1 : Prêt à commencer ? */}
    <div className="col-md-4 mb-4">
      <h4 className="mb-3">Prêt à commencer&nbsp;?</h4>
      <p>
        Votre club à votre façon ! Gérez votre club avec ASL SONATRACH et allégez 
        votre charge de travail. N'hésitez pas à nous contacter, nous serons ravis 
        de vous aider à démarrer la gestion de votre club sur ASL SONATRACH.
      </p>
    </div>

    {/* Colonne 2 : Combien ça coûte ? */}
    <div className="col-md-4 mb-4">
      <div className="d-flex align-items-start">
        {/* Icône (ex. Bootstrap Icons) */}
        <i className="bi bi-info-circle fs-2 text-primary me-3"></i>
        <div>
          <h5>Combien ça coûte&nbsp;?</h5>
          <p className="mb-2">
            Quels sont les besoins de votre club ? Abonnement Basique ou PRO ?
          </p>
          <a href="/prix" className="text-decoration-none nav-coll">
            Prix
          </a>
        </div>
      </div>
    </div>



    {/* Colonne 3 : Aperçu des fonctions */}
    <div className="col-md-4 mb-4">
      <div className="d-flex align-items-start ">
        <i className="bi bi-lightbulb fs-2 text-primary me-3 "></i>
        <div>
          <h5>Aperçu des fonctions</h5>
          <p className="mb-2">
            Notre logiciel pour sports et clubs. Découvrez comment 
            simplifier la gestion de votre association.
          </p>
          <a href="/fonctions" className="text-decoration-none nav-coll">
            Aperçu des fonctions
          </a>
        </div>
      </div>
    </div>
  </div>
</div>



            {/* SECTION "Gestion club sportif" */}
<div
  style={{
    position: 'relative',
    backgroundImage: `url(${bdImage})`, // Remplacez par votre image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    padding: '80px 0'
  }}
>
  {/* Superposition sombre pour mieux lire le texte */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}
  />
  
  {/* Contenu principal, positionné au-dessus de la superposition */}
  <div className="container" style={{ position: 'relative' }}>
    <h5 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>
      Gestion club sportif
    </h5>
    <h2 className="mt-3 log-col" style={{ fontSize: '2.5rem', maxWidth: '600px' }}>
      Un logiciel de gestion pour tous les membres du club
    </h2>
    <p className="mt-4" style={{ maxWidth: '700px', lineHeight: '1.6' }}>
    ASL SONATRACH se différencie en étant un système fait pour tout le monde dans le club.
      Peu importe si vous êtes un entraîneur, le trésorier, un membre régulier ou un parent,
      vous faites partie du club via l’application ASL SONATRACH.
      Tout tourne autour du quotidien du club, et grâce à ASL SONATRACH
      tout n°1 de la communication interne pour les clubs.
    </p>

    {/* Les statistiques (4 colonnes) */}
    <div className="row text-center mt-5">
      <div className="col-6 col-md-3 mb-4">
        <h3 className="fw-bold stat-number ">39.878</h3>
        <p>Clubs</p>
      </div>
      <div className="col-6 col-md-3 mb-4">
        <h3 className="fw-bold stat-number">238.154</h3>
        <p>Équipes</p>
      </div>
      <div className="col-6 col-md-3 mb-4">
        <h3 className="fw-bold stat-number">2.077.432</h3>
        <p>Membres</p>
      </div>
      <div className="col-6 col-md-3 mb-4">
        <h3 className="fw-bold stat-number">166.098</h3>
        <p>Partenaires</p>
      </div>
    </div>
  </div>
</div>

      
    </>
  );
}

export default Home;

