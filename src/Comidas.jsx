import React, { useState, useEffect } from 'react';
import { getComidas, createComida, updateComida, partialUpdateComida, deleteComida } from './Services/api';

const Comidas = ({ usuarioId }) => {
  const [comidas, setComidas] = useState([]);
  const [nuevaComida, setNuevaComida] = useState({ nombre: '', tipo: '', proteinas: '', carbohidratos: '', calorias: '', fecha: '' });

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const data = await getComidas(usuarioId);
        setComidas(data);
      } catch (error) {
        console.error('Error fetching comidas:', error);
      }
    };

    fetchComidas();
  }, [usuarioId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaComida((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdComida = await createComida(nuevaComida);
      setComidas((prevState) => [...prevState, createdComida]);
      setNuevaComida({ nombre: '', tipo: '', proteinas: 0, carbohidratos: 0, calorias: 0, fecha: '' });
    } catch (error) {
      console.error('Error creating comida:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComida(id);
      setComidas((prevState) => prevState.filter((comida) => comida.id !== id));
    } catch (error) {
      console.error('Error deleting comida:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedComida = await updateComida(id, nuevaComida);
      setComidas((prevState) => prevState.map((comida) => (comida.id === id ? updatedComida : comida)));
      setNuevaComida({ nombre: '', tipo: '', proteinas: 0, carbohidratos: 0, calorias: 0, fecha: '' });
    } catch (error) {
      console.error('Error updating comida:', error);
    }
  };

  return (
    <div>
      <h1>Comidas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevaComida.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={nuevaComida.tipo}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="proteinas"
          placeholder="Proteínas"
          value={nuevaComida.proteinas}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="carbohidratos"
          placeholder="Carbohidratos"
          value={nuevaComida.carbohidratos}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="calorias"
          placeholder="Calorías"
          value={nuevaComida.calorias}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="fecha"
          placeholder="Fecha"
          value={nuevaComida.fecha}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Comida</button>
      </form>

      <ul>
        {comidas.map((comida) => (
          <li key={comida.id}>
            {comida.nombre} - {comida.tipo} - {comida.proteinas}g - {comida.carbohidratos}g - {comida.calorias}cal - {comida.fecha}
            <button onClick={() => handleDelete(comida.id)}>Eliminar</button>
            <button onClick={() => handleUpdate(comida.id)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comidas;
