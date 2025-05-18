import { Box, Heading, Pressable, Text } from 'native-base';
import React from 'react';
import { PlayerCard } from './PlayerCard';

export const PlayersList = ({ players, onPlayerPress }) => {
  // Agrupar jugadores por posición
  const groupedPlayers = {
    porteros: players.filter(p => p.position === 'Goalkeeper'),
    defensas: players.filter(p => ['Defender', 'Centre-Back', 'Left-Back', 'Right-Back'].includes(p.position)),
    centrocampistas: players.filter(p => ['Midfielder', 'Central Midfield', 'Defensive Midfield', 'Attacking Midfield'].includes(p.position)),
    delanteros: players.filter(p => ['Forward', 'Striker', 'Left Winger', 'Right Winger'].includes(p.position))
  };
  
  return (
    <>
      <Heading size="md" mb={4}>Jugadores destacados</Heading>
      <Box bg="white" borderRadius="lg" shadow={2} mb={6}>
        {Object.entries(groupedPlayers).map(([position, positionPlayers]) => (
          positionPlayers.length > 0 && (
            <Box key={position}>
              <Box bg="coolGray.100" px={4} py={2}>
                <Text fontWeight="bold" color="coolGray.800">
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </Text>
              </Box>
              {positionPlayers.slice(0, 3).map(player => (
                <Pressable key={player.id} onPress={() => onPlayerPress && onPlayerPress(player)}>
                  <PlayerCard player={player} />
                </Pressable>
              ))}
            </Box>
          )
        ))}
      </Box>
    </>
  );
};