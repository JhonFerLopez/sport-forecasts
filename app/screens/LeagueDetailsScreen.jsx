import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Heading, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ClassificationTable } from '../components/home/ClassificationTable';

// Componente de pantalla completa
export const LeagueDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { league } = route.params;
  const [showTable, setShowTable] = useState(false);

  if (showTable) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Box bg="white" px={4} py={3} shadow={1}>
          <HStack alignItems="center" space={3}>
            <Text fontSize="lg" fontWeight="bold" flex={1}>
              { league.shortName || league.name } 
            </Text>
          </HStack>
        </Box>
        <ScrollView>
          <Box p={4}>
            <ClassificationTable league={league} />
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView>
        <Box p={4}>
          {/* Header de la liga */}
          <Box bg="white" borderRadius="lg" shadow={2} mb={6} p={4}>
            <HStack alignItems="center" space={4}>
              <Image 
                source={{ uri: league.logo }} 
                alt={league.name}
                size="lg"
                borderRadius="md"
              />
              <VStack flex={1}>
                <Heading size="lg">{league.shortName || league.name}</Heading>
                <Text color="gray.600">{league.country} - {league.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  Temporada: {league.year} | {league.start_date} - {league.end_date}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Jornada actual: {league.current_round}/{league.total_rounds}
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Información de la competición */}
          <Box bg="white" borderRadius="lg" shadow={2} mb={6} p={4}>
            <Heading size="md" mb={3}>Información de la Liga</Heading>
            <VStack space={2}>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Tipo:</Text>
                <Text fontWeight="medium">{league.competition_type_detail}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Total de equipos:</Text>
                <Text fontWeight="medium">{league.total_group}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Jornadas:</Text>
                <Text fontWeight="medium">{league.total_rounds}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="gray.600">Nivel:</Text>
                <Text fontWeight="medium">Nivel {league.level}</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Leyenda de posiciones */}
          {league.legend_dict && league.legend_dict.length > 0 && (
            <Box bg="white" borderRadius="lg" shadow={2} mb={6} p={4}>
              <Heading size="md" mb={3}>Clasificación</Heading>
              <VStack space={2}>
                {league.legend_dict.map((item, index) => (
                  <HStack key={index} alignItems="center" space={3}>
                    <Box 
                      width="6" 
                      height="6" 
                      borderRadius="sm"
                      bg={getPositionColor(item.pos)}
                    />
                    <Text flex={1}>{item.title}</Text>
                    <Text color="gray.500">Pos. {item.pos}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}

          {/* Botones de acción */}
          <VStack space={3}>
            <Pressable 
              bg="primary.600" 
              p={4} 
              borderRadius="lg"
              onPress={() => setShowTable(true)}
            >
              <Text color="white" textAlign="center" fontWeight="bold">
                Ver Clasificación
              </Text>
            </Pressable>
            
            <Pressable 
              bg="secondary.600" 
              p={4} 
              borderRadius="lg"
              onPress={() => {
                // Navegar a partidos
                console.log('Ver partidos');
              }}
            >
              <Text color="white" textAlign="center" fontWeight="bold">
                Ver Partidos
              </Text>
            </Pressable>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

// Función helper para colores de posición
const getPositionColor = (position) => {
  if (position === 1) return 'yellow.400'; // Campeón
  if (position === 2) return 'blue.500'; // Champions
  if (position === 3) return 'orange.500'; // Europa League
  if (position === 5) return 'green.500'; // Conference League
  if (position === 6) return 'red.500'; // Descenso
  return 'gray.300';
};
