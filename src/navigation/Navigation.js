import React from "react";
import { StyleSheet } from "react-native";
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
                paddingBottom: 10,
                borderColor: colors[theme].card,
                borderTopWidth: 2
            },
            tabBarActiveTintColor: colors[theme].text,
            tabBarInactiveTintColor: colors[theme].card
        }}>
            <Tab.Screen name="Home" component={HomeNavigation} options={{
                tabBarLabel: "Ordenes",
                tabBarIcon: ({color}) => (
                    <Icon name="list" color={color}/>
                )
            }}/>
            <Tab.Screen name="NewOrder" component={NewOrderNavigation} options={{
                tabBarLabel: "Nueva Orden",
                tabBarLabelStyle: styles.labelPlus,
                tabBarIcon: () => (
                    <Icon
                        name="plus"
                        color={colors[theme].card}
                        size={30}
                        style={styles.iconPlus}
                    />
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

const styles = StyleSheet.create({
    iconPlus: {
        position: 'absolute',
        top: -35,
        width: 75,
        height: 75,
        backgroundColor: colors[theme].background,
        borderWidth: 2,
        borderColor: colors[theme].card,
        borderRadius: 20,
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 10,
    },
    labelPlus: {
        paddingBottom: 10,
        color: colors[theme].card
    }
})

export default Navigation