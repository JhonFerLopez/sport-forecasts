import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, NativeBaseProvider } from 'native-base';
import React from 'react';
import { theme } from './styles/theme';
// Import the required icon libraries
import { MaterialIcons } from '@expo/vector-icons';

// Opcional: Contexto global si necesitas manejar estado entre componentes
import { AppContextProvider } from './store/AppContext';

import { HomeScreen } from './screens/HomeScreen';
// import { MatchDetailsScreen } from './screens/MatchDetailsScreen';
// import { TeamDetailsScreen } from './screens/TeamDetailsScreen';
import { LeagueDetailsScreen } from './screens/LeagueDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para la pantalla Home
const HomeStack = () => {
  return (
    <GluestackUIProvider mode="light">
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a365d', //color de fondo de la barra de navegación
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: 'INICIO' }} />
        <Stack.Screen 
          name="LeagueDetailsScreen" 
          component={LeagueDetailsScreen}
          options={({ route }) => ({
            title: 'Detalles de Liga',
            headerBackTitle: 'Volver'
          })}
        />
        {/* <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} options={{ headerTitle: 'Detalle del Equipo' }} />
        <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} options={{ headerTitle: 'Detalle del Partido' }} /> */}
      </Stack.Navigator>
    </GluestackUIProvider>
  );
};

// Stack para la pantalla Team
const TeamStack = () => {
  // Create a placeholder component for TeamScreen until you implement it
  const TeamScreen = () => <></>;
  
  return (
    <GluestackUIProvider mode="light"><Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a365d',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="TeamScreen" component={TeamScreen} options={{ headerTitle: 'Equipo' }} />
        {/* <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} options={{ headerTitle: 'Detalle del Jugador' }} /> */}
      </Stack.Navigator></GluestackUIProvider>
  );
};

// Placeholder component for ProfileScreen
const ProfileScreen = () => {
   const ProfileScreen = () => <></>;
   return (
    <GluestackUIProvider mode="light"><Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerTitle: 'Steven' }} />
        {/* <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} options={{ headerTitle: 'Detalle del Jugador' }} /> */}
      </Stack.Navigator></GluestackUIProvider>
  );
};

export default function Layout() {
  return (
    <GluestackUIProvider mode="light"><NativeBaseProvider theme={theme}>
        <AppContextProvider>
          {/* REMOVED NavigationContainer from here */}
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let IconComponent = MaterialIcons;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Team') {
                  iconName = focused ? 'soccer' : 'shield-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                  // IconComponent = Ionicons;
                }

                return <GluestackUIProvider mode="light">
                  <Icon as={IconComponent} name={iconName} size={size} color={color} />
                </GluestackUIProvider>;
              },
              tabBarActiveTintColor: '#1a365d',
              tabBarInactiveTintColor: 'gray',
              headerShown: false
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Inicio' }} />
            <Tab.Screen name="Team" component={TeamStack} options={{ tabBarLabel: 'Equipo' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
          </Tab.Navigator>
        </AppContextProvider>
      </NativeBaseProvider></GluestackUIProvider>
  );
}