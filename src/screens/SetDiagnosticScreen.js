import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  Switch,
  View,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageViewer from "../components/ImageViewer";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import UploadImages from "../components/UploadImages";
const PlaceholderImage = require("../assets/background.jpeg");

export default function SetDiagnosticScreen({ navigation }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitFormHandler = (formValues) => {
    console.log(formValues);
  };

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result.assets[0].uri);
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={moderateScale(30)}
        />
      </Pressable>
      {/* <>
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

            <View style={styles.containerQuestion}>
              <Text style={styles.labelText}>
                //¿Se necesita solicitar repuestos?
                solicitar repuestos
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#6c5b8f" }}
                thumbColor={
                  formik.values.is_necesary_spare_parts
                    ? colors[theme].card
                    : "#f4f3f4"
                }
                onValueChange={(text) =>
                  formik.setFieldValue("is_necesary_spare_parts", text)
                }
                value={formik.values.is_necesary_spare_parts}
              />
            </View>

            {formik.values.is_necesary_spare_parts && (
              <>
                <Text style={styles.labelText}>Lista de repuestos</Text>
                <TextInput
                  multiline
                  placeholder="nombre o numero de la pieza, cantidad y medida."
                  placeholderTextColor={colors[theme].placeholder}
                  style={styles.input}
                  value={formik.values.spare_parts_list}
                  onChangeText={(text) =>
                    formik.setFieldValue("spare_parts_list", text)
                  }
                />
              </>
            )}
            <Pressable onPress={pickImageAsync} style={styles.btnEvidences}>
              <Text style={styles.textBtn}>Subir evidencias</Text>
              <Icon
                name="camera"
                color={colors[theme].card}
                size={moderateScale(25)}
              />
            </Pressable>
            <Image source={selectedImage} style={styles.image} />
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
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
      </> */}
      <UploadImages />
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
  containerQuestion: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    width: "95%",
    maxWidth: "95%",
    // maxWidth: "70%",
    height: verticalScale(70),
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 25,
    fontFamily: fontFamily,
    alignSelf: "center",
  },
  btnEvidences: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: colors[theme].input,
    borderRadius: moderateScale(10),
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
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
