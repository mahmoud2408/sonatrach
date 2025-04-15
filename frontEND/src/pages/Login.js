import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Assurez-vous que ce contexte gère bien l'état d'authentification

const API_URL = "http://localhost:5005/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, user } = useContext(AuthContext); // "user" contient les infos de l'utilisateur connecté
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer le paramètre "redirect" dans l'URL (si présent)
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect") || "/";

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    // Si l'utilisateur est déjà défini dans le contexte, redirigez directement
    if (user && user.userId) {
      navigate(redirectPath);
    } else {
      // Sinon, appelez l'endpoint /auth/me pour vérifier la session (optionnel si AuthContext se charge déjà de cela)
      fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userId) {
            // Mettre à jour le contexte si nécessaire, puis rediriger
            login({
              userId: data.userId,
              role: data.role,
              isMembre: data.isMembre,
              sonatrach: data.sonatrach,
            });
            navigate(redirectPath);
          }
        })
        .catch((error) => {
          console.error("Erreur de vérification de session :", error);
        });
    }
  }, [navigate, redirectPath, user, login]);

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
        // Mettre à jour le contexte d'authentification
        login({
          userId: data.userId,
          role: data.role,
          isMembre: data.isMembre,
          sonatrach: data.sonatrach,
        });
        alert(`Connexion réussie, utilisateur ID : ${data.userId}`);
        // Redirection vers le chemin spécifié dans le paramètre "redirect"
        navigate(redirectPath);
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
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={() => navigate("/login-sonatrach")}
          >
            Connexion Sonatrach
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 btn-se-connecter"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
