// frontend/src/pages/PaiementAbonnement.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function PaiementAbonnement() {
  const { user } = useContext(AuthContext);
  const [categorie, setCategorie] = useState("Standard");
  const [loading, setLoading] = useState(false);

  const handlePaiement = async () => {
    if (!user) {
      alert("Veuillez vous connecter !");
      return;
    }
    setLoading(true);
    try {
      // Appel à l'endpoint qui ajoute directement l'utilisateur dans la liste des membres
      const response = await axios.post(
        "http://localhost:5005/api/members/payer-abonnement",
        { user_id: user.userId, categorie },
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Erreur lors de l'inscription en tant que membre :", error);
      alert(error.response?.data?.error || "Erreur lors de l'inscription en tant que membre.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Payer votre abonnement</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <p className="card-text">Choisissez votre type d'abonnement :</p>
          <div className="mb-3">
            <select
              className="form-select"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="Standard">Standard - 1500 DA/mois</option>
              <option value="Premium">Premium - 3000 DA/mois</option>
            </select>
          </div>
          <button 
            className="btn btn-dark w-100" 
            onClick={handlePaiement} 
            disabled={loading}
          >
            {loading ? "Traitement en cours..." : "Payer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaiementAbonnement;
