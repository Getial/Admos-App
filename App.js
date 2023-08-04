import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar />
        <Navigation />
      </NavigationContainer>

    </SafeAreaProvider>
  );
}