import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Text } from 'native-base';

import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
// import { TeamScreen } from '../screens/TeamScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = MaterialIcons;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Team') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            IconComponent = Ionicons;
          }

          return <Icon as={IconComponent} name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1a365d',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: ({ focused, color }) => (
            <Text fontSize="xs" color={color}>Inicio</Text>
          )
        }}
      />
      {/* <Tab.Screen 
        name="Team" 
        component={TeamScreen}
        options={{ 
          tabBarLabel: ({ focused, color }) => (
            <Text fontSize="xs" color={color}>Equipo</Text>
          )
        }}
      /> */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          tabBarLabel: ({ focused, color }) => (
            <Text fontSize="xs" color={color}>Perfil</Text>
          )
        }}
      />
    </Tab.Navigator>
  );
};
