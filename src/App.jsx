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
import Comidas from './Comidas';
import Consejos from './Consejos';
import Recetas from './Receta';
import Recordatorios from './Recordatorio';
import ResumenesSemanales from './ResumenesSemanales';


function App() {
  const [usuarioId, setUsuarioId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path="/login" element={<Login setUsuarioId={setUsuarioId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comidas" element={<Comidas usuarioId={usuarioId} />} />
        <Route path="/consejos" element={<Consejos />} />
        <Route path="/recetas" element={<Recetas usuarioId={usuarioId} />} />
        <Route path="/recordatorios" element={<Recordatorios usuarioId={usuarioId} />} />
        <Route path="/resumenes-semanales" element={<ResumenesSemanales usuarioId={usuarioId} />} />
      </Routes>
    </Router>
  );
}

export default App;
