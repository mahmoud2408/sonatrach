// frontend/src/pages/TrainerActivities.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function TrainerActivities() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    hour: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Nouveaux états pour les filtres
  const [searchTitle, setSearchTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterApproved, setFilterApproved] = useState("all"); // all / approved / pending

  // redirect non-trainer
  useEffect(() => {
    if (!user || user.role !== "entraineur") {
      navigate("/login?redirect=/trainer/activities");
    }
  }, [user, navigate]);

  // load trainer’s activities
  useEffect(() => {
    if (user && user.role === "entraineur") {
      fetch(`${API_URL}/trainer/activities`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setActivities(data);
          setFiltered(data);
        })
        .catch((err) => console.error("fetch activities:", err));
    }
  }, [user]);

  // apply filters whenever inputs change or activities change
  useEffect(() => {
    let temp = [...activities];

    if (searchTitle) {
      temp = temp.filter((a) =>
        a.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (filterDate) {
      temp = temp.filter((a) => a.date === filterDate);
    }
    if (filterApproved !== "all") {
      const wantApproved = filterApproved === "approved";
      temp = temp.filter((a) => Boolean(a.isApproved) === wantApproved);
    }

    setFiltered(temp);
  }, [searchTitle, filterDate, filterApproved, activities]);

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

      setActivities((prev) => [
        ...prev,
        { id: data.activityId, ...form, isApproved: false },
      ]);
      setForm({ title: "", date: "", hour: "", description: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (act) => {
    setEditingId(act.id);
    setForm({
      title: act.title,
      date: act.date,
      hour: act.hour,
      description: act.description,
    });
    setError("");
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");

      setActivities((prev) =>
        prev.map((a) =>
          a.id === id ? { id, ...form, isApproved: a.isApproved } : a
        )
      );
      setEditingId(null);
      setForm({ title: "", date: "", hour: "", description: "" });
    } catch (err) {
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || user.role !== "entraineur") return null;

  return (
    <>
      <div className="container my-4" style={{ maxWidth: "600px" }}>
        <h2>Créer / Modifier une activité</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form
          onSubmit={
            editingId
              ? (e) => {
                  e.preventDefault();
                  saveEdit(editingId);
                }
              : handleSubmit
          }
        >
          {/* form fields */}
          <div className="mb-3">
            <label className="form-label">Titre</label>
            <input
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
            {editingId
              ? "Enregistrer"
              : loading
              ? "Création..."
              : "Créer l’activité"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", date: "", hour: "", description: "" });
              }}
            >
              Annuler
            </button>
          )}
        </form>
      </div>

      {/* filtres */}
      <div className="container mb-3 d-flex gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par titre..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          className="form-select"
          value={filterApproved}
          onChange={(e) => setFilterApproved(e.target.value)}
        >
          <option value="all">Tous</option>
          <option value="approved">Approuvées</option>
          <option value="pending">En attente</option>
        </select>
      </div>

      {/* tableau */}
      <div className="container my-3">
        <h2>Vos activités</h2>
        {filtered.length === 0 ? (
          <p>Aucune activité trouvée.</p>
        ) : (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Titre</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Description</th>
                <th>Approuvée</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((act) => (
                <tr key={act.id}>
                  <td>
                    {editingId === act.id ? (
                      <input
                        className="form-control"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                      />
                    ) : (
                      act.title
                    )}
                  </td>
                  <td>
                    {editingId === act.id ? (
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(act.date).toLocaleDateString("fr-FR")
                    )}
                  </td>
                  <td>
                    {editingId === act.id ? (
                      <input
                        type="time"
                        className="form-control"
                        name="hour"
                        value={form.hour}
                        onChange={handleChange}
                      />
                    ) : (
                      act.hour
                    )}
                  </td>
                  <td>
                    {editingId === act.id ? (
                      <textarea
                        className="form-control"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    ) : (
                      act.description
                    )}
                  </td>
                  <td>{act.isApproved ? "Oui" : "Non"}</td>
                  <td>
                    {editingId === act.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => saveEdit(act.id)}
                        >
                          Enregistrer
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setEditingId(null);
                            setForm({
                              title: "",
                              date: "",
                              hour: "",
                              description: "",
                            });
                          }}
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => startEdit(act)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAct(act.id)}
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
        )}
      </div>
    </>
  );
}
