import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { EvidencesProvider } from "./src/context/EvidencesContex";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <NavigationContainer>
            <AuthProvider>
              <EvidencesProvider>
                <StatusBar />
                <Navigation />
              </EvidencesProvider>
            </AuthProvider>
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
