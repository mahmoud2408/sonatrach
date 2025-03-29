// frontend/src/pages/ActivityList.js
import React, { useEffect, useState } from 'react';
import { getActivities } from '../services/api';

function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities()
      .then(res => {
         console.log("Activités récupérées :", res.data);
         setActivities(res.data);
      })
      .catch(err => console.error("Erreur lors du chargement des activités:", err));
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4">Activités Disponibles</h1>
      {activities.length === 0 ? (
        <p>Aucune activité pour le moment.</p>
      ) : (
        <ul className="list-group">
          {activities.map(activity => (
            <li key={activity.id} className="list-group-item">
              <h5>{activity.title}</h5>
              <p>Date : {activity.date}</p>
              <p>Heure : {activity.hour}</p>
              <p>Description : {activity.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivityList;
