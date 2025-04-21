// frontend/src/pages/AdminActivities.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getActivities } from "../services/api";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    date: "",
    hour: "",
    description: "",
    trainerId: "",
  });
  const [editingActivity, setEditingActivity] = useState(null);

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

  const handleAddActivity = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/activity`,
        {
          title: newActivity.title,
          date: newActivity.date,
          hour: newActivity.hour,
          description: newActivity.description,
          trainerId: newActivity.trainerId,
        },
        { withCredentials: true }
      );
      setActivities([
        ...activities,
        {
          id: res.data.activityId,
          ...newActivity,
        },
      ]);
      setNewActivity({
        title: "",
        date: "",
        hour: "",
        description: "",
        trainerId: "",
      });
      const updatedActivities = await axios.get(`${API_URL}/activities`);
      setActivities(updatedActivities.data); // ← Rafraîchir toute la liste
      const response = await axios.get(`${API_URL}/activities`, {
        withCredentials: true,
      });
      setActivities(response.data);
    } catch (error) {
      console.error("Add activity error:", error);
      alert("Erreur lors de l'ajout de l'activite");
    }
  };

  const handleUpdateActivity = async (id) => {
    try {
      await axios.put(
        `${API_URL}/admin/activity/${id}`,
        {
          title: editingActivity.title,
          date: editingActivity.date,
          hour: editingActivity.hour,
          description: editingActivity.description,
          trainerId: editingActivity.trainerId,
        },
        { withCredentials: true }
      );
      setActivities(
        activities.map((act) =>
          act.id === id ? { id, ...editingActivity } : act
        )
      );
      setEditingActivity(null);
    } catch (error) {
      console.error("Update activity error:", error);
      alert("Erreur lors de la modification de l'activité");
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm("Confirmez la suppression de l'activité")) return;
    try {
      await axios.delete(`${API_URL}/admin/activity/${id}`, {
        withCredentials: true,
      });
      setActivities(activities.filter((act) => act.id !== id));
    } catch (error) {
      console.error("Delete activity error:", error);
      alert("Erreur lors de la suppression de l'activité");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Gestion des Activités</h1>
      <div className="mb-3">
        <h3>Ajouter une activité</h3>
        <input
          type="text"
          placeholder="Titre"
          value={newActivity.title}
          onChange={(e) =>
            setNewActivity({ ...newActivity, title: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="date"
          placeholder="Date"
          value={newActivity.date}
          onChange={(e) =>
            setNewActivity({ ...newActivity, date: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="time"
          placeholder="Heure"
          value={newActivity.hour}
          onChange={(e) =>
            setNewActivity({ ...newActivity, hour: e.target.value })
          }
          className="form-control mb-2"
        />
        <textarea
          placeholder="Description"
          value={newActivity.description}
          onChange={(e) =>
            setNewActivity({ ...newActivity, description: e.target.value })
          }
          className="form-control mb-2"
        />
        <select
          className="form-select mb-2"
          value={newActivity.trainerId}
          onChange={(e) =>
            setNewActivity({ ...newActivity, trainerId: e.target.value })
          }
          required
        >
          <option value="">-- Sélectionnez un entraîneur --</option>
          {trainers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>
        <button onClick={handleAddActivity} className="btn btn-se-connecter">
          Ajouter
        </button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Activité</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Description</th>
            <th>Entraîneur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <input
                    type="text"
                    value={editingActivity.title}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        title: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                ) : (
                  activity.title
                )}
              </td>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <input
                    type="date"
                    value={editingActivity.date}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        date: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                ) : (
                  activity.date
                )}
              </td>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <input
                    type="time"
                    value={editingActivity.hour}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        hour: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                ) : (
                  activity.hour
                )}
              </td>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <textarea
                    value={editingActivity.description}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        description: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                ) : (
                  activity.description
                )}
              </td>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <select
                    className="form-select"
                    value={editingActivity.trainerId}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        trainerId: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Sélectionnez --</option>
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.firstName} {t.lastName}
                      </option>
                    ))}
                  </select>
                ) : (
                  activity.trainerName || (
                    <span className="text-muted">– Non assigné –</span>
                  )
                )}
              </td>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateActivity(activity.id)}
                      className="btn btn-success btn-se-connecter me-2"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingActivity(null)}
                      className="btn btn-secondary btn-se-connecter"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setEditingActivity({
                          ...activity,
                          trainerId: activity.trainerId,
                        })
                      }
                      className="btn btn-warning btn-se-connecter me-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="btn btn-danger btn-se-connecter"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
