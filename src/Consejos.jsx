import React, { useState, useEffect } from 'react';
import { getRandomConsejo, getAllConsejos } from './Services/api';

const Consejos = () => {
  const [consejos, setConsejos] = useState([]);
  const [randomConsejo, setRandomConsejo] = useState(null);

  useEffect(() => {
    const fetchConsejos = async () => {
      try {
        const data = await getAllConsejos();
        setConsejos(data);
      } catch (error) {
        console.error('Error fetching consejos:', error);
      }
    };

    fetchConsejos();
  }, []);

  const fetchRandomConsejo = async () => {
    try {
      const consejo = await getRandomConsejo();
      setRandomConsejo(consejo);
    } catch (error) {
      console.error('Error fetching random consejo:', error);
    }
  };

  return (
    <div>
      <h1>Consejos</h1>
      <button onClick={fetchRandomConsejo}>Get Random Consejo</button>
      {randomConsejo && (
        <div>
          <h2>Random Consejo</h2>
          <p>{randomConsejo.titulo}</p>
          <p>{randomConsejo.contenido}</p>
          <p>{randomConsejo.tipo}</p>
        </div>
      )}
      <ul>
        {consejos.map((consejo) => (
          <li key={consejo.id}>
            <h3>{consejo.titulo}</h3>
            <p>{consejo.contenido}</p>
            <p>{consejo.tipo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Consejos;
