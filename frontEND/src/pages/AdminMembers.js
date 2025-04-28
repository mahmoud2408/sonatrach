// frontend/src/pages/AdminMembers.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState(null);

  // Récupération de la liste des membres depuis l'API
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/members`, {
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
        await axios.delete(`${API_URL}/admin/member/${id}`, {
          withCredentials: true,
        });
        setMembers(members.filter((member) => member.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du membre :", error);
        alert("Erreur lors de la suppression du membre");
      }
    }
  };

  // Fonction pour mettre à jour un membre
  const handleUpdateMember = async (id) => {
    try {
      await axios.put(
        `${API_URL}/admin/member/${id}`,
        {
          nom: editingMember.nom,
          email: editingMember.email,
          mobile: editingMember.mobile,
          categorie: editingMember.categorie,
          abonnement_expire: editingMember.abonnement_expire,
        },
        { withCredentials: true }
      );

      // On rafraîchit la liste des membres après la mise à jour
      fetchMembers();

      setEditingMember(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du membre:", error);
      alert("Erreur lors de la modification du membre");
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
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <input
                      type="text"
                      value={editingMember.nom}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          nom: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : (
                    member.nom
                  )}
                </td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <input
                      type="email"
                      value={editingMember.email}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          email: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <input
                      type="text"
                      value={editingMember.mobile}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          mobile: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : (
                    member.telephone
                  )}
                </td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <select
                      className="form-select"
                      value={editingMember.categorie}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          categorie: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Sélectionnez --</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  ) : (
                    member.categorie
                  )}
                </td>
                <td>
                  {new Date(member.date_inscription).toLocaleDateString()}
                </td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <input
                      type="date"
                      value={
                        editingMember.abonnement_expire
                          ? new Date(editingMember.abonnement_expire)
                              .toISOString()
                              .substr(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          abonnement_expire: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : member.abonnement_expire ? (
                    new Date(member.abonnement_expire).toLocaleDateString()
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {editingMember && editingMember.id === member.id ? (
                    <>
                      <button
                        onClick={() => handleUpdateMember(member.id)}
                        className="btn btn-success btn-se-connecter me-2"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={() => setEditingMember(null)}
                        className="btn btn-secondary btn-se-connecter"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingMember({ ...member })}
                        className="btn btn-warning me-2"
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
