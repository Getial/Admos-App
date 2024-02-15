import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { colors, theme, fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";
import { TextInput } from "react-native-gesture-handler";

import { updateOrder } from "../../api/orders";

export default function SetRepairPrice({ navigation, route }) {
  const { id } = route.params;
  // const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const onSubmitFormHandler = async (formValues) => {
    setIsLoading(true);
    try {
      response = await updateOrder(id, formValues);
      if (response) {
        setIsLoading(false);
        navigation.navigate("Orders");
      }
    } catch (error) {
      alert("Ha ocurrido un error", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={moderateScale(30)}
        />
      </Pressable>
      <Text style={styles.title}>Valor de la reparacion</Text>
      <TextInput
        placeholder="ingrese aqui el valor"
        placeholderTextColor={colors[theme].placeholder}
        inputMode="numeric"
        style={styles.input}
        value={formik.values.payment}
        onChangeText={(text) => formik.setFieldValue("payment", text)}
      />
      {!isLoading ? (
        <Pressable style={styles.btnSave} onPress={formik.handleSubmit}>
          <Text style={styles.textBtn}>Guardar</Text>
        </Pressable>
      ) : (
        <ActivityIndicator size="large" color={colors[theme].card} />
      )}
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    payment: "",
    state: "quoted",
  };
}

function validationSchema() {
  return {
    payment: Yup.string().required("El valor de la reparacion es necesario"),
    state: Yup.string(),
  };
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: verticalScale(50),
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(60),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontWeight: "bold",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(28),
    position: "absolute",
    top: moderateScale(100),
  },
  containerBtnSave: {
    top: verticalScale(680),
  },
  labelText: {
    color: colors[theme].subtitle,
    // width: "50%",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    width: "95%",
    maxWidth: "95%",
    // maxWidth: "70%",
    height: verticalScale(80),
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 25,
    fontFamily: fontFamily,
    alignSelf: "center",
  },
  btnSave: {
    backgroundColor: colors[theme].card,
    alignSelf: "center",
    width: horizontalScale(100),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
  },
  error: {
    color: colors[theme].error,
    marginTop: 20,
  },
});
