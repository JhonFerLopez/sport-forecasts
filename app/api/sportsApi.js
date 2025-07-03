import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = {
  FOOTBALL_DATA: 'https://apiclient.besoccerapps.com/scripts/api/api.php',
  HOST_FOOTBALL: 'https://apiclient.besoccerapps.com/scripts/api/api.php',
};

// Seleccionar la API a usar
const CURRENT_API = API_URL.FOOTBALL_DATA;
const FORMAT = 'json';
const TZ = 'Europe/Madrid';
const API_KEY = 'e89de929584a6a8d0c028bc4bc66c6a0'; // Reemplaza con tu clave de API - 51a41997b232ece01900c068c7130323

// Cliente API con intercepción para añadir token en cada solicitud
export const apiClient = axios.create({
  baseURL: CURRENT_API,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    'key': API_KEY,
    'tz': TZ,
    'format': FORMAT
  }
});

// Interceptor para añadir token de autenticación si existe
apiClient.interceptors.request.use(
  async (config) => {
    // Añadir token de autenticación si existe (para otras APIs)
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Asegurar que siempre se incluyan los parámetros base
    config.params = {
      key: API_KEY,
      tz: TZ,
      format: FORMAT,
      ...config.params // Permite sobrescribir o añadir parámetros específicos
    };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (no autorizado) y no hemos intentado actualizar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Lógica para renovar el token (si la API lo soporta)
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post(`${CURRENT_API}/auth/refresh`, {
            refreshToken
          });
          
          const { token } = response.data;
          
          // Guardar nuevo token
          await AsyncStorage.setItem('authToken', token);
          
          // Actualizar el header y reintentar la petición
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Si falla la renovación, limpiar tokens
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Funciones para obtener datos deportivos
export const footballAPI  = {
  // Ligas
  getCategories: async (filter = 'my_leagues') => {
    try {
      const response = await apiClient.get('', {
        params: {
          req: 'categories',
          filter: filter
        }
      });
      return response.data?.category;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};