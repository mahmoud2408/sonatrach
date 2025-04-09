import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

function InscriptionActivite() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [membre, setMembre] = useState("");
  const [age, setAge] = useState("");
  const [activite, setActivite] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger la liste des activités depuis le backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_URL}/activities`);
        if (!res.ok) throw new Error("Impossible de récupérer les activités");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/inscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          age,
          relation: membre,
          activite,
          currentUserId: localStorage.getItem("userId"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2>Inscription à une activité</h2>

      {loading ? (
        <p>Chargement des activités...</p>
      ) : error ? (
        <p className="text-danger">Erreur : {error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              className="form-control"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Âge</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Relation membre</label>
            <select
              className="form-select"
              value={membre}
              onChange={(e) => setMembre(e.target.value)}
              required
            >
              <option value="">Sélectionnez la relation</option>
              <option value="self">Moi-même</option>
              <option value="family">Membre de la famille</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Activité</label>
            <select
              className="form-select"
              value={activite}
              onChange={(e) => setActivite(e.target.value)}
              required
            >
              <option value="">-- Sélectionnez une activité --</option>
              {activities.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-dark">
            S'inscrire
          </button>
        </form>
      )}
    </div>
  );
}

export default InscriptionActivite;
