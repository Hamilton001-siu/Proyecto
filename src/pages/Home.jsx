import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nutri1.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-image">
          <img src={logo} alt="NutriFit Logo" />
        </div>
        <div className="home-menu">
          <h1>Bienvenidos a NutriFit</h1>
          <p>Somos un pequeño grupo que busca un gran cambio en los programadores</p>
          <Link to="/comidas" className="home-button">Agregar Comida</Link>
          <Link to="/actividades-fisicas" className="home-button">Ejercicios Realizados</Link>
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
