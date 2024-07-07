import React, { useState } from 'react';
import { createComida } from '../Services/api';
import musloDePollo from '../assets/muslodepollo.png';
import { useNavigate } from 'react-router-dom';
import './Comidas.css';

const Comidas = () => {
  const [nuevaComida, setNuevaComida] = useState({
    nombre: '', 
    tipo: '', 
    proteinas: '', 
    carbohidratos: '', 
    calorias: '', 
    fecha: ''
  });
  const [usuarioId] = useState(localStorage.getItem('usuarioId'));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await createComida({ ...nuevaComida, usuarioId });
      setNuevaComida({ nombre: '', tipo: '', proteinas: '', carbohidratos: '', calorias: '', fecha: '' });
      setError('');
      setSuccessMessage('¡Comida creada exitosamente!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error creating comida:', error);
      setError('Error al crear comida. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src={musloDePollo} alt="Muslo de pollo" className="muslo-img" />
        <button className="btn ver-comidas-btn" onClick={() => navigate('/ver-comidas')}>Ver tus comidas</button>
      </div>
      <div className="right-side">
        <h1>Comidas</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
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
