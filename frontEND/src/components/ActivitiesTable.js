// frontend/src/components/ActivitiesTable.js
import React, { useEffect, useState } from "react";
import { getActivities } from "../services/api";

function ActivitiesTable() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities()
      .then((res) => {
        console.log("Activités récupérées :", res.data);
        setActivities(res.data);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des activités:", err)
      );
  }, []);

  return (
    <div className="container mt-3">
      <h3>Activités Disponibles</h3>
      {activities.length === 0 ? (
        <p>Aucune activité pour le moment.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Activité</th>
              <th>Entraîneur</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Nombre de Membres</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              // Si votre API renvoie trainerName, on l'affiche.
              // Sinon on combine trainerFirstName + trainerLastName.
              const trainer =
                activity.trainerName ??
                (activity.trainerFirstName && activity.trainerLastName
                  ? `${activity.trainerFirstName} ${activity.trainerLastName}`
                  : "—");

              return (
                <tr key={activity.id}>
                  <td>{activity.title}</td>
                  <td>{trainer}</td>
                  <td>{new Date(activity.date).toLocaleDateString("fr-FR")}</td>
                  <td>{activity.hour}</td>
                  <td>{activity.membersCount ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivitiesTable;
