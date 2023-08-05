import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DetailOrderScreen from "../screens/DetailOrderScreen";

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Orders" component={HomeScreen} />
        <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation