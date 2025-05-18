import { Center, Spinner, Text, VStack } from 'native-base';
import React from 'react';

export const Loading = ({ message = 'Cargando...' }) => {
  return (
    <Center flex={1}>
      <VStack space={2} alignItems="center">
        <Spinner size="lg" color="primary.600" />
        <Text color="primary.600">{message}</Text>
      </VStack>
    </Center>
  );
};