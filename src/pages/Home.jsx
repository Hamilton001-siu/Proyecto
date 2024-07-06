import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenidos a NutriFit</h1>
        <p>Somos un pequeño grupo que busca un gran cambio en los programadores</p>
      </div>
      <div className="home-content">
        <div className="home-image">
          {/* Aquí puedes agregar una imagen si lo deseas */}
        </div>
        <div className="home-menu">
          <Link to="/comidas" className="home-button">Agregar Comida</Link>
          <Link to="/ejercicios" className="home-button">Ejercicios Realizados</Link>
          <Link to="/resumenes-semanales" className="home-button">Ver Resumen Semanal</Link>
          <Link to="/recetas" className="home-button">Tus Recetas</Link>
          <Link to="/consejos" className="home-button">Consejo Diario</Link>
          <Link to="/quienes-somos" className="home-button">¿Quiénes Somos?</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
