import React, { useState, useEffect } from 'react';
import { getActividadesFisicas, partialUpdateActividadFisica, deleteActividadFisica } from '../Services/api';
import './VerEjercicios.css';

const VerEjercicios = ({ usuarioId }) => {
  const [actividades, setActividades] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingActividad, setEditingActividad] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      try {
        const data = await getActividadesFisicas(usuarioId);
        setActividades(data);
      } catch (error) {
        console.error('Error fetching actividades:', error);
        setError('Error al cargar las actividades. Por favor intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      fetchActividades();
    } else {
      setError('No hay usuario ID disponible');
    }
  }, [usuarioId]);

  const handleDelete = async (id) => {
    try {
      await deleteActividadFisica(id);
      setActividades(prevState => prevState.filter(actividad => actividad.id !== id));
    } catch (error) {
      console.error('Error deleting actividad:', error);
      setError('Error al eliminar actividad. Por favor intente de nuevo.');
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const updatedActividad = await partialUpdateActividadFisica(id, { ...updatedFields, usuarioId });
      setActividades(prevState => prevState.map(actividad => actividad.id === id ? updatedActividad : actividad));
      setEditingActividad(null);
      setUpdatedFields({});
    } catch (error) {
      console.error('Error updating actividad:', error);
      setError('Error al actualizar actividad. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (actividad) => {
    setEditingActividad(actividad);
    setUpdatedFields(actividad);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({
      ...updatedFields,
      [name]: value,
    });
  };

  return (
    <div className="ver-ejercicios-container">
      <div className="content">
        <h1>Tus Ejercicios</h1>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {actividades.map(actividad => (
              <li key={actividad.id} className={editingActividad && editingActividad.id === actividad.id ? 'editing' : ''}>
                <div className="exercise-details">
                  {actividad.tipo} - {actividad.duracion} mins - {actividad.caloriasQuemadas} kcal - {new Date(actividad.fecha).toLocaleString()}
                  <div>
                    <button onClick={() => startEditing(actividad)}>Actualizar</button>
                    <button onClick={() => handleDelete(actividad.id)}>Eliminar</button>
                  </div>
                </div>
                {editingActividad && editingActividad.id === actividad.id && (
                  <div className="update-form">
                    <input
                      type="text"
                      name="tipo"
                      value={updatedFields.tipo}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="number"
                      name="duracion"
                      value={updatedFields.duracion}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="number"
                      name="caloriasQuemadas"
                      value={updatedFields.caloriasQuemadas}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="datetime-local"
                      name="fecha"
                      value={updatedFields.fecha}
                      onChange={handleFieldChange}
                    />
                    <button onClick={() => handleUpdate(actividad.id)}>Guardar</button>
                    <button onClick={() => setEditingActividad(null)}>Cancelar</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VerEjercicios;
