import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DetailOrderScreen from "../screens/DetailOrderScreen";
import SetDiagnosticScreen from "../screens/SetDiagnosticScreen";
import EditEvidenceScreen from "../screens/EditEvidenceScreen";
import SetRepairPrice from "../screens/SetRepairPrice";

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Orders" component={HomeScreen} />
      <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
      <Stack.Screen name="SetRepairPrice" component={SetRepairPrice} />
      <Stack.Screen name="SetDiagnostic" component={SetDiagnosticScreen} />
      <Stack.Screen name="EditEvidence" component={EditEvidenceScreen} />
    </Stack.Navigator>
  );
}
