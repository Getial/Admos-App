import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { updateOrder } from "../api/orders";

import useTheme from "../hooks/useTheme";
import { fontFamily } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export default function ModalAddServiceNumber({
  toggleModalServiceNumber,
  id,
  setOrder,
}) {
  const [service_number, setServiceNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const saveNewServiceNumber = async () => {
    setIsLoading(true);
    const formData = { service_number: service_number, state: "admitted" };

    const response = await updateOrder(id, formData);
    setOrder(response);
    setIsLoading(false);
    toggleModalServiceNumber();
  };
  return (
    <BlurView
      intensity={10}
      blurReductionFactor={1}
      style={styles.centeredView}
    >
      <View style={styles.modalView}>
        {!isLoading ? (
          <>
            <Pressable
              onPress={toggleModalServiceNumber}
              style={styles.closeContainer}
            >
              <Icon name="close" color={theme.card} size={30} />
            </Pressable>
            <Text style={styles.title}>Orden de servicio</Text>
            <TextInput
              placeholder="Numero orden de servicio"
              placeholderTextColor={theme.placeholder}
              style={styles.input}
              value={service_number}
              onChangeText={(text) => setServiceNumber(text)}
            />
            <Pressable onPress={saveNewServiceNumber} style={styles.btnSave}>
              <Text style={styles.txtBtn}>Guardar</Text>
            </Pressable>
          </>
        ) : (
          <ActivityIndicator size="large" color={theme.card} />
        )}
      </View>
    </BlurView>
  );
}
const createStyles = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      borderRadius: moderateScale(20),
      paddingTop: verticalScale(30),
      paddingBottom: verticalScale(25),
      paddingHorizontal: horizontalScale(25),
      backgroundColor: theme.background,
      alignItems: "center",
      position: "relative",
    },
    closeContainer: {
      position: "absolute",
      top: verticalScale(10),
      left: moderateScale(225),
      zIndex: 1,
    },
    title: {
      color: theme.title,
      fontSize: moderateScale(16),
      fontWeight: "bold",
      marginBottom: verticalScale(25),
    },
    input: {
      backgroundColor: theme.input,
      color: theme.text,
      minWidth: "60%",
      height: verticalScale(40),
      borderRadius: moderateScale(5),
      paddingLeft: horizontalScale(5),
      marginBottom: verticalScale(20),
      // marginBottom: 25,
      marginHorizontal: horizontalScale(10),
      fontFamily: fontFamily,
    },
    btnSave: {
      backgroundColor: theme.card,
      width: horizontalScale(80),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(50),
      // marginTop: verticalScale(20),
    },
    txtBtn: {
      color: theme.text,
      textAlign: "center",
    },
  });
