import React from 'react';
import './QuienesSomos.css';
import Jose from '../assets/Arias.png';
import milton from '../assets/milton.png';
import ivor from '../assets/ivor.png';
import cesar from '../assets/cesar.jpg';


const QuienesSomos = () => {
  return (
    <div className="quienes-somos-container">
      <h1>¿Quiénes Somos?</h1>
      <p>Somos un equipo dedicado a mejorar la salud y el bienestar de los programadores. Nuestro equipo está formado por expertos en nutrición, fitness y desarrollo de software.</p>

      <div className="team">
        <div className="team-member">
          <img src={Jose} alt="José Arias" />
          <h2>José Arias</h2>
          <p>Soy un estudiante de Ciencias de la Computación que quiere progresar en la vida:V</p>
        </div>
        <div className="team-member">
          <img src={milton} alt="Milton Cordova" />
          <h2>Milton Cordova</h2>
          <p>Soy estudiante de Ciencias de la Computación que está entusiasmado a cambiar la forma de vida de los programadores.</p>
        </div>
        <div className="team-member">
          <img src={ivor} alt="Fabiano Rivadeneira" />
          <h2>Fabiano Rivadeneira</h2>
          <p>Él que apuesta por necesidad, pierde por obligación.</p>
        </div>
        <div className="team-member">
          <img src={cesar} alt="Cesar Carranza" />
          <h2>Cesar Carranza</h2>
          <p>Graduado de Hardvard y Howards en nutricionismo.</p>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;