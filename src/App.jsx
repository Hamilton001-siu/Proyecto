import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Comidas from './pages/Comidas';
import VerComidas from './pages/VerComidas';
import Consejos from './pages/Consejos';
import Recetas from './pages/Receta';
import Recordatorios from './pages/Recordatorio';
import VerEjercicios from './pages/VerEjercicios';
import ResumenesSemanales from './pages/ResumenesSemanales';
import ActividadFisica from './pages/ActividadFisica';

function App() {
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem('usuarioId'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/home' element={<Home />}/>
        <Route path="/login" element={<Login setUsuarioId={setUsuarioId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comidas" element={<Comidas />} />
        <Route path="/ver-comidas" element={<VerComidas usuarioId={usuarioId} />} />
        <Route path="/consejos" element={<Consejos />} />
        <Route path="/recetas" element={<Recetas usuarioId={usuarioId} />} />
        <Route path="/recordatorios" element={<Recordatorios usuarioId={usuarioId} />} />
        <Route path="/resumenes-semanales" element={<ResumenesSemanales usuarioId={usuarioId} />} />
        <Route path="/ver-ejercicios" element={<VerEjercicios usuarioId={usuarioId} />} /> 
        <Route path="/actividades-fisicas" element={<ActividadFisica usuarioId={usuarioId} />} />
      </Routes>
    </Router>
  );
}

export default App;
