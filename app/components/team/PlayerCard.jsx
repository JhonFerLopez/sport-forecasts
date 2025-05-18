import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, HStack, Icon, Text, VStack } from 'native-base';
import React from 'react';

export const PlayerCard = ({ player }) => {
  return (
    <HStack p={4} borderBottomWidth={1} borderBottomColor="coolGray.100" space={3} alignItems="center">
      <Avatar size="md" source={{ uri: player.photo }} />
      <VStack flex={1}>
        <Text fontWeight="bold">{player.name}</Text>
        <Text fontSize="sm" color="coolGray.500">Posición: {player.position}</Text>
      </VStack>
      <HStack alignItems="center">
        <Icon as={MaterialIcons} name="star" size="sm" color="amber.400" />
        <Text fontWeight="bold" ml={1}>{player.rating.toFixed(1)}</Text>
      </HStack>
    </HStack>
  );
};