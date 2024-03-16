import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";

import { colors, fontFamily, theme } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";
import { addNewUserApi } from "../../api/users";
import useAuth from "../../hooks/useAuth";

export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const onSubmitFormHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await addNewUserApi(data);
      login(response);
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
          size={30}
          style={styles.iconPlus}
        />
      </Pressable>
      <Text style={styles.title}>Registrarse</Text>
      <View style={styles.form}>
        {/* firstname */}
        <View>
          <Text style={styles.labelText}>Nombre</Text>
          <TextInput
            placeholder="Pepito"
            placeholderTextColor={colors[theme].placeholder}
            style={styles.input}
            value={formik.values.first_name}
            onChangeText={(text) => formik.setFieldValue("first_name", text)}
            onBlur={() =>
              formik.setFieldValue("username", formik.values.first_name)
            }
          />
        </View>
        {/* lastname */}
        <View>
          <Text style={styles.labelText}>Apellido</Text>
          <TextInput
            placeholder="Perez"
            placeholderTextColor={colors[theme].placeholder}
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
        </View>
        {/* occupation */}
        <View>
          <Text style={styles.labelText}>Cargo</Text>
          <TextInput
            placeholder="Tecnico electricista"
            placeholderTextColor={colors[theme].placeholder}
            style={styles.input}
            value={formik.values.occupation}
            onChangeText={(text) => formik.setFieldValue("occupation", text)}
          />
        </View>
        {/* email */}
        <View>
          <Text style={styles.labelText}>Correo Electronico</Text>
          <TextInput
            placeholder="pepito99@example.com"
            placeholderTextColor={colors[theme].placeholder}
            inputMode="email"
            style={styles.input}
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue("email", text)}
          />
        </View>
        {/* password */}
        <View>
          <Text style={styles.labelText}>Contraseña</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={colors[theme].placeholder}
            secureTextEntry
            style={styles.input}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue("password", text)}
          />
        </View>
        {/* password confirmation */}
        <View>
          <Text style={styles.labelText}>Confirmar contraseña</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={colors[theme].placeholder}
            secureTextEntry
            style={styles.input}
            value={formik.values.password_confirmation}
            onChangeText={(text) =>
              formik.setFieldValue("password_confirmation", text)
            }
          />
        </View>
      </View>
      <Pressable style={styles.btnRegister} onPress={formik.handleSubmit}>
        <Text style={styles.textBtn}>Guardar</Text>
      </Pressable>
      <ScrollView style={styles.errorsScrollView}>
        {formik.errors.first_name && (
          <Text style={styles.error}>{formik.errors.first_name}</Text>
        )}
        {formik.errors.last_name && (
          <Text style={styles.error}>{formik.errors.last_name}</Text>
        )}
        {formik.errors.fullname && (
          <Text style={styles.error}>{formik.errors.fullname}</Text>
        )}
        {formik.errors.username && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
        {formik.errors.occupation && (
          <Text style={styles.error}>{formik.errors.occupation}</Text>
        )}
        {formik.errors.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}
        {formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
        {formik.errors.password_confirmation && (
          <Text style={styles.error}>
            {formik.errors.password_confirmation}
          </Text>
        )}
      </ScrollView>
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
    first_name: Yup.string().required("El nombre es obligatorio"),
    last_name: Yup.string().required("El apellido es obligatorio"),
    fullname: Yup.string().required("El nombre completo es obligatorio"),
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    occupation: Yup.string().required("El cargo es obligatorio"),
    email: Yup.string().required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatiria"),
    password_confirmation: Yup.string().required(
      "Debes confirmar la contraseña"
    ),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors[theme].background,
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
    color: colors[theme].title,
    marginBottom: 50,
  },
  form: {
    width: "60%",
    // backgroundColor: colors[theme].error,
  },
  labelText: {
    color: colors[theme].subtitle,
    // width: "50%",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    // paddingLeft: 5,
    // marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(5),
  },
  input: {
    // backgroundColor: colors[theme].input,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors[theme].input,
    color: colors[theme].text,
    width: "100%",
    height: verticalScale(25),
    // borderRadius: 5,
    // paddingLeft: 5,
    marginBottom: verticalScale(15),
    fontFamily: fontFamily,
    fontSize: moderateScale(14),
  },
  button: {
    fontFamily: fontFamily,
  },
  btnRegister: {
    backgroundColor: colors[theme].card,
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
  errorsScrollView: {
    // backgroundColor: colors[theme].card,
    width: "70%",
    maxHeight: verticalScale(50),
  },
  error: {
    color: colors[theme].error,
    marginTop: 10,
  },
});
