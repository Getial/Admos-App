import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import { colors, theme } from "../utils/desing";
import LoginScreen from "../screens/LoginScreen";
import HomeNavigation from "./HomeNavigation";
import NewOrderNavigation from "./NewOrderNavigation";

const Tab = createBottomTabNavigator()


const Navigation = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors[theme].background,
                paddingBottom: 10
            },
            tabBarActiveTintColor: colors[theme].card
        }}>
            <Tab.Screen name="Home" component={HomeNavigation} options={{
                tabBarLabel: "Ordenes",
                tabBarIcon: ({color}) => (
                    <Icon name="list" color={color}/>
                )
            }}/>
            <Tab.Screen name="NewOrder" component={NewOrderNavigation} options={{
                tabBarLabel: "Nueva Orden",
                tabBarIcon: ({color}) => (
                    <Icon name="plus" color={color}/>
                ),
                tabBar: false
            }} />
            <Tab.Screen name="Login" component={LoginScreen} options={{
                tabBarLabel: "Perfil",
                tabBarIcon: ({color}) => (
                    <Icon name="user" color={color}/>
                )
            }} />
        </Tab.Navigator>
    )
}

export default Navigation