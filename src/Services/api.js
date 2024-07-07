import axios from 'axios';

const API_URL = 'http://34.206.64.248:8080'; 

export const fetchLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('usuarioId', response.data.id); // Asegúrate de que tu backend envía esto
  return response;
};

export const fetchRegister = async (data) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('usuarioId', response.data.id); // Asegúrate de que tu backend envía esto
  return response;
};

// Comidas
export const getComidas = async (usuarioId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  

  try {
    const response = await axios.get(`${API_URL}/comidas/usuario/${usuarioId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching comidas:', error);
    throw error;
  }
};


export const createComida = async (comida) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.post(`${API_URL}/comidas`, comida, config);
    return response.data;
  } catch (error) {
    console.error('Error creating comida:', error);
    throw error;
  }
};

export const partialUpdateComida = async (id, comida) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.patch(`${API_URL}/comidas/${id}`, comida, config);
    return response.data;
  } catch (error) {
    console.error('Error partially updating comida:', error);
    throw error;
  }
};

export const deleteComida = async (id) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    await axios.delete(`${API_URL}/comidas/${id}`, config);
  } catch (error) {
    console.error('Error deleting comida:', error);
    throw error;
  }
};

// Consejos
export const getRandomConsejo = async () => {
  try {
    const response = await axios.get(`${API_URL}/consejos/random`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random consejo:', error);
    throw error;
  }
};

export const getAllConsejos = async () => {
  try {
    const response = await axios.get(`${API_URL}/consejos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all consejos:', error);
    throw error;
  }
};

// Recetas
export const getRecetas = async (usuarioId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.get(`${API_URL}/recetas/usuario/${usuarioId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching recetas:', error);
    throw error;
  }
};

export const createReceta = async (receta) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.post(`${API_URL}/recetas`, receta, config);
    return response.data;
  } catch (error) {
    console.error('Error creating receta:', error);
    throw error;
  }
};

export const partialUpdateReceta = async (id, receta) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.patch(`${API_URL}/recetas/${id}`, receta, config);
    return response.data;
  } catch (error) {
    console.error('Error partially updating receta:', error);
    throw error;
  }
};

export const deleteReceta = async (id) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    await axios.delete(`${API_URL}/recetas/${id}`, config);
  } catch (error) {
    console.error('Error deleting receta:', error);
    throw error;
  }
};


// Recordatorios
export const getRecordatorios = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/recordatorios/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recordatorios:', error);
    throw error;
  }
};

export const createRecordatorio = async (recordatorio, usuarioId) => {
  try {
    const response = await axios.post(`${API_URL}/recordatorios?usuarioId=${usuarioId}`, recordatorio);
    return response.data;
  } catch (error) {
    console.error('Error creating recordatorio:', error);
    throw error;
  }
};

export const updateRecordatorio = async (id, recordatorio) => {
  try {
    const response = await axios.put(`${API_URL}/recordatorios/${id}`, recordatorio);
    return response.data;
  } catch (error) {
    console.error('Error updating recordatorio:', error);
    throw error;
  }
};

export const partialUpdateRecordatorio = async (id, recordatorio) => {
  try {
    const response = await axios.patch(`${API_URL}/recordatorios/${id}`, recordatorio);
    return response.data;
  } catch (error) {
    console.error('Error partially updating recordatorio:', error);
    throw error;
  }
};

export const deleteRecordatorio = async (id) => {
  try {
    await axios.delete(`${API_URL}/recordatorios/${id}`);
  } catch (error) {
    console.error('Error deleting recordatorio:', error);
    throw error;
  }
};

// Resúmenes Semanales
export const getResumenSemanalById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/resumenes-semanales/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resumen semanal:', error);
    throw error;
  }
};

export const getAllResúmenesSemanalesByUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/resumenes-semanales/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resúmenes semanales:', error);
    throw error;
  }
};

export const generateResumenSemanal = async (usuarioId) => {
  try {
    const response = await axios.post(`${API_URL}/resumenes-semanales/generar/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error generating resumen semanal:', error);
    throw error;
  }
};

// Actividades Físicas

export const getActividadesFisicas = async (usuarioId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.get(`${API_URL}/actividades-fisicas/usuario/${usuarioId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching actividades físicas:', error);
    throw error;
  }
};

export const createActividadFisica = async (actividadFisica) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.post(`${API_URL}/actividades-fisicas`, actividadFisica, config);
    return response.data;
  } catch (error) {
    console.error('Error creating actividad física:', error);
    throw error;
  }
};

export const partialUpdateActividadFisica = async (id, actividadFisica) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    const response = await axios.patch(`${API_URL}/actividades-fisicas/${id}`, actividadFisica, config);
    return response.data;
  } catch (error) {
    console.error('Error partially updating actividad física:', error);
    throw error;
  }
};

export const deleteActividadFisica = async (id) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  };

  try {
    await axios.delete(`${API_URL}/actividades-fisicas/${id}`, config);
  } catch (error) {
    console.error('Error deleting actividad física:', error);
    throw error;
  }
};
