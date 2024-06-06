import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import * as yup from "yup";

import { API_HOST } from "../../utils/constants";
import useTheme from "../../hooks/useTheme";
import { fontFamily } from "../../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/metrics";

const schema = yup.object().shape({
  type_service: yup.string().required("Indique el tipo de servicio"),
  os_garanty: yup.string(),
  serial: yup.string(),
  category: yup.number().required("La categora es necesaria"),
  brand: yup.number().required("La marca es necesaria"),
  reference: yup.number().required("Especifique la referencia"),
  reason_for_entry: yup.string().required("El motivo de ingreso es necesario"),
  observations: yup
    .string()
    .required("Especifique las condiciones en las que ingresa el producto"),
  price_for_revision: yup.string(),
});

export default function NewOrderRegister({ navigation, route }) {
  const { client } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, watch, control } = useForm();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [typeServiceOpen, setTypeServiceOpen] = useState(false);
  const [typeServiceValue, setTypeServiceValue] = useState(null);
  const [typeService, setTypeService] = useState([
    { label: "Cobro", value: "collect" },
    { label: "Garantia", value: "warranty" },
    { label: "Garantia de taller", value: "workshop_warranty" },
  ]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [category, setCategory] = useState([]);

  const [brandOpen, setBrandOpen] = useState(false);
  const [brandValue, setBrandValue] = useState(null);
  const [brand, setBrand] = useState([]);

  const [referenceOpen, setReferenceOpen] = useState(false);
  const [referenceValue, setReferenceValue] = useState(null);
  const [reference, setReference] = useState([]);

  const onCategoryOpen = useCallback(() => {
    setBrandOpen(false);
    setReferenceOpen(false);
    setTypeServiceOpen(false);
  }, []);

  const onBrandOpen = useCallback(() => {
    setCategoryOpen(false);
    setReferenceOpen(false);
    setTypeServiceOpen(false);
  }, []);

  const onReferenceOpen = useCallback(() => {
    setCategoryOpen(false);
    setBrandOpen(false);
    setTypeServiceOpen(false);
  }, []);

  const onTypeServiceOpen = useCallback(() => {
    setCategoryOpen(false);
    setBrandOpen(false);
    setReferenceOpen(false);
  }, []);

  //get brands and get categories
  useEffect(() => {
    (async () => {
      try {
        const responseCategories = await axios.get(`${API_HOST}/categories`);
        if (responseCategories.status === 200) {
          const newDataCategories = [];
          for (const item of responseCategories.data) {
            const el = {
              label: item.name,
              value: item.id,
            };
            newDataCategories.push(el);
          }
          setCategory(newDataCategories);
        } else {
          throw new Error(
            "Ha ocurrido un error con el servidor en la peticion getCategories"
          );
        }

        const responseBrands = await axios.get(`${API_HOST}/brands`);
        if (responseBrands.status === 200) {
          const newDataBrands = [];
          for (const item of responseBrands.data) {
            const el = {
              label: item.name,
              value: item.id,
            };
            newDataBrands.push(el);
          }
          setBrand(newDataBrands);
        } else {
          throw new Error(
            "Ha ocurrido un error con el servidor en la peticion getBrands"
          );
        }
      } catch (error) {
        console.log("ha ocurrido un error: ", error);
      }
    })();
  }, []);

  //get referencies
  useEffect(() => {
    (async () => {
      if (watch("brand") && watch("category")) {
        try {
          const responseReferencies = await axios.get(
            `${API_HOST}/referencies/?brand=${watch("brand")}&category=${watch(
              "category"
            )}`
          );
          if (responseReferencies.status === 200) {
            const newDataReferencies = [];
            for (const item of responseReferencies.data) {
              const el = {
                label: item.reference,
                value: item.id,
              };
              newDataReferencies.push(el);
            }
            setReference(newDataReferencies);
          } else {
            throw new Error(
              "Ha ocurrido un error con el servidor en la peticion getBrands"
            );
          }
        } catch (error) {
          console.log("ha ocurrido un error: ", error);
        }
      }
    })();
  }, [watch("brand"), watch("category")]);

  const getDateTime = () => {
    return new Date();
  };

  const getServiceNumber = async () => {
    if (watch("type_service") === "warranty") {
      return watch("os_garanty");
    } else {
      response = await axios.get(`${API_HOST}/orders/lastorder/`);
      let lastOS = parseInt(response.data[0].service_number);
      lastOS += 1;
      const newOS = lastOS.toString().padStart(5, "0");
      return newOS;
    }
  };

  const setStateOrder = () => {
    if (watch("type_service") === "warranty") {
      return watch("os_garanty") ? "admitted" : "received";
    } else {
      return "admitted";
    }
  };

  const setIsGuarantee = () => {
    if (watch("type_service") === "warranty") {
      return true;
    } else {
      return false;
    }
  };

  const getNameXLabel = (value, arr) => {
    // Buscar el objeto con el value dado
    let objeto = arr.find((item) => item.value === value);
    // Si se encuentra el objeto, devolver su label; de lo contrario, devolver null
    return objeto ? objeto.label : null;
  };

  const onContinue = async (data) => {
    const dataPDF = {
      ...data,
      received_by: auth.id,
      state: setStateOrder(),
      // entry_date: new Date().toString(),
      // admitted_date:
      //   setStateOrder() === "admitted" ? new Date().toString() : "",
      is_guarantee: setIsGuarantee(),
      service_number: await getServiceNumber(),
      client: client.id,
      client_fullname: client.fullname,
      client_address: client.address,
      client_municipality: client.municipality,
      client_phone_number: client.phone_number,
      category_name: getNameXLabel(watch("category"), category),
      brand_name: getNameXLabel(watch("brand"), brand),
      reference_name: getNameXLabel(watch("reference"), reference),
    };
    try {
      // Valida el formulario con Yup
      await schema.validate(dataPDF, { abortEarly: true });
      navigation.navigate("PrevOrder", {
        data: dataPDF,
      });
    } catch (err) {
      // Si hay errores de validación, muestra los mensajes de error
      setError(err.errors.join("\n"));
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
      {!isLoading ? (
        <>
          <Text style={styles.title}>Nueva Orden de Servicio</Text>
          <ScrollView style={styles.scrollView}>
            {/* type service */}
            <View>
              <Text style={styles.labelText}>Tipo de servicio</Text>
              <Controller
                name="type_service"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.dropdownCompany}>
                    <DropDownPicker
                      listMode="SCROLLVIEW"
                      style={styles.dropdown}
                      textStyle={styles.textStyle}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      placeholderStyle={styles.placeholderStyles}
                      activityIndicatorColor={theme.card}
                      searchContainerStyle={styles.searchContainerStyle}
                      searchTextInputStyle={styles.searchTextInputStyle}
                      open={typeServiceOpen}
                      value={typeServiceValue}
                      items={typeService}
                      setOpen={setTypeServiceOpen}
                      setValue={setTypeServiceValue}
                      setItems={setTypeService}
                      onOpen={onTypeServiceOpen}
                      onChangeValue={onChange}
                      loading={isLoading}
                      placeholder="Seleccionar tipo de servicio"
                      zIndex={5000}
                      zIndexInverse={1000}
                    />
                  </View>
                )}
              />
            </View>

            {/* os_garanty */}
            <View>
              {watch("type_service") === "warranty" && (
                <View>
                  <Text style={styles.labelText}>Orden de servicio</Text>
                  <Controller
                    name="os_garanty"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        selectionColor={"#5188E3"}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
              )}
            </View>

            {/* category */}
            <View>
              <Text style={styles.labelText}>Categoria</Text>
              <Controller
                name="category"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.dropdownCompany}>
                    <DropDownPicker
                      listMode="SCROLLVIEW"
                      style={styles.dropdown}
                      textStyle={styles.textStyle}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      placeholderStyle={styles.placeholderStyles}
                      activityIndicatorColor={theme.card}
                      searchContainerStyle={styles.searchContainerStyle}
                      searchTextInputStyle={styles.searchTextInputStyle}
                      open={categoryOpen}
                      value={categoryValue} //categoryValue
                      items={category}
                      setOpen={setCategoryOpen}
                      setValue={setCategoryValue}
                      setItems={setCategory}
                      onOpen={onCategoryOpen}
                      onChangeValue={onChange}
                      loading={isLoading}
                      searchable={true}
                      placeholder="Seleccionar categoria"
                      searchPlaceholder="Buscar categoria"
                      zIndex={4000}
                      zIndexInverse={2000}
                    />
                  </View>
                )}
              />
            </View>

            {/* brand */}
            <View>
              <Text style={styles.labelText}>Marca</Text>
              <Controller
                name="brand"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.dropdownCompany}>
                    <DropDownPicker
                      listMode="SCROLLVIEW"
                      style={styles.dropdown}
                      textStyle={styles.textStyle}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      placeholderStyle={styles.placeholderStyles}
                      activityIndicatorColor={theme.card}
                      searchContainerStyle={styles.searchContainerStyle}
                      searchTextInputStyle={styles.searchTextInputStyle}
                      open={brandOpen}
                      value={brandValue} //brandValue
                      items={brand}
                      setOpen={setBrandOpen}
                      setValue={setBrandValue}
                      setItems={setBrand}
                      onOpen={onBrandOpen}
                      onChangeValue={onChange}
                      loading={isLoading}
                      searchable={true}
                      placeholder="Seleccionar marca"
                      searchPlaceholder="Buscar marca"
                      zIndex={3000}
                      zIndexInverse={3000}
                    />
                  </View>
                )}
              />
            </View>

            {/* reference */}
            <View>
              <Text style={styles.labelText}>Referencia</Text>
              <Controller
                name="reference"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.dropdownCompany}>
                    <DropDownPicker
                      listMode="SCROLLVIEW"
                      style={styles.dropdown}
                      textStyle={styles.textStyle}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      placeholderStyle={styles.placeholderStyles}
                      activityIndicatorColor={theme.card}
                      searchContainerStyle={styles.searchContainerStyle}
                      searchTextInputStyle={styles.searchTextInputStyle}
                      open={referenceOpen}
                      value={referenceValue} //brandValue
                      items={reference}
                      setOpen={setReferenceOpen}
                      setValue={setReferenceValue}
                      setItems={setReference}
                      onOpen={onReferenceOpen}
                      onChangeValue={onChange}
                      loading={isLoading}
                      searchable={true}
                      placeholder="Seleccionar referencia"
                      searchPlaceholder="Buscar referencia"
                      zIndex={2000}
                      zIndexInverse={4000}
                    />
                  </View>
                )}
              />
            </View>

            {/* serial */}
            <View>
              <Text style={styles.labelText}>Serial</Text>
              <Controller
                name="serial"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    selectionColor={"#5188E3"}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>

            {/* reason_for_entry */}
            <View>
              <Text style={styles.labelText}>Motivo de ingreso</Text>
              <Controller
                name="reason_for_entry"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    selectionColor={"#5188E3"}
                    onChangeText={onChange}
                    value={value}
                    multiline={true}
                  />
                )}
              />
            </View>

            {/* observations */}
            <View>
              <Text style={styles.labelText}>Observaciones</Text>
              <Controller
                name="observations"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    selectionColor={"#5188E3"}
                    onChangeText={onChange}
                    value={value}
                    multiline={true}
                  />
                )}
              />
            </View>

            {/* price_for_revision */}
            <View>
              {watch("type_service") === "collect" && (
                <>
                  <Text style={styles.labelText}>Valor de la revision</Text>
                  <Controller
                    name="price_for_revision"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        selectionColor={"#5188E3"}
                        onChangeText={onChange}
                        value={value}
                        multiline={true}
                        inputMode="numeric"
                      />
                    )}
                  />
                </>
              )}
            </View>
          </ScrollView>
          {/* <Pressable onPress={GoPreviewPDF} style={styles.BtnPrevOrder}>
            <Text style={styles.txtBtn}>Previsualizar orden</Text>
          </Pressable> */}
          <Pressable onPress={handleSubmit(onContinue)}>
            <Text style={styles.btnSave}>Continuar</Text>
          </Pressable>
          {error && <Text style={styles.error}>{error}</Text>}
        </>
      ) : (
        <View>
          <Text style={styles.title}>Guardando nueva orden de servicio</Text>
          <ActivityIndicator size="large" color={theme.card} />
        </View>
      )}
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonBack: {
      position: "absolute",
      top: verticalScale(50),
      left: horizontalScale(30),
    },
    title: {
      color: theme.title,
      fontFamily: fontFamily,
      fontWeight: "bold",
      marginBottom: verticalScale(15),
      fontSize: moderateScale(28),
    },
    scrollView: {
      maxHeight: verticalScale(400),
      width: "85%",
    },
    form: {
      width: "100%",
    },
    input: {
      borderStyle: "solid",
      backgroundColor: theme.input,
      borderColor: theme.card,
      color: theme.text,
      borderRadius: moderateScale(7),
      borderWidth: 1,
      fontSize: moderateScale(15),
      height: verticalScale(35),
      marginHorizontal: horizontalScale(10),
      paddingStart: horizontalScale(10),
      marginBottom: verticalScale(15),
    },
    labelText: {
      color: theme.text,
      fontSize: moderateScale(15),
      marginHorizontal: horizontalScale(10),
      marginBottom: verticalScale(10),
    },
    dropdown: {
      backgroundColor: theme.input,
      borderColor: theme.card,
      color: theme.text,
      height: verticalScale(35),
    },
    textStyle: {
      backgroundColor: theme.input,
      color: theme.text,
    },
    dropDownContainerStyle: {
      borderColor: theme.card,
      backgroundColor: theme.input,
    },
    searchContainerStyle: {
      borderColor: theme.input,
    },
    searchTextInputStyle: {
      color: theme.text,
    },
    placeholderStyles: {
      color: theme.placeholder,
    },
    dropdownGender: {
      marginHorizontal: horizontalScale(10),
      width: "50%",
      marginBottom: verticalScale(15),
    },
    dropdownCompany: {
      marginHorizontal: horizontalScale(10),
      marginBottom: verticalScale(15),
    },
    BtnPrevOrder: {
      borderWidth: 1,
      borderColor: theme.card,
      borderRadius: moderateScale(10),
      paddingVertical: verticalScale(2),
      paddingHorizontal: horizontalScale(5),
    },
    txtBtn: {
      color: theme.text,
    },
    btnSave: {
      backgroundColor: theme.card,
      color: theme.text,
      textAlign: "center",
      width: horizontalScale(100),
      marginHorizontal: horizontalScale(60),
      paddingVertical: verticalScale(8),
      borderRadius: moderateScale(50),
      marginTop: verticalScale(10),
    },
    error: {
      color: theme.error,
      textAlign: "center",
      marginTop: 10,
    },
  });
