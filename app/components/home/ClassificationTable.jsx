import { Box, Divider, Heading, HStack, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';

// Componente de tabla de clasificación
export const ClassificationTable = ({ league }) => {
  // Aquí deberías hacer la llamada a tu API para obtener la tabla
  // Por ahora uso datos de ejemplo
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular llamada a API
    const fetchTableData = async () => {
      try {
        setLoading(true);
        // Aquí harías tu llamada real a la API
        // const response = await fetch(`/api/leagues/${league.id}/table`);
        // const data = await response.json();
        
        // Datos de ejemplo mientras tanto
        const mockData = [
          {
            position: 1,
            team: "Real Madrid",
            points: 45,
            goalsFor: 38,
            goalsAgainst: 15,
            goalDifference: 23,
            played: 18
          },
          {
            position: 2,
            team: "Barcelona",
            points: 42,
            goalsFor: 35,
            goalsAgainst: 18,
            goalDifference: 17,
            played: 18
          },
          {
            position: 3,
            team: "Atlético Madrid",
            points: 40,
            goalsFor: 32,
            goalsAgainst: 20,
            goalDifference: 12,
            played: 18
          }
        ];
        
        setTableData(mockData);
      } catch (error) {
        console.error('Error fetching table data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [league.id]);

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" p={8}>
        <Text>Cargando tabla...</Text>
      </Box>
    );
  }

  return (
    <VStack space={4}>
      {/* Título */}
      <Heading size="lg" textAlign="center" color="primary.600">
        Tabla de Posiciones
      </Heading>
      <Text textAlign="center" color="gray.600" fontSize="sm">
        {league.name} - Temporada {league.year}
      </Text>
      
      <Divider />
      
      {/* Encabezados de la tabla */}
      <HStack 
        bg="gray.100" 
        p={3} 
        borderRadius="md"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold" fontSize="xs" flex={0.6}>Pos</Text>
        <Text fontWeight="bold" fontSize="xs" flex={2.5}>Equipo</Text>
        <Text fontWeight="bold" fontSize="xs" flex={0.8} textAlign="center">PJ</Text>
        <Text fontWeight="bold" fontSize="xs" flex={0.8} textAlign="center">Pts</Text>
        <Text fontWeight="bold" fontSize="xs" flex={0.8} textAlign="center">GF</Text>
        <Text fontWeight="bold" fontSize="xs" flex={0.8} textAlign="center">GC</Text>
        <Text fontWeight="bold" fontSize="xs" flex={0.8} textAlign="center">DG</Text>
      </HStack>

      {tableData.map((team, index) => (
        <Box key={team.position}>
          <HStack 
            p={3} 
            justifyContent="space-between"
            alignItems="center"
            bg={index % 2 === 0 ? "white" : "gray.50"}
          >
            <Box 
              flex={0.6} 
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg={getPositionColor(team.position)}
                borderRadius="full"
                w={6}
                h={6}
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontSize="xs" fontWeight="bold">
                  {team.position}
                </Text>
              </Box>
            </Box>
            
            <Text fontSize="sm" flex={2.5} fontWeight="medium">
              {team.team}
            </Text>
            
            <Text fontSize="sm" flex={0.8} textAlign="center">
              {team.played}
            </Text>
            
            <Text 
              fontSize="sm" 
              flex={0.8} 
              textAlign="center" 
              fontWeight="bold"
              color="primary.600"
            >
              {team.points}
            </Text>
            
            <Text fontSize="sm" flex={0.8} textAlign="center">
              {team.goalsFor}
            </Text>
            
            <Text fontSize="sm" flex={0.8} textAlign="center">
              {team.goalsAgainst}
            </Text>
            
            <Text 
              fontSize="sm" 
              flex={0.8} 
              textAlign="center"
              color={team.goalDifference > 0 ? "green.600" : team.goalDifference < 0 ? "red.600" : "gray.600"}
              fontWeight="medium"
            >
              {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
            </Text>
          </HStack>
          {index < tableData.length - 1 && <Divider />}
        </Box>
      ))}

      {league.legend_dict && league.legend_dict.length > 0 && (
        <VStack space={2} mt={4} p={3} bg="gray.50" borderRadius="md">
          <Text fontSize="xs" fontWeight="bold" color="gray.600">Leyenda de Posiciones:</Text>
          <VStack space={1}>
            {league.legend_dict.map((item, index) => (
              <HStack key={index} alignItems="center" space={2}>
                <Box w={3} h={3} bg={getPositionColor(item.pos)} borderRadius="full" />
                <Text fontSize="xs" color="gray.600">{item.title}</Text>
              </HStack>
            ))}
          </VStack>
          <Text fontSize="xs" color="gray.500" mt={2}>
            PJ: Partidos Jugados | Pts: Puntos | GF: Goles a Favor | GC: Goles en Contra | DG: Diferencia de Gol
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

const getPositionColor = (position) => {
  if (position === 1) return 'yellow.400'; // Campeón
  if (position === 2) return 'blue.500'; // Champions
  if (position === 3) return 'orange.500'; // Europa League
  if (position === 5) return 'green.500'; // Conference League
  if (position === 6) return 'red.500'; // Descenso
  return 'gray.300';
};