import React, { useState, useEffect } from 'react';
import { getRecetas, partialUpdateReceta, deleteReceta } from '../Services/api';
import './VerRecetas.css';

const VerRecetas = ({ usuarioId }) => {
  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingReceta, setEditingReceta] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    const fetchRecetas = async () => {
      setLoading(true);
      try {
        const data = await getRecetas(usuarioId);
        setRecetas(data);
      } catch (error) {
        console.error('Error fetching recetas:', error);
        setError('Error al cargar las recetas. Por favor intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) {
      fetchRecetas();
    } else {
      setError('No hay usuario ID disponible');
    }
  }, [usuarioId]);

  const handleDelete = async (id) => {
    try {
      await deleteReceta(id);
      setRecetas(prevState => prevState.filter(receta => receta.id !== id));
    } catch (error) {
      console.error('Error deleting receta:', error);
      setError('Error al eliminar receta. Por favor intente de nuevo.');
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const updatedReceta = await partialUpdateReceta(id, { ...updatedFields, usuarioId });
      setRecetas(prevState => prevState.map(receta => receta.id === id ? updatedReceta : receta));
      setEditingReceta(null);
      setUpdatedFields({});
    } catch (error) {
      console.error('Error updating receta:', error);
      setError('Error al actualizar receta. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (receta) => {
    setEditingReceta(receta);
    setUpdatedFields(receta);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({
      ...updatedFields,
      [name]: value,
    });
  };

  return (
    <div className="ver-recetas-container">
      <div className="content">
        <h1>Tus Recetas</h1>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {recetas.map(receta => (
              <li key={receta.id} className={editingReceta && editingReceta.id === receta.id ? 'editing' : ''}>
                <div className="receta-details">
                  <h3>{receta.nombre}</h3>
                  <p>{receta.descripcion}</p>
                  <p>Ingredientes: {receta.ingredientes}</p>
                  <p>Instrucciones: {receta.instrucciones}</p>
                  <p>Calorías: {receta.calorias}</p>
                  <p>Proteínas: {receta.proteinas}</p>
                  <p>Carbohidratos: {receta.carbohidratos}</p>
                  <button onClick={() => startEditing(receta)}>Actualizar</button>
                  <button onClick={() => handleDelete(receta.id)}>Eliminar</button>
                </div>
                <div className="update-form">
                  <input
                    type="text"
                    name="nombre"
                    value={updatedFields.nombre}
                    onChange={handleFieldChange}
                  />
                  <input
                    type="text"
                    name="descripcion"
                    value={updatedFields.descripcion}
                    onChange={handleFieldChange}
                  />
                  <textarea
                    name="ingredientes"
                    value={updatedFields.ingredientes}
                    onChange={handleFieldChange}
                  />
                  <textarea
                    name="instrucciones"
                    value={updatedFields.instrucciones}
                    onChange={handleFieldChange}
                  />
                  <input
                    type="number"
                    name="calorias"
                    value={updatedFields.calorias}
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
                  <button onClick={() => handleUpdate(receta.id)}>Guardar</button>
                  <button onClick={() => setEditingReceta(null)}>Cancelar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VerRecetas;
