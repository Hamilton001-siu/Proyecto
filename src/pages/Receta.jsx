import React, { useState, useEffect } from 'react';
import { getRecetas, createReceta, updateReceta, partialUpdateReceta, deleteReceta } from '../Services/api';

const Recetas = ({ usuarioId }) => {
  const [recetas, setRecetas] = useState([]);
  const [nuevaReceta, setNuevaReceta] = useState({
    nombre: '',
    descripcion: '',
    ingredientes: '',
    instrucciones: '',
    calorias: '',
    proteinas: '',
    carbohidratos: ''
  });

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
    setNuevaReceta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdReceta = await createReceta(nuevaReceta);
      setRecetas((prevState) => [...prevState, createdReceta]);
      setNuevaReceta({
        nombre: '',
        descripcion: '',
        ingredientes: '',
        instrucciones: '',
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0
      });
    } catch (error) {
      console.error('Error creating receta:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReceta(id);
      setRecetas((prevState) => prevState.filter((receta) => receta.id !== id));
    } catch (error) {
      console.error('Error deleting receta:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedReceta = await updateReceta(id, nuevaReceta);
      setRecetas((prevState) => prevState.map((receta) => (receta.id === id ? updatedReceta : receta)));
      setNuevaReceta({
        nombre: '',
        descripcion: '',
        ingredientes: '',
        instrucciones: '',
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0
      });
    } catch (error) {
      console.error('Error updating receta:', error);
    }
  };

  return (
    <div>
      <h1>Recetas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevaReceta.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={nuevaReceta.descripcion}
          onChange={handleInputChange}
        />
        <textarea
          name="ingredientes"
          placeholder="Ingredientes"
          value={nuevaReceta.ingredientes}
          onChange={handleInputChange}
        />
        <textarea
          name="instrucciones"
          placeholder="Instrucciones"
          value={nuevaReceta.instrucciones}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="calorias"
          placeholder="Calorías"
          value={nuevaReceta.calorias}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="proteinas"
          placeholder="Proteínas"
          value={nuevaReceta.proteinas}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="carbohidratos"
          placeholder="Carbohidratos"
          value={nuevaReceta.carbohidratos}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Receta</button>
      </form>

      <ul>
        {recetas.map((receta) => (
          <li key={receta.id}>
            <h3>{receta.nombre}</h3>
            <p>{receta.descripcion}</p>
            <p>Ingredientes: {receta.ingredientes}</p>
            <p>Instrucciones: {receta.instrucciones}</p>
            <p>Calorías: {receta.calorias}</p>
            <p>Proteínas: {receta.proteinas}</p>
            <p>Carbohidratos: {receta.carbohidratos}</p>
            <button onClick={() => handleDelete(receta.id)}>Eliminar</button>
            <button onClick={() => handleUpdate(receta.id)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recetas;
