import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = "http://localhost:5005/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login: username, password, rememberMe }),
      });
      const data = await response.json();
      console.log("Réponse de connexion :", data);
      if (response.ok) {
        login({ userId: data.userId, role: data.role });
        alert(`Connexion réussie, utilisateur ID : ${data.userId}`);
        navigate("/");
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Content de vous revoir !</h3>
      <h4 className="text-center mb-4">Connectez-vous à votre compte</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre nom d’utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Se souvenir de moi
          </label>
          <Link to="/reset-password" className="ms-2">
            Vous avez oublié votre mot de passe ?
          </Link>
        </div>
        <button type="submit" className="btn btn-primary w-100 btn-se-connecter">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
