import React, { useEffect, useState } from 'react';
import { getActivities } from '../services/api';

function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities()
      .then((res) => {
        setActivities(res.data);
      })
      .catch((err) => {
        console.error('Erreur récupération activités:', err);
      });
  }, []);

  return (
    <div className="mt-3">
      {activities.length === 0 ? (
        <p>Aucune activité pour le moment.</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity.id} className="list-group-item">
              <h5>{activity.title}</h5>
              <p>Date : {activity.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivityList;
