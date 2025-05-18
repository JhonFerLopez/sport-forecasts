import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = {
  FOOTBALL_DATA: 'https://v3.football.api-sports.io',
  HOST_FOOTBALL: 'v3.football.api-sports.io',
  // Añade más proveedores según necesites
};

// Seleccionar la API a usar
const CURRENT_API = API_URL.FOOTBALL_DATA;
const HOST_FOOTBALL = API_URL.HOST_FOOTBALL;
const API_KEY = '51a41997b232ece01900c068c7130323'; // Reemplaza con tu clave de API

// Cliente API con intercepción para añadir token en cada solicitud
export const apiClient = axios.create({
  baseURL: CURRENT_API,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-host': HOST_FOOTBALL,
    'x-apisports-key': API_KEY
  }
});

// Interceptor para añadir token de autenticación si existe
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta (refresh token, etc)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (no autorizado) y no hemos intentado actualizar el token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Lógica para renovar el token
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
        // Si falla la renovación, limpiar tokens y redirigir a login
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('refreshToken');
        // Aquí podrías implementar algún tipo de redirección a login
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Funciones para obtener datos deportivos
export const api = {
  // Ligas
  getLeagues: async () => {
    try {
      const response = await apiClient.get('/competitions');
      return response.data.competitions;
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw error;
    }
  },
  
  // Equipos de una liga
  getTeamsByLeague: async (leagueId) => {
    try {
      const response = await apiClient.get(`/competitions/${leagueId}/teams`);
      return response.data.teams;
    } catch (error) {
      console.error(`Error fetching teams for league ${leagueId}:`, error);
      throw error;
    }
  },
  
  // Detalle de un equipo
  getTeamDetails: async (teamId) => {
    try {
      const response = await apiClient.get(`/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for team ${teamId}:`, error);
      throw error;
    }
  },
  
  // Partidos de un equipo
  getTeamMatches: async (teamId, status = 'SCHEDULED') => {
    try {
      // status puede ser: SCHEDULED, LIVE, IN_PLAY, PAUSED, FINISHED, POSTPONED, SUSPENDED, CANCELED
      const response = await apiClient.get(`/teams/${teamId}/matches?status=${status}`);
      return response.data.matches;
    } catch (error) {
      console.error(`Error fetching matches for team ${teamId}:`, error);
      throw error;
    }
  },
  
  // Obtener la clasificación de una liga
  getStandings: async (leagueId, season = 2023) => {
    try {
      // URL correcto para obtener clasificaciones según la API-Sports
      const url = `/standings?league=${leagueId}&season=${season}`;
      
      const response = await apiClient.get(url);
      
      // Basado en el formato de respuesta que has compartido
      if (response.data && 
          response.data.response && 
          response.data.response.length > 0 && 
          response.data.response[0].league && 
          response.data.response[0].league.standings && 
          response.data.response[0].league.standings.length > 0) {
        
        // Devolvemos el primer grupo de clasificación (generalmente el principal)
        return response.data.response[0].league.standings[0].map(team => ({
          team: {
            id: team.team.id,
            name: team.team.name,
            crest: team.team.logo
          },
          position: team.rank,
          playedGames: team.all.played,
          won: team.all.win,
          draw: team.all.draw,
          lost: team.all.lose,
          points: team.points,
          goalDifference: team.goalsDiff,
          goalsFor: team.all.goals.for,
          goalsAgainst: team.all.goals.against,
          form: team.form
        }));
      }
      
      throw new Error('No standings data found in response');
    } catch (error) {
      console.error(`Error fetching standings for league ${leagueId}:`, error);
      throw error;
    }
  },
  
  // Próximos partidos
  getUpcomingMatches: async (dateFrom = null, dateTo = null) => {
    try {
      // Si no se proporcionan fechas, usamos hoy y +7 días
      if (!dateFrom) {
        const today = new Date();
        dateFrom = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        dateTo = nextWeek.toISOString().split('T')[0];
      }
      
      const response = await apiClient.get(`/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
      return response.data.matches;
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      throw error;
    }
  },
  
  // Jugadores de un equipo
  getTeamPlayers: async (teamId) => {
    try {
      const response = await apiClient.get(`/teams/${teamId}`);
      return response.data.squad;
    } catch (error) {
      console.error(`Error fetching players for team ${teamId}:`, error);
      throw error;
    }
  },
  
  // Buscar equipos
  searchTeams: async (name) => {
    try {
      const response = await apiClient.get(`/teams?name=${name}`);
      return response.data.teams;
    } catch (error) {
      console.error(`Error searching teams with name ${name}:`, error);
      throw error;
    }
  },
  
  // Buscar jugadores
  searchPlayers: async (name) => {
    try {
      // Nota: algunas APIs tienen endpoint específico para jugadores, otras no
      const response = await apiClient.get(`/players?name=${name}`);
      return response.data.players;
    } catch (error) {
      console.error(`Error searching players with name ${name}:`, error);
      throw error;
    }
  }
};