import React, { useCallback, useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import OrderCard from "../components/OrderCard";
import { colors, fontFamily, theme } from "../utils/desing";
import { getSimpleOrdersApi } from "../api/orders";

const HomeScreen = ({ navigation }) => {
  // const { reload } = route.params || 0;
  // console.log(reload);
  const [orders, setOrders] = useState([]);

  //get orders
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchOrders = async () => {
        try {
          const response = await getSimpleOrdersApi();
          setOrders(response);
        } catch (error) {
          throw error;
        }
      };

      fetchOrders();
      return () => {
        isActive = false;
      };
    }, [])
  );

  // // get orders
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await getSimpleOrdersApi();
  //       setOrders(response);
  //     } catch (error) {
  //       console.log("ha ocurrido un error: ", error);
  //     }
  //     console.log("UsseEffect HomeScreen");
  //   })();
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
  },
  flatlistContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
