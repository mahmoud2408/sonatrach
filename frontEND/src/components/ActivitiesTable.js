import React, { useEffect, useState } from 'react';
import { getActivities } from '../services/api';

function ActivitiesTable() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Récupération des activités via l’API
    getActivities()
      .then((res) => {
        // Supposons que res.data est un tableau d'activités
        // avec { id, title, date, membersCount }
        setActivities(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des activités:', err);
      });
  }, []);

  return (
    <div className="mt-3">
      <h3>Activités et Nombre de Membres</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Activité</th>
            <th>Date</th>
            <th>heure</th>
            <th>Nombre de Membres</th>
            
           
            
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.title}</td>
              <td>{activity.date}</td>
              <td>{activity.membersCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivitiesTable;
