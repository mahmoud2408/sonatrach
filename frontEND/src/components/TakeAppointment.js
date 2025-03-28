import React from 'react';
// Import de l'image (si vous l'avez mise dans src/assets/)
import rdvImage from '../assets/rendezvous.jpg'; // <-- Adaptation du chemin

function TakeAppointment() {
  return (
    <div className="container my-5">
      {/* Titre */}
      <h2 className="mb-4">Présentation de SportMember</h2>

      {/* Présentation en 2 colonnes */}
      <div className="row">
        <div className="col-md-6 mb-3">
          {/* L'image */}
          <img
            src={rdvImage}
            alt="Présentation de SportMember"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h4>30 min</h4>
          <p>
            Informations sur la conférence en ligne fournies à la confirmation.
            Discutons ensemble des besoins de votre club et voyons comment vous
            pourriez bénéficier de l’utilisation de SportMember.
          </p>
          <p className="text-muted">
            Choisissez un jour ci-dessous, réservez un créneau et rejoignez la
            conférence en ligne !
          </p>
          {/* Bouton de prise de rendez-vous (exemple) */}
          <button className="btn btn-primary btn-lg mt-3">
            Réserver un créneau
          </button>
        </div>
      </div>
    </div>
  );
}

export default TakeAppointment;
