import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";

export default function NewOrderForm({ navigation }) {
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
      const config = {
        method: "post",
        url: `${API_HOST}/users/`,
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
        data: formValues,
      };
      // const response = await axios.post(`${API_HOST}/users/`, data);

      const response = await axios(config);
      const { id } = response.data;

      if (response.status === 201) {
        setIsLoading(false);
        navigation.navigate("NewOrderForm", { id: id });
      } else {
        throw new Error("Ha ocurrido un error con el servidor");
      }
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.title}>Nuevo cliente</Text>
            </View>
            <View style={styles.wrapper}>
              <TextInput
                placeholder="Categoria"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.category}
                onChangeText={(text) => formik.setFieldValue("category", text)}
              />
              <TextInput
                placeholder="Marca"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.brand}
                onChangeText={(text) => formik.setFieldValue("brand", text)}
              />
              <TextInput
                placeholder="Referencia"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.reference}
                onChangeText={(text) =>
                  formik.setFieldValue("reference", text)
                }
              />
              <TextInput
                placeholder="Serial"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.serial}
                onChangeText={(text) => formik.setFieldValue("serial", text)}
              />
              <TextInput
                placeholder="Motivo del ingreso"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.reason_for_entry}
                onChangeText={(text) => formik.setFieldValue("reason_for_entry", text)}
              />
              <TextInput
                placeholder="Observaciones"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.observations}
                multiline={true}
                onChangeText={(text) =>
                  formik.setFieldValue("observations", text)
                }
              />
            </View>
            <View>
              <Button
                title="Submit"
                onPress={formik.handleSubmit}
                disabled={isLoading}
              />
            </View>
          </View>
          {formik.errors.category && (
            <Text style={styles.error}>{formik.errors.category}</Text>
          )}
          {formik.errors.brand && (
            <Text style={styles.error}>{formik.errors.brand}</Text>
          )}
          {formik.errors.reference && (
            <Text style={styles.error}>{formik.errors.reference}</Text>
          )}
          {formik.errors.observations && (
            <Text style={styles.error}>{formik.errors.observations}</Text>
          )}

          {/* <Text style={styles.error}>Error</Text> */}
        </>
      ) : (
        <View>
          <Text style={styles.title}>Guardando nuevo cliente</Text>
          <ActivityIndicator size="large" color={colors[theme].card} />
        </View>
      )}
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    category: "",
    brand: "",
    reference: "",
    serial: "",
    observations: "",
    reason_for_entry: "",
  };
}

function validationSchema() {
  return {
    category: Yup.string().required("El nombre es obligatirio"),
    brand: Yup.string().required("El documento es obligatirio"),
    reference: Yup.string().required("El numero de celular es obligatirio"),
    serial: Yup.string(),
    observations: Yup.string().required("La ciudad o municipio es obligatirio"),
    reason_for_entry: Yup.string(),
  };
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
    fontSize: 32,
    textAlign: "center",
    marginBottom: 25,
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    minWidth: "70%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 25,
    fontFamily: fontFamily,
  },
  error: {
    color: colors[theme].error,
    marginTop: 20,
  },
});
