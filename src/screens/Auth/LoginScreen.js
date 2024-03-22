import React, { useState } from "react";
import {
  TextInput,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import { colors, fontFamily, theme } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";
import { API_HOST } from "../../utils/constants";

const LoginScreen = ({ navigation }) => {
  //no mostrar el bottomTabNavigation
  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        data: form,
      };

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
        setError(`Error con el servidor: ${error.message}, error ${error}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors[theme].placeholder}
          style={styles.input}
          value={formik.values.email}
          inputMode="email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
      </View>
      <View>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors[theme].placeholder}
          style={styles.input}
          value={formik.values.password}
          secureTextEntry={!showPassword}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        <Pressable
          style={styles.showPassword}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={moderateScale(15)}
            color={colors[theme].placeholder}
          />
        </Pressable>
      </View>
      <Button
        title="Entrar"
        color={colors[theme].card}
        onPress={formik.handleSubmit}
      />
      <Pressable
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.textBtn}>Registrarse</Text>
      </Pressable>
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
  showPassword: {
    position: "absolute",
    right: horizontalScale(10),
    top: verticalScale(9),
  },
  button: {
    fontFamily: fontFamily,
  },
  btnRegister: {
    // backgroundColor: colors[theme].card,
    alignSelf: "center",
    width: horizontalScale(80),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
    borderWidth: moderateScale(1),
    borderColor: colors[theme].card,
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
    fontSize: moderateScale(12),
  },
  error: {
    color: colors[theme].error,
    marginTop: 30,
  },
});

export default LoginScreen;
