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
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFormik } from "formik";
import * as Yup from "yup";

import { colors, fontFamily, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import useEvidences from "../hooks/useEvidences";
import { updateOrder } from "../api/orders";
import { addNewEvidenceApi } from "../api/evidences";
import useAuth from "../hooks/useAuth";

export default function SetDiagnosticScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const { images, setEvidences, setEditedEvidence } = useEvidences();
  const { id } = route.params;
  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      onSubmitFormHandler(formValues);
    },
  });

  const handleUploadEvidences = () => {
    images.forEach(async (image, index) => {
      const formData = new FormData();
      formData.append("order", id);
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg",
        name: `imagex_${index}.jpg`,
      });
      try {
        const response = await addNewEvidenceApi(formData);
      } catch (error) {
        console.error("Error al subir las imágenes", error);
        Alert.alert("Error al subir las imágenes", error);
      }
    });
  };

  const onSubmitFormHandler = async (formValues) => {
    try {
      setIsLoading(true);
      formik.setFieldValue("checked_by", auth.id);
      const response = await updateOrder(id, formValues);

      handleUploadEvidences();
      setEvidences([]);
      setIsLoading(false);
      response && navigation.navigate("Orders");
    } catch (error) {
      Alert(
        "ha ocurrido un error al guardar el diagnostico o las evidencias",
        error
      );
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.2,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      let imgs = [];
      for (let image of result.assets) {
        imgs.push(image);
      }
      setEvidences(imgs);
    } else {
      alert("You did not select any image.");
    }
  };

  const deleteEvidence = (img) => {
    const newListImages = images.filter((item) => item.uri !== img.uri);
    setEvidences(newListImages);
  };

  const StyleContainerEvidences = () => {
    if (formik.values.is_necesary_spare_parts) {
      return {
        top: verticalScale(480),
      };
    } else {
      return {
        top: verticalScale(350),
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={moderateScale(30)}
        />
      </Pressable>

      <Text style={styles.title}>Detalles de la revision</Text>

      <View style={[styles.wrapper, styles.containerDiagnostic]}>
        <Text style={styles.labelText}>Diagnostico</Text>
        <TextInput
          multiline
          placeholder="Mencione las fallas que presenta la maquina"
          placeholderTextColor={colors[theme].placeholder}
          style={styles.input}
          value={formik.values.diagnostic}
          onChangeText={(text) => formik.setFieldValue("diagnostic", text)}
        />
      </View>

      <View style={[styles.wrapper, styles.containerQuestion]}>
        <Text style={styles.labelText}>Solicitar repuestos</Text>
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
        <View style={[styles.wrapper, styles.containerSpareParts]}>
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
        </View>
      )}

      <View style={[styles.wrapper, StyleContainerEvidences()]}>
        <Pressable onPress={pickImageAsync} style={styles.btnEvidences}>
          <Text style={styles.textBtn}>Subir evidencias</Text>
          <Icon
            name="camera"
            color={colors[theme].card}
            size={moderateScale(25)}
          />
        </Pressable>
        <ScrollView style={styles.containerImages} horizontal={true}>
          {images?.map((image, index) => (
            <View key={index}>
              <Pressable
                onPress={() => deleteEvidence(image)}
                style={styles.btnDeleteEvidence}
              >
                <Icon
                  name="trash-alt"
                  color={colors[theme].card}
                  size={moderateScale(20)}
                />
              </Pressable>

              <Pressable
                onPress={() =>
                  navigation.navigate("EditEvidence", {
                    img: image,
                  })
                }
              >
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.image}
                />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.wrapper, styles.containerBtnSave]}>
        {!isLoading ? (
          <Pressable style={styles.btnSave} onPress={formik.handleSubmit}>
            <Text style={styles.textBtn}>Guardar</Text>
          </Pressable>
        ) : (
          <View>
            <Text style={styles.textBtn}>Guardando cambios</Text>
            <ActivityIndicator size="large" color={colors[theme].card} />
          </View>
        )}
      </View>

      {formik.errors.diagnostic && (
        <Text style={styles.error}>{formik.errors.diagnostic}</Text>
      )}
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    diagnostic: "",
    is_necesary_spare_parts: "",
    spare_parts_list: "",
    state: "revised",
    checked_by: "",
  };
}

function validationSchema() {
  return {
    diagnostic: Yup.string().required("El diagnostico es obligatirio"),
    is_necesary_spare_parts: Yup.bool(),
    spare_parts_list: Yup.string(),
    state: Yup.string(),
    checked_by: Yup.number(),
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
    height: "100%",
    width: "100%",
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
    marginBottom: verticalScale(25),
    fontSize: moderateScale(28),
    position: "absolute",
    top: moderateScale(100),
  },
  wrapper: {
    width: "90%",
    position: "absolute",
  },
  containerDiagnostic: {
    top: moderateScale(180),
  },
  containerQuestion: {
    top: moderateScale(300),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors[theme].error,
  },
  containerSpareParts: {
    top: verticalScale(350),
  },
  containerImages: {
    marginTop: verticalScale(10),
    display: "flex",
    flexDirection: "row",
  },
  containerBtnSave: {
    top: verticalScale(680),
  },
  labelText: {
    color: colors[theme].subtitle,
    // width: "50%",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  input: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
    width: "95%",
    maxWidth: "95%",
    // maxWidth: "70%",
    height: verticalScale(80),
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
    marginHorizontal: horizontalScale(10),
  },
  btnDeleteEvidence: {
    position: "relative",
    top: verticalScale(5),
    left: horizontalScale(115),
    width: moderateScale(34),
    height: moderateScale(34),
    backgroundColor: colors[theme].placeholder,
    borderColor: colors[theme].card,
    borderWidth: 1,
    borderRadius: moderateScale(17),
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "relative",
    top: verticalScale(-30),
    width: horizontalScale(150),
    height: verticalScale(150),
    borderRadius: 10,
    marginRight: horizontalScale(5),
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
