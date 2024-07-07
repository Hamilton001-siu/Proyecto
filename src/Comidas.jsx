import React, { useState, useEffect } from 'react';
import { getComidas, createComida, updateComida, deleteComida } from './Services/api';
import musloDePollo from './assets/muslodepollo.png';
import './Comidas.css';

const Comidas = () => {
  const [comidas, setComidas] = useState([]);
  const [nuevaComida, setNuevaComida] = useState({
    nombre: '', 
    tipo: '', 
    proteinas: '', 
    carbohidratos: '', 
    calorias: '', 
    fecha: ''
  });
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem('usuarioId'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Usuario ID al iniciar:", usuarioId); // Verificar que el ID se recupera correctamente al cargar el componente.
  }, [usuarioId]);

  useEffect(() => {
    if (!usuarioId) {
      setError('No hay usuario ID disponible');
      return;
    }
    const fetchComidas = async () => {
      try {
        const data = await getComidas(usuarioId);
        setComidas(data);
      } catch (error) {
        console.error('Error fetching comidas:', error);
        setError('Error al cargar las comidas. Por favor intente de nuevo.');
      }
    };

    fetchComidas();
  }, [usuarioId]);

  useEffect(() => {
    const handleStorageChange = () => {
      const id = localStorage.getItem('usuarioId');
      console.log("ID desde el almacenamiento local:", id);
      setUsuarioId(id);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = ['proteinas', 'carbohidratos', 'calorias'].includes(name);
    setNuevaComida(prevState => ({
      ...prevState,
      [name]: isNumberField ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdComida = await createComida({...nuevaComida, usuarioId});
      setComidas(prevState => [...prevState, createdComida]);
      setNuevaComida({ nombre: '', tipo: '', proteinas: '', carbohidratos: '', calorias: '', fecha: '' });
      setError('');
    } catch (error) {
      console.error('Error creating comida:', error);
      setError('Error al crear comida. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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
      const updatedComida = await updateComida(id, {...nuevaComida, usuarioId});
      setComidas(prevState => prevState.map(comida => comida.id === id ? updatedComida : comida));
      setNuevaComida({ nombre: '', tipo: '', proteinas: '', carbohidratos: '', calorias: '', fecha: '' });
    } catch (error) {
      console.error('Error updating comida:', error);
      setError('Error al actualizar comida. Por favor intente de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src={musloDePollo} alt="Muslo de pollo" className="muslo-img" />
        <button className="btn ver-comidas-btn">Ver tus comidas</button>
      </div>
      <div className="right-side">
        <h1>Comidas</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={nuevaComida.nombre} onChange={handleInputChange} />
          <input type="text" name="tipo" placeholder="Tipo" value={nuevaComida.tipo} onChange={handleInputChange} />
          <input type="number" name="proteinas" placeholder="Proteínas" value={nuevaComida.proteinas} onChange={handleInputChange} />
          <input type="number" name="carbohidratos" placeholder="Carbohidratos" value={nuevaComida.carbohidratos} onChange={handleInputChange} />
          <input type="number" name="calorias" placeholder="Calorías" value={nuevaComida.calorias} onChange={handleInputChange} />
          <input type="date" name="fecha" placeholder="Fecha" value={nuevaComida.fecha} onChange={handleInputChange} />
          <button type="submit" disabled={loading} className="btn agregar-comida-btn">{loading ? 'Cargando...' : 'Agregar Comida'}</button>
        </form>
      </div>
    </div>
  );
};

export default Comidas;
