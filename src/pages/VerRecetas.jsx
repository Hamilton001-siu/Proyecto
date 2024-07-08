import React, { useState, useEffect } from 'react';
import { getRecetas, createReceta, partialUpdateReceta, deleteReceta } from '../Services/api';
import './VerRecetas.css';

const VerRecetas = ({ usuarioId }) => {
  const [recetas, setRecetas] = useState([]);
  const [editingReceta, setEditingReceta] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const data = await getRecetas(usuarioId);
        setRecetas(data);
      } catch (error) {
        console.error('Error fetching recetas:', error);
      }
    };

    fetchRecetas();
  }, [usuarioId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const updatedReceta = await partialUpdateReceta(id, { ...updatedFields, usuarioId });
      setRecetas(prevState => prevState.map(receta => receta.id === id ? updatedReceta : receta));
      setEditingReceta(null);
      setUpdatedFields({});
    } catch (error) {
      console.error('Error updating receta:', error);
      setError('Error al actualizar receta. Por favor intente de nuevo.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReceta(id);
      setRecetas(prevState => prevState.filter(receta => receta.id !== id));
    } catch (error) {
      console.error('Error deleting receta:', error);
    }
  };

  const toggleEditing = (id) => {
    if (editingReceta === id) {
      setEditingReceta(null);
    } else {
      setEditingReceta(id);
    }
  };

  return (
    <div className="ver-recetas-container">
      <div className="content">
        <h1>Tus Recetas</h1>
        {error && <p className="error-message">{error}</p>}
        <ul>
          {recetas.map((receta) => (
            <li key={receta.id} className={editingReceta === receta.id ? 'editing' : ''}>
              <div className="receta-details">
                <h3>{receta.nombre}</h3>
                <p>{receta.descripcion}</p>
                <p>Ingredientes: {receta.ingredientes}</p>
                <p>Instrucciones: {receta.instrucciones}</p>
                <p>Calorías: {receta.calorias}</p>
                <p>Proteínas: {receta.proteinas}</p>
                <p>Carbohidratos: {receta.carbohidratos}</p>
              </div>
              <div className="actions">
                <button className="update-btn" onClick={() => toggleEditing(receta.id)}>Actualizar</button>
                <button className="delete-btn" onClick={() => handleDelete(receta.id)}>Eliminar</button>
              </div>
              {editingReceta === receta.id && (
                <form className="update-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(receta.id); }}>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={updatedFields.nombre || receta.nombre}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={updatedFields.descripcion || receta.descripcion}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="ingredientes"
                    placeholder="Ingredientes"
                    value={updatedFields.ingredientes || receta.ingredientes}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="instrucciones"
                    placeholder="Instrucciones"
                    value={updatedFields.instrucciones || receta.instrucciones}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="calorias"
                    placeholder="Calorías"
                    value={updatedFields.calorias || receta.calorias}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="proteinas"
                    placeholder="Proteínas"
                    value={updatedFields.proteinas || receta.proteinas}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="carbohidratos"
                    placeholder="Carbohidratos"
                    value={updatedFields.carbohidratos || receta.carbohidratos}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="btn save-btn">Guardar</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VerRecetas;
