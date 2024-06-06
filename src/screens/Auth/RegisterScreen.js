import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";

import useTheme from "../../hooks/useTheme";
import { fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";
import { addNewUserApi } from "../../api/users";
import useAuth from "../../hooks/useAuth";

export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: true,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const onSubmitFormHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await addNewUserApi(data);

      if (response.status === 201) {
        setIsLoading(false);
        setError("");
        login(response.data);
      } else {
        console.log("status--->", response.status);
        if (response.data && response.request) {
          throw new Error(response.request._response);
        } else {
          throw new Error("Ha ocurrido un error con el servidor");
        }
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={theme.card}
          size={30}
          style={styles.iconPlus}
        />
      </Pressable>
      <Text style={styles.title}>Registrarse</Text>
      <View style={styles.form}>
        {/* firstname */}
        <View style={styles.wrapper}>
          <Text style={styles.labelText}>Nombre</Text>
          <TextInput
            placeholder="Pepito"
            placeholderTextColor={theme.placeholder}
            style={styles.input}
            value={formik.values.first_name}
            onChangeText={(text) => formik.setFieldValue("first_name", text)}
            onBlur={() =>
              formik.setFieldValue("username", formik.values.first_name)
            }
          />
          {formik.errors.first_name && formik.values.first_name && (
            <Text style={styles.error}>{formik.errors.first_name}</Text>
          )}
        </View>
        {/* lastname */}
        <View style={styles.wrapper}>
          <Text style={styles.labelText}>Apellido</Text>
          <TextInput
            placeholder="Perez"
            placeholderTextColor={theme.placeholder}
            style={styles.input}
            value={formik.values.last_name}
            onChangeText={(text) => formik.setFieldValue("last_name", text)}
            onBlur={() =>
              formik.setFieldValue(
                "fullname",
                `${formik.values.first_name} ${formik.values.last_name}`
              )
            }
          />
          {formik.errors.last_name && formik.values.last_name && (
            <Text style={styles.error}>{formik.errors.last_name}</Text>
          )}
        </View>
        {/* occupation */}
        <View style={styles.wrapper}>
          <Text style={styles.labelText}>Cargo</Text>
          <TextInput
            placeholder="Tecnico electricista"
            placeholderTextColor={theme.placeholder}
            style={styles.input}
            value={formik.values.occupation}
            onChangeText={(text) => formik.setFieldValue("occupation", text)}
          />
          {formik.errors.occupation && formik.values.occupation && (
            <Text style={styles.error}>{formik.errors.occupation}</Text>
          )}
        </View>
        {/* email */}
        <View style={styles.wrapper}>
          <Text style={styles.labelText}>Correo Electronico</Text>
          <TextInput
            placeholder="pepito99@example.com"
            placeholderTextColor={theme.placeholder}
            inputMode="email"
            style={styles.input}
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue("email", text)}
          />
          {formik.errors.email && formik.values.email && (
            <Text style={styles.error}>{formik.errors.email}</Text>
          )}
        </View>
        {/* password */}
        <View style={styles.wrapper}>
          <Text style={styles.labelText}>Contraseña</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={theme.placeholder}
            secureTextEntry={!showPassword}
            style={styles.input}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue("password", text)}
          />
          <Pressable
            style={styles.showPassword}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={moderateScale(18)}
              color={theme.placeholder}
            />
          </Pressable>
          {formik.errors.password && formik.values.password && (
            <Text style={styles.error}>{formik.errors.password}</Text>
          )}
        </View>
        {/* password confirmation */}
        <View style={styles.wrapper}>
          <Text style={styles.labelText}>Confirmar contraseña</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={theme.placeholder}
            secureTextEntry={!showPassword}
            style={styles.input}
            value={formik.values.password_confirmation}
            onChangeText={(text) =>
              formik.setFieldValue("password_confirmation", text)
            }
          />
          <Pressable
            style={styles.showPassword}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={moderateScale(18)}
              color={theme.placeholder}
            />
          </Pressable>
          {formik.errors.password_confirmation && (
            <Text style={styles.error}>
              {formik.errors.password_confirmation}
            </Text>
          )}
        </View>
      </View>
      <Pressable style={styles.btnRegister} onPress={formik.handleSubmit}>
        <Text style={styles.textBtn}>Guardar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    first_name: "",
    last_name: "",
    fullname: "",
    username: "",
    occupation: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
}
function validationSchema() {
  return {
    first_name: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es obligatorio"),
    last_name: Yup.string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .required("El apellido es obligatorio"),
    fullname: Yup.string().required("El nombre completo es obligatorio"),
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    occupation: Yup.string().required("El cargo es obligatorio"),
    email: Yup.string()
      .email("Correo electronico invalido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .required("La contraseña es necesaria")
      .min(8, "Contraseña muy corta, debe tener minimo 8 caracteres"),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "La contraseña no coincide"
    ),
  };
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    buttonBack: {
      position: "absolute",
      top: verticalScale(50),
      left: horizontalScale(30),
    },
    title: {
      fontFamily: fontFamily,
      fontSize: moderateScale(30),
      fontWeight: "bold",
      color: theme.title,
      marginBottom: 50,
    },
    form: {
      width: "60%",
    },
    wrapper: {
      marginBottom: verticalScale(12),
    },
    labelText: {
      color: theme.subtitle,
      fontSize: moderateScale(15),
      fontWeight: "bold",
    },
    input: {
      borderBottomWidth: moderateScale(1),
      borderBottomColor: theme.input,
      color: theme.text,
      width: "100%",
      height: verticalScale(25),
      fontFamily: fontFamily,
      fontSize: moderateScale(14),
    },
    showPassword: {
      position: "absolute",
      right: horizontalScale(10),
      top: verticalScale(20),
    },
    btnRegister: {
      backgroundColor: theme.card,
      alignSelf: "center",
      width: horizontalScale(80),
      paddingVertical: verticalScale(5),
      borderRadius: moderateScale(10),
      marginTop: verticalScale(20),
      borderWidth: moderateScale(1),
      borderColor: theme.card,
    },
    textBtn: {
      color: theme.text,
      textAlign: "center",
      fontSize: moderateScale(12),
    },
    errorsScrollView: {
      width: "70%",
      maxHeight: verticalScale(50),
    },
    error: {
      color: theme.error,
    },
  });
