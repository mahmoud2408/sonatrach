// frontend/src/components/AboReset.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function AboReset() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("Utilisateur connecté :", user);
  }, [user]);

  // Si pas d'utilisateur ou si c'est un admin, on n'affiche rien
  if (!user || user.role === "admin") {
    return null;
  }

  return (
    <li className="nav-item ms-3">
      {user.isMembre ? (
        <Link className="nav-link nav-col" to="/member">
          Info membre
        </Link>
      ) : (
        <Link className="nav-link nav-col" to="/paiement-abonnement">
          Payer Abonnement
        </Link>
      )}
    </li>
  );
}

export default AboReset;
