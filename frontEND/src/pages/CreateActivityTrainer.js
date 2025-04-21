// frontend/src/pages/TrainerActivities.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function TrainerActivities() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    hour: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not trainer
  useEffect(() => {
    if (!user || user.role !== "entraineur") {
      navigate("/login?redirect=/trainer/activities");
    }
  }, [user, navigate]);

  // Load trainer activities
  useEffect(() => {
    if (user && user.role === "entraineur") {
      fetch(`${API_URL}/trainer/activities`, { credentials: "include" })
        .then((res) => res.json())
        .then(setActivities)
        .catch((err) => console.error("fetch activities:", err));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/trainer/activity`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      // Append new activity to list
      setActivities((prev) => [...prev, { id: data.activityId, ...form }]);
      // Reset form
      setForm({ title: "", date: "", hour: "", description: "" });
    } catch (err) {
      console.error("Erreur ajout activité :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (act) => {
    setForm({
      title: act.title,
      date: act.date,
      hour: act.hour,
      description: act.description,
    });
    setLoading(false);
  };

  const saveEdit = async (id) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/trainer/activity/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setActivities((acts) =>
        acts.map((a) => (a.id === id ? { id, ...form } : a))
      );
      setForm({ title: "", date: "", hour: "", description: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const deleteAct = async (id) => {
    if (!window.confirm("Supprimer cette activité ?")) return;
    try {
      const res = await fetch(`${API_URL}/trainer/activity/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setActivities((acts) => acts.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (!user || user.role !== "entraineur") return null;

  return (
    <>
      <div className="container my-4" style={{ maxWidth: "600px" }}>
        <h2>Créer une nouvelle activité</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Titre</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Heure</label>
            <input
              type="time"
              name="hour"
              className="form-control"
              value={form.hour}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Création..." : "Créer l’activité"}
          </button>
        </form>
      </div>
      <div className="container my-5">
        <h2>Vos activités</h2>
        {activities.length === 0 ? (
          <p>Aucune activité trouvée.</p>
        ) : (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Titre</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr key={act.id}>
                  <td>{act.title}</td>
                  <td>{act.date}</td>
                  <td>{act.hour}</td>
                  <td>{act.description}</td>
                  <td>
                    <button
                      onClick={() => startEdit(act)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteAct(act.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
