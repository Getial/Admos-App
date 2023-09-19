import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";

export default function SettingsScreen() {
  const { logout } = useAuth();
  const cerrarSesion = () => {
    logout();
  };
  return (
    <SafeAreaView>
      <Pressable onPress={cerrarSesion}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
