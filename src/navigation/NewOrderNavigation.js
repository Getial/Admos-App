import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IsClientRegistered from "../screens/AddNewOrder/IsClientRegistered";
import NewClientRegister from "../screens/AddNewOrder/NewClientRegister";
import SearchClient from "../screens/AddNewOrder/SearchClient";
import NewOrderRegister from "../screens/AddNewOrder/NewOrderRegister";
import PrevOrder from "../screens/AddNewOrder/PrevOrder";

const Stack = createNativeStackNavigator();

const NewOrderNavigation = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);
  return (
    <Stack.Navigator
      initialRouteName="IsClientRegistered"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="IsClientRegistered" component={IsClientRegistered} />
      <Stack.Screen name="NewClientRegister" component={NewClientRegister} />
      <Stack.Screen name="SearchClient" component={SearchClient} />
      <Stack.Screen name="NewOrderRegister" component={NewOrderRegister} />
      <Stack.Screen name="PrevOrder" component={PrevOrder} />
    </Stack.Navigator>
  );
};

export default NewOrderNavigation;
