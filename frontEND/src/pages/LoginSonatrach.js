// frontend/src/pages/LoginSonatrach.js
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function LoginSonatrach() {
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/sonatrach-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          login: loginField, // email ou username dans la DB Sonatrach
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Échec de la connexion Sonatrach");
        return;
      }
      // on récupère userId, role, isMembre
      login({
        userId: data.userId,
        role: data.role,
        isMembre: data.isMembre,
        sonatrach: data.sonatrach,
      });
      // redirige vers la home ou une route protégée
      navigate("/");
    } catch (err) {
      console.error("Erreur Sonatrach-login :", err);
      setError("Erreur réseau lors de la connexion");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Connexion Sonatrach</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginField" className="form-label">
            Email ou Identifiant Sonatrach
          </label>
          <input
            type="text"
            id="loginField"
            className="form-control"
            placeholder="Entrez votre email ou identifiant"
            value={loginField}
            onChange={(e) => setLoginField(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-secondary w-100">
          Connexion Sonatrach
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/login">Retour à la connexion standard</Link>
      </div>
    </div>
  );
}

