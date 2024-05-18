import React, { useCallback, useState, useMemo } from "react";
import { ActivityIndicator, StyleSheet, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import OrderCard from "../../components/OrderCard";
import { colors, fontFamily, theme } from "../../utils/desing";
import { getSimpleOrdersApi, getSearchOrdersApi } from "../../api/orders";
import { verticalScale } from "../../utils/metrics";
import BarSearch from "../../components/BarSearch";

const HomeScreen = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //get orders
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      const fetchOrders = async () => {
        try {
          const response = await getSimpleOrdersApi();
          setIsLoading(false);
          setOrders(response);
        } catch (error) {
          setIsLoading(false);
          Alert.alert(
            `Error al traer las ordenes de servicio: error ${error.message}`
          );
        }
      };

      fetchOrders();
      return () => {
        isActive = false;
        setIsLoading(false);
      };
    }, [])
  );

  //order service orders
  const sortedOrders = useMemo(() => {
    return orders.sort((a, b) => {
      // Mueve "Listo para entregar" al final
      if (
        a.state_description === "Listo para entregar" &&
        b.state_description !== "Listo para entregar"
      ) {
        return 1;
      }
      if (
        a.state_description !== "Listo para entregar" &&
        b.state_description === "Listo para entregar"
      ) {
        return -1;
      }

      //prioriza los que tienen "state_description" igual a "Ingresado"
      if (
        a.state_description === "Ingresado" &&
        b.state_description !== "Ingresado"
      ) {
        return -1;
      }
      if (
        a.state_description !== "Ingresado" &&
        b.state_description === "Ingresado"
      ) {
        return 1;
      }

      const dateA = new Date(a.entry_date);
      const dateB = new Date(b.entry_date);
      return dateA - dateB;
    });
  }, [orders]);

  const searchOrder = async (searchValue) => {
    setIsLoading(true);
    try {
      const response = await getSearchOrdersApi(searchValue);
      setIsLoading(false);
      setOrders(response);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderCard order={item} />}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator size="large" color={colors[theme].card} />
      )}
      <BarSearch searchOrder={searchOrder} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    justifyContent: "center",
  },
  flatlistContainer: {
    position: "absolute",
    top: verticalScale(50),
    paddingBottom: verticalScale(50),
    left: 0,
    width: "100%",
  },
});

export default HomeScreen;
