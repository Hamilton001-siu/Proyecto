import React, { useState } from 'react';
import { fetchRegister } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaVenusMars, FaWeight, FaRulerVertical, FaCalendar } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [genero, setGenero] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      nombreUsuario: username,
      contrasena: password,
      altura: parseFloat(altura),
      peso: parseFloat(peso),
      genero: genero,
      email: email,
      edad: parseInt(edad, 10),
    };

    try {
      const res = await fetchRegister(registerData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuarioId', res.data.id); // Asegúrate de que 'id' es el campo correcto en la respuesta del backend
      navigate('/login'); // Redirecciona al login o directamente a 'home' si el usuario ya está autenticado
    } catch (error) {
      console.log(error);
      alert('Error during registration');
    }
  };

  return (
    <div className="wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-box">
          <FaUser />
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      
        <div className="input-box">
          <FaCalendar />
          <input
            type="number"
            placeholder="Edad"
            required
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <div className="input-box">
          <FaRulerVertical />
          <input
            type="number"
            step="0.01"
            placeholder="Altura"
            required
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />
        </div>
        <div className="input-box">
          <FaWeight />
          <input
            type="number"
            step="0.01"
            placeholder="Peso"
            required
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>
        <div className="input-box">
          <FaVenusMars />
          <input
            type="text"
            placeholder="Género"
            required
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
