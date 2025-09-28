import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';

// Opcional: Contexto global si necesitas manejar estado entre componentes
import { AppContextProvider } from './store/AppContext';

export default function RootLayout() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...MaterialIcons.font,
      });
    }
    loadFonts();
  }, []);

  return (
    <GluestackUIProvider mode="light">
      <AppContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppContextProvider>
    </GluestackUIProvider>
  );
}