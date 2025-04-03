import React from 'react';
import btqImage from '../assets/bf.jpg';

function BoutiqueEnLigne() {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Boutique en ligne</h1>
      <p>
        Bienvenue dans la boutique en ligne de votre club sportif&nbsp;! 
        Ici, vous pouvez gérer et vendre vos produits, équipements, 
        tenues officielles, et bien plus encore.
      </p>

      {/* Exemple de contenu (liste de produits, images, etc.) */}
      <div className="row">
        <div className="col-md-10 mb-10">
            <img
              src={btqImage}
              alt="Présentation de SportMember"
              className="img-fluid rounded shadow"
            />
            <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="mb-3">Maillot Officiel</h2>
          <p className="mb-3" style={{ fontSize: '1.2rem', maxWidth: '600px' , position :'right' }}>
            Le maillot officiel de notre club, disponible en plusieurs tailles.
          </p>
          <button className="btn btn-primary" style={{ width: '200px' }}>
            Ajouter au panier
          </button>
        </div>
          </div>
        </div>
        {/* Répétez pour d’autres produits */}
      </div>
    
  );
}

export default BoutiqueEnLigne;
