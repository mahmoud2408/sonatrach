// frontend/src/pages/CreateProfile.js
import React, { useState } from "react";
import { createProfile } from "../services/api"; // Chemin d'import à ajuster selon votre structure

function CreateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOver16, setIsOver16] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNotifications, setAcceptNotifications] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à la fonction createProfile
      const data = await createProfile({
        firstName,
        lastName,
        email,
        mobile,
        username,
        password,
        isOver16,
        acceptTerms,
        acceptNotifications,
      });
      alert(`Profil créé avec succès, utilisateur ID : ${data.userId}`);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleMobile = (e) => {
    const fromattedPhoneNumber = formatPhoneNumber(e.target.value);
    if (e.target.value.length > 14) return alert("votre numero est faux");
    else return setMobile(fromattedPhoneNumber);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Créez votre compte</h2>
      <form onSubmit={handleSubmit}>
        {/* Prénom(s) et Nom de famille */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              Prénom(s)
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Prénom(s)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Nom de famille
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Nom de famille"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* E-mail */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="exemple@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            placeholder="06 12 34 56 78"
            value={mobile}
            onChange={(e) => handleMobile(e)}
          />
        </div>

        {/* Nom d'utilisateur */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Choisissez un identifiant"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            pattern="^[A-Za-z]{6,}\d*$"
            title="le nom d'utilisateur doit commencer par des lettres et avoir au moins 6 caractères"
          />
        </div>

        {/* Mot de passe */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule et une lettre minuscule"
          />
        </div>

        {/* Case : J'ai plus de 16 ans */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="isOver16"
            checked={isOver16}
            onChange={(e) => setIsOver16(e.target.checked)}
            required
          />
          <label className="form-check-label" htmlFor="isOver16">
            J'ai plus de 16 ans ou ai reçu l'accord de mes parents *
          </label>
        </div>

        {/* Case : Acceptation des CGU et Politique de confidentialité */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
          />
          <label className="form-check-label" htmlFor="acceptTerms">
            J'accepte les <a href="/cgu">conditions générales d'utilisation</a>
            et la <a href="/privacy">politique de confidentialité</a> et donne
            mon consentement au traitement des données personnelles.*
          </label>
        </div>

        {/* Case : Notifications */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="acceptNotifications"
            checked={acceptNotifications}
            onChange={(e) => setAcceptNotifications(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="acceptNotifications">
            Je souhaite recevoir des e-mails/notifications pertinents.
            (Nouvelles fonctionnalités, astuces, pubs, etc.)
          </label>
        </div>

        {/* Bouton de validation */}
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-se-connecter"
        >
          Suivant
        </button>
      </form>
    </div>
  );
}
function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberlength = phoneNumber.length;
  if (phoneNumberlength < 3) return phoneNumber;
  if (phoneNumberlength < 5)
    return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 4)}`;
  if (phoneNumberlength < 7)
    return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
      2,
      4
    )} ${phoneNumber.slice(4, 6)}`;
  if (phoneNumberlength < 9)
    return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
      2,
      4
    )} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)}`;
  if (phoneNumberlength < 11)
    return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
      2,
      4
    )} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(
      6,
      8
    )} ${phoneNumber.slice(8, 10)}`;
}

export default CreateProfile;
