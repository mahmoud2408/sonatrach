import React, { useState } from 'react';

function Prix() {
  // État pour le nombre de membres
  const [membres, setMembres] = useState(200);

  // État pour le type de réduction : 'none', 'student', 'employee'
  const [discountType, setDiscountType] = useState('none');

  // Fonction de mise à jour du nombre de membres
  const handleMembresChange = (e) => {
    setMembres(e.target.value);
  };

  // Fonction de mise à jour du type de réduction
  const handleDiscountChange = (e) => {
    setDiscountType(e.target.value);
  };

  // Prix de base pour l'abonnement PRO (ex: 0.17 €/membre)
  const basePrice = membres * 0.17;

  // Calcul de la réduction
  let finalPrice = basePrice;
  if (discountType === 'student') {
    // Par exemple, -30% pour les étudiants
    finalPrice = basePrice * 0.7;
  } else if (discountType === 'employee') {
    // Par exemple, -20% pour les employés
    finalPrice = basePrice * 0.8;
  }

  // Arrondir à 2 décimales
  const formattedPrice = finalPrice.toFixed(2);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Combien ça coûte ?</h1>
      <p>
        Quels sont les besoins de votre club ? Abonnement Basique ou PRO ?
        <br />
        Bénéficiez d’une réduction pour les étudiants ou pour les employés&nbsp;!
      </p>

      {/* Nombre de membres */}
      <div className="mb-3">
        <label htmlFor="nbMembres" className="form-label">
          Combien de membres avez-vous ?
        </label>
        <input
          id="nbMembres"
          type="number"
          value={membres}
          onChange={handleMembresChange}
          className="form-control w-25"
        />
      </div>

      {/* Choix de la réduction */}
      <div className="mb-4">
        <label className="form-label me-3">Type de réduction :</label>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="discountType"
            id="noDiscount"
            value="none"
            checked={discountType === 'none'}
            onChange={handleDiscountChange}
          />
          <label className="form-check-label" htmlFor="noDiscount">
            Aucune
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="discountType"
            id="studentDiscount"
            value="student"
            checked={discountType === 'student'}
            onChange={handleDiscountChange}
          />
          <label className="form-check-label" htmlFor="studentDiscount">
            Étudiants (-30%)
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="discountType"
            id="employeeDiscount"
            value="employee"
            checked={discountType === 'employee'}
            onChange={handleDiscountChange}
          />
          <label className="form-check-label" htmlFor="employeeDiscount">
            Employés (-20%)
          </label>
        </div>
      </div>

      {/* Tarifs Basique et PRO */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h3>Basique</h3>
            <p>Pour les petits clubs qui ont peu de besoins.</p>
            <h4>0€</h4>
            <p>par membre/mois</p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h3>PRO</h3>
            <p>Pour le club qui souhaite une fonctionnalité complète.</p>
            <h4>{formattedPrice} €</h4>
            <p>par mois (après réduction éventuelle)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prix;
