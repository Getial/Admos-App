import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DetailOrderScreen from "../screens/DetailOrderScreen";
import SetDiagnosticScreen from "../screens/SetDiagnosticScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Orders" component={HomeScreen} />
      <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
      <Stack.Screen name="SetDiagnostic" component={SetDiagnosticScreen} />
    </Stack.Navigator>
  );
}
