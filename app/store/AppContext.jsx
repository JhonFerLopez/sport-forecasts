import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
// import { fetchUserProfile } from '../api/sportsApi_old';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favoriteTeamId, setFavoriteTeamId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos de usuario al iniciar
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Cargar datos guardados localmente
        const userId = await AsyncStorage.getItem('userId');
        const favoriteId = await AsyncStorage.getItem('favoriteTeamId');
        
        // if (userId) {
        //   // Obtener datos actualizados de la API
        //   const userData = await fetchUserProfile(userId);
        //   setUser(userData);
        // }
        
        if (favoriteId) {
          setFavoriteTeamId(parseInt(favoriteId, 10));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  // Guardar preferencia de equipo favorito
  const saveFavoriteTeam = async (teamId) => {
    try {
      await AsyncStorage.setItem('favoriteTeamId', teamId.toString());
      setFavoriteTeamId(teamId);
      return true;
    } catch (error) {
      console.error('Error saving favorite team:', error);
      return false;
    }
  };

  // Iniciar sesión
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // Aquí iría una llamada a tu API de autenticación
      const response = await sportsApiClient.post('/auth/login', credentials);
      const { user, token } = response.data;
      
      // Guardar token y datos de usuario
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userId', user.id.toString());
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      setUser(null);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  const value = {
    user,
    isLoading,
    favoriteTeamId,
    saveFavoriteTeam,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
