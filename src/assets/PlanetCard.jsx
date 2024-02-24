
import React, { useState, useEffect } from 'react';
import './PlanetCard.css';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = () => {
    Promise.all(planet.residents.map(residentURL =>
      fetch(residentURL)
        .then(response => response.json())
    ))
    .then(data => setResidents(data))
    .catch(error => console.error('Error fetching residents:', error));
  };

  return (
    <div className="card planet-card">
     
      <div className="card-body">
        <h3 className="card-title">{planet.name}</h3>
        <p className="card-text">Climate: {planet.climate}</p>
        <p className="card-text">Population: {planet.population}</p>
        <p className="card-text">Terrain: {planet.terrain}</p>
        {residents.length > 0 && (
          <div className="card-text">
            <h4>Residents:</h4>
            <ul className="list-unstyled">
              {residents.map((resident, index) => (
                <li key={index}>{resident.name} - {resident.height} - {resident.mass} - {resident.gender}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetCard;
