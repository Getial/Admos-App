import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IsClientRegistered from "../screens/IsClientRegistered";
import NewClientRegister from "../screens/NewClientRegister";
import SearchClient from "../screens/SearchClient";
import NewOrderRegister from "../screens/NewOrderRegister";

const Stack = createNativeStackNavigator();

const NewOrderNavigation = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IsClientRegistered" component={IsClientRegistered} />
      <Stack.Screen name="NewClientRegister" component={NewClientRegister} />
      <Stack.Screen name="SearchClient" component={SearchClient} />
      <Stack.Screen name="NewOrderRegister" component={NewOrderRegister} />
    </Stack.Navigator>
  );
};

export default NewOrderNavigation;
