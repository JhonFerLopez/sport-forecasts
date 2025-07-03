import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Heading, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { SafeAreaView, ScrollView } from 'react-native';

// Componente de pantalla completa
export const LeagueDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { league } = route.params;

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
              onPress={() => {
                // Navegar a clasificación
                console.log('Ver clasificación');
              }}
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
            
            <Pressable 
              bg="tertiary.600" 
              p={4} 
              borderRadius="lg"
              onPress={() => {
                // Navegar a estadísticas
                console.log('Ver estadísticas');
              }}
            >
              <Text color="white" textAlign="center" fontWeight="bold">
                Ver Estadísticas
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

// // Componente original para usar dentro de otras pantallas
// export const LeagueDetails = ({ teams, title = "Clasificación" }) => {
//   if (!teams || teams.length === 0) {
//     return null;
//   }

//   return (
//     <Box>
//       <HStack justifyContent="space-between" alignItems="center" mb={4}>
//         <Heading size="lg">{title}</Heading>
//         <Text fontSize="sm" color="primary.500">Ver todo</Text>
//       </HStack>
      
//       <Box bg="white" borderRadius="lg" shadow={2} mb={6}>
//         <HStack p={3} bg="primary.600" borderTopRadius="lg" justifyContent="space-between">
//           <Text color="white" fontWeight="bold" width="40%">Equipo</Text>
//           <Text color="white" fontWeight="bold" width="15%" textAlign="center">PJ</Text>
//           <Text color="white" fontWeight="bold" width="15%" textAlign="center">PG</Text>
//           <Text color="white" fontWeight="bold" width="15%" textAlign="center">PE</Text>
//           <Text color="white" fontWeight="bold" width="15%" textAlign="center">PP</Text>
//         </HStack>
        
//         {teams.map((team, index) => (
//           <HStack key={index} p={3} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderBottomColor="coolGray.100">
//             <HStack width="40%" alignItems="center" space={2}>
//               <Text width="20px" fontWeight={index <= 2 ? "bold" : "normal"} color={index <= 2 ? "primary.600" : "black"}>
//                 {index + 1}
//               </Text>
//               <Image source={{ uri: team.logo || team.crest }} alt={team.name} size="xs" />
//               <Text fontWeight="medium" isTruncated>{team.name}</Text>
//             </HStack>
//             <Text width="15%" textAlign="center">{team.playedGames || '0'}</Text>
//             <Text width="15%" textAlign="center" fontWeight="medium">{team.won || '0'}</Text>
//             <Text width="15%" textAlign="center">{team.draw || '0'}</Text>
//             <Text width="15%" textAlign="center">{team.lost || '0'}</Text>
//           </HStack>
//         ))}
//       </Box>
//     </Box>
//   );
// };