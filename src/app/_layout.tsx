import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { LanguageModal } from '@/components/ui/LanguageModal';
import { useInterFonts } from '@/constants/fonts';

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const colorScheme = useColorScheme();
  const fontsLoaded = useInterFonts();
  const { hasStoredLanguage } = useLanguage();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      {/* First-launch language modal — same behavior as the web MainLayout */}
      {hasStoredLanguage === false ? <LanguageModal /> : null}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <RootStack />
    </LanguageProvider>
  );
}

