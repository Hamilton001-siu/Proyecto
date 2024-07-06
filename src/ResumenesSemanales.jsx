import React, { useState, useEffect } from 'react';
import { getAllResúmenesSemanalesByUsuario, generateResumenSemanal } from './Services/api';

const ResumenesSemanales = ({ usuarioId }) => {
  const [resumenes, setResumenes] = useState([]);

  useEffect(() => {
    const fetchResumenes = async () => {
      try {
        const data = await getAllResúmenesSemanalesByUsuario(usuarioId);
        setResumenes(data);
      } catch (error) {
        console.error('Error fetching resúmenes semanales:', error);
      }
    };

    fetchResumenes();
  }, [usuarioId]);

  const handleGenerateResumen = async () => {
    try {
      const nuevoResumen = await generateResumenSemanal(usuarioId);
      setResumenes((prevState) => [...prevState, nuevoResumen]);
    } catch (error) {
      console.error('Error generating resumen semanal:', error);
    }
  };

  return (
    <div>
      <h1>Resúmenes Semanales</h1>
      <button onClick={handleGenerateResumen}>Generar Resumen Semanal</button>
      <ul>
        {resumenes.map((resumen) => (
          <li key={resumen.id}>
            <h3>Semana: {resumen.semanaInicio} - {resumen.semanaFin}</h3>
            <p>Proteínas Totales: {resumen.proteinasTotales}</p>
            <p>Carbohidratos Totales: {resumen.carbohidratosTotales}</p>
            <p>Calorías Totales: {resumen.caloriasTotales}</p>
            <p>Calorías Quemadas Totales: {resumen.caloriasQuemadasTotales}</p>
            <p>Actividades Realizadas: {resumen.actividadesRealizadas}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumenesSemanales;
