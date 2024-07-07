import React, { useState, useEffect } from 'react';
import { getActividadesFisicas, createActividadFisica, updateActividadFisica, partialUpdateActividadFisica, deleteActividadFisica } from '../Services/api';

const ActividadFisica = ({ usuarioId }) => {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState({ tipo: '', duracion: '', caloriasQuemadas: '', fecha: '' });

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const data = await getActividadesFisicas(usuarioId);
        setActividades(data);
      } catch (error) {
        console.error('Error fetching actividades:', error);
      }
    };

    fetchActividades();
  }, [usuarioId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdActividad = await createActividadFisica(nuevaActividad);
      setActividades((prevState) => [...prevState, createdActividad]);
      setNuevaActividad({ tipo: '', duracion: 0, caloriasQuemadas: 0, fecha: '' });
    } catch (error) {
      console.error('Error creating actividad:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActividadFisica(id);
      setActividades((prevState) => prevState.filter((actividad) => actividad.id !== id));
    } catch (error) {
      console.error('Error deleting actividad:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedActividad = await updateActividadFisica(id, nuevaActividad);
      setActividades((prevState) => prevState.map((actividad) => (actividad.id === id ? updatedActividad : actividad)));
      setNuevaActividad({ tipo: '', duracion: 0, caloriasQuemadas: 0, fecha: '' });
    } catch (error) {
      console.error('Error updating actividad:', error);
    }
  };

  return (
    <div>
      <h1>Actividades Físicas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={nuevaActividad.tipo}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duracion"
          placeholder="Duración (minutos)"
          value={nuevaActividad.duracion}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="caloriasQuemadas"
          placeholder="Calorías Quemadas"
          value={nuevaActividad.caloriasQuemadas}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="fecha"
          placeholder="Fecha"
          value={nuevaActividad.fecha}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Actividad</button>
      </form>

      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id}>
            {actividad.tipo} - {actividad.duracion} mins - {actividad.caloriasQuemadas} kcal - {new Date(actividad.fecha).toLocaleString()}
            <button onClick={() => handleDelete(actividad.id)}>Eliminar</button>
            <button onClick={() => handleUpdate(actividad.id)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActividadFisica;
