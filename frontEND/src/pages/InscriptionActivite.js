import React, { useState } from 'react';

function InscriptionActivite() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [membre, setmembre] = useState('');
  const [age, setAge] = useState('');
  const [activite, setActivite] = useState(''); // <-- Déclaration

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification dans la console
    console.log('Nom:', nom);
    console.log('Prénom:', prenom);
    console.log('Âge:', age);
    console.log('Activité:', activite);
    console.log('Relation membre:', membre);

    alert(`Inscription soumise pour l'activité : ${activite}`);
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h2>Inscription à une activité</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Âge</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Relation membre</label>
          <select
            className="form-select"
            value={membre}
            onChange={(e) => setmembre(e.target.value)}
            required
          >
            <option value=""> Sélectionnez la relation </option>
            
            <option value="Football">moi meme</option>
            <option value="Basketball">membre de famille</option>
            
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Activité</label>
          <select
            className="form-select"
            value={activite}
            onChange={(e) => setActivite(e.target.value)}
            required
          >
            <option value="">-- Sélectionnez une activité --</option>
            <option value="Handball">Handball</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
          </select>
        </div>

        <button type="submit" className="btn btn-dark">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default InscriptionActivite;
