import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPassword from "../screens/Auth/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavigation({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
