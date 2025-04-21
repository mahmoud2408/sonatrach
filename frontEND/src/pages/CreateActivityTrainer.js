// frontend/src/pages/CreateActivityTrainer.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function CreateActivityTrainer() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si non connecté ou pas entraîneur, rediriger
  useEffect(() => {
    if (!user || user.role !== "entraineur") {
      navigate("/login?redirect=/trainer/activity");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    hour: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      alert("Activité créée !");
      navigate("/activities"); // ou liste des activités
    } catch (err) {
      console.error("Erreur ajout activité :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
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
  );
}
