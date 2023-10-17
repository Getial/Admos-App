import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  Switch,
  Button,
  FlatList,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFormik } from "formik";
import * as Yup from "yup";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export default function SetDiagnosticScreen({ navigation }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitFormHandler = (formValues) => {
    console.log(formValues);
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
      <>
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Detalles de la revision</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.labelText}>Diagnostico</Text>
            <TextInput
              multiline
              placeholder="Mencione las fallas que presenta la maquina"
              placeholderTextColor={colors[theme].placeholder}
              style={styles.input}
              value={formik.values.diagnostic}
              onChangeText={(text) => formik.setFieldValue("diagnostic", text)}
            />

            <Text style={styles.labelText}>
              ¿Se necesita solicitar repuestos?
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                formik.values.is_necesary_spare_parts ? "#f5dd4b" : "#f4f3f4"
              }
              onValueChange={(text) =>
                formik.setFieldValue("is_necesary_spare_parts", text)
              }
              value={formik.values.is_necesary_spare_parts}
            />

            <Text style={styles.labelText}>Lista de repuestos</Text>
            <TextInput
              multiline
              placeholder="nombre o numero de la piezas, cantidad y medida."
              placeholderTextColor={colors[theme].placeholder}
              style={styles.input}
              value={formik.values.spare_parts_list}
              onChangeText={(text) =>
                formik.setFieldValue("spare_parts_list", text)
              }
            />
          </View>
          <View>
            <Pressable style={styles.btnSave} onPress={formik.handleSubmit}>
              <Text style={styles.textBtn}>Guardar</Text>
            </Pressable>
          </View>
        </View>
        {formik.errors.diagnostic && (
          <Text style={styles.error}>{formik.errors.diagnostic}</Text>
        )}

        {/* <Text style={styles.error}>Error</Text> */}
      </>
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    diagnostic: "",
    is_necesary_spare_parts: "",
    spare_parts_list: "",
  };
}

function validationSchema() {
  return {
    diagnostic: Yup.string().required("El diagnostico es obligatirio"),
    is_necesary_spare_parts: Yup.bool(),
    spare_parts_list: Yup.string(),
    // spare_parts_list: Yup.array().of(
    //   Yup.object().shape({
    //     name: Yup.string().required("El nombre o numero de pieza es necesario"),
    //     amount: Yup.string().required("Especifica la cantidad de repuestos"),
    //   })
    // ),
  };
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
    top: verticalScale(60),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(28),
  },
  wrapper: {
    marginBottom: 10,
  },
  labelText: {
    color: colors[theme].text,
    // width: "50%",
    fontSize: moderateScale(15),
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    width: "90%",
    maxWidth: "90%",
    // maxWidth: "70%",
    height: 100,
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
