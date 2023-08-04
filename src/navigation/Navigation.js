import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import IsClientRegistered from "../screens/IsClientRegistered";
import { colors, theme } from "../utils/desing";
import NewClientRegister from "../screens/NewClientRegister";
import DetailOrderScreen from "../screens/DetailOrderScreen";
import SearchClient from "../screens/SearchClient";

const OrderStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStackScreen = () =>{
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <HomeStack.Screen name="Orders" component={HomeScreen} />
            <HomeStack.Screen name="DetailOrder" component={DetailOrderScreen} />
        </HomeStack.Navigator>
    )
}


const NewOrderStackScreen = ({navigation}) =>{
    React.useLayoutEffect(() => {
        navigation.setOptions({tabBarStyle: { display: 'none'}})
    }, [navigation])
    return (
        <OrderStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <OrderStack.Screen name="IsClientRegistered" component={IsClientRegistered} />
            <OrderStack.Screen name="NewClientRegister" component={NewClientRegister} />
            <OrderStack.Screen name="SearchClient" component={SearchClient} />
        </OrderStack.Navigator>
    )
}


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
            <Tab.Screen name="Home" component={HomeStackScreen} options={{
                tabBarLabel: "Ordenes",
                tabBarIcon: ({color}) => (
                    <Icon name="list" color={color}/>
                )
            }}/>
            <Tab.Screen name="NewOrder" component={NewOrderStackScreen} options={{
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