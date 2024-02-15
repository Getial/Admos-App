import axios from "axios";
import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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

import { colors, fontFamily, theme } from "../../utils/desing";
import { addNewClientApi } from "../../api/clients";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../utils/metrics";

export default function NewClientRegister({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const [genredOpen, setGenredOpen] = useState(false);
  const [genredValue, setGenredValue] = useState(null);
  const [genred, setGenred] = useState([
    { label: "Femenino", value: "female" },
    { label: "Masculino", value: "male" },
  ]);

  const [entityOpen, setEntityOpen] = useState(false);
  const [entityValue, setEntityValue] = useState(null);
  const [entity, setEntity] = useState([
    { label: "Persona Natural", value: false },
    { label: "Empresa", value: true },
  ]);

  const onGenredOpen = useCallback(() => {
    setEntityOpen(false);
  }, []);

  const onEntityOpen = useCallback(() => {
    setGenredOpen(false);
  }, []);

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
          <Text style={styles.title}>Nuevo cliente</Text>

          <ScrollView style={styles.scrollView}>
            {/* Nombre completo */}
            <View>
              <Text style={styles.labelText}>Nombre Completo</Text>
              <TextInput
                placeholder="Nombre del usuario o la empresa"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.fullName}
                onChangeText={(text) => formik.setFieldValue("fullname", text)}
              />
            </View>

            {/* Empresa*/}
            <View style={styles.dropdownCompany}>
              <Text style={styles.labelText}>Entidad</Text>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={styles.dropdown}
                textStyle={styles.textStyle}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                placeholderStyle={styles.placeholderStyles}
                activityIndicatorColor={colors[theme].card}
                searchContainerStyle={styles.searchContainerStyle}
                searchTextInputStyle={styles.searchTextInputStyle}
                open={entityOpen}
                value={entityValue} //entityValue
                items={entity}
                setOpen={setEntityOpen}
                setValue={setEntityValue}
                setItems={setEntity}
                onOpen={onEntityOpen}
                // onClose={onEntityClose}
                onChangeValue={(val) => {
                  formik.setFieldValue("is_company", val);
                  setShowGenderDropdown(!val);
                }}
                loading={isLoading}
                placeholder="Seleccionar entidad publica"
                zIndex={2000}
                zIndexInverse={1000}
              />
            </View>

            {/* Genero */}
            {showGenderDropdown && (
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
                  open={genredOpen}
                  value={genredValue} //genredValue
                  items={genred}
                  setOpen={setGenredOpen}
                  setValue={setGenredValue}
                  setItems={setGenred}
                  onOpen={onGenredOpen}
                  onChangeValue={(val) => formik.setFieldValue("genred", val)}
                  loading={isLoading}
                  placeholder="Seleccionar genero"
                  zIndex={1000}
                  zIndexInverse={2000}
                />
              </View>
            )}

            {/* cc o nit */}
            <View>
              <Text style={styles.labelText}>CC o NIT</Text>
              <TextInput
                placeholder="Numero de documento o Nit"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.document}
                onChangeText={(text) => formik.setFieldValue("document", text)}
              />
            </View>

            {/* contacto */}
            <View>
              <Text style={styles.labelText}>Contacto</Text>
              <TextInput
                placeholder="Numero de celular o telefono"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.phone_number}
                inputMode="tel"
                onChangeText={(text) =>
                  formik.setFieldValue("phone_number", text)
                }
              />
            </View>

            {/* Correo Electronico */}
            <View>
              <Text style={styles.labelText}>Correo Electronico</Text>
              <TextInput
                placeholder="Ej: pepitoperez@mail.com"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.email}
                inputMode="email"
                onChangeText={(text) => formik.setFieldValue("email", text)}
              />
            </View>

            {/* Direccion */}
            <View>
              <Text style={styles.labelText}>Direccion</Text>
              <TextInput
                placeholder="Ej: calle 20 #12-12"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.address}
                onChangeText={(text) => formik.setFieldValue("address", text)}
              />
            </View>

            {/* Ciudad o municipio */}
            <View>
              <Text style={styles.labelText}>Ciudad o Municipio</Text>
              <TextInput
                placeholder="Ej: Ipiales"
                placeholderTextColor={colors[theme].placeholder}
                style={styles.input}
                value={formik.values.municipality}
                onChangeText={(text) =>
                  formik.setFieldValue("municipality", text)
                }
              />
            </View>
          </ScrollView>

          <ScrollView style={styles.errorsScrollView}>
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
          </ScrollView>

          <Pressable style={styles.btnSave} onPress={formik.handleSubmit}>
            <Text style={styles.textBtn}>Guardar</Text>
          </Pressable>
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
    is_company: false,
    genred: "",
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
    is_company: Yup.bool(),
    genred: Yup.string(),
    document: Yup.string().required("El documento es obligatirio"),
    phone_number: Yup.string().required("El numero de contacto es obligatirio"),
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
    justifyContent: "space-around",
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(50),
    left: horizontalScale(30),
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
  scrollView: {
    maxHeight: verticalScale(400),
    width: "80%",
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
    height: verticalScale(30),
  },
  dropdownCompany: {
    // marginHorizontal: horizontalScale(10),
    width: "80%",
    marginBottom: verticalScale(15),
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
  btnSave: {
    backgroundColor: colors[theme].card,
    alignSelf: "center",
    width: horizontalScale(100),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(10),
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
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
