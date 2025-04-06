// frontend/src/pages/AdminMembers.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Récupération de la liste des membres depuis l'API
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/admin/members", {
        withCredentials: true,
      });
      console.log("Membres récupérés :", res.data);
      setMembers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des membres :", error);
    }
  };

  // Filtrer la liste des membres en fonction du searchTerm
  const filteredMembers = members.filter((member) => {
    // On recherche dans le champ "nom"
    return member.nom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Fonction pour supprimer un membre
  const handleDeleteMember = async (id) => {
    if (window.confirm("Confirmez la suppression du membre.")) {
      try {
        console.log("Suppression du membre avec id :", id);
        await axios.delete(`http://localhost:5005/api/admin/member/${id}`, {
          withCredentials: true,
        });
        setMembers(members.filter((member) => member.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du membre :", error);
        alert("Erreur lors de la suppression du membre");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Gestion des Membres</h1>
      {/* Barre de recherche */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredMembers.length === 0 ? (
        <p>Aucun membre trouvé.</p>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Catégorie</th>
              <th>Date d'inscription</th>
              <th>Abonnement expire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.nom}</td>
                <td>{member.email}</td>
                <td>{member.mobile}</td>
                <td>{member.categorie}</td>
                <td>
                  {new Date(member.date_inscription).toLocaleDateString()}
                </td>
                <td>
                  {member.abonnement_expire
                    ? new Date(member.abonnement_expire).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button className="btn btn-warning me-2">Modifier</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminMembers;
