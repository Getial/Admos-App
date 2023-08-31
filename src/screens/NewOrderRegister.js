import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import { shareAsync } from "expo-sharing";
import axios from "axios";
import useAuth from "../hooks/useAuth";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";
import generatePDF from "../utils/generatePDF";

export default function NewOrderRegister({ navigation, route }) {
  const { client } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  // const navigation = useNavigation();
  const { handleSubmit, watch, control } = useForm();
  const { auth } = useAuth();

  const [typeServiceOpen, setTypeServiceOpen] = useState(false);
  const [typeServiceValue, setTypeServiceValue] = useState(null);
  const [typeService, setTypeService] = useState([
    { label: "Cobro", value: false },
    { label: "Garantia", value: true },
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
    console.log("getServiceNumber");
    if (watch("is_guarantee")) {
      return watch("os_garanty");
    } else {
      console.log("obteniendo ultima orden");
      response = await axios.get(`${API_HOST}/orders/lastorder/`);
      console.log(response.data);
      console.log(response.data[0].service_number);
      let lastOS = parseInt(response.data[0].service_number);
      lastOS += 1;
      const newOS = lastOS.toString().padStart(5, "0");
      console.log(newOS);
      return newOS;
    }
  };

  // useEffect(() => {
  //   console.log("useeffect");
  //   getServiceNumber();
  // }, []);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      entry_date: getDateTime(),
      client,
      service_number: await getServiceNumber(),
      received_by: auth.id,
      state: "received",
    };
    try {
      setIsLoading(true);
      const config = {
        method: "post",
        url: `${API_HOST}/orders/`,
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
        data: formData,
      };

      const response = await axios(config);

      if (response.status === 201) {
        setIsLoading(false);
        // (async () => {
        //   const file = await generatePDF(response.data);
        //   await shareAsync(file.uri);
        // })();
        generatePDF(response.data).then(async (result) => {
          await shareAsync(result.uri);
          navigation.popToTop();
          navigation.navigate("Home");
        });
      } else {
        throw new Error("Ha ocurrido un error con el servidor");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        // <NewOrderForm client={id} />
        <View style={styles.form}>
          <View>
            <Text style={styles.labelText}>Tipo de servicio</Text>
            {/* por cuestiones del formulario backend este campo se guarda como is_guarantee pero 
        sus opciones en la app se manejan como typeService */}
            <Controller
              name="is_guarantee"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={styles.dropdown}
                    textStyle={styles.textStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholderStyle={styles.placeholderStyles}
                    activityIndicatorColor={colors[theme].card}
                    searchContainerStyle={styles.searchContainerStyle}
                    searchTextInputStyle={styles.searchTextInputStyle}
                    open={typeServiceOpen}
                    value={typeServiceValue} //categoryValue
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
            <Text style={styles.labelText}>Categoria</Text>
            <Controller
              name="category"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={styles.dropdown}
                    textStyle={styles.textStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholderStyle={styles.placeholderStyles}
                    activityIndicatorColor={colors[theme].card}
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

            <Text style={styles.labelText}>Marca</Text>
            <Controller
              name="brand"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={styles.dropdown}
                    textStyle={styles.textStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholderStyle={styles.placeholderStyles}
                    activityIndicatorColor={colors[theme].card}
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

            <Text style={styles.labelText}>Referencia</Text>
            <Controller
              name="reference"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={styles.dropdown}
                    textStyle={styles.textStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholderStyle={styles.placeholderStyles}
                    activityIndicatorColor={colors[theme].card}
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

          {watch("is_guarantee") === true && (
            <>
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
            </>
          )}

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

          {watch("is_guarantee") === false && (
            <>
              <Text style={styles.labelText}>Valor de la revision</Text>
              <Controller
                name="payment_for_revision"
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
            </>
          )}

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.getStarted}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Guardando nueva orden de servicio</Text>
          <ActivityIndicator size="large" color={colors[theme].card} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "75%",
  },
  input: {
    borderStyle: "solid",
    backgroundColor: colors[theme].input,
    borderColor: colors[theme].card,
    color: colors[theme].text,
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  labelText: {
    color: colors[theme].text,
    width: "50%",
    fontSize: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: colors[theme].input,
    borderColor: colors[theme].card,
    color: colors[theme].text,
    height: 50,
  },
  textStyle: {
    backgroundColor: colors[theme].input,
    color: colors[theme].text,
  },
  dropDownContainerStyle: {
    borderColor: colors[theme].card,
    // borderTopWidth: 0,
    backgroundColor: colors[theme].input,
  },
  searchContainerStyle: {
    borderColor: colors[theme].input,
  },
  searchTextInputStyle: {
    color: colors[theme].text,
  },
  placeholderStyles: {
    color: colors[theme].placeholder,
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  getStarted: {
    backgroundColor: colors[theme].card,
    color: colors[theme].text,
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors[theme].text,
  },
  checkbox: {
    alignSelf: "center",
  },
});
