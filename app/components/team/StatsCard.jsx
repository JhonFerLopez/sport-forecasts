import { Box, Divider, Heading, HStack, Text, VStack } from 'native-base';
import React from 'react';

export const StatsCard = ({ wins, draws, losses }) => {
  // Calcular el total de partidos
  const totalGames = wins + draws + losses;
  
  // Calcular porcentajes para barras de progreso
  const winPercentage = (wins / totalGames) * 100;
  const drawPercentage = (draws / totalGames) * 100;
  const lossPercentage = (losses / totalGames) * 100;
  
  return (
    <>
      <Heading size="md" mb={4}>Estadísticas del equipo</Heading>
      <Box bg="white" p={4} borderRadius="lg" shadow={2} mb={6}>
        <HStack justifyContent="space-between">
          <VStack alignItems="center">
            <Heading size="lg" color="primary.500">{wins}</Heading>
            <Text color="coolGray.500">Victorias</Text>
          </VStack>
          <Divider orientation="vertical" />
          <VStack alignItems="center">
            <Heading size="lg" color="orange.500">{draws}</Heading>
            <Text color="coolGray.500">Empates</Text>
          </VStack>
          <Divider orientation="vertical" />
          <VStack alignItems="center">
            <Heading size="lg" color="red.500">{losses}</Heading>
            <Text color="coolGray.500">Derrotas</Text>
          </VStack>
        </HStack>
        
        {/* Barra de progreso para visualizar proporciones */}
        <HStack mt={4} h={2} borderRadius="full" overflow="hidden">
          <Box bg="primary.500" w={`${winPercentage}%`} />
          <Box bg="orange.500" w={`${drawPercentage}%`} />
          <Box bg="red.500" w={`${lossPercentage}%`} />
        </HStack>
        
        <HStack mt={2} justifyContent="space-between">
          <Text fontSize="xs">{winPercentage.toFixed(0)}% Victorias</Text>
          <Text fontSize="xs">{totalGames} partidos jugados</Text>
          <Text fontSize="xs">{lossPercentage.toFixed(0)}% Derrotas</Text>
        </HStack>
      </Box>
    </>
  );
};