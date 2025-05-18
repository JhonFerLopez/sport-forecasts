import { Box, Heading, ScrollView, Text, useToast, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { api } from '../api/sportsApi';
import { Loading } from '../components/common/Loading';
import { MatchCard } from '../components/home/MatchCard';
import { NewsCard } from '../components/home/NewsCard';
import { StandingsTable } from '../components/home/StandingsTable';

// Constantes
const DEFAULT_LEAGUE_ID = 239; // ID de Primera A en Colombia
const DEFAULT_SEASON_YEAR = 2023;

export const HomeScreen = ({ navigation }) => {
  const [standings, setStandings] = useState(null);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();

  // Función para cargar todos los datos
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar clasificación
      const standingsData = await api.getStandings(DEFAULT_LEAGUE_ID, DEFAULT_SEASON_YEAR);
      // console.log('standingsData');
      // console.log(standingsData);
      setStandings(standingsData);
      
      // Cargar próximos partidos
      // const matchesData = await api.getUpcomingMatches(DEFAULT_LEAGUE_ID, DEFAULT_SEASON_YEAR);
      // setMatches(matchesData);
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast.show({
        title: "Error de conexión",
        description: "No se pudieron cargar los datos. Inténtalo de nuevo.",
        status: "error",
        duration: 3000
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Manejar la acción de "pull to refresh"
  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };
  
  // Función para navegar al detalle de un equipo
  const navigateToTeamDetails = (teamId) => {
    navigation.navigate('TeamDetails', { teamId });
  };
  
  // Función para navegar al detalle de un partido
  const navigateToMatchDetails = (matchId) => {
    navigation.navigate('MatchDetails', { matchId });
  };

  if (loading && !refreshing) {
    return <Loading message="Cargando datos deportivos..." />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box p={4}>
        {/* Clasificación */}
        {standings && (
          <StandingsTable 
            teams={standings}
            onTeamPress={navigateToTeamDetails}
          />
        )}
        
        {/* Próximos partidos */}
        <VStack mb={6} mt={6}>
          <Heading size="lg" mb={4}>Próximos partidos</Heading>
          <Box bg="white" borderRadius="lg" shadow={2}>
            {matches && matches.length > 0 ? (
              matches.slice(0, 5).map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match}
                  onPress={() => navigateToMatchDetails(match.id)}
                />
              ))
            ) : (
              <Box p={4} alignItems="center">
                <Text color="coolGray.500">No hay partidos programados</Text>
              </Box>
            )}
          </Box>
        </VStack>
        
        {/* Noticias estáticas (en una app real, estas vendrían de una API) */}
        <Heading size="lg" mb={4}>Noticias destacadas</Heading>
        <NewsCard 
          title="Primera A regresa con emocionantes encuentros"
          content="Este fin de semana regresa la acción en la liga colombiana con partidos que prometen mantener al aficionado al borde del asiento."
          imageUrl="https://via.placeholder.com/400x200"
          publishedAt="2 horas"
          onPress={() => {}}
        />
      </Box>
    </ScrollView>
  );
};

// Add default export
export default HomeScreen;