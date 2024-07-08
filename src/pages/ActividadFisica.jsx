import React, { useState } from 'react';
import { createActividadFisica } from '../Services/api';
import actividadImg from '../assets/corriendddo.png'; // Asegúrate de que la ruta a la imagen sea correcta
import { useNavigate } from 'react-router-dom';
import './ActividadFisica.css';

const ActividadFisica = () => {
  const [nuevaActividad, setNuevaActividad] = useState({ tipo: '', duracion: '', caloriasQuemadas: '', fecha: '' });
  const [usuarioId] = useState(localStorage.getItem('usuarioId'));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = ['duracion', 'caloriasQuemadas'].includes(name);
    setNuevaActividad(prevState => ({
      ...prevState,
      [name]: isNumberField ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createActividadFisica({ ...nuevaActividad, usuarioId });
      setNuevaActividad({ tipo: '', duracion: '', caloriasQuemadas: '', fecha: '' });
      setError('');
      setSuccessMessage('¡Actividad creada exitosamente!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error creating actividad:', error);
      setError('Error al crear actividad. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src={actividadImg} alt="Actividad" className="actividad-img" />
        <button className="btn ver-actividades-btn" onClick={() => navigate('/ver-ejercicios')}>Ver tus ejercicios</button>
      </div>
      <div className="right-side">
        <h1>Ejercicios</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="tipo" placeholder="Tipo" value={nuevaActividad.tipo} onChange={handleInputChange} />
          <input type="number" name="duracion" placeholder="Duración (minutos)" value={nuevaActividad.duracion} onChange={handleInputChange} />
          <input type="number" name="caloriasQuemadas" placeholder="Calorías Quemadas" value={nuevaActividad.caloriasQuemadas} onChange={handleInputChange} />
          <input type="datetime-local" name="fecha" placeholder="Fecha" value={nuevaActividad.fecha} onChange={handleInputChange} />
          <button type="submit" disabled={loading} className="btn agregar-actividad-btn">
            {loading ? 'Cargando...' : 'Agregar Actividad'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActividadFisica;