// frontend/src/pages/LoginSonatrach.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

export default function LoginSonatrach() {
  const { user, login } = useContext(AuthContext);
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";

  // If already logged in, redirect
  useEffect(() => {
    if (user && user.userId) {
      navigate(redirectPath, { replace: true });
    } else {
      // Verify existing session
      fetch(`${API_URL}/auth/me`, { method: "GET", credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.userId) {
            login({
              userId: data.userId,
              role: data.role,
              isMembre: data.isMembre,
              sonatrach: data.sonatrach,
            });
            navigate(redirectPath, { replace: true });
          }
        })
        .catch(console.error);
    }
  }, [user, login, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/sonatrach-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login: loginField, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Échec de la connexion Sonatrach");
        return;
      }
      // Save to context
      login({
        userId: data.userId,
        role: data.role,
        isMembre: data.isMembre,
        sonatrach: data.sonatrach,
      });
      navigate(redirectPath, { replace: true });
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
            id="loginField"
            type="text"
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
            id="password"
            type="password"
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
