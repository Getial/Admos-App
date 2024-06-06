import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../hooks/useTheme";
import { fontFamily } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export default function OrderCard(props) {
  const { order } = props;
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const goToDetailsOrder = () => {
    navigation.navigate("DetailOrder", { id: order.id });
  };

  const borderState = (state) => {
    return {
      borderColor: theme.progress[state],
    };
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetailsOrder}>
      <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            Orden de servicio {order.service_number}
          </Text>
          <Text style={styles.subtitle}>{order.client_name}</Text>
          <Text style={styles.subtitle}>
            {order.category_name} {order.brand_name}
          </Text>
        </View>
        <View
          style={[styles.stateContainer, borderState(order.state_description)]}
        >
          <Text style={styles.textState}>{order.state_description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      width: "95%",
      height: verticalScale(60),
      marginBottom: verticalScale(10),
      borderColor: theme.input,
      borderBottomWidth: 1,
      borderRadius: moderateScale(10),
      paddingTop: verticalScale(10),
      paddingHorizontal: horizontalScale(10),
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    infoContainer: {
      width: "70%",
    },
    title: {
      color: theme.title,
      fontWeight: "bold",
      fontSize: moderateScale(18),
    },
    subtitle: {
      color: theme.title,
      fontWeight: "300",
      fontSize: moderateScale(12),
    },
    stateContainer: {
      width: "25%",
      height: verticalScale(30),
      maxHeight: verticalScale(40),
      borderWidth: 2,
      // borderColor: theme.input,
      borderRadius: moderateScale(20),
      paddingTop: verticalScale(5),
    },
    textState: {
      color: theme.text,
      fontSize: moderateScale(12),
      textAlign: "center",
    },
  });
