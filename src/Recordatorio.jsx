import React, { useState, useEffect } from 'react';
import { getRecordatorios, createRecordatorio, updateRecordatorio, partialUpdateRecordatorio, deleteRecordatorio } from './Services/api';

const Recordatorios = ({ usuarioId }) => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [nuevoRecordatorio, setNuevoRecordatorio] = useState({
    tipo: '',
    mensaje: '',
    fechaHora: ''
  });

  useEffect(() => {
    const fetchRecordatorios = async () => {
      try {
        const data = await getRecordatorios(usuarioId);
        setRecordatorios(data);
      } catch (error) {
        console.error('Error fetching recordatorios:', error);
      }
    };

    fetchRecordatorios();
  }, [usuarioId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoRecordatorio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdRecordatorio = await createRecordatorio(nuevoRecordatorio, usuarioId);
      setRecordatorios((prevState) => [...prevState, createdRecordatorio]);
      setNuevoRecordatorio({
        tipo: '',
        mensaje: '',
        fechaHora: ''
      });
    } catch (error) {
      console.error('Error creating recordatorio:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecordatorio(id);
      setRecordatorios((prevState) => prevState.filter((recordatorio) => recordatorio.id !== id));
    } catch (error) {
      console.error('Error deleting recordatorio:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedRecordatorio = await updateRecordatorio(id, nuevoRecordatorio);
      setRecordatorios((prevState) => prevState.map((recordatorio) => (recordatorio.id === id ? updatedRecordatorio : recordatorio)));
      setNuevoRecordatorio({
        tipo: '',
        mensaje: '',
        fechaHora: ''
      });
    } catch (error) {
      console.error('Error updating recordatorio:', error);
    }
  };

  return (
    <div>
      <h1>Recordatorios</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={nuevoRecordatorio.tipo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="mensaje"
          placeholder="Mensaje"
          value={nuevoRecordatorio.mensaje}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="fechaHora"
          placeholder="Fecha y Hora"
          value={nuevoRecordatorio.fechaHora}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Recordatorio</button>
      </form>

      <ul>
        {recordatorios.map((recordatorio) => (
          <li key={recordatorio.id}>
            <h3>{recordatorio.tipo}</h3>
            <p>{recordatorio.mensaje}</p>
            <p>{new Date(recordatorio.fechaHora).toLocaleString()}</p>
            <button onClick={() => handleDelete(recordatorio.id)}>Eliminar</button>
            <button onClick={() => handleUpdate(recordatorio.id)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recordatorios;
