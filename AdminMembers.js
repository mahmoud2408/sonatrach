// frontend/src/pages/AdminMembers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  // Récupération de la liste des membres dès le montage du composant
  useEffect(() => {
    axios.get('http://localhost:5005/api/members', { withCredentials: true })
      .then(res => {
        console.log("Membres récupérés :", res.data);
        setMembers(res.data);
      })
      .catch(err => console.error("Erreur lors du chargement des membres :", err));
  }, []);

  // Fonction pour supprimer un membre
  const handleDeleteMember = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce membre ?")) {
      try {
        await axios.delete(`http://localhost:5005/api/admin/member/${id}`, { withCredentials: true });
        setMembers(members.filter(member => member.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du membre :", error);
        alert(error.response?.data?.error || "Erreur lors de la suppression du membre");
      }
    }
  };

  // Fonction pour enregistrer la modification d'un membre
  const handleUpdateMember = async (id) => {
    try {
      await axios.put(`http://localhost:5005/api/admin/member/${id}`, editingMember, { withCredentials: true });
      setMembers(members.map(member => member.id === id ? { ...member, ...editingMember } : member));
      setEditingMember(null);
    } catch (error) {
      console.error("Erreur lors de la modification du membre :", error);
      alert(error.response?.data?.error || "Erreur lors de la modification du membre");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Liste des Membres (Abonnés)</h1>
      {members.length === 0 ? (
        <p>Aucun membre inscrit.</p>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editingMember.nom}
                      onChange={(e) => setEditingMember({ ...editingMember, nom: e.target.value })}
                    />
                  ) : (
                    member.nom
                  )}
                </td>
                <td>{member.email}</td>
                <td>{member.mobile}</td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleUpdateMember(member.id)}
                      >
                        Enregistrer
                      </button>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => setEditingMember(null)}
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setEditingMember(member)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        Supprimer
                      </button>
                    </>
                  )}
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
