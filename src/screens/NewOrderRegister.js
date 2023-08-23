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

import NewOrderForm from "../components/FormNewOrder";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";

export default function NewOrderRegister({ navigation, route }) {
  const { id } = route.params;
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
        <NewOrderForm user={id} />
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
