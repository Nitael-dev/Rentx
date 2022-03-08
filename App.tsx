import React from 'react';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
 
import { Home } from './src/screens/Home';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { CarDetails } from './src/screens/CarDetails';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import { SchedulingCompleted } from './src/screens/SchedulingCompleted';
import { StackRoutes } from './src/routes/stack.routes';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if(!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}