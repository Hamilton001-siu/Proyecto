import axios from 'axios';

const API_URL = 'http://54.196.104.225:8080'; // Cambia esto por la URL correcta de tu backend

export const fetchLogin = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password});
    localStorage.setItem('token', response.data.token);
    return response;
  };
  
  export const fetchRegister = async (data) =>{
      const response = await axios.post(`${API_URL}/auth/register`,data)
      return response;
  }


  /////
export const getComidas = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comidas:', error);
    throw error;
  }
};

export const createComida = async (comida) => {
  try {
    const response = await axios.post(API_URL, comida);
    return response.data;
  } catch (error) {
    console.error('Error creating comida:', error);
    throw error;
  }
};

export const updateComida = async (id, comida) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, comida);
    return response.data;
  } catch (error) {
    console.error('Error updating comida:', error);
    throw error;
  }
};

export const partialUpdateComida = async (id, comida) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, comida);
    return response.data;
  } catch (error) {
    console.error('Error partially updating comida:', error);
    throw error;
  }
};

export const deleteComida = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting comida:', error);
    throw error;
  } 
};
// Funciones para manejar Consejos
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

// Funciones para manejar Recetas
export const getRecetas = async (usuarioId) => {
    try {
      const response = await axios.get(`${API_URL}/recetas/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recetas:', error);
      throw error;
    }
  };
  
  export const createReceta = async (receta) => {
    try {
      const response = await axios.post(`${API_URL}/recetas`, receta);
      return response.data;
    } catch (error) {
      console.error('Error creating receta:', error);
      throw error;
    }
  };
  
  export const updateReceta = async (id, receta) => {
    try {
      const response = await axios.put(`${API_URL}/recetas/${id}`, receta);
      return response.data;
    } catch (error) {
      console.error('Error updating receta:', error);
      throw error;
    }
  };
  
  export const partialUpdateReceta = async (id, receta) => {
    try {
      const response = await axios.patch(`${API_URL}/recetas/${id}`, receta);
      return response.data;
    } catch (error) {
      console.error('Error partially updating receta:', error);
      throw error;
    }
  };
  
  export const deleteReceta = async (id) => {
    try {
      await axios.delete(`${API_URL}/recetas/${id}`);
    } catch (error) {
      console.error('Error deleting receta:', error);
      throw error;
    }
  };

// Funciones para manejar Recordatorios
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
  // Funciones para manejar Resumenes Semanales
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

// Funciones para manejar Actividades Físicas
export const getActividadesFisicas = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/actividades-fisicas/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching actividades físicas:', error);
    throw error;
  }
};

export const createActividadFisica = async (actividadFisica) => {
  try {
    const response = await axios.post(`${API_URL}/actividades-fisicas`, actividadFisica);
    return response.data;
  } catch (error) {
    console.error('Error creating actividad física:', error);
    throw error;
  }
};

export const updateActividadFisica = async (id, actividadFisica) => {
  try {
    const response = await axios.put(`${API_URL}/actividades-fisicas/${id}`, actividadFisica);
    return response.data;
  } catch (error) {
    console.error('Error updating actividad física:', error);
    throw error;
  }
};

export const partialUpdateActividadFisica = async (id, actividadFisica) => {
  try {
    const response = await axios.patch(`${API_URL}/actividades-fisicas/${id}`, actividadFisica);
    return response.data;
  } catch (error) {
    console.error('Error partially updating actividad física:', error);
    throw error;
  }
};

export const deleteActividadFisica = async (id) => {
  try {
    await axios.delete(`${API_URL}/actividades-fisicas/${id}`);
  } catch (error) {
    console.error('Error deleting actividad física:', error);
    throw error;
  }
};
  