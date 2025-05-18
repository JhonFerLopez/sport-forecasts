import { MaterialIcons } from '@expo/vector-icons';
import { Badge, Box, HStack, Icon, Image, Text, VStack } from 'native-base';
import React from 'react';

export const MatchCard = ({ match }) => {
  // Determinar el color del indicador según el último resultado
  const getResultColor = (result) => {
    switch(result) {
      case 'W': return 'green.500';
      case 'L': return 'red.500';
      case 'D': return 'orange.500';
      default: return 'coolGray.400';
    }
  };

  // Formatear fecha del partido
  const formatMatchDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Si es hoy
    if (date.toDateString() === today.toDateString()) {
      return `Hoy ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
    
    // Si es mañana
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Mañana ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
    
    // Para otros días
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return `${days[date.getDay()]} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <HStack p={4} borderBottomWidth={1} borderBottomColor="coolGray.100" alignItems="center" space={3}>
      {match.status === 'finished' && (
        <Box 
          bg={getResultColor(match.homeTeam.id === match.winner ? 'W' : match.awayTeam.id === match.winner ? 'L' : 'D')} 
          w={10} h={10} 
          borderRadius="full" 
          justifyContent="center" 
          alignItems="center"
        >
          <Text color="white" fontWeight="bold">
            {match.homeTeam.id === match.winner ? 'W' : match.awayTeam.id === match.winner ? 'L' : 'D'}
          </Text>
        </Box>
      )}
      
      {match.status !== 'finished' && (
        <Badge colorScheme={match.status === 'live' ? 'error' : 'coolGray'} variant="solid" rounded="md">
          {match.status === 'live' ? 'EN VIVO' : formatMatchDate(match.date)}
        </Badge>
      )}
      
      <VStack flex={1}>
        <HStack justifyContent="space-between" mb={1}>
          <HStack space={2} alignItems="center">
            <Image source={{ uri: match.homeTeam.logo }} alt={match.homeTeam.name} size="xs" />
            <Text fontWeight="medium">{match.homeTeam.name}</Text>
          </HStack>
          {match.status !== 'upcoming' && (
            <Text fontWeight="bold">{match.score?.home ?? 0}</Text>
          )}
        </HStack>
        
        <HStack justifyContent="space-between">
          <HStack space={2} alignItems="center">
            <Image source={{ uri: match.awayTeam.logo }} alt={match.awayTeam.name} size="xs" />
            <Text fontWeight="medium">{match.awayTeam.name}</Text>
          </HStack>
          {match.status !== 'upcoming' && (
            <Text fontWeight="bold">{match.score?.away ?? 0}</Text>
          )}
        </HStack>
      </VStack>
      
      <Icon as={MaterialIcons} name="chevron-right" size="sm" color="coolGray.400" />
    </HStack>
  );
};