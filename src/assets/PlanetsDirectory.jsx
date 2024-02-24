import React, { useState, useEffect } from 'react';
import PlanetCard from './PlanetCard';
import './App.css'; 

const PlanetsDirectory = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [showHeading, setShowHeading] = useState(true);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchPlanets = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
        setNextPage(data.next);
      })
      .catch(error => console.error('Error fetching planets:', error));
  };

  const handleLoadMore = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowHeading(false);
    } else {
      setShowHeading(true);
    }
  };

  return (
    <div className="container">
      {showHeading && (
        <div className="heading-container">
          <h1 className="heading">"That's no moon. It's a space station." <br /> <span className='text-align-left'>- Obi-Wan Kenobi</span></h1>
        </div>
      )}
      <div className="row">
        {planets.map((planet, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <PlanetCard planet={planet} />
          </div>
        ))}
      </div>
      {nextPage && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default PlanetsDirectory;

