// frontend/src/pages/EmailSender.js
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5005/api";

function EmailSender() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "members" ou "non-members"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmails, setShowEmails] = useState(true); // contrôle l'affichage des emails

  // Récupère la liste des emails en fonction du filtre depuis le backend
  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError("");
      try {
        const url =
          filter === "all"
            ? `${API_URL}/users/emails`
            : `${API_URL}/users/emails?filter=${filter}`;
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des emails");
        }
        const data = await response.json();
        setEmails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, [filter]);

  // Bascule la sélection d'un email
  const toggleSelectEmail = (email) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter((e) => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  // Sélectionne ou désélectionne tous les emails
  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails);
    }
  };

  // Envoie l'email aux destinataires sélectionnés
  const handleSendEmail = async () => {
    const payload = {
      subject,
      message,
      recipients: selectedEmails,
    };

    try {
      const response = await fetch(`${API_URL}/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Email envoyé avec succès !");
      } else {
        alert(`Erreur lors de l'envoi : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      alert("Erreur lors de l'envoi de l'email");
    }
  };

  // Toggle pour afficher/cacher la liste des emails
  const handleToggleEmails = () => {
    setShowEmails(!showEmails);
  };

  return (
    <div className="container my-4">
      <h1>Envoyer un Email</h1>

      {/* Formulaire de composition de l'email */}
      <div className="mb-3">
        <label htmlFor="subject">Objet de l'email :</label>
        <input
          type="text"
          id="subject"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Entrez l'objet de l'email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Entrez le contenu de l'email"
          required
        />
      </div>

      {/* Sélecteur de filtre */}
      <div className="mb-3">
        <label htmlFor="filterSelect" className="form-label">
          Filtrer les destinataires :
        </label>
        <select
          id="filterSelect"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tous</option>
          <option value="members">Membres</option>
          <option value="non-members">Non membres</option>
          <option value="notif">notification</option>
        </select>
      </div>

      {/* Bouton pour afficher ou cacher la liste */}
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={handleToggleEmails}>
          {showEmails ? "Cacher les emails" : "Afficher les emails"}
        </button>
      </div>

      {/* Affichage de la liste des destinataires */}
      {showEmails && (
        <>
          {loading ? (
            <p>Chargement des emails...</p>
          ) : error ? (
            <p className="text-danger">Erreur : {error}</p>
          ) : (
            <div>
              <h3>Liste des destinataires :</h3>
              <button
                className="btn btn-secondary mb-3"
                onClick={handleSelectAll}
              >
                Tout sélectionner
              </button>
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr key={index}>
                      <td>{email}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => toggleSelectEmail(email)}
                        >
                          {selectedEmails.includes(email)
                            ? "Désélectionner"
                            : "Sélectionner"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Bouton d'envoi */}
      <div className="mt-3">
        <button className="btn btn-success" onClick={handleSendEmail}>
          Envoyer l'email
        </button>
      </div>
    </div>
  );
}

export default EmailSender;
