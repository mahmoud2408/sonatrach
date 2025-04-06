// frontend/src/pages/MemberPage.js
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

function MemberPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupérer les infos du membre au montage
  useEffect(() => {
    if (!user) {
      // Non connecté : rediriger vers login, puis revenir ici
      navigate("/login?redirect=/member");
      return;
    }
    const fetchMember = async () => {
      try {
        const res = await fetch(`${API_URL}/members/${user.userId}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(
            "Impossible de récupérer vos informations de membre."
          );
        }
        const data = await res.json();
        setMemberInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [user, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-danger">Erreur : {error}</p>;
  if (!memberInfo) return null;

  // Calcul du temps restant
  const expireDate = new Date(memberInfo.abonnement_expire);
  const now = new Date();
  const msRemaining = expireDate - now;
  const daysRemaining = Math.max(
    Math.ceil(msRemaining / (1000 * 60 * 60 * 24)),
    0
  );

  const handleUpgrade = () => {
    navigate("/paiement-abonnement");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Mon Espace Membre</h2>
      <p>
        <strong>Nom :</strong> {memberInfo.nom}
      </p>
      <p>
        <strong>Email :</strong> {memberInfo.email}
      </p>
      <p>
        <strong>Catégorie :</strong> {memberInfo.categorie}
      </p>
      <p>
        <strong>Abonnement expire dans :</strong> {daysRemaining}{" "}
        {daysRemaining > 1 ? "jours" : "jour"}
      </p>

      {memberInfo.categorie === "Standard" && (
        <button className="btn btn-primary" onClick={handleUpgrade}>
          Passer en Premium
        </button>
      )}
    </div>
  );
}

export default MemberPage;
