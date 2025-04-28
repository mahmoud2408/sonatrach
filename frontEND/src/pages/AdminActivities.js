// frontend/src/pages/AdminActivities.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAdminActivities } from "../services/api";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    date: "",
    hour: "",
    description: "",
    trainer_id: "",
  });
  const [editingActivity, setEditingActivity] = useState(null);

  // Filter states
  const [searchTitle, setSearchTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterApproved, setFilterApproved] = useState(""); // "approved", "pending"
  const [filterTrainer, setFilterTrainer] = useState("");

  useEffect(() => {
    // Load activities
    getAdminActivities()
      .then((res) => setActivities(res.data))
      .catch((err) => console.error("Erreur chargement activités :", err));
    // Load trainers for dropdown
    axios
      .get(`${API_URL}/admin/trainers`, { withCredentials: true })
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error("Erreur chargement entraîneurs :", err));
  }, []);

  const handleAddActivity = async () => {
    try {
      await axios.post(
        `${API_URL}/admin/activity`,
        { ...newActivity, isApproved: true },
        { withCredentials: true }
      );
      // Refresh list after add
      const updated = await axios.get(`${API_URL}/activities`, {
        withCredentials: true,
      });
      setActivities(updated.data);
      setNewActivity({
        title: "",
        date: "",
        hour: "",
        description: "",
        trainer_id: "",
      });
    } catch (error) {
      console.error("Add activity error:", error);
      alert("Erreur lors de l'ajout de l'activité");
    }
  };

  // Optimistic update: update local state immediately after successful PUT
  const handleUpdateActivity = async (id) => {
    try {
      await axios.put(`${API_URL}/admin/activity/${id}`, editingActivity, {
        withCredentials: true,
      });
      // Optimistic UI update without reloading full list
      const updated = await axios.get(`${API_URL}/admin/activities`, {
        withCredentials: true,
      });
      setActivities(updated.data);
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
      setActivities((prev) => prev.filter((act) => act.id !== id));
    } catch (error) {
      console.error("Delete activity error:", error);
      alert("Erreur lors de la suppression de l'activité");
    }
  };

  // Filtered list
  const filteredActivities = activities.filter((act) => {
    return (
      (searchTitle === "" ||
        act.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (filterDate === "" || act.date === filterDate) &&
      (filterApproved === "" ||
        (filterApproved === "approved" && act.isApproved) ||
        (filterApproved === "pending" && !act.isApproved)) &&
      (filterTrainer === "" || act.trainer_id.toString() === filterTrainer)
    );
  });

  return (
    <div className="container">
      <h1 className="mt-4">Gestion des Activités</h1>

      {/* Add new activity form */}
      <div className="mb-3">
        <h3>Ajouter une activité</h3>
        <input
          type="text"
          placeholder="Titre"
          className="form-control mb-2"
          value={newActivity.title}
          onChange={(e) =>
            setNewActivity({ ...newActivity, title: e.target.value })
          }
        />
        <input
          type="date"
          className="form-control mb-2"
          value={newActivity.date}
          onChange={(e) =>
            setNewActivity({ ...newActivity, date: e.target.value })
          }
        />
        <input
          type="time"
          className="form-control mb-2"
          value={newActivity.hour}
          onChange={(e) =>
            setNewActivity({ ...newActivity, hour: e.target.value })
          }
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={newActivity.description}
          onChange={(e) =>
            setNewActivity({ ...newActivity, description: e.target.value })
          }
        />
        <select
          className="form-select mb-2"
          value={newActivity.trainer_id}
          onChange={(e) =>
            setNewActivity({ ...newActivity, trainer_id: e.target.value })
          }
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

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par titre..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={filterApproved}
            onChange={(e) => setFilterApproved(e.target.value)}
          >
            <option value="">-- Toutes --</option>
            <option value="approved">Approuvées</option>
            <option value="pending">En attente</option>
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={filterTrainer}
            onChange={(e) => setFilterTrainer(e.target.value)}
          >
            <option value="">-- Tous les entraîneurs --</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Activité</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Description</th>
            <th>Entraîneur</th>
            <th>Approuvée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((activity) => (
            <tr key={activity.id}>
              <td>
                {editingActivity?.id === activity.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editingActivity.title}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        title: e.target.value,
                      })
                    }
                  />
                ) : (
                  activity.title
                )}
              </td>
              <td>
                {editingActivity?.id === activity.id ? (
                  <input
                    type="date"
                    className="form-control"
                    value={editingActivity.date}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        date: e.target.value,
                      })
                    }
                  />
                ) : (
                  new Date(activity.date).toLocaleDateString("fr-FR")
                )}
              </td>
              <td>
                {editingActivity?.id === activity.id ? (
                  <input
                    type="time"
                    className="form-control"
                    value={editingActivity.hour}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        hour: e.target.value,
                      })
                    }
                  />
                ) : (
                  activity.hour
                )}
              </td>
              <td>
                {editingActivity?.id === activity.id ? (
                  <textarea
                    className="form-control"
                    value={editingActivity.description}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  activity.description
                )}
              </td>
              <td>
                {editingActivity && editingActivity.id === activity.id ? (
                  <select
                    className="form-select"
                    value={editingActivity.trainer_id}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        trainer_id: e.target.value,
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
                  (() => {
                    const trainer = trainers.find(
                      (t) => t.id === activity.trainer_id
                    );
                    return trainer ? (
                      `${trainer.firstName} ${trainer.lastName}`
                    ) : (
                      <span className="text-muted">– Non assigné –</span>
                    );
                  })()
                )}
              </td>

              <td>
                {editingActivity?.id === activity.id ? (
                  <input
                    type="checkbox"
                    checked={editingActivity.isApproved}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        isApproved: e.target.checked,
                      })
                    }
                  />
                ) : activity.isApproved ? (
                  "Oui"
                ) : (
                  "Non"
                )}
              </td>
              <td>
                {editingActivity?.id === activity.id ? (
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
                      onClick={() => setEditingActivity(activity)}
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
