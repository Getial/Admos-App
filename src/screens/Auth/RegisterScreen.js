import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
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

export default function RegisterScreen({ navigation }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const onSubmitFormHandler = () => {};

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
      <View>
        {/* fullname */}
        <View>
          <Text style={styles.labelText}>Nombre Completo</Text>
          <TextInput
            placeholder="Nombre y apellido"
            placeholderTextColor={colors[theme].placeholder}
            style={styles.input}
            value={formik.values.fullname}
            onChangeText={(text) => formik.setFieldValue("fullname", text)}
          />
        </View>
        {/* occupation */}
        <View>
          <Text style={styles.labelText}>Cargo</Text>
          <TextInput
            placeholder="Cargo"
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
            placeholder="Correo Electronico"
            placeholderTextColor={colors[theme].placeholder}
            style={styles.input}
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue("email", text)}
          />
        </View>
        {/* password */}
        <View>
          <Text style={styles.labelText}>Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={colors[theme].placeholder}
            secureTextEntry
            style={styles.input}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue("password", text)}
          />
        </View>
      </View>
      <Pressable
        style={styles.btnRegister}
        onPress={() => console.log("Register")}
      >
        <Text style={styles.textBtn}>Guardar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    fullname: "",
    occupation: "",
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
  labelText: {
    color: colors[theme].subtitle,
    // width: "50%",
    fontSize: moderateScale(13),
    fontWeight: "bold",
    // marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(5),
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    width: "90%",
    height: verticalScale(25),
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: verticalScale(15),
    fontFamily: fontFamily,
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
  error: {
    color: colors[theme].error,
    marginTop: 30,
  },
});
