import React, { useState } from 'react';
import rdvImage from '../assets/rendezvous.jpg';

function TakeAppointment() {
  // États pour la date et le créneau horaire
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Exemple de créneaux horaires disponibles (vous pouvez les générer dynamiquement)
  const timeSlots = [
    '09:00 - 09:30',
    '10:00 - 10:30',
    '14:00 - 14:30',
    '15:00 - 15:30',
    '16:00 - 16:30',
  ];

  const handleReservation = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Veuillez sélectionner une date et un créneau.');
      return;
    }

    // Ici vous pouvez envoyer les données vers votre backend
    console.log('Date sélectionnée :', selectedDate);
    console.log('Créneau sélectionné :', selectedSlot);

    alert(
      `Vous avez réservé le créneau du ${selectedSlot} le ${selectedDate}.\nUn e-mail de confirmation vous sera envoyé.`
    );
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Présentation de ASL SONATRACH</h2>

      <div className="row">
        {/* Colonne image */}
        <div className="col-md-6 mb-3">
          <img
            src={rdvImage}
            alt="Présentation de SportMember"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Colonne texte + form */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h4>30 min</h4>
          <p>
            Informations sur la conférence en ligne fournies à la confirmation.
            Discutons ensemble des besoins de votre club et voyons comment vous
            pourriez bénéficier de l’utilisation de ASL SONATRACH.
          </p>
          <p className="text-muted">
            Choisissez un jour ci-dessous, sélectionnez un créneau horaire et
            rejoignez la conférence en ligne !
          </p>

          {/* Sélection de la date */}
          <div className="mb-3">
            <label htmlFor="appointmentDate" className="form-label fw-bold">
              Choisissez une date
            </label>
            <input
              type="date"
              className="form-control"
              id="appointmentDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          {/* Sélection du créneau horaire */}
          <div className="mb-3">
            <label htmlFor="timeSlot" className="form-label fw-bold">
              Choisissez un créneau
            </label>
            <select
              className="form-select"
              id="timeSlot"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">-- Sélectionner --</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton de réservation */}
          <button
            className="btn btn-primary btn-lg btn-se-connecter"
            onClick={handleReservation}
          >
            Réserver un créneau
          </button>
        </div>
      </div>
    </div>
  );
}

export default TakeAppointment;
