import React from 'react';

function Dashboard() {
  return (
    <div className="row mt-4">
      <div className="col-md-4">
        <div className="card text-bg-warning mb-3">
          <div className="card-header">Membres</div>
          <div className="card-body">
            <h5 className="card-title">120</h5>
            <p className="card-text">Nombre total de membres</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-bg-warning mb-3">
          <div className="card-header">Activités</div>
          <div className="card-body">
            <h5 className="card-title">5</h5>
            <p className="card-text">Activités prévues cette semaine</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-bg-warning mb-3">
          <div className="card-header">Cotisations</div>
          <div className="card-body">
            <h5 className="card-title">200.000 DA</h5>
            <p className="card-text">Total des cotisations ce mois-ci</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
