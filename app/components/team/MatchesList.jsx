import { Badge, Box, Heading, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

export const MatchesList = ({ matches }) => {
  return (
    <>
      <Heading size="md" mb={4}>Próximos partidos</Heading>
      <Box bg="white" borderRadius="lg" shadow={2}>
        {matches.slice(0, 3).map((match, index) => (
          <HStack 
            key={match.id} 
            p={4} 
            borderBottomWidth={index < matches.length - 1 ? 1 : 0} 
            borderBottomColor="coolGray.100" 
            justifyContent="space-between" 
            alignItems="center"
          >
            <VStack alignItems="center" width="40%">
              <Image source={{ uri: match.homeTeam.logo }} alt="Equipo local" size="xs" />
              <Text fontWeight="medium" mt={1}>{match.homeTeam.name}</Text>
            </VStack>
            <Box alignItems="center">
              <Badge colorScheme="success" mb={2}>
                {new Date(match.date).toLocaleDateString('es-ES', { 
                  weekday: 'short', 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </Badge>
              <Text fontWeight="bold" fontSize="lg">VS</Text>
            </Box>
            <VStack alignItems="center" width="40%">
              <Image source={{ uri: match.awayTeam.logo }} alt="Equipo visitante" size="xs" />
              <Text fontWeight="medium" mt={1}>{match.awayTeam.name}</Text>
            </VStack>
          </HStack>
        ))}
      </Box>
    </>
  );
};