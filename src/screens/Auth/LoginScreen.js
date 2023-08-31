import React, { useState } from "react";
import {
  TextInput,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
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
    setError("");

    try {
      const options = {
        method: "POST",
        url: `${API_HOST}/users/login/`,
        headers: { "Content-Type": "application/json" },
        data: form,
      };

      // axios
      //   .request(options)
      //   .then(function (response) {
      //     console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     console.error(error.message);
      //   });

      const response = await axios(options);

      if (response.status === 200) {
        setIsLoading(false);
        setError("");
        login(response.data);
      } else {
        console.log("status--->", response.status);
        // throw new Error("Ha ocurrido un error con el servidor");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        setError(
          "Usuario no encontrado, revise que el email y la contraseña sean correctos"
        );
      } else {
        setError("Error con el servidor");
      }
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
      <Text style={styles.error}>{error}</Text>
      {formik.errors.email && (
        <Text style={styles.error}>{formik.errors.email}</Text>
      )}
      {formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors[theme].card}
          style={styles.error}
        />
      )}
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
  error: {
    color: colors[theme].error,
    marginTop: 30,
  },
});

export default LoginScreen;
