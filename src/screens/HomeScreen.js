import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import OrderCard from "../components/OrderCard";

import { colors, fontFamily, theme } from "../utils/desing";
import { API_HOST } from "../utils/constants";

const HomeScreen = () => {
  const [orders, setOrders] = useState([]);

  // get orders
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_HOST}/orders/`);
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          throw new Error(
            "Ha ocurrido un error con el servidor en la peticion get orders"
          );
        }
      } catch (error) {
        console.log("ha ocurrido un error: ", error);
      }
    })();
  }, []);

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
