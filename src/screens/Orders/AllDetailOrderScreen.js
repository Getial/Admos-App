import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { colors, theme, fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";

export default function AllDetailOrderScreen({ route, navigation }) {
  const { order } = route.params;

  // Función para formatear la fecha
  const formatFecha = (fechaISO) => {
    return moment(fechaISO).format("DD/MM/YYYY hh:mm:ss A");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* button back */}
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={moderateScale(30)}
        />
      </Pressable>

      <View style={styles.containerTitle}>
        <Text style={styles.title}>Orden de servicio</Text>
        <Text style={styles.txtOrderNumber}>{order?.service_number}</Text>
        <Text
          style={styles.subtitle}
        >{`${order.category_name} ${order.brand_name} ${order.reference_name}`}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* fecha de entrada */}
        <View style={styles.wrapper}>
          <Text style={styles.label}>Fecha de entrada:</Text>
          <Text style={styles.info}>{formatFecha(order.entry_date)}</Text>
        </View>
        {/* Serial*/}
        <View style={styles.wrapper}>
          <Text style={styles.label}>Serial:</Text>
          <Text style={styles.info}>
            {order.serial ? order.serial : "No tiene serial"}
          </Text>
        </View>
        {/* motivo de ingreso*/}
        <View style={styles.wrapper}>
          <Text style={styles.label}>Motivo de ingreso:</Text>
          <Text style={styles.info}>{order.reason_for_entry}</Text>
        </View>
        {/* fecha de revision y revisado por */}
        {order.revised_date && (
          <>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Fecha de revision:</Text>
              <Text style={styles.info}>{formatFecha(order.revised_date)}</Text>
            </View>
            {/* revisado por */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Fecha de revision:</Text>
              <Text style={styles.info}>{order.checked_by}</Text>
            </View>
          </>
        )}
        {/* diagnostico*/}
        <View style={styles.wrapper}>
          <Text style={styles.label}>Diagnostico:</Text>
          <Text style={styles.info}>{order.diagnostic}</Text>
        </View>
        {/* listado de repuestos */}
        {order.is_necesary_spare_parts && (
          <View style={styles.wrapper}>
            <Text style={styles.label}>Repuestos:</Text>
            <Text style={styles.info}>{order.spare_parts_list}</Text>
          </View>
        )}
        {/* valor de la reparacion*/}
        <View style={styles.wrapper}>
          <Text style={styles.label}>Valor de la reparacion:</Text>
          <Text style={styles.info}>{order.price_estimate_for_repair}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: verticalScale(50),
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(30),
    left: horizontalScale(30),
  },
  containerTitle: {
    position: "absolute",
    top: verticalScale(30),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontWeight: "bold",
    fontSize: moderateScale(25),
  },
  txtOrderNumber: {
    color: colors[theme].card,
    fontFamily: fontFamily,
    fontWeight: "bold",
    fontSize: moderateScale(26),
  },
  subtitle: {
    color: colors[theme].placeholder,
  },
  scrollView: {
    // backgroundColor: "blue",
    width: "100%",
    marginTop: verticalScale(30),
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "red",
    // justifyContent: "space-around",
  },
  label: {
    color: colors[theme].text,
    width: "40%",
  },
  info: {
    color: colors[theme].text,
    width: "60%",
  },
});
