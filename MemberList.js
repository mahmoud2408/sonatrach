import React, { useEffect, useState } from 'react';
import { getMembers } from '../services/api';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Récupération initiale des membres via l’API
    getMembers()
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des membres:', err);
      });
  }, []);

  // Filtrage des membres selon la saisie de l’utilisateur
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th>Activities</th>
            <th>Date d'Inscription</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.category}</td>
              <td>{member.isActive ? 'Actif' : 'Inactif'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;
