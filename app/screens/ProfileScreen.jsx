import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Badge, Box, Heading, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { Loading } from '../components/common/Loading';
import { useAppContext } from '../store/AppContext';

export const ProfileScreen = () => {
  const { user, isLoading, logout } = useAppContext();
  
  if (isLoading) {
    return <Loading message="Cargando perfil..." />;
  }
  
  if (!user) {
    // Implementar pantalla de login o registro aquí
    return (
      <Box flex={1} p={4} justifyContent="center" alignItems="center">
        <Heading mb={4}>Iniciar sesión</Heading>
        {/* Aquí irían los componentes de login */}
      </Box>
    );
  }
  
  return (
    <Box flex={1} bg="coolGray.50">
      <Box bg="primary.600" pt={12} pb={6} alignItems="center">
        <Avatar size="2xl" source={{ uri: user.profilePic }} mb={4} borderWidth={4} borderColor="white" />
        <Heading color="white" size="lg">{user.name}</Heading>
        <Text color="coolGray.100" mb={2}>{user.email}</Text>
        <Badge colorScheme="amber" mt={1}>Miembro {user.membership}</Badge>
      </Box>
      
      <Box p={4}>
        {/* Equipo favorito */}
        <Box bg="white" p={4} borderRadius="lg" shadow={2} mb={4}>
          <HStack alignItems="center" space={3}>
            <Icon as={MaterialIcons} name="favorite" size="md" color="red.500" />
            <VStack flex={1}>
              <Text fontWeight="bold">Equipo favorito</Text>
              <Text>{user.favoriteTeam}</Text>
            </VStack>
            <Icon as={MaterialIcons} name="chevron-right" size="sm" color="coolGray.400" />
          </HStack>
        </Box>
        
        {/* Opciones de perfil */}
        <Box bg="white" borderRadius="lg" shadow={2} mb={4}>
          {[
            { title: "Editar perfil", icon: "person-outline", iconSet: Ionicons },
            { title: "Mis suscripciones", icon: "credit-card", iconSet: MaterialIcons },
            { title: "Notificaciones", icon: "notifications-outline", iconSet: Ionicons },
            { title: "Ajustes", icon: "settings", iconSet: MaterialIcons },
          ].map((item, index, array) => (
            <Pressable key={index}>
              <HStack p={4} 
                     borderBottomWidth={index < array.length - 1 ? 1 : 0} 
                     borderBottomColor="coolGray.100" 
                     alignItems="center" 
                     space={3}>
                <Icon as={item.iconSet} name={item.icon} size="md" color="primary.500" />
                <Text flex={1} fontWeight="medium">{item.title}</Text>
                <Icon as={MaterialIcons} name="chevron-right" size="sm" color="coolGray.400" />
              </HStack>
            </Pressable>
          ))}
        </Box>
        
        {/* Soporte y ayuda */}
        <Box bg="white" borderRadius="lg" shadow={2} mb={4}>
          {[
            { title: "Centro de ayuda", icon: "help-outline", iconSet: MaterialIcons },
            { title: "Contáctanos", icon: "mail-outline", iconSet: MaterialIcons },
          ].map((item, index, array) => (
            <Pressable key={index}>
              <HStack p={4} 
                     borderBottomWidth={index < array.length - 1 ? 1 : 0} 
                     borderBottomColor="coolGray.100" 
                     alignItems="center" 
                     space={3}>
                <Icon as={item.iconSet} name={item.icon} size="md" color="primary.500" />
                <Text flex={1} fontWeight="medium">{item.title}</Text>
                <Icon as={MaterialIcons} name="chevron-right" size="sm" color="coolGray.400" />
              </HStack>
            </Pressable>
          ))}
        </Box>
        
        {/* Cerrar sesión */}
        <Pressable onPress={logout}>
          <Box bg="white" p={4} borderRadius="lg" shadow={2}>
            <HStack alignItems="center" space={3}>
              <Icon as={MaterialIcons} name="logout" size="md" color="red.500" />
              <Text fontWeight="medium" color="red.500">Cerrar sesión</Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};