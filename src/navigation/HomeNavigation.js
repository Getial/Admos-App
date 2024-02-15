import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Orders/HomeScreen";
import DetailOrderScreen from "../screens/Orders/DetailOrderScreen";
import SetDiagnosticScreen from "../screens/Orders/SetDiagnosticScreen";
import EditEvidenceScreen from "../screens/Orders/EditEvidenceScreen";
import SetRepairPrice from "../screens/Orders/SetRepairPrice";
import AllDetailOrderScreen from "../screens/Orders/AllDetailOrderScreen";

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
      <Stack.Screen name="AllDetailOrder" component={AllDetailOrderScreen} />
      <Stack.Screen name="SetRepairPrice" component={SetRepairPrice} />
      <Stack.Screen name="SetDiagnostic" component={SetDiagnosticScreen} />
      <Stack.Screen name="EditEvidence" component={EditEvidenceScreen} />
    </Stack.Navigator>
  );
}
