import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Switch,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome5";
import DropDownPicker from "react-native-dropdown-picker";

import { colors, fontFamily, theme } from "../utils/desing";
import { addNewClientApi } from "../api/clients";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../utils/metrics";

export default function NewClientRegister({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [genreOpen, setGenreOpen] = useState(false);
  const [genreValue, setGenreValue] = useState(null);
  const [genre, setGenre] = useState([
    { label: "Femenino", value: "female" },
    { label: "Masculino", value: "male" },
  ]);

  // const onGenreOpen = useCallback(() => {
  //   setBrandOpen(false);
  //   setReferenceOpen(false);
  //   setTypeServiceOpen(false);
  // }, []);

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
      const response = await addNewClientApi(formValues);
      const { id } = response;
      navigation.navigate("NewOrderRegister", { client: id });
      setIsLoading(false);
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
      {!isLoading ? (
        <>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.title}>Nuevo cliente</Text>
            </View>
            <View style={styles.wrapper}>
              <View>
                <Text style={styles.labelText}>Nombre Completo</Text>
                <TextInput
                  placeholder="Nombre del usuario o la empresa"
                  placeholderTextColor={colors[theme].placeholder}
                  style={styles.input}
                  value={formik.values.fullName}
                  onChangeText={(text) =>
                    formik.setFieldValue("fullname", text)
                  }
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.labelText}>Empresa</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#6c5b8f" }}
                  thumbColor={
                    formik.values.is_company ? colors[theme].card : "#f4f3f4"
                  }
                  onValueChange={(text) =>
                    formik.setFieldValue("is_company", text)
                  }
                  value={formik.values.is_company}
                />
              </View>

              <View style={styles.dropdownGender}>
                <Text style={styles.labelText}>Genero</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  textStyle={styles.textStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  placeholderStyle={styles.placeholderStyles}
                  activityIndicatorColor={colors[theme].card}
                  searchContainerStyle={styles.searchContainerStyle}
                  searchTextInputStyle={styles.searchTextInputStyle}
                  open={genreOpen}
                  value={genreValue} //categoryValue
                  items={genre}
                  setOpen={setGenreOpen}
                  setValue={setGenreValue}
                  setItems={setGenre}
                  // onOpen={onTypeServiceOpen}
                  onChangeValue={(val) => console.log(val)}
                  loading={isLoading}
                  placeholder="Seleccionar genero"
                  zIndex={2000}
                  zIndexInverse={1000}
                />
              </View>

              <View>
                <Text style={styles.labelText}>CC o NIT</Text>
                <TextInput
                  placeholder="Numero de documento o Nit"
                  placeholderTextColor={colors[theme].placeholder}
                  style={styles.input}
                  value={formik.values.document}
                  onChangeText={(text) =>
                    formik.setFieldValue("document", text)
                  }
                />
              </View>

              <View>
                <Text style={styles.labelText}>Celular</Text>
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
              </View>
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
    is_company: "",
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
    is_company: Yup.boolean(),
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
  buttonBack: {
    position: "absolute",
    top: verticalScale(60),
    left: horizontalScale(30),
    // height: 50,
    // width: 50,
    // borderRadius: 25,
    // backgroundColor: colors[theme].background,
    // zIndex: 1,
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
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
    width: "100%",
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors[theme].error,
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
    minWidth: "70%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 25,
    fontFamily: fontFamily,
  },
  dropDownContainerStyle: {
    borderColor: colors[theme].card,
    padding: 10,
    backgroundColor: colors[theme].input,
  },
  dropdown: {
    backgroundColor: colors[theme].input,
    // borderColor: colors[theme].card,
    color: colors[theme].text,
    height: verticalScale(50),
  },
  dropdownGender: {
    // marginHorizontal: horizontalScale(10),
    width: "70%",
    marginBottom: verticalScale(15),
  },
  textStyle: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
  },
  error: {
    color: colors[theme].error,
    marginTop: 20,
  },
});
