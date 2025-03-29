// frontend/src/pages/ResetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005/api";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: demande de code, 2: confirmation
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Etape 1 : Demander l'envoi d'un code par email
  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Un code de réinitialisation vous a été envoyé par email");
        setStep(2);
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation :", error);
      alert("Erreur lors de la demande de réinitialisation");
    }
  };

  // Etape 2 : Valider le code et envoyer le nouveau mot de passe
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Votre mot de passe a été réinitialisé avec succès");
        navigate("/login");
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe :",
        error
      );
      alert("Erreur lors de la réinitialisation du mot de passe");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      {step === 1 && (
        <form onSubmit={handleRequestReset}>
          <h3>Réinitialisation du mot de passe</h3>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer le code
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <h3>Valider le code et réinitialiser votre mot de passe</h3>
          <div className="mb-3">
            <label>Code de réinitialisation</label>
            <input
              type="text"
              className="form-control"
              placeholder="Code à 4 chiffres"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Entrez votre nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Réinitialiser le mot de passe
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
