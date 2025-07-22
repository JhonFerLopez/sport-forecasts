import { Block } from 'galio-framework';
import { ScrollView, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { footballAPI } from '../api/sportsApi';
import { Loading } from '../components/common/Loading';
import LeagueListItem from '../components/home/LeagueListItem';

// Constantes

export const HomeScreen = ({ navigation }) => {
  const [leagues, setLeagues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();

  // Función para cargar todos los datos
  const loadData = async () => {
    try {
      setLoading(true);      
      // Cargar clasificación
      const leaguesData = await footballAPI.getCategories();  
      
      setLeagues(leaguesData);            
    } catch (error) {
      // console.error('Error loading data:', error);
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
  
  // // Función para navegar al detalle de un equipo
  // const navigateToTeamDetails = (teamId) => {
  //   navigation.navigate('TeamDetails', { teamId });
  // };
  
  // // Función para navegar al detalle de un partido
  // const navigateToMatchDetails = (matchId) => {
  //   navigation.navigate('MatchDetails', { matchId });
  // };

  if (loading && !refreshing) {
    return <Loading message="Cargando datos deportivos..." />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Block p={4} style={{ backgroundColor: 'white' }}>
        {leagues && leagues.map((league, index) => (
          <LeagueListItem
            key={league.league_id}
            league={league}
            horizontal={true} // true para layout horizontal
            full={false} // true para imagen más grande
            countryColor="gray" // Color del texto del país
            style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
          />
        ))}
      </Block>    
    </ScrollView>
  );
};

// Add default export
export default HomeScreen;