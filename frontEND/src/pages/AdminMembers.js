// frontend/src/pages/AdminMembers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ firstName: '', lastName: '', email: '', mobile: '', username: '', password: '', role: 'user' });
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5005/api/members', { withCredentials: true })
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddMember = async () => {
    try {
      const res = await axios.post('http://localhost:5005/api/admin/member', newMember, { withCredentials: true });
      setMembers([...members, { id: res.data.memberId, ...newMember }]);
      setNewMember({ firstName: '', lastName: '', email: '', mobile: '', username: '', password: '', role: 'user' });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du membre");
    }
  };

  const handleUpdateMember = async (id) => {
    try {
      await axios.put(`http://localhost:5005/api/admin/member/${id}`, editingMember, { withCredentials: true });
      setMembers(members.map(member => member.id === id ? { id, ...editingMember } : member));
      setEditingMember(null);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification du membre");
    }
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm("Confirmez la suppression du membre.")) {
      try {
        await axios.delete(`http://localhost:5005/api/admin/member/${id}`, { withCredentials: true });
        setMembers(members.filter(member => member.id !== id));
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la suppression du membre");
      }
    }
  };

  const handleRenewSubscription = async (id) => {
    try {
      await axios.put(`http://localhost:5005/api/admin/member/${id}/renew`, {}, { withCredentials: true });
      alert("Abonnement renouvelé !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors du renouvellement de l'abonnement");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Gestion des Membres</h1>
      <div className="mb-3">
        <h3>Ajouter un membre</h3>
        <input
          type="text"
          placeholder="Prénom"
          value={newMember.firstName}
          onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Nom"
          value={newMember.lastName}
          onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newMember.mobile}
          onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Username"
          value={newMember.username}
          onChange={(e) => setNewMember({ ...newMember, username: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={newMember.password}
          onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
          className="form-control mb-2"
        />
        <select
          className="form-select mb-2"
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
        <button onClick={handleAddMember} className="btn btn-primary btn-se-connecter">Ajouter</button>
      </div>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>
                {editingMember && editingMember.id === member.id ? (
                  <>
                    <input
                      type="text"
                      value={editingMember.firstName}
                      onChange={(e) => setEditingMember({ ...editingMember, firstName: e.target.value })}
                      className="form-control mb-1"
                    />
                    <input
                      type="text"
                      value={editingMember.lastName}
                      onChange={(e) => setEditingMember({ ...editingMember, lastName: e.target.value })}
                      className="form-control"
                    />
                  </>
                ) : (
                  `${member.firstName} ${member.lastName}`
                )}
              </td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                {editingMember && editingMember.id === member.id ? (
                  <>
                    <button onClick={() => handleUpdateMember(member.id)} className="btn btn-success btn-se-connecter me-2">Enregistrer</button>
                    <button onClick={() => setEditingMember(null)} className="btn btn-secondary btn-se-connecter me-2">Annuler</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingMember(member)} className="btn btn-warning btn-se-connecter me-2">Modifier</button>
                    <button onClick={() => handleDeleteMember(member.id)} className="btn btn-danger btn-se-connecter me-2">Supprimer</button>
                    <button onClick={() => handleRenewSubscription(member.id)} className="btn btn-success btn-se-connecter">Renouveler</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMembers;
