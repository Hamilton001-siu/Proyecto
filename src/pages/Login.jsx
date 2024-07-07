import React, { useState } from 'react';
import { fetchLogin } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css';

const Login = ({ setUsuarioId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchLogin(email, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuarioId', res.data.id); // Asegúrate de que 'id' es el campo correcto en la respuesta del backend
      setUsuarioId(res.data.id); // Asumiendo que la respuesta contiene el ID del usuario
      navigate('/home'); // Cambié a '/comidas' en lugar de '/dashboard'
    } catch (error) {
      console.log(error);
      alert('User or pass incorrect');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <FaUser />
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
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
