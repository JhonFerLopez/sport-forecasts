import { Badge, Box, Heading, HStack, Image } from 'native-base';
import React from 'react';

export const TeamHeader = ({ name, logo, position, stats }) => {
  return (
    <Box bg="primary.600" p={6} alignItems="center">
      <Image 
        source={{ uri: logo }} 
        alt={name}
        size="xl"
        mb={4} 
      />
      <Heading color="white" size="xl" mb={1}>{name}</Heading>
      <HStack space={2} mb={4}>
        <Badge colorScheme="success" variant="solid" rounded="md">Pos. {position}</Badge>
        <Badge colorScheme="info" variant="solid" rounded="md">{stats}</Badge>
      </HStack>
    </Box>
  );
};