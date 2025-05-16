import React, { useState } from "react";

function ContactPage() {
  const [objet, setObjet] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [societe, setSociete] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copy, setCopy] = useState(false); // Pour la case "Recevoir une copie..."

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ici, tu peux envoyer les données au backend via une API
    // Ex: axios.post('/api/contact', { objet, nom, prenom, societe, email, message, copy })
    console.log({ objet, nom, prenom, societe, email, message, copy });
    alert("Formulaire envoyé !");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4">Nous contacter</h2>
      <form onSubmit={handleSubmit}>
        {/* Choisir l'objet de la demande */}
        <div className="mb-3">
          <label className="form-label">
            (les case qui contient ' * ' sont obligatoire)
          </label>
          <br></br>
          <label className="form-label">
            Choisissez l'objet de votre demande
          </label>
          <select
            className="form-select"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
          >
            <option value=""> Sélectionnez </option>
            <option value="Demande d'informations">
              Demande d'informations
            </option>
            <option value="Problème technique">Problème technique</option>
            <option value="Inscription à une activité">
              Inscription à une activité
            </option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Coordonnées */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nom*</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Prénom*</label>
            <input
              type="text"
              className="form-control"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Société</label>
            <input
              type="text"
              className="form-control"
              value={societe}
              onChange={(e) => setSociete(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Adresse e-mail*</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Zone de texte pour le message */}
        <div className="mb-3">
          <label className="form-label">Votre message</label>
          <textarea
            className="form-control"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Case "Recevoir une copie" */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="copyCheck"
            checked={copy}
            onChange={(e) => setCopy(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="copyCheck">
            Recevoir une copie de mon message
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-se-connecter">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
