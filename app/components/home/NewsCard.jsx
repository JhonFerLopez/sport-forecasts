import { Box, Heading, HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';

export const NewsCard = ({ title, content, imageUrl, publishedAt, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Box bg="white" borderRadius="lg" shadow={2} mb={6} overflow="hidden">
        <Image 
          source={{ uri: imageUrl }} 
          alt={title}
          height={200}
          width="100%"
          resizeMode="cover"
        />
        <Box p={4}>
          <Heading size="md" mb={2}>{title}</Heading>
          <Text numberOfLines={3} mb={3}>
            {content}
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="xs" color="coolGray.500">
              Publicado hace {publishedAt}
            </Text>
            <Text color="primary.500" fontWeight="medium">Leer más</Text>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};