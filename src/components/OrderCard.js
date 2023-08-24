import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, theme } from "../utils/desing";

export default function OrderCard(props) {
  const { order } = props;
  const navigation = useNavigation();

  const goToDetailsOrder = () => {
    console.log(order);
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetailsOrder}>
      <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            Orden de servicio {order.service_number}
          </Text>
          <Text style={styles.subtitle}>{order.user_name}</Text>
        </View>
        <View style={styles.stateContainer}>
          <Text>{order.state_description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: 80,
    marginBottom: 20,
    borderColor: colors[theme].card,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  infoContainer: {
    width: "65%",
  },
  title: {
    color: colors[theme].title,
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    color: colors[theme].title,
    fontWeight: "300",
    fontSize: 10,
  },
  stateContainer: {
    width: "30%",
  },
});
