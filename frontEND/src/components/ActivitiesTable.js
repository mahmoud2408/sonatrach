// frontend/src/components/ActivitiesTable.js
import React, { useEffect, useState, useContext } from "react";
import { getActivities, getUserActivities } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import "animate.css"; // pour animations

const ActivityRow = ({ activity, showUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded(!isExpanded);
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
        {showUser ? (
          <>
            <td>{activity.nom}</td>
            <td>{activity.prenom}</td>
            <td>{activity.age}</td>
            <td>{activity.relation}</td>
          </>
        ) : (
          <td>{activity.membersCount ?? 0}</td>
        )}
      </tr>
      {isExpanded && (
        <tr className="animate__animated animate__fadeInDown">
          <td colSpan={showUser ? "8" : "5"}>
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

export default function ActivitiesTable({ showUserActivities = false }) {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [showUser, setShowUser] = useState(showUserActivities);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (showUser) {
          const res = await getUserActivities(user.userId);
          setActivities(res.data);
        } else {
          const res = await getActivities();
          setActivities(res.data);
        }
      } catch (err) {
        console.error("Erreur de chargement:", err);
      }
    };
    fetchData();
  }, [showUser, user]);

  const toggleView = () => setShowUser(!showUser);

  return (
    <div className="container mt-3 animate__animated animate__fadeInUp">
      <div className="d-flex justify-content-between align-items-center">
        <h3>{showUser ? "Mes Activités" : "Activités Disponibles"}</h3>
        {user && (
          <button onClick={toggleView} className="btn btn-outline-secondary">
            {showUser ? "Voir Toutes" : "Mes Activités"}
          </button>
        )}
      </div>

      {activities.length === 0 ? (
        <p className="animate__animated animate__shakeX">
          {showUser
            ? "Vous n'êtes inscrit à aucune activité."
            : "Aucune activité pour le moment."}
        </p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark animate__animated animate__slideInDown">
            <tr>
              <th>Activité</th>
              <th>Entraîneur</th>
              <th>Date</th>
              <th>Heure</th>
              {showUser ? (
                <>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Âge</th>
                  <th>Relation</th>
                </>
              ) : (
                <th>Participants</th>
              )}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow
                key={showUser ? activity.id : activity.id}
                activity={activity}
                showUser={showUser}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
