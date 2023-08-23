import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar />
          <Navigation />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
