import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InfoClient from "../components/InfoClient";
import { getOrderDetailsApi } from "../api/orders";
import { colors, theme, fontFamily } from "../utils/desing";

export default function DetailOrderScreen({ route }) {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("");
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const responseOrder = await getOrderDetailsApi(id);
        setOrder(responseOrder);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Orden de servicio {order.service_number}</Text>
      {order.client && <InfoClient clientId={order.client} />}
      <View>
        <Text style={styles.subtitle}>Detalles del producto</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 32,
  },
  subtitle: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    textAlign: "center",
    marginBottom: 25,
    fontSize: 25,
  },
});
