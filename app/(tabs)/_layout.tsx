import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const theme = {
  colors: {
    template: {
      primary: '#3B82F6',
      secondary: '#6B7280'
    }
  }
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.template.primary,
        tabBarInactiveTintColor: theme.colors.template.secondary,
        headerStyle: {
          backgroundColor: theme.colors.template.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Inicio',
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="team" 
        options={{
          title: 'Equipo',
          headerTitle: 'Team',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="groups" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Perfil',
          headerTitle: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}