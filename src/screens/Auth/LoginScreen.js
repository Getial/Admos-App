import React, { useState } from "react";
import {
  TextInput,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import { colors, fontFamily, theme } from "../../utils/desing";
import { API_HOST } from "../../utils/constants";

const LoginScreen = ({ navigation }) => {
  //no mostrar el bottomTabNavigation
  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const onSubmitFormHandler = async (form) => {
    setIsLoading(true);

    try {
      const options = {
        method: "POST",
        url: `${API_HOST}/users/login/`,
        headers: { "Content-Type": "application/json" },
        data: form,
      };

      const response = await axios(options);

      if (response.status === 200) {
        setIsLoading(false);
        login(response.data);
      } else {
        throw new Error("Ha ocurrido un error con el servidor");
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors[theme].placeholder}
        style={styles.input}
        value={formik.values.email}
        inputMode="email"
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={colors[theme].placeholder}
        style={styles.input}
        value={formik.values.password}
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button
        title="Entrar"
        color={colors[theme].card}
        onPress={formik.handleSubmit}
      />
    </SafeAreaView>
  );
};

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatiria"),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors[theme].background,
  },
  title: {
    fontFamily: fontFamily,
    fontSize: 35,
    fontWeight: "bold",
    color: colors[theme].title,
    marginBottom: 50,
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    minWidth: "50%",
    height: 40,
    borderRadius: 4,
    paddingLeft: 5,
    marginBottom: 15,
    fontFamily: fontFamily,
  },
  button: {
    fontFamily: fontFamily,
  },
});

export default LoginScreen;
