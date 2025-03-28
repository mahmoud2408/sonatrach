import React from 'react';
import ActivitiesTable from '../components/ActivitiesTable';
import { Link } from 'react-router-dom';
function Activities() {
  return (
    <div className="container">
      <h1 className="mt-4">Gestion des Activités</h1>
      <ActivitiesTable />
      
    
     <div className="mt-4">
     <Link to="/inscription-activite" className="btn btn-primary btn-se-connecter">
       S'inscrire à une activité
     </Link>
   </div>
 </div>
  );
}

export default Activities;
