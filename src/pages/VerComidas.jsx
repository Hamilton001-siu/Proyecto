import React, { useState, useEffect } from 'react';
import { getComidas, partialUpdateComida, deleteComida } from '../Services/api';
import './VerComidas.css';

const VerComidas = () => {
  const [comidas, setComidas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingComida, setEditingComida] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const fetchComidas = async () => {
      setLoading(true);
      try {
        const data = await getComidas(usuarioId);
        setComidas(data);
      } catch (error) {
        console.error('Error fetching comidas:', error);
        setError('Error al cargar las comidas. Por favor intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      fetchComidas();
    } else {
      setError('No hay usuario ID disponible');
    }
  }, [usuarioId]);

  const handleDelete = async (id) => {
    try {
      await deleteComida(id);
      setComidas(prevState => prevState.filter(comida => comida.id !== id));
    } catch (error) {
      console.error('Error deleting comida:', error);
      setError('Error al eliminar comida. Por favor intente de nuevo.');
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const updatedComida = await partialUpdateComida(id, { ...updatedFields, usuarioId });
      setComidas(prevState => prevState.map(comida => comida.id === id ? updatedComida : comida));
      setEditingComida(null);
      setUpdatedFields({});
    } catch (error) {
      console.error('Error updating comida:', error);
      setError('Error al actualizar comida. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (comida) => {
    setEditingComida(comida);
    setUpdatedFields(comida);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({
      ...updatedFields,
      [name]: value,
    });
  };

  return (
    <div className="ver-comidas-container">
      <div className="content">
        <h1>Tus Comidas</h1>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {comidas.map(comida => (
              <li key={comida.id} className="comida-item">
                {editingComida && editingComida.id === comida.id ? (
                  <div className="editing-fields">
                    <input
                      type="text"
                      name="nombre"
                      value={updatedFields.nombre}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="text"
                      name="tipo"
                      value={updatedFields.tipo}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="number"
                      name="proteinas"
                      value={updatedFields.proteinas}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="number"
                      name="carbohidratos"
                      value={updatedFields.carbohidratos}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="number"
                      name="calorias"
                      value={updatedFields.calorias}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="date"
                      name="fecha"
                      value={updatedFields.fecha}
                      onChange={handleFieldChange}
                    />
                    <div className="buttons">
                      <button className="btn save-btn" onClick={() => handleUpdate(comida.id)}>Guardar</button>
                      <button className="btn cancel-btn" onClick={() => setEditingComida(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="comida-details">
                    {comida.nombre} - {comida.tipo} - {comida.proteinas}g - {comida.carbohidratos}g - {comida.calorias}cal - {comida.fecha}
                    <div className="buttons">
                      <button className="btn update-btn" onClick={() => startEditing(comida)}>Actualizar</button>
                      <button className="btn delete-btn" onClick={() => handleDelete(comida.id)}>Eliminar</button>
                    </div>
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

export default VerComidas;
