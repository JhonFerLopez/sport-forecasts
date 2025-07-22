import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { theme } from './styles/theme';
// Import the required icon libraries
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

// Opcional: Contexto global si necesitas manejar estado entre componentes
import { AppContextProvider } from './store/AppContext';

import { HomeScreen } from './screens/HomeScreen';
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
            backgroundColor: theme.colors.template.primary, //color de fondo de la barra de navegación
          },
          headerTintColor: '#fff'
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
            backgroundColor: theme.colors.template.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
            backgroundColor: theme.colors.template.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerTitle: 'Perfil' }} />
        {/* <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} options={{ headerTitle: 'Detalle del Jugador' }} /> */}
      </Stack.Navigator></GluestackUIProvider>
  );
};


export default function Layout() {

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...MaterialIcons.font,
      });
    }
    loadFonts();
  }, []);

  return (
    <GluestackUIProvider mode="light"><NativeBaseProvider theme={theme}>
        <AppContextProvider>
          {/* REMOVED NavigationContainer from here */}
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let iconColor;
                let IconComponent = MaterialIcons;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
                  iconColor = focused ? theme.colors.template.primary : theme.colors.template.secondary;
                } else if (route.name === 'Team') {
                  iconName = focused ? 'groups' : 'groups';
                  iconColor = focused ? theme.colors.template.primary : theme.colors.template.secondary;
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'account-circle' : 'account-circle';
                  iconColor = focused ? theme.colors.template.primary : theme.colors.template.secondary;
                  // IconComponent = Ionicons;
                }

                return <GluestackUIProvider mode="light">
                  <Icon as={IconComponent} name={iconName} size={size} color={iconColor} />
                </GluestackUIProvider>;
              },
              tabBarActiveTintColor: theme.colors.template.primary,
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