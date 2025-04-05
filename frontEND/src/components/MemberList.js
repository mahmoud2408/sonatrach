// frontend/src/components/MemberList.js
import React, { useEffect, useState } from "react";
import { getMembers } from "../services/api";

function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMembers()
      .then((res) => {
        console.log("Membres récupérés:", res.data);
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des membres:", err);
      });
  }, []);

  // Filtrer sur la propriété 'nom'
  const filteredMembers = members.filter((member) =>
    member.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-3">
      {/* Champ de recherche */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau des membres filtrés */}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Email</th>
            <th>Date d'inscription</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.nom}</td>
              <td>{member.categorie}</td>
              <td>{member.email}</td>
              <td>{new Date(member.date_inscription).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;
