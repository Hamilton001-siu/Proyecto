import React, { useState } from 'react';
import { createReceta } from '../Services/api';
import recetaImage from '../assets/receta.png';
import { useNavigate } from 'react-router-dom';
import './Receta.css';

const Receta = () => {
  const [nuevaReceta, setNuevaReceta] = useState({
    nombre: '',
    descripcion: '',
    ingredientes: '',
    instrucciones: '',
    calorias: '',
    proteinas: '',
    carbohidratos: ''
  });
  const [usuarioId] = useState(localStorage.getItem('usuarioId'));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = ['calorias', 'proteinas', 'carbohidratos'].includes(name);
    setNuevaReceta(prevState => ({
      ...prevState,
      [name]: isNumberField ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReceta({ ...nuevaReceta, usuarioId });
      setNuevaReceta({
        nombre: '',
        descripcion: '',
        ingredientes: '',
        instrucciones: '',
        calorias: '',
        proteinas: '',
        carbohidratos: ''
      });
      setError('');
      setSuccessMessage('¡Receta creada exitosamente!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error creating receta:', error);
      setError('Error al crear receta. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src={recetaImage} alt="Receta" className="receta-img" />
        <button className="btn ver-recetas-btn" onClick={() => navigate('/ver-recetas')}>Ver tus recetas</button>
      </div>
      <div className="right-side">
        <h1>Recetas</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={nuevaReceta.nombre} onChange={handleInputChange} />
          <input type="text" name="descripcion" placeholder="Descripción" value={nuevaReceta.descripcion} onChange={handleInputChange} />
          <textarea name="ingredientes" placeholder="Ingredientes" value={nuevaReceta.ingredientes} onChange={handleInputChange} />
          <textarea name="instrucciones" placeholder="Instrucciones" value={nuevaReceta.instrucciones} onChange={handleInputChange} />
          <input type="number" name="calorias" placeholder="Calorías" value={nuevaReceta.calorias} onChange={handleInputChange} />
          <input type="number" name="proteinas" placeholder="Proteínas" value={nuevaReceta.proteinas} onChange={handleInputChange} />
          <input type="number" name="carbohidratos" placeholder="Carbohidratos" value={nuevaReceta.carbohidratos} onChange={handleInputChange} />
          <button type="submit" disabled={loading} className="btn agregar-receta-btn">{loading ? 'Cargando...' : 'Agregar Receta'}</button>
        </form>
      </div>
    </div>
  );
};

export default Receta;
