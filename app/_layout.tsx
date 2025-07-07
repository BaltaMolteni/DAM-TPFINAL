import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '../src/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* No necesitas poner nada aquí, Expo Router agregará
            automáticamente las pantallas de tus archivos en la carpeta "app" */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
