import { Box, Heading, HStack, Image, Text } from 'native-base';
import React from 'react';

export const StandingsTable = ({ teams, title = "Clasificación" }) => {
  if (!teams || teams.length === 0) {
    return null;
  }

  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">{title}</Heading>
        <Text fontSize="sm" color="primary.500">Ver todo</Text>
      </HStack>
      
      <Box bg="white" borderRadius="lg" shadow={2} mb={6}>
        <HStack p={3} bg="primary.600" borderTopRadius="lg" justifyContent="space-between">
          <Text color="white" fontWeight="bold" width="40%">Equipo</Text>
          <Text color="white" fontWeight="bold" width="15%" textAlign="center">PJ</Text>
          <Text color="white" fontWeight="bold" width="15%" textAlign="center">PG</Text>
          <Text color="white" fontWeight="bold" width="15%" textAlign="center">PE</Text>
          <Text color="white" fontWeight="bold" width="15%" textAlign="center">PP</Text>
        </HStack>
        
        {teams.map((team) => (
          <HStack key={team.team.id} p={3} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderBottomColor="coolGray.100">
            <HStack width="40%" alignItems="center" space={2}>
              <Text width="20px" fontWeight={team.position <= 3 ? "bold" : "normal"} color={team.position <= 3 ? "primary.600" : "black"}>
                {team.position}
              </Text>
              <Image source={{ uri: team.team.crest }} alt={team.team.name} size="xs" />
              <Text fontWeight="medium" isTruncated>{team.team.name}</Text>
            </HStack>
            <Text width="15%" textAlign="center">{team.playedGames}</Text>
            <Text width="15%" textAlign="center" fontWeight="medium">{team.won}</Text>
            <Text width="15%" textAlign="center">{team.draw}</Text>
            <Text width="15%" textAlign="center">{team.lost}</Text>
          </HStack>
        ))}
      </Box>
    </Box>
  );
};