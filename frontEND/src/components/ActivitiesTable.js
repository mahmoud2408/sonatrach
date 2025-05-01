// frontend/src/components/ActivitiesTable.js
import React, { useEffect, useState } from "react";
import { getActivities } from "../services/api";
import "animate.css"; // Import de la bibliothèque d'animations

const ActivityRow = ({ activity }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const trainer =
    activity.trainerName ??
    (activity.trainerFirstName && activity.trainerLastName
      ? `${activity.trainerFirstName} ${activity.trainerLastName}`
      : "—");

  return (
    <>
      <tr className="animate__animated animate__fadeIn">
        <td>
          <div className="d-flex justify-content-between align-items-center">
            {activity.title}
            <button
              onClick={toggleDescription}
              className="btn btn-sm btn-outline-primary animate__animated animate__bounceIn"
            >
              {isExpanded ? "Masquer" : "Afficher"} description
            </button>
          </div>
        </td>
        <td>{trainer}</td>
        <td>{new Date(activity.date).toLocaleDateString("fr-FR")}</td>
        <td>{activity.hour}</td>
        <td>{activity.membersCount ?? 0}</td>
      </tr>

      {isExpanded && (
        <tr className="animate__animated animate__fadeInDown">
          <td colSpan="5">
            <div className="p-3 bg-light">
              <strong>Description :</strong>
              <p className="mb-0 mt-2 animate__animated animate__fadeIn">
                {activity.description || "Aucune description disponible"}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

function ActivitiesTable() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities()
      .then((res) => setActivities(res.data))
      .catch((err) => console.error("Erreur de chargement:", err));
  }, []);

  return (
    <div className="container mt-3 animate__animated animate__fadeInUp">
      <h3>Activités Disponibles</h3>
      {activities.length === 0 ? (
        <p className="animate__animated animate__shakeX">
          Aucune activité pour le moment.
        </p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark animate__animated animate__slideInDown">
            <tr>
              <th>Activité</th>
              <th>Entraîneur</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivitiesTable;
