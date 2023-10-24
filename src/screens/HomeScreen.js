import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import OrderCard from "../components/OrderCard";
import { colors, fontFamily, theme } from "../utils/desing";
import { getSimpleOrdersApi } from "../api/orders";
import { verticalScale } from "../utils/metrics";

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
          throw error;
        }
      };

      fetchOrders();
      return () => {
        isActive = false;
        setIsLoading(false);
      };
    }, [])
  );

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
    marginTop: verticalScale(20),
  },
});

export default HomeScreen;
