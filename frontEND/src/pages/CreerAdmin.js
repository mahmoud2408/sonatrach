// frontend/src/pages/CreerAdmin.js
import React, { useState } from "react";
import axios from "axios";

function CreerAdmin() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/admin/creer-admin",
        formData,
        { withCredentials: true }
      );
      alert(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'admin :", error);
      alert(
        error.response?.data?.error ||
          "Erreur lors de la création de l'administrateur."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Créer un Nouvel Administrateur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="tel"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            placeholder="06 12 34 56 78"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Identifiant</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            pattern="^(?!\d)\S+$"
            title="le nom d'utilisateur doit commencer par des lettres et avoir au moins 6 caractères"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$"
            title="Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule et une lettre minuscule et un caractère spécial"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
          {loading ? "Création en cours..." : "Créer Administrateur"}
        </button>
      </form>
    </div>
  );
}

export default CreerAdmin;
