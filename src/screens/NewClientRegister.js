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

export default function NewClientRegister({ navigation }) {
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
        url: `${API_HOST}/clients/`,
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
        data: formValues,
      };

      const response = await axios(config);
      const { id } = response.data;

      if (response.status === 201) {
        setIsLoading(false);
        navigation.navigate("NewOrderRegister", { id: id });
      } else {
        throw new Error("Ha ocurrido un error con el servidor");
      }
    } catch (error) {
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
                placeholder="Nombre completo"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.fullName}
                onChangeText={(text) => formik.setFieldValue("fullname", text)}
              />
              <TextInput
                placeholder="Numero de documento"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.document}
                onChangeText={(text) => formik.setFieldValue("document", text)}
              />
              <TextInput
                placeholder="Celular"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.phone_number}
                inputMode="tel"
                onChangeText={(text) =>
                  formik.setFieldValue("phone_number", text)
                }
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.email}
                inputMode="email"
                onChangeText={(text) => formik.setFieldValue("email", text)}
              />
              <TextInput
                placeholder="Direccion"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.address}
                onChangeText={(text) => formik.setFieldValue("address", text)}
              />
              <TextInput
                placeholder="Ciudad o Municipio"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.municipality}
                onChangeText={(text) =>
                  formik.setFieldValue("municipality", text)
                }
              />
            </View>
            <View>
              <Button
                title="Guardar"
                color={colors[theme].card}
                onPress={formik.handleSubmit}
                disabled={isLoading}
              />
            </View>
          </View>
          {formik.errors.fullname && (
            <Text style={styles.error}>{formik.errors.fullname}</Text>
          )}
          {formik.errors.document && (
            <Text style={styles.error}>{formik.errors.document}</Text>
          )}
          {formik.errors.phone_number && (
            <Text style={styles.error}>{formik.errors.phone_number}</Text>
          )}
          {formik.errors.municipality && (
            <Text style={styles.error}>{formik.errors.municipality}</Text>
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
    fullname: "",
    document: "",
    phone_number: "",
    email: "",
    municipality: "",
    address: "",
  };
}

function validationSchema() {
  return {
    fullname: Yup.string().required("El nombre es obligatirio"),
    document: Yup.string().required("El documento es obligatirio"),
    phone_number: Yup.string().required("El numero de celular es obligatirio"),
    email: Yup.string(),
    municipality: Yup.string().required("La ciudad o municipio es obligatirio"),
    address: Yup.string(),
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
